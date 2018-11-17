FROM node:8.12.0-stretch

# set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli --unsafe

# install and cache app dependencies
COPY . /app
RUN npm install

# start app
RUN npm run build:ssr

EXPOSE 4000

CMD npm run serve:ssr
