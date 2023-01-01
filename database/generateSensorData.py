# This is a sample Python script.
import random
from datetime import date, timedelta
import sys


# coeficient of temperature deviation by hour
# 0 - 3 am cold af
# 3 - 6 am
# 6 - 9 pm
# 9 - 12 pm
# 12 - 15 pm hot af
# 15 - 18 pm
# 18 - 21 pm
# 21 - 24 pm
coefficients = [-3, -2, -1, 1, 2, 1, 0, -2]


def temperature_by_hour(base, hour, coefficients):
    hour = hour % 24
    index = hour // 3

    coeficient = coefficients[index]
    i = random.randint(0, 10) / 10

    temp_hour = base + coeficient + coeficient * i

    return temp_hour


def all_temperatures_by_hour(base_temperature):
    temperatures = []
    for hour in range(0, 24):
        temperature_hour = temperature_by_hour(base_temperature, hour, coefficients)

        temperatures.append(temperature_hour)
    return temperatures


def all_temperatures_humidities_by_minute(base_temperature, temperatures, id_div, simulatedDays=7):
    original_stdout = sys.stdout

    if id_div == 1:
        tabela = "sensor_measurements_sala"
    elif id_div == 2:
        tabela = "sensor_measurements_cozinha"
    elif id_div == 3:
        tabela = "sensor_measurements_externo"
    else:
        tabela = "sensor_measurements_quarto"

    file = "historical_data.sql"

    with open(file, "a") as f:
        sys.stdout = f

        today = date.today()
        today -= timedelta(days=simulatedDays)
        for i in range(0, simulatedDays):
            if i != 0:
                today += timedelta(days=1)
            for hour in range(0, 24):
                temperature_hour = temperatures[hour]


                temp = temperature_hour + random.randint(0, 10) / 50

                humidity = base_temperature + (base_temperature - temperature_hour) + random.randint(0, 10) / 50

                h= hour,
                if hour < 10:
                    h = f'0{hour}'
                else:
                    h = f'{hour}'

                timestamp = f'{today} {h}:00:00'  # 'YYYY-MM-DD hh:mm:ss'

                print('INSERT INTO {} (stamp, tipo, valor, id_div, dia) VALUES ("{}", "{}", {}, {}, "{}");'.format(tabela, timestamp, "temperatura", temp, id_div, today))
                print('INSERT INTO {} (stamp, tipo, valor, id_div, dia) VALUES ("{}", "{}", {}, {}, "{}");'.format(tabela,
                      timestamp, "humidade", humidity, id_div, today))


    sys.stdout = original_stdout


def main():
    base_temperature = random.randint(10, 20)  # random every day
    temps_by_hour = all_temperatures_by_hour(base_temperature)
    for i in range(1,5):
        id_div = i
        all_temperatures_humidities_by_minute(base_temperature, temps_by_hour, id_div)


if __name__ == '__main__':
    main()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
