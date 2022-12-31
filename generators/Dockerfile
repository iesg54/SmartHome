FROM python:3.10-slim

RUN pip install --upgrade pip

WORKDIR /data
COPY . .

ENV RABBITMQ_PORT=5672
ENV RABBITMQ_USER=test
ENV RABBITMQ_PASS=test

RUN pip install -r requirements.txt
RUN chmod +x run.sh
#RUN chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
#CMD ["./wait-for-it.sh" , "db:3306" , "--strict" , "--timeout=30" , "--" , "./run.sh"]
CMD ["./run.sh"]
