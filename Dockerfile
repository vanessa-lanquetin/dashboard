FROM alpine:3.18
WORKDIR /app
RUN apk --no-cache add nodejs npm yarn gcc g++ make python3
COPY ./server .
RUN rm -rf .git && rm -rf node_modules && npm i --production
CMD ["node", "bin/www"]