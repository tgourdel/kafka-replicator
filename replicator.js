// Variables
const SOURCE = process.env.SOURCE || "";
const DESTINATION = process.env.DESTINATION || "";
const TOPIC = process.env.TOPIC || "";
const TIMER = process.env.TIMER || 15000;
const GROUPID = process.env.GROUPID || "";

// Modules
var kafka = require('kafka-node');
const utf8 = require('utf8');
const avro = require('avsc');

// Clients
var Consumer = kafka.Consumer;
var Producer = kafka.Producer;
var Client = kafka.KafkaClient;
client_source = new Client({kafkaHost: SOURCE});
client_destination = new Client({kafkaHost: DESTINATION});

// Consumer
consumer = new Consumer(
    client_source,
    [
        { topic: TOPIC, partition: 0 }
    ],
     {
         autoCommit: true,
         encoding: 'buffer',
         groupId: GROUPID
     }
);

// Producer
var producer = new Producer(client_destination, { requireAcks: 1 });

producer.on('ready', function () {
    consumer.on('message', function (message) {

            producer.send([
              { topic: TOPIC, partition: 0, messages: [message.value], attributes: 0 }
            ], function (err, result) {
              console.log(err || result);
              // process.exit();
            });
    })

    consumer.on('error', function (err) {
      console.log('error', err);

      setTimeout(process.exit(), TIMER);
    });


})

producer.on('error', function (err) {
  console.log(err);
  setTimeout(process.exit(), TIMER);
})



