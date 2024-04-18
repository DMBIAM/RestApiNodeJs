# Build Step
FROM node:19
WORKDIR /app
COPY package.json .
RUN npm install

COPY /rest .

EXPOSE 8000

ENV ADDRESS=0.0.0.0 PORT=8000

CMD ["node", "app.js"]