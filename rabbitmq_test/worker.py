import pika
#import time
import mysql.connector
import json

def connect_to_database():
    global mydb
    mydb = mysql.connector.connect(
    user="springuser",
    password="Password1#",
    host="localhost",
    database= "smarthome"
    )


def decode_msg(msg):
    data= json.loads(msg)
    return data


def work_data(data):
    generator_id= data['id']
    generator_type= data['type']
    timestamp= data['timestamp']
    temperature= data['temperature']
    humidity= data['humidity']
    store_in_database(generator_id, generator_type, timestamp, temperature)


def store_in_database(generator_id, generator_type, timestamp, value):
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE smarthome")
    mycursor.execute("INSERT INTO sensor_cozinha (id, timestamp, tipo, valor) VALUES (%s, %s, %s, %s)", (generator_id, timestamp, generator_type, value))
    mydb.commit()


def callback(ch, method, properties, body):
    body= body.decode("utf-8")
    print(" [x] Received %r" % body)
    data= decode_msg(body)
    work_data(data)

    #time.sleep(body.count(b'.'))
    ch.basic_ack(delivery_tag=method.delivery_tag)


def connect_to_pika():

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_delete(queue='temperature_humidity_queue') # delete queue that was made before the worker was started

    channel.queue_declare(queue='temperature_humidity_queue', durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')



    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='temperature_humidity_queue', on_message_callback=callback)

    channel.start_consuming()


if __name__ == '__main__':
    connect_to_database()
    connect_to_pika()
