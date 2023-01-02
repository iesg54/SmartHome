import pika
import mysql.connector
import json
import os
from datetime import datetime 

def connect_to_database():
    global mydb
    mydb = mysql.connector.connect(
    user="springuser",
    password="password",
    host="db",
    port=3306,
    database= "SmartHome"
    )


def decode_msg(msg):
    data= json.loads(msg)
    return data


def work_data(data):
    print(data)
    division_id= data['division_id']
    generator_type= data['type']
    timestamp= data['stamp']
    day= data['day']

    if generator_type == 'temp_hum':
        temperature= str(data['temperature'])
        store_in_database(division_id, 'temperatura', day,  timestamp, temperature)

        humidity= str(data['humidity'])
        store_in_database(division_id, 'humidade', day,  timestamp, humidity)

    elif generator_type == 'carbon_monoxide':
        carbon= str(data['value'])
        store_in_database(division_id, 'ar', day,  timestamp, carbon)


def getSensorsTable(division_id):
    """ returns the name of the table where the sensors of the division are stored"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("SELECT tipo FROM divisao WHERE id = %s", (division_id, ))
    mydb.commit()
    result= mycursor.fetchone()
    room= result[0]

    if room == "EXTERIOR":
        sensor_table_name = "sensor_measurements_externo"
    else:
        sensor_table_name= "sensor_measurements_" + room.lower()

    return sensor_table_name


def getNextInsertionId(sensor_table_name):
    """ returns the next id to be used in the table where the sensors of the division are stored"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    query= "SELECT * FROM " + sensor_table_name + " ORDER BY id DESC LIMIT 1".replace("'", "`")
    mycursor.execute(query)
    mydb.commit()
    result= mycursor.fetchone()
    insertion_id= str(int(result[0]) + 1)

    return insertion_id


def store_in_database(division_id, generator_type, day, timestamp, value):
    sensor_table_name= getSensorsTable(division_id)

    insertion_id= getNextInsertionId(sensor_table_name) 

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")

    day_date = datetime.strptime(day, '%Y-%m-%d')
    timestamp_date = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S')

    day = datetime.strftime(day_date, '%Y-%m-%d')
    timestamp = datetime.strftime(timestamp_date, '%Y-%m-%d %H:%M:%S')
    
    #query= '''INSERT INTO %s (dia, stamp, tipo, valor, id_div) VALUES (%s,%s,%s,%s,%s)''', (sensor_table_name, day, timestamp, generator_type, value, division_id)
    #print(query)
    mycursor.execute('''INSERT INTO ''' + sensor_table_name +  ''' (dia, stamp, tipo, valor, id_div) VALUES (%s,%s,%s,%s,%s)''', (day, timestamp, generator_type, value, division_id))
    mydb.commit()


def callback(ch, method, properties, body):
    body= body.decode("utf-8")
    print(" [x] Received %r" % body)
    data= decode_msg(body)
    work_data(data)

    ch.basic_ack(delivery_tag=method.delivery_tag)


def connect_to_pika():
    rabbitmq_address = os.environ.get('RABBITMQ_ADDRESS')
    rabbitmq_port = os.environ.get('RABBITMQ_PORT')
    rabbitmq_user = os.environ.get('RABBITMQ_USER')
    rabbitmq_pass = os.environ.get('RABBITMQ_PASS')

    credentials = pika.PlainCredentials(rabbitmq_user, rabbitmq_pass)
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="rmq", port=rabbitmq_port, credentials=credentials))
    channel = connection.channel()
    channel.queue_delete(queue='generators') # delete queue that was made before the worker was started

    channel.queue_declare(queue='generators', durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='generators', on_message_callback=callback)

    channel.start_consuming()


if __name__ == '__main__':
    connect_to_database()
    connect_to_pika()
