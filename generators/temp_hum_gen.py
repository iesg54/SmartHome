import random
import time
import datetime
#import matplotlib.pyplot as plt
import numpy as np
import pika



#coeficient of temperature deviation by hour
# 0 - 3 am cold af
# 3 - 6 am
# 6 - 9 pm
# 9 - 12 pm
# 12 - 15 pm hot af
# 15 - 18 pm
# 18 - 21 pm
# 21 - 24 pm
coefficients= [-3, -2, -1, 1, 2, 1, 0, -2]

def temperature_by_hour(base, hour, coefficients):
    hour = hour % 24
    index= hour // 3

    coeficient= coefficients[index]
    i= random.randint(0, 10)/10

    temp_hour= base + coeficient + coeficient * i

    return temp_hour

def temperature_by_minute(temperature_hour, next_temperature_hour):
    temps= np.linspace(temperature_hour, next_temperature_hour, 60)

    return list(temps)


def all_temperatures_by_hour(base_temperature):
    temperatures= []
    for hour in range(0, 24):

        temperature_hour= temperature_by_hour(base_temperature, hour, coefficients)

        temperatures.append(temperature_hour)
    return temperatures



def all_temperatures_humidities_by_minute(base_temperature, temperatures, channel, generation_id, generator_type):
    for hour in range(0, 24):
        temperature_hour= temperatures[hour]
        next_temperature_hour= temperatures[(hour + 1) % 24]
        temperatures_minute= temperature_by_minute(temperature_hour, next_temperature_hour)
        
        minute= 0
        for t in temperatures_minute:
            temp= t + random.randint(0, 10)/50

            humidity= base_temperature + (base_temperature - t) + random.randint(0, 10)/50

            h, m= hour, minute
            if hour < 10:
                h= f'0{hour}'
            if minute < 10:
                m= f'0{minute}'
            timestamp= f'2022-12-06 {h}:{m}:00' # 'YYYY-MM-DD hh:mm:ss'


            jsonMessage= f'{{"id": {generation_id}, "type": {generator_type}, "timestamp": "{timestamp}", "humidity": {humidity}, "temperature": {temp}}}'

            # sending to broker
            channel.basic_publish(
                exchange='',
                routing_key='temperature_humidity_queue',
                body=jsonMessage,
                properties=pika.BasicProperties(
                    delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
                ))
            print(" [x] Sent %r" % jsonMessage)

            time.sleep(1)
            minute+= 1
            generation_id+= 1

       





def main():



    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    
    channel = connection.channel()
    channel.queue_declare(queue='temperature_humidity_queue', durable=True)


    generation_id= 1
    generator_type= 1

    while(True):
        base_temperature= random.randint(10, 20) # random every day

        temps_by_hour= all_temperatures_by_hour(base_temperature)

        all_temperatures_humidities_by_minute(base_temperature, temps_by_hour, channel, generation_id, generator_type)

    #plt.plot (temps_by_minute, 'ro')
    #plt.plot (hum_by_minute, 'bo')
    #plt.show()


if __name__ == '__main__':
    main()