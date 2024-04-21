# Build Step
FROM node:20-alpine

ARG REPO=https://github.com/DMBIAM/RestApiNodeJs.git

# Install git for clone repo
RUN apk --no-cache add git

# Workdir principal
WORKDIR /app

# Clone the repository where the code is located
RUN git clone $REPO .

# Establecer el directorio de trabajo en /app/rest
WORKDIR /app/rest

# Install dependencies
RUN npm install --quiet

# Expose port
EXPOSE 8000

# Accept request since any host
ENV ADDRESS=0.0.0.0 PORT=8000

# Start 
CMD ["npx", "nodemon", "index.js"]