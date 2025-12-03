FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ca-certificates

# Copy PocketBase Linux binary
COPY pocketbase ./pocketbase
RUN chmod +x ./pocketbase

# Copy PB data and migrations
COPY pb_migrations ./pb_migrations
COPY pb_data ./pb_data
COPY pb_hooks ./pb_hooks

# Use Railway's dynamic port
ENV PORT=8080
EXPOSE 8080

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080", "--http-ui"]

