# ----------------------------- #
# Step 1: Build the application #
# ----------------------------- #

# Use the official Node.js runtime as the base image - Node 18 
FROM node:hydrogen-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy dependency packages
COPY dist/. /app/dist

# ----------------------------------------- #
# Step 2: Set up the production environment #
# ----------------------------------------- #

# Use Nginx as the production server
FROM nginx:alpine

# Copy the custom nginx conf file
COPY apps/web-app/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port for the Nginx server
EXPOSE 4000

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
