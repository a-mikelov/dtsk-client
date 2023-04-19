include .env

export SERVER_IP \
       API_PORT \
       DOCKER_ACCOUNT \
       PROJECT_NAME \
       PROJECT_VERSION \
       SSH_KEY_PATH

dev:
	docker-compose -f docker-compose.yml up -d

down:
	docker-compose down

build:
	docker build -t ${DOCKER_ACCOUNT}/${PROJECT_NAME}:${PROJECT_VERSION} -f Dockerfile.prod .

prod:
	docker run -p 4200:80 --rm -d --name ${PROJECT_NAME} ${DOCKER_ACCOUNT}/${PROJECT_NAME}:${PROJECT_VERSION}

copy-to-vps:
	scp -i ${SSH_KEY_PATH} #any-file root@${SERVER_IP}:/root/${PROJECT_NAME}

connect-to-vps:
	ssh -i ${SSH_KEY_PATH} root@${SERVER_IP}

copy-id:
	pbcopy < ~/.ssh/id_rsa.pub