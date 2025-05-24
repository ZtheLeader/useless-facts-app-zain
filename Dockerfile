FROM node:20-alpine AS builder

# Set the working directory inside the container for subsequent commands
WORKDIR /app

# Copy package.json and package-lock.json to the working directory.
COPY package.json package-lock.json ./

# Install project dependencies. 'npm ci' is preferred for CI/CD and clean installs.
# '--force' bypasses peer dependency warnings if they occur.
RUN npm ci --force

# Copy the rest of the application source code into the working directory
COPY . .

# Build the Angular application for production.
# 'npm run build' executes 'ng build' from package.json.
# '--configuration=production' ensures a production-optimized build using environment.prod.ts.
# Angular CLI's default output path is dist/<project-name>/browser.
RUN npm run build -- --configuration=production

# --- Stage 2: Serve the application with Nginx ---
# Use a lightweight Nginx image as the base for the final serving container
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file into the container.
# This configures Nginx to serve your Single Page Application (SPA).
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx HTML content to ensure a clean copy of our Angular app
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular application from the 'builder' stage to Nginx's web root.
# The path /app/dist/useless-facts-app-zain/browser is the default output path
# inside the builder stage, reflecting your project's name.
COPY --from=builder /app/dist/useless-facts-app-zain/browser /usr/share/nginx/html

# Expose port 80, which is where Nginx listens for incoming connections inside the container.
EXPOSE 80

# Define the command that runs when the container starts.
# 'nginx -g "daemon off;"' keeps Nginx running in the foreground.
CMD ["nginx", "-g", "daemon off;"]
