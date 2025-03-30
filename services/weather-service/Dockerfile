FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy rest of the code (API + frontend)
COPY . .

# Expose app port
EXPOSE 4000

# Start the app
CMD ["node", "index.js"]
