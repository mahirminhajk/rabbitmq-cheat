# Stage 1: Development
FROM node:alpine as dev

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package.json .
RUN npm install --only=production

# copy the entire project
COPY . .

# start the application in development mode
CMD ["npm", "run", "dev"]

# Stage 2: Production
FROM node:alpine as prod

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package.json .
RUN npm install --only=production

# copy the entire project
COPY . .

# build the application
RUN npm run build

# start the application in production mode
CMD ["npm", "start"]