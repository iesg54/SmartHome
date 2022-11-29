import random
import matplotlib.pyplot as plt
import numpy as np



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



def all_temperatures_by_minute(temperatures):
    all_temperatures= []
    for hour in range(0, 24):
        temp_min= []
        temperature_hour= temperatures[hour]
        next_temperature_hour= temperatures[(hour + 1) % 24]
        temperatures_minute= temperature_by_minute(temperature_hour, next_temperature_hour)
        
        for t in temperatures_minute:
            temp_min.append(t + random.randint(0, 10)/50)
            #------------------------------------------------------------------ TODO send to broker here
        all_temperatures += temp_min
        #all_temperatures += temperatures_minute # slightly less random but faster
       
    return all_temperatures





def main():

    base_temperature= random.randint(10, 20) # random every day

    temps_by_hour= all_temperatures_by_hour(base_temperature)

    temps_by_minute= all_temperatures_by_minute(temps_by_hour)

    plt.plot (temps_by_minute, 'ro')
    plt.show()

    # right now its just showing in a graph 
    # TODO send to message broker

if __name__ == '__main__':
    main()