# Stage 1: Build the Node.js application
FROM node:18.6 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY . .

# Install the application dependencies
RUN yarn install

# Copy the source code
COPY . .

# Expose the port on which your Node.js application listens
EXPOSE 80

# Start the Node.js application
RUN yarn build

CMD [ "yarn", "start" ]


