FROM node:20-alpine
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
CMD ["yarn", "dev", "--port", "3000"]



