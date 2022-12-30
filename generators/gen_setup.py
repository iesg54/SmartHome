
import mysql.connector
import time
import os
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


def cleanUpDatabase():
    """clean sensors table to prevent conflicts when users close the app whithout logging out"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE smarthome")
    mycursor.execute("DELETE * FROM generators")
    mydb.commit()


def checkIfTableExists():
    """ returns True if the generators table exists, False otherwise"""

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE smarthome")
    mycursor.execute("SHOW TABLES LIKE 'generators'")
    mydb.commit()
    return bool(mycursor.fetchall())


def removeGeneratorFromDatabase(generator_id):
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("USE smarthome")
    mycursor.execute("DELETE FROM generators WHERE id = %s", (generator_id, ))
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

    generators_needed= []
    while True:
        while not generators_needed:
            if not checkIfTableExists():
                finish= True #---------------TODO also stop generators
                break

            generators_needed= checkForNewGenerators()
            time.sleep(5)
            """ print("so am I, still waiting")
        print("omg stuff!") """

        for generator in generators_needed:
            setupGenerator(generator)

            removeGeneratorFromDatabase(generator[0])
            generators_needed.remove(generator)

        if finish:
            break



if __name__ == "__main__":
    main()