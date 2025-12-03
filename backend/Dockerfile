FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ca-certificates

# Copy PB binary
COPY pocketbase ./pocketbase
RUN chmod +x ./pocketbase

# Copy PB data & migrations & hooks
COPY pb_migrations ./pb_migrations
COPY pb_data ./pb_data
COPY pb_hooks ./pb_hooks

# PocketBase default port
EXPOSE 8090

# Start PB WITH dashboard UI
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--http-ui"]
