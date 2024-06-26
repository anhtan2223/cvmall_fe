FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY ./ .
RUN yarn build --mode Development

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf