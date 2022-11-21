FROM node:latest

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy data
COPY . /app

# Build
RUN npm i \
    && npm run build

# Env
RUN mv .env.docker .env

# Cleanup
RUN rm -rf src

# Run
EXPOSE 3000
CMD ["node", "dist/app.js"]
