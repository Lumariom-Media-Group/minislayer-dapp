FROM node:18.20.5-alpine3.21

# Create app directory
COPY . /app

WORKDIR /app

# Install app dependencies
RUN npm install

# Expose port
EXPOSE 3000

#build the app
RUN npm run build 

# Start the app
CMD ["npm", "start"]