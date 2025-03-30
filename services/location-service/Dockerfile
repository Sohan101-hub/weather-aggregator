# Use official Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
