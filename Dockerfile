FROM node:12-alpine AS builder

WORKDIR /app

ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST}

COPY ./package*.json ./
RUN yarn install --production=true

COPY ./ .
RUN yarn build

FROM nginx:stable AS release

ARG SERVER_HOST
ENV SERVER_HOST=${SERVER_HOST}

ARG SERVER_HOST_NAME
ENV SERVER_HOST_NAME=${SERVER_HOST_NAME}

ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST}

#RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY --from=builder /app/nginx.config /etc/nginx/nginx.template

#COPY --from=build /usr/src/app/default.conf /etc/nginx/conf.d/

COPY --from=builder /app/certs/server.cert /etc/httpd/conf/ssl.crt/
COPY --from=builder /app/certs/server.key /etc/httpd/conf/ssl.key/

CMD [ "/bin/sh", "-c", "envsubst '${SERVER_HOST},${SERVER_HOST_NAME}' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

EXPOSE 443
