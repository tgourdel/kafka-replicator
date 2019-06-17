# Kafka Replicator

This little application allows you to replicate a Kafka topic to another cluster. Basically it creates a consumer on a source Kafka cluster and then creates a producer to the destination Kafka cluster. 

# Running it

## Parameters

SOURCE : Kafka Bootstrap servers from cluster source (list comma delimited)
DESTINATION : Kafka Bootstrap servers from cluster destination (list comma delimited)
TOPIC : topic to replicate (the name will be the same on source and desitnation end)
TIMER : time in ms before the script exits (when a Kafka cluster is down for example)
GROUPID : consumer group id


## Run with Docker

`docker run -d -e SOURCE=my_source_host:9092 -e DESTINATION=my_dest_host:9092 -e TOPIC=myotpic -e GROUPID=mygroupid tgourdel/kafka-replicator`

## Run with npm

`npm install` the first time
then `npm start`

# Build it

## Docker

`docker build -t tgourdel/kafka-replicator .`
