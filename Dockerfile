FROM node:lts-slim

RUN npx -y playwright@1.51.0 install --with-deps

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH=/app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY . .

# Install the dependencies in Node environment
RUN npm install