import json
import sys
import random
import time
import pika
import numpy as np
import websocket


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

        #coeficient of temperature deviation for each 3 hours
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


    def chance_bad_value(self, type):
        if random.randint(0, 100) == 0: # very low chance
            print(type+ " demasiado baixa!")
            return 1

        elif random.randint(0, 100) == 0:
            print(type+ " demasiado alta!")
            return 2

        return 0


    def get_bad_temperature(self, type):
        if type == 1:
            return random.randint(-10, 0)
        else:
            return random.randint(30, 40)


    def send_to_broker(self, jsonMessage):
        self.channel.basic_publish(
            exchange='',
            routing_key='generators',
            body=jsonMessage,
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            )
        )


    def connect_websocket(self):
        self.ws = websocket.WebSocket()
        self.ws.connect("ws://localhost:8765")


    def check_temperature(self, temperature):
        """returns 0 if temperature is ok, 1 if temperature is too low, 2 if temperature is too high"""
        if temperature > 30:
            return 2
        elif temperature < 0:
            return 1
        return 0

    def check_humidity(self, humidity):
        """returns 0 if humidity is ok, 1 if humidity is too low, 2 if humidity is too high"""
        if humidity > 30:
            return 2
        elif humidity < 10:
            return 1
        return 0

    def get_warning(self, type, low_high):
        if type=="temperatura":
            if low_high == 1:
                warning= "Temperatura demasiado baixa!"
            else:
                warning= "Temperatura demasiado alta!"
        else:
            if low_high == 1:
                warning= "Humidade demasiado baixa!"
            else:
                warning= "Humidade demasiado alta!"
        return warning


    def warn_user(self, type, low_high, timestamp, value):
        
        warning= self.get_warning(type, low_high)

        alert_message= json.dumps({
            "type": "alert",
            "sensor": type,
            "value": value,
            "stamp": timestamp,
            "id_divisao": self.division_id,
            "mensagem": warning
        })

        self.connect_websocket()
        self.ws.send(alert_message)
        self.ws.close()


    def get_temperature_hum(self, t):
        bad_temperature = self.chance_bad_value("temperatura") # randomly make temperature too low or too high
        if bad_temperature != 0:
            temp= self.get_bad_temperature(bad_temperature)
        else:
            temp= t + random.randint(0, 10)/50

        bad_humidity = self.chance_bad_value("humidade") # randomly make humidity too low or too high
        if bad_humidity != 0:
            humidity= self.get_bad_temperature(bad_humidity)
        else:
            humidity= self.temp_base + (self.temp_base - t) + random.randint(0, 10)/50

        return temp, humidity


    def get_timestamp(self, hour, minute):
        h, m= hour, minute
        if hour < 10:
            h= f'0{hour}'
        if minute < 10:
            m= f'0{minute}'
        timestamp= f'2022-12-06 {h}:{m}:00'
        return timestamp

    def all_temperatures_humidities_by_minute(self, temperatures):
        for hour in range(0, 24):
            temperature_hour= temperatures[hour]
            next_temperature_hour= temperatures[(hour + 1) % 24]
            temperatures_minute= self.temperature_by_minute(temperature_hour, next_temperature_hour)
            
            minute= 0
            for t in temperatures_minute:

                temp, humidity= self.get_temperature_hum(t)
                
                timestamp= self.get_timestamp(hour, minute) # 'YYYY-MM-DD hh:mm:ss'
                day= timestamp.split(' ')[0]

                jsonMessage= json.dumps({
                    "division_id": self.division_id,
                    "type": self.type,
                    "day": day,
                    "timestamp": timestamp,
                    "humidity": humidity,
                    "temperature": temp,
                })

                check_temperature= self.check_temperature(temp)
                if check_temperature != 0:
                    self.warn_user("temperatura", check_temperature, timestamp, temp)

                check_humidity= self.check_humidity(humidity)
                if check_humidity != 0:
                    self.warn_user("humidade", check_humidity, timestamp, humidity)


                self.send_to_broker(jsonMessage)
                print(" [x] Sent %r" % jsonMessage)

                time.sleep(self.sleep_time_seconds)
                minute+= 1

        


    def connect_to_broker(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        
        channel = connection.channel()
        channel.queue_declare(queue='generators', durable=True)

        return channel





    def run(self):

        self.channel= self.connect_to_broker()

        while(True):

            temps_by_hour= self.all_temperatures_by_hour()

            self.all_temperatures_humidities_by_minute(temps_by_hour)


def parseArgs(argv):
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


def main():
    division_id, temp_base, sleep_time= parseArgs(sys.argv)

    gen=temp_humi_gen(division_id, temp_base, sleep_time) 
    
    gen.run()


if __name__ == "__main__":
    main()