# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose any ports the app is expecting
EXPOSE 3000

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD ["npm", "run", "dev"]
