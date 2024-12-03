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

## HELM

add repo
```bash
helm repo add grafana https://grafana.github.io/helm-charts
```
update repo
```bash
helm repo update
```

search repo
```bash
helm search repo loki
```

get values to customize
```bash
helm show values grafana/loki-stack > loki-custom-values.yaml
```

install with custom values
```bash
helm upgrade --install --values loki-custom-values.yaml loki grafana/loki-stack -n grafana-loki --create-namespace
```

uninstall
```bash
helm uninstall loki -n grafana-loki
```

get rendered template
```bash
helm template loki grafana/loki-stack -n my-grafana --values loki-depl.yaml > loki-rendered.yaml
```
## LOKI-GRAFANA

get port number
```bash
kubectl get svc loki-grafana -n my-grafana  -o jsonpath="{.spec.ports[0].nodePort}"
```

get username
```bash
kubectl get secret loki-grafana -n my-grafana -o jsonpath="{.data.admin-user}" | base64 --decode
```

get password
```bash
kubectl get secret loki-grafana -n my-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```