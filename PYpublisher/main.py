from kafka import KafkaProducer
import pandas as pd

data = pd.read_json('../settings.json', orient='index')

socket = data[0].socket
topic = data[0].topic

producer = KafkaProducer(bootstrap_servers=socket)

for _ in range(100):
    future = producer.send(topic, b'Hello JS from PY, how are you doing?')
    result = future.get(timeout=60)