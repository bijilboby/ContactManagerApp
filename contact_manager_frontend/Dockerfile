# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy rest of the frontend code
COPY . .

# Expose the port Vite uses
EXPOSE 5137

# Run the Vite development server
CMD ["npm", "run", "dev"]
