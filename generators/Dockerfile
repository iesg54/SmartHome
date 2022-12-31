FROM python:3.10-slim

RUN pip install --upgrade pip

WORKDIR /data
COPY . .

RUN pip install -r requirements.txt

#RUN chmod +x wait-for-it.sh

#ENTRYPOINT [ "/bin/bash", "-c" ]
#CMD ["./wait-for-it.sh" , "db:3306" , "--strict" , "--timeout=300" , "--" , "RUN ./run.sh"]
