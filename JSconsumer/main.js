import { Kafka } from 'kafkajs'
import { readFileSync } from 'fs'

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
    await consumer.subscribe({ topic: topic })

    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log({
                date: new Date(),
                message: message.value.toString(),
                offset: message.offset
            })
        },
    })
}

daemon();


