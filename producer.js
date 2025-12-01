const { Kafka } = require('kafkajs');

async function runProducer() {
  const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer();

  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer connected!");

  const message = {
    value: "Hello from Node.js Kafka Producer!"
  };

  await producer.send({
    topic: 'test-topic',
    messages: [message],
  });

  console.log("Message sent:", message.value);

  await producer.disconnect();
}

runProducer().catch(console.error);
