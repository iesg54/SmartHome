import pika


def co2_by_minute(current_co2):
    co2_values= []
    for i in range(0, 60):
        current_co2= get_value_co2(current_co2)

        co2_values.append(current_co2)

    return co2_values



def get_value_co2(current_co2):
    if current_co2 < 35: # 98% of the time
        current_co2= current_co2 + random.randint(0, 10)
    elif current_co2 < 50: # 1% of the time
        current_co2= current_co2 + random.randint(-10, 10)
    elif current_co2 < 100: # 0.01% of the time
        current_co2= current_co2 + random.randint(-10, 0)
    elif current_co2 < 200: # 0.005% of the time
        current_co2= current_co2 + random.randint(-10, 0)
    elif current_co2 < 500: # 0.001% of the time
        current_co2= current_co2 + random.randint(-10, 0)   
    elif current_co2 < 1200: # 0.0001% of the time
        current_co2= current_co2 + random.randint(-10, 0)
    else: # 0.00001% of the time
        current_co2= current_co2 + random.randint(-10, 0)
    return current_co2










def connect_to_broker():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    
    channel = connection.channel()
    channel.queue_declare(queue='air_quality_queue', durable=True)

    return channel




def main():


    channel= connect_to_broker()

    generation_id= 1
    generator_type= 1

    while(True):
        base_temperature= random.randint(10, 20) # random every day

        temps_by_hour= all_temperatures_by_hour(base_temperature)

        all_temperatures_humidities_by_minute(base_temperature, temps_by_hour, channel, generation_id, generator_type)





if __name__ == '__main__':
    main()
