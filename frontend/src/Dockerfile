# Step 1: Use Node.js image to build the frontend
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Use Nginx to serve the built files
FROM nginx:alpine

# Copy the built files to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend service
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
