import { appendFile, readFileSync } from 'fs';
import { Kafka } from 'kafkajs';

const data = readFileSync('../settings.json')
const settings = JSON.parse(data);

const {
    socket,
    groupId,
    topic
} = settings;

const kafka = new Kafka({ brokers: [socket] })

const consumer = kafka.consumer({ groupId: groupId })

async function daemon() {
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const commit = {
                date: new Date(),
                message: message.value.toString(),
                offset: message.offset
            }
            const str = JSON.stringify(commit)
            appendFile('export.txt', str, () => console.log(commit))
            // console.log(commit)
        },
    })
}

daemon();


