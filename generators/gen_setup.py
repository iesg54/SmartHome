
import mysql.connector
import time
import os
from multiprocessing import Process

def connectToDatabase():
    global mydb
    mydb = mysql.connector.connect(
        user="springuser",
        password="password",
        host="db",
        port=3306,
        database= "SmartHome",
    )


def checkForNewsensors():
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("SELECT * FROM sensors")
    mydb.commit()
    sensors_needed = mycursor.fetchall()
    
    return sensors_needed


def cleanUpDatabase():
    """clean sensors table to prevent conflicts when users close the app whithout logging out"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("DELETE * FROM sensors")
    mydb.commit()


def checkIfTableExists():
    """ returns True if the sensors table exists, False otherwise"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("SHOW TABLES LIKE 'sensors'")
    mydb.commit()
    return bool(mycursor.fetchall())


def removeGeneratorFromDatabase(generator_id):
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("DELETE FROM sensors WHERE id = %s", (generator_id, ))
    mydb.commit()


def setupGenerator(generator):
    generator_type= generator[1] # --------TODO check with database
    division_id= str(generator[2])

    if generator_type == 1: # temperature and humidity
        generator_type= "temp_hum_gen.py"
        arguments= division_id
        
    elif generator_type == 2: # air quality
        generator_type= "carbon_monoxide_gen.py"
        arguments= division_id

    else:
        print("[ERROR] Generator type not supported!")
        return

    Process(target=startGenerator, args=(generator_type, arguments)).start()


def startGenerator(generator_type, arguments):
    print("Starting generator: " + generator_type)
    os.system('python3 ' + generator_type +  ' ' + arguments)




def main():
    connectToDatabase()

    #cleanUpDatabase() # clean sensors table to prevent conflicts when users close the app whithout logging out

    sensors_needed= []
    finish = False
    while True:
        while not sensors_needed:
            if not checkIfTableExists():
                finish= True #---------------TODO also stop sensors
                break

            sensors_needed= checkForNewsensors()
            time.sleep(5)
            """ print("so am I, still waiting")
        print("omg stuff!") """

        for generator in sensors_needed:
            setupGenerator(generator)

            removeGeneratorFromDatabase(generator[0])
            sensors_needed.remove(generator)

        if finish:
            break



if __name__ == "__main__":
    main()