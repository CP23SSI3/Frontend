# Stage 1: Build the Node.js application
FROM node:18.6 AS build

ENV API_URL=/api/v1/
ENV KEY_API_GOOGLE_MAP=AIzaSyD6ZM0YIEty5m93gpjqkwV6wc7s9rzh7fM

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
ADD . .

# Install the application dependencies
RUN yarn install

# Copy the source code
ADD . .

ENV HOST=0.0.0.0
# Expose the port on which your Node.js application listens
EXPOSE 3000

# Start the Node.js application
RUN yarn build

CMD [ "yarn", "start" ]


