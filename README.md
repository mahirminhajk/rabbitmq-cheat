# RABBITMQ CHEAT SHEET

`rabbitmq` _is a message broker that implements the Advanced Message Queuing Protocol (AMQP)._

## Run RabbitMQ using Docker

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## Connection Information

- **Host:** `localhost`
- **Port:** `5672`

```
amqp://localhost
```

management console:
```
http://localhost:15672
```
- **Username:** `guest`
- **Password:** `guest`
