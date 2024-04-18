# Build Step
FROM node:latest

# Workdir principal
WORKDIR /app

COPY ./rest/package.json ./rest/package-lock.json* ./

# Install dependencies
RUN npm install --quiet

# Expose port
EXPOSE 8000

# Accept request since any host
ENV ADDRESS=0.0.0.0 PORT=8000

# Start 
CMD ["npx", "nodemon", "index.js"]