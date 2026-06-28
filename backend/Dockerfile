# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port for API
EXPOSE 4000

# Start backend
CMD ["npm", "run" , "dev"]
