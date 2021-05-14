include .env
export $(shell sed 's/=.*//' .env)

dev-server:
	docker-compose up -d sample-postgres
	yarn dev