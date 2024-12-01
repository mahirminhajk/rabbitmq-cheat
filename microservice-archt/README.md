## Port forwarding of RABBITMQ management console
```bash
kubectl port-forward svc/rabbitmq-srv 15672:15672
```

## share folder
`share` folder is used to share files between the microservices. It is mounted to the `share` folder of the microservices.
In real world scenario, it will be a `npm package` or a git `submodule`. 

## run the microservices
[tilt install](https://docs.tilt.dev/)
```bash
# skaffold dev - replaced by tilt
tilt up
```

## Services
- order-srv
    - publish order created event
    - publish order deleted event
    - listen to payment complete event
    - listen to payment refund event
- payment-srv
    - publish payment complete event
    - publish payment refund event
    - listen to order created event
    - listen to order deleted event

## Routes
- http://192.168.49.2/ - Ingess Nginx.

`to find this url`
```bash
minikube ip
```

- http://192.168.49.2/order/create
- http://192.168.49.2/order/delete

- http://192.168.49.2/payment/complete
- http://192.168.49.2/payment/refund


## get elastic kibana access token
```bash
curl -X POST "localhost:9200/_security/service/elastic/kibana/credential/token/token1?pretty" \
-u elastic:changeme \
```