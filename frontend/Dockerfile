# Use Node.js LTS Alpine
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy only package.json and lock file first (to leverage Docker layer caching)
COPY my-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Next.js app
COPY my-app/ .

# Build the Next.js app
RUN npm run build

# Expose default Next.js port
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]
