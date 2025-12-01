const { Kafka } = require('kafkajs');

async function runConsumer() {
  const kafka = new Kafka({
    clientId: 'my-consumer',
    brokers: ['localhost:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'test-group' });

  console.log("Connecting consumer...");
  await consumer.connect();
  console.log("Consumer connected!");

  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

runConsumer().catch(console.error);
