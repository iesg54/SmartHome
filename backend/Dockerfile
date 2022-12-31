FROM python:3.10-slim

RUN pip install --upgrade pip

WORKDIR /data
COPY . .


RUN pip install -r requirements.txt

CMD ["python3", "server.py"]
