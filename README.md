\# Weather Aggregator 🌤️



A small \*\*microservices platform\*\* that returns real-time weather by city name.

Two Node.js services are containerized with \*\*Docker\*\*, deployed on \*\*Kubernetes\*\*, and exposed through an \*\*NGINX Ingress\*\*.



\## Architecture



```

&#x20;                        ┌────────────────────────────┐

&#x20; Browser / curl ───────►│  NGINX Ingress (localhost) │

&#x20;                        └──────┬──────────────┬──────┘

&#x20;                      /weather │              │ /location

&#x20;                               ▼              ▼

&#x20;                ┌──────────────────┐   ┌──────────────────┐

&#x20;                │ weather-service  │   │ location-service │

&#x20;                │ Node.js · :4000  │   │ Node.js · :3000  │

&#x20;                │ API + web UI     │   │ city → lat/lon   │

&#x20;                └────────┬─────────┘   └──────────────────┘

&#x20;                         │ HTTPS

&#x20;                         ▼

&#x20;                  WeatherAPI.com

```



| Service | Port | Role | Docker image |

|---|---|---|---|

| `weather-service` | 4000 | Calls WeatherAPI.com, returns temperature, humidity and condition; serves the web UI | `sohan101/weather-service:1.5` |

| `location-service` | 3000 | Returns coordinates for a city (static demo data for now) | `sohan101/location-service:1.0` |



\## Tech stack



\- \*\*Runtime\*\*: Node.js 18 (Alpine), Express

\- \*\*Containers\*\*: Docker (one Dockerfile per service)

\- \*\*Orchestration\*\*: Kubernetes (Deployments, Services of type LoadBalancer, Ingress)

\- \*\*Routing\*\*: NGINX Ingress Controller

\- \*\*External API\*\*: \[WeatherAPI.com](https://www.weatherapi.com/)



\## Project structure



```

weather-aggregator/

├── services/

│   ├── weather-service/      # API + frontend (public/index.html)

│   │   ├── Dockerfile

│   │   └── index.js

│   └── location-service/

│       ├── Dockerfile

│       └── index.js

├── weather-deployment.yaml   # Deployment + Service (weather)

├── location-deployment.yaml  # Deployment + Service (location)

└── ingress.yaml              # NGINX Ingress routing rules

```



\## Prerequisites



\- Docker

\- A local Kubernetes cluster (Docker Desktop Kubernetes, Minikube or kind) and `kubectl`

\- NGINX Ingress Controller installed in the cluster

\- A free API key from WeatherAPI.com



\## Configuration



The weather service reads its API key from the `API\_KEY` environment variable.

The key is never stored in the code.



\## Run with Docker



```bash

\# Build the images

docker build -t sohan101/weather-service:1.5 ./services/weather-service

docker build -t sohan101/location-service:1.0 ./services/location-service



\# Run the containers

docker run -d -p 4000:4000 -e API\_KEY=<your\_api\_key> sohan101/weather-service:1.5

docker run -d -p 3000:3000 sohan101/location-service:1.0

```



\## Deploy on Kubernetes



```bash

\# 1. Set your API key in weather-deployment.yaml (env: API\_KEY)



\# 2. Deploy the services

kubectl apply -f weather-deployment.yaml

kubectl apply -f location-deployment.yaml



\# 3. Deploy the Ingress

kubectl apply -f ingress.yaml



\# 4. Check that everything is running

kubectl get pods

kubectl get svc

kubectl get ingress

```



\## Usage



\- Web UI: http://localhost:4000

\- Weather API: `curl "http://localhost:4000/weather?city=Paris"`

\- Location API: `curl "http://localhost:3000/location?city=Paris"`



Example response:



```json

{

&#x20; "location": "Paris, France",

&#x20; "temperature": "12 °C",

&#x20; "humidity": "76 %",

&#x20; "condition": "Partly cloudy",

&#x20; "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"

}

```



\## Roadmap



\- \[ ] Store the API key in a Kubernetes \*\*Secret\*\* instead of the manifest

\- \[ ] Add \*\*liveness/readiness probes\*\* and resource requests/limits

\- \[ ] Add a \*\*CI/CD pipeline\*\* (GitHub Actions) to build and push images

\- \[ ] Add monitoring with \*\*Prometheus\*\* and \*\*Grafana\*\*

\- \[ ] Make `weather-service` call `location-service` instead of using static data



\## Author



\*\*Sohanur Rahman\*\* · \[LinkedIn](https://linkedin.com/in/sorahman) · \[GitHub](https://github.com/Sohan101-hub)

