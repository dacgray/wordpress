FROM wordpress:latest

RUN apt-get update && \
    apt-get install -y dialog apt-utils gnupg && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential && \
    curl -sSL https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
