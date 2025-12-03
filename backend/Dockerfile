FROM alpine:latest

# Install dependencies
RUN apk add --no-cache ca-certificates

# Set working directory
WORKDIR /app

# Copy PocketBase binary & data
COPY pocketbase /app/pocketbase
COPY pb_migrations /app/pb_migrations

# Expose PocketBase default port
EXPOSE 8090

# Start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
