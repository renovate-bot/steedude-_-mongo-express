### 本地端測試

docker-compose -f docker-compose-dev.yml up

### 伺服器上部署

docker-compose -f docker-compose-prod.yml up

docker network create shared_network
docker-compose -f dc-nginx.yml up -d
docker-compose -p app-dev --env-file dc-service-dev.env -f dc-service.yml up -d
docker-compose -p app-prod --env-file dc-service-prod.env -f dc-service.yml up -d
