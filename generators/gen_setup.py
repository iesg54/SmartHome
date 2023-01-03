import signal
import mysql.connector
import time
import os
from multiprocessing import Process, Pipe

def connectToDatabase():
    global mydb
    mydb = mysql.connector.connect(
        user="springuser",
        password="password",
        host="db",
        port=3306,
        database= "SmartHome",
    )


def checkForNewsensors(sensors_running):
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("SELECT * FROM sensors")
    mydb.commit()
    possible_sensors_needed = mycursor.fetchall()

    sensors_needed= []
    for sensor in possible_sensors_needed:
        if sensor in sensors_running:
            continue
        sensors_needed.append(sensor)
    
    return sensors_needed


def cleanUpDatabase():
    """clean sensors table to prevent conflicts when users close the app whithout logging out"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("DELETE * FROM sensors")
    mydb.commit()


def checkIfTableIsEmpty():
    """ returns True if the sensors table has no values, False otherwise"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("SELECT * FROM sensors")
    mydb.commit()
    return not bool(mycursor.fetchall())


def removeGeneratorFromDatabase(generator_id):
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE SmartHome")
    mycursor.execute("DELETE FROM sensors WHERE id = %s", (generator_id, ))
    mydb.commit()


def setupGenerator(generator):
    generator_type= generator[1]
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

    
def finishGenerators(running_processes):
    for process in running_processes:
        print("terminating process: ", process) 
        process.terminate()

        os.kill(process, signal.SIGINT) # ---TODO the pid (process) is not the correct one, it should be given by the child via pipe/socket
   

def main():
    connectToDatabase()

    #cleanUpDatabase() # clean sensors table to prevent conflicts when users close the app whithout logging out

    running_processes= []
    sensors_needed= []
    sensors_running= []
    finish = False
    while True:
        while not sensors_needed:
            if checkIfTableIsEmpty() and sensors_running:
                finish= True
                finishGenerators(running_processes) #---TODO fix this
                break

            sensors_needed= checkForNewsensors()
            time.sleep(5)
            """ print("so am I, still waiting")
        print("omg stuff!") """

        for generator in sensors_needed:
            running_processes= setupGenerator(generator, running_processes)
            sensors_needed.remove(generator)
            sensors_running.append(generator)

        if finish:
            print("Terminating")
            break


if __name__ == "__main__":
    main()
