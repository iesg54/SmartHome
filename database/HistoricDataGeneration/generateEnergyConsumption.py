import random
from datetime import date, timedelta
import sys


def all_energy_by_day(id_div, days=60):
    original_stdout = sys.stdout

    if id_div == 1:
        tabela = "consumo_sala"
        min = 600
        max = 3000
    elif id_div == 2:
        tabela = "consumo_cozinha"
        min = 600
        max = 3000
    elif id_div == 3:
        tabela = "consumo_externo"
        min = 200
        max = 1500
    else:
        tabela = "consumo_quarto"
        min = 200
        max = 1500

    file = "historical_data.sql"

    with open(file, "a") as f:
        sys.stdout = f

        today = date.today()
        today -= timedelta(days=days)
        for i in range(0, days):
            if i != 0:
                today += timedelta(days=1)

            value = random.randint(min,max)
            timestamp = f'{today} 21:00:00'  # 'YYYY-MM-DD hh:mm:ss'

            print('INSERT INTO {} (dia, stamp, valor, id_div) VALUES ("{}", "{}", {}, {});'.format(tabela, today, timestamp, value, id_div))

    sys.stdout = original_stdout


def main():
    for i in range(1, 5):
        id_div = i
        all_energy_by_day(id_div)


if __name__ == '__main__':
    main()

