FROM nginx

ARG SERVER_HOST
ARG REACT_APP_BACKEND_HOST

ENV SERVER_HOST=${SERVER_HOST}
ENV REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST}

COPY build/ /usr/share/nginx/html/
COPY localnginx.config /etc/nginx/nginx.template

EXPOSE 80

CMD [ "/bin/sh", "-c", "envsubst '${SERVER_HOST}' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
