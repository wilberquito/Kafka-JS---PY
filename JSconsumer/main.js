import { Kafka } from 'kafkajs'
import { readFileSync } from 'fs'

const data = readFileSync('../settings.json')
const settings = JSON.parse(data);

const socket = settings.socket;
const groupId = settings.groupId;
const topic = settings.topic;

const kafka = new Kafka({ brokers: [socket] })

const consumer = kafka.consumer({ groupId: groupId })

async function daemon() {
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
        autoCommit: 1,
        eachMessage: async ({ message }) => {
            console.log({
                date: new Date(),
                value: message.value.toString(),
            })
        },
    })
}

daemon();


