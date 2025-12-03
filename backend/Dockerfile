FROM alpine:3.18

# Install certificates for HTTPS
RUN apk add --no-cache ca-certificates

# Create app directory
WORKDIR /app

# Copy PocketBase binary + migrations
COPY pocketbase /app/pocketbase
COPY pb_migrations /app/pb_migrations

# Expose default PocketBase port
EXPOSE 8090

# Run PocketBase
CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]
