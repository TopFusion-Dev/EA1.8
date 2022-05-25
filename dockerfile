
FROM mhart/alpine-node:14.15.4
WORKDIR /usr/src/app
RUN npm install pm2 -g
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

ADD . /usr/src/app
# RUN npm run build
EXPOSE 3001
CMD ["npm","start"]


# # Dockerfile
# # 1st Stage
# FROM mhart/alpine-node:14.15.4 AS builder
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build
#
#
# # 2nd Stage
# FROM nginx:1.14.2-alpine
# COPY --from=0 /usr/src/app/build /usr/share/nginx/html
# WORKDIR /usr/share/nginx/html
#
# expose 80
# # EXPOSE 3001
# CMD ["nginx", "-g", "daemon off;"]
