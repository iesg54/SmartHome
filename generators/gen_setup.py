
import mysql.connector
import time
import os
import random
from multiprocessing import Process




def connectToDatabase():
    global mydb
    mydb = mysql.connector.connect(
        user="springuser",
        password="Password1#",
        host="localhost",
        database= "smarthome"
    )


def checkForNewGenerators():
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE smarthome")
    mycursor.execute("SELECT * FROM generators")
    mydb.commit()
    generators_needed = mycursor.fetchall()
    
    return generators_needed


def removeGeneratorFromDatabase(generator_id):
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE smarthome")
    mycursor.execute("DELETE FROM generators WHERE id = %s", (generator_id, ))
    mydb.commit()


def setupGenerator(generator):
    generator_type= generator[1] # --------TODO check with database

    if generator_type == 1: # temperature and humidity
        generator_type= "temp_hum_gen_class.py"
        arguments= str(generator[2]) # division_id
        
    elif generator_type == 2: # air quality
        generator_type= "air_quality_gen_class.py"
        arguments= ''

    else:
        print("[ERROR] Generator type not supported!")
        return

    Process(target=startGenerator, args=(generator_type, arguments)).start()


def startGenerator(generator_type, arguments):
    print("Starting generator: " + generator_type)
    os.system('python3 ' + generator_type +  ' ' + arguments)




def main():
    connectToDatabase()

    generators_needed= []
    while True:
        while not generators_needed:
            generators_needed= checkForNewGenerators()
            time.sleep(5)
            print("so am I, still waiting")
        print("omg stuff!")

        for generator in generators_needed:
            setupGenerator(generator)

            removeGeneratorFromDatabase(generator[0])
            generators_needed.remove(generator)



if __name__ == "__main__":
    main()