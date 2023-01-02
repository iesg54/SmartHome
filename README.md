# SMART HOME

Smart Home is a web app developed to provide users with the ability to monitor and manage the sensors and devices they have installed in their smart home. In particular, it's able to monitor values of variables such as the temperautre, humidity and CO levels in different division of the house, as well as control different devices, such as the AC, lights, etc. SmartHome also allows the control of resources improtant for the Home, such as the energy used in each division by each equipment.Besides this, another main feature of the app is the notification of the user about the state of their home along the day, in particular the existance of alerts in the case when the associated sensors measure unusual or unexpected values.

## Team

- **Team Manager**: Daniel Carvalho
- **Product Owner**: Diogo Alves
- **Architect**: Bruna Simões
- **DevOps Master**: Artur Correia

Everyone is in the developer team!

## IMPORTANT LINKS

- [JIRA Project Board](https://ies-smarthome.atlassian.net/jira/software/projects/SMAR/boards/1)
- [API Documentation](https://documenter.getpostman.com/view/24060738/2s8Z6yXYY5)
- [Reports and Presentations](https://github.com/iesg54/IES_Proj_G54/tree/main/reports)

## HOW TO RUN SMARTHOME LOCALLY

1. Install [Docker Compose](https://docs.docker.com/compose/) 
2. Run, in the root of the project:

```
docker compose up
```

3. After all the containers have started up, and are running, open the project in the following URL:
    - http://localhost:3000
    
# HOW TO RUN SMARTHOME IN THE VIRTUAL MACHINE

#1. Access project folder

```
cd proj/IES_Proj_G54
```

#2. Run the containers:

```
docker compose up
```

#3. After the containers have started, we can open the project outside the virtual machine, using the URL:
    - http://192.168.160.238:3000/


4. In order to test all the functionalities of the app, log into an already existing account with historical data associated with it in the database:
    - Email: alberto.matias000@gmail.com
    - Pass: admin
Or just register a new account.
