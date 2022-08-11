FROM node:14 as node
COPY . /app
WORKDIR /app
RUN npm install --global gulp-cli
RUN npm i
RUN npm run build


FROM webdevops/php-apache:7.3
MAINTAINER Vladimir Matiash "vm@piogroup.net"
RUN apt-get update && apt-get install -y mc
#RUN chown -R application:application /var/www
USER application:application
ENV WEB_DOCUMENT_ROOT  /var/www/html/public
ENV WEB_DOCUMENT_INDEX index.php
ENV PHP_MEMORY_LIMIT 2G
ENV PHP_UPLOAD_MAX_FILESIZE 512M
ENV PHP_POST_MAX_SIZE 512M
ENV PHP_DATE_TIMEZONE Europe/Kiev
ENV PHP_DISPLAY_ERRORS 0

WORKDIR /var/www/html/
COPY --from=node --chown=application:application /app /var/www/html/
RUN rm -f index.html
RUN composer install
USER root:root
#RUN docker-service enable cron
#RUN docker-cronjob '0 * * * * application /usr/local/bin/php /var/www/html/bin/console vauboo:property:count'
CMD supervisord

