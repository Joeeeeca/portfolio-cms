FROM alpine:latest

# Set working directory
WORKDIR /app

# Install certificates for HTTPS
RUN apk add --no-cache ca-certificates

# Copy PocketBase binary
COPY pocketbase ./pocketbase

# Make PocketBase executable
RUN chmod +x ./pocketbase

# Copy data + migrations (optional but recommended)
COPY pb_migrations ./pb_migrations
COPY pb_data ./pb_data

# Expose PocketBase API port
EXPOSE 8090

# Start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
