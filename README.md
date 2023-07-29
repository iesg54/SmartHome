# SMART HOME

Smart Home is a web app developed to provide users with the ability to monitor and manage the sensors and devices they have installed in their smart home. In particular, it's able to monitor values of variables such as the temperautre, humidity and CO levels in different division of the house, as well as control different devices, such as the AC, lights, etc. SmartHome also allows the control of resources improtant for the Home, such as the energy used in each division by each equipment.Besides this, another main feature of the app is the notification of the user about the state of their home along the day, in particular the existance of alerts in the case when the associated sensors measure unusual or unexpected values.

## TEAM

- [Artur Correia (DevOps Master)](https://github.com/afarturc) (art.afo@ua.pt)
- [Bruna Simões (Architect)](https://github.com/Brums21) (brunams21@ua.pt)
- [Daniel Carvalho (Team Manager)](https://github.com/danielfcarvalho) (dl.carvalho@ua.pt)
- [Diogo Alves (Product Owner)](https://github.com/DiogoAlves002) (diogoasilva@ua.pt)

Everyone is in the developer team!

## IMPORTANT LINKS

- [JIRA Project Board](https://ies-smarthome.atlassian.net/jira/software/projects/SMAR/boards/1)
- [API Documentation](https://documenter.getpostman.com/view/24060738/2s8Z6yXYY5)
- [Reports and Presentations](https://github.com/iesg54/IES_Proj_G54/tree/main/reports)
- [Demo](https://uapt33090-my.sharepoint.com/:v:/g/personal/art_afo_ua_pt/EWlbYyi2DRNErx9k-f7ropsB3yGhGPqZEFlYhvxfBSLhsA?e=b2PIoy)

## HOW TO RUN SMARTHOME LOCALLY

1. Install [Docker Compose](https://docs.docker.com/compose/) 
2. Run, in the root of the project:

```
docker compose up
```

3. After all the containers have started up, and are running, open the project in the following URL:
    - http://localhost:3000
    
4. In order to test all the functionalities of the app, log into an already existing account with historical data associated with it in the database:
    - Email: alberto.matias000@gmail.com
    - Pass: admin
Or just register a new account.
    
## HOW TO RUN SMARTHOME IN THE VIRTUAL MACHINE

1. Access the project folder

```
cd proj/IES_Proj_G54
```

2. Run the containers:

```
docker compose up
```

3. After the containers have started, we can open the project outside the virtual machine, using the URL:
    - http://192.168.160.238:3000/


4. In order to test all the functionalities of the app, log into an already existing account with historical data associated with it in the database:
    - Email: alberto.matias000@gmail.com
    - Pass: admin
Or just register a new account.

NOTE: The version available on the VM is located in the VM_Branch of this repository. The only difference to the version in the main branch is the use of different addresses for contacting the API in the frontend's files (as the VM machine has it's own IP)
