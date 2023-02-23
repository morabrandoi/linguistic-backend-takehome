FROM node:19.6.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
# If you are building your code for production
# RUN npm ci --only=production
RUN npx prisma db push && npx prisma db seed && npx prisma generate

EXPOSE 3000
EXPOSE 5555

CMD npm run start & npx prisma studio