## Port forwarding of RABBITMQ management console
```bash
kubectl port-forward svc/rabbitmq-srv 15672:15672
```

## share folder
`share` folder is used to share files between the microservices. It is mounted to the `share` folder of the microservices.
In real world scenario, it will be a `npm package` or a git `submodule`. 

## run the microservices
```bash
skaffold dev
```
