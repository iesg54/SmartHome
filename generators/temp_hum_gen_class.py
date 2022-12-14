import sys
import random
import time
import pika
import numpy as np


class temp_humi_gen:
    def __init__(self, division_id, temp_base, sleep_time_seconds):
        
        #self.rabbitmq_address = os.environ.get('RABBITMQ_ADDRESS')
        #self.rabbitmq_port = os.environ.get('RABBITMQ_PORT')
        #self.rabbitmq_user = os.environ.get('RABBITMQ_USER')
        #self.rabbitmq_pass = os.environ.get('RABBITMQ_PASSWORD')


        if not temp_base:
            temp_base = random.randint(10, 20)
        self.temp_base = temp_base
        self.sleep_time_seconds = sleep_time_seconds
        self.division_id = division_id
        self.type= "temp_hum"

        #coeficient of temperature deviation by hour
        # 0 - 3 am cold af
        # 3 - 6 am
        # 6 - 9 pm
        # 9 - 12 pm
        # 12 - 15 pm hot af
        # 15 - 18 pm
        # 18 - 21 pm
        # 21 - 24 pm
        self.coefficients= [-3, -2, -1, 1, 2, 1, 0, -2]


    def temperature_by_hour(self, hour):
        hour = hour % 24
        index= hour // 3

        coeficient= self.coefficients[index]
        i= random.randint(0, 10)/10

        temp_hour= self.temp_base + coeficient + coeficient * i

        return temp_hour

    def temperature_by_minute(self, temperature_hour, next_temperature_hour):
        temps= np.linspace(temperature_hour, next_temperature_hour, 60)

        return list(temps)


    def all_temperatures_by_hour(self):
        temperatures= []
        for hour in range(0, 24):

            temperature_hour= self.temperature_by_hour(hour)

            temperatures.append(temperature_hour)
        return temperatures



    def all_temperatures_humidities_by_minute(self, temperatures, channel):
        for hour in range(0, 24):
            temperature_hour= temperatures[hour]
            next_temperature_hour= temperatures[(hour + 1) % 24]
            temperatures_minute= self.temperature_by_minute(temperature_hour, next_temperature_hour)
            
            minute= 0
            for t in temperatures_minute:
                temp= t + random.randint(0, 10)/50

                humidity= self.temp_base + (self.temp_base - t) + random.randint(0, 10)/50

                h, m= hour, minute
                if hour < 10:
                    h= f'0{hour}'
                if minute < 10:
                    m= f'0{minute}'
                timestamp= f'2022-12-06 {h}:{m}:00' # 'YYYY-MM-DD hh:mm:ss'


                jsonMessage= f'{{"division_id": {self.division_id}, "type": {self.type}, "timestamp": "{timestamp}", "humidity": {humidity}, "temperature": {temp}}}'

                # sending to broker
                channel.basic_publish(
                    exchange='',
                    routing_key='temperature_humidity_queue',
                    body=jsonMessage,
                    properties=pika.BasicProperties(
                        delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
                    ))
                print(" [x] Sent %r" % jsonMessage)

                time.sleep(self.sleep_time_seconds)
                minute+= 1
                #generation_id+= 1

        


    def connect_to_broker(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        
        channel = connection.channel()
        channel.queue_declare(queue='temperature_humidity_queue', durable=True)

        return channel





    def run(self):

        channel= self.connect_to_broker()


        while(True):

            temps_by_hour= self.all_temperatures_by_hour()

            self.all_temperatures_humidities_by_minute(temps_by_hour, channel)


def parseArgs(argv):
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", argv)
    division_id= argv[1]
    if len(argv) > 2:
        temp_base= argv[2]
        if len(argv) > 3:
            sleep_time= argv[3]
        else:
            sleep_time= 1
    else:
        temp_base= None
        sleep_time= 1

    return division_id, temp_base, sleep_time



if __name__ == "__main__":
    
    division_id, temp_base, sleep_time= parseArgs(sys.argv)

    gen=temp_humi_gen(division_id, temp_base, sleep_time) 
    
    gen.run()