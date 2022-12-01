# SMART HOME

Smart Home is a web app that focuses on giving the user the possibility to monitor (information about the temperature, humidity, CO2 levels, etc) and control (heaters, AC, windows, etc) their home optimize their confort experience. The app will also have a message system to notify the user about the state of the home along the day.

## Team

- **Team Manager**: Daniel Carvalho
- **Product Owner**: Diogo Alves
- **Architect**: Bruna Simões
- **DevOps master**: Artur Correia

Everyone is in the developer team!

## INSTALLING RABBIT MQ:

1. Instalar o rabbitmq:
```
sudo apt-get update
sudo apt-get install erlang
sudo apt-get install rabbitmq-server
```

2. Inicializar o servidor:
```
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

3. Verificar se o rabbitmq esta a correr:
```
sudo systemctl status rabbitmq-server
```


## HOW TO RUN SMARTHOME

1. Install NodeJS:
https://github.com/nvm-sh/nvm

2. Run this commands
```
cd SmartHome/
npm install
npm start
```

3. App should be available at:
https://localhost:3000
