import sys
import pika
import random
import numpy as np
import time
import websocket
import json
import os

class carbon_monoxide_gen:
    def __init__(self, division_id, concentration_base, sleep_time_seconds):
        
        self.rabbitmq_address = os.environ.get('RABBITMQ_ADDRESS')
        self.rabbitmq_port = os.environ.get('RABBITMQ_PORT')
        self.rabbitmq_user = os.environ.get('RABBITMQ_USER')
        self.rabbitmq_pass = os.environ.get('RABBITMQ_PASS')


        if not concentration_base:
            concentration_base = random.randint(5, 10)
        self.concentration_base = concentration_base
        self.sleep_time_seconds = sleep_time_seconds
        self.division_id = division_id
        self.type= "carbon_monoxide"

        #coeficient of carbon monoxide deviation for each 2 hours
        self.coefficients= [-1, -1, -2, -2, 0, 2, 1, 0, 0, 1, 2, 1]


    def carbon_monoxide_by_hour(self, hour):
        hour = hour % 24
        index= hour // 2

        coeficient= self.coefficients[index]
        i= random.randint(0, 10)/10

        carbon_hour= self.concentration_base + coeficient + coeficient * i

        return carbon_hour


    def carbon_monoxide_by_minute(self, carbon_monoxide_hour, next_carbon_monoxide_hour):
        carbon= np.linspace(carbon_monoxide_hour, next_carbon_monoxide_hour, 60)

        return list(carbon)


    def all_carbon_monoxide_by_hour(self):
        carbon_monoxide= []
        for hour in range(0, 24):

            carbon_monoxide_hour= self.carbon_monoxide_by_hour(hour)

            carbon_monoxide.append(carbon_monoxide_hour)
        return carbon_monoxide


    def chance_bad_value(self, type):
        if random.randint(0, 100) == 0: # very low chance
            print(type+ " demasiado alto!")
            return 1
        return 0


    def get_bad_value(self):
        return random.randint(50, 100)


    def check_monoxide(self, carbon):
        if carbon >= 50:
            return 1
        return 0


    def warn_user(self, type, timestamp, value):
        alert_message= json.dumps({
            "type": "alert",
            "sensor": type,
            "value": value,
            "stamp": timestamp,
            "id_divisao": self.division_id,
            "mensagem": "Monóxido de carbono muito alto!"
        })
        self.connect_websocket()
        self.ws.send(alert_message)
        self.ws.close()


    def get_timestamp(self, hour, minute):
        h, m= hour, minute
        if hour < 10:
            h= f'0{hour}'
        if minute < 10:
            m= f'0{minute}'
        timestamp= f'2022-12-30 {h}:{m}:00'
        return timestamp


    def all_carbon_monoxide_by_minute(self, carbon_monoxide):
        for hour in range(0, 24):
            carbon_monoxide_hour= carbon_monoxide[hour]
            next_carbon_monoxide_hour= carbon_monoxide[(hour + 1) % 24]
            carbon_monoxide_minute= self.carbon_monoxide_by_minute(carbon_monoxide_hour, next_carbon_monoxide_hour)
            
            minute= 0
            for c in carbon_monoxide_minute:
                bad_value= self.chance_bad_value("ar")
                if bad_value != 0:
                    carbon= self.get_bad_value()
                else:
                    carbon= c + random.randint(0, 10)/50

                timestamp= self.get_timestamp(hour, minute) # 'YYYY-MM-DD hh:mm:ss'
                day= timestamp.split(' ')[0]

                jsonMessage= json.dumps({
                    "division_id": self.division_id,
                    "type": self.type,
                    "day": day,
                    "stamp": timestamp,
                    "value": carbon
                })

                check_monoxide= self.check_monoxide(carbon)
                if check_monoxide:
                    self.warn_user("ar", timestamp, carbon)
                

                # sending to broker
                self.channel.basic_publish(
                    exchange='',
                    routing_key='generators',
                    body=jsonMessage,
                    properties=pika.BasicProperties(
                        delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
                    ))
                print(" [x] Sent %r" % jsonMessage)

                time.sleep(self.sleep_time_seconds)
                minute+= 1
                
        
    def connect_websocket(self):
        self.ws = websocket.WebSocket()
        self.ws.connect("ws://server:8765")


    def connect_to_broker(self):
        credentials = pika.PlainCredentials(self.rabbitmq_user, self.rabbitmq_pass)
        connection = pika.BlockingConnection(pika.ConnectionParameters(host="rmq", port=self.rabbitmq_port, credentials=credentials))
        
        channel = connection.channel()
        channel.queue_declare(queue='generators', durable=True)

        return channel


    def run(self):

        self.channel= self.connect_to_broker()


        while(True):

            carbon_by_hour= self.all_carbon_monoxide_by_hour()

            self.all_carbon_monoxide_by_minute(carbon_by_hour)


def parseArgs(argv):
    division_id= argv[1]
    if len(argv) > 2:
        carbon_base= argv[2]
        if len(argv) > 3:
            sleep_time= argv[3]
        else:
            sleep_time= 1
    else:
        carbon_base= None
        sleep_time= 1

    return division_id, carbon_base, sleep_time


def main():
    division_id, carbon_base, sleep_time= parseArgs(sys.argv)
    
    gen= carbon_monoxide_gen(division_id, carbon_base, sleep_time)

    gen.run()


if __name__ == '__main__':
    main()
