# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port used by backend
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
