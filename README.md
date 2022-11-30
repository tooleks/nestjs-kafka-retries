# NestJS Kafka Retries

## Steps to reproduce

Run the following command to start Kafka broker:

```sh
docker-compose up
```

Run the following command to start NestJS application:

```sh
npm run start:dev
```

## Console output

```
The event "Hello, world!" has been received by the healthy controller.
The event "Hello, world!" has been received by the unhealthy controller.
KafkaRetriableException [Error]: The retriable exception has occurred in the unhealthy controller.
    ... stack trace ...
The event "Hello, world!" has been processed by the healthy controller.
```

## Current behavior

The `KafkaRetriableException` thrown from an event handler is not causing retries.

## Expected behavior

The `KafkaRetriableException` thrown from an event handler is propagated to Kafka's `eachMessage` to cause retries.