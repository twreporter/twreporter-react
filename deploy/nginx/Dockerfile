FROM nginx:1.30.6

COPY nginx.conf /etc/nginx/nginx.conf
COPY react-proxy.conf /etc/nginx/react-proxy.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
