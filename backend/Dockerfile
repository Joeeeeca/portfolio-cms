FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY pocketbase ./pocketbase
RUN chmod +x ./pocketbase

COPY pb_migrations ./pb_migrations
COPY pb_data ./pb_data

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
