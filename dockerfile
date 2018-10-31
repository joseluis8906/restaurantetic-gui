#########################
### build environment ###
#########################

# base image
FROM node:8.12.0-alpine as builder

# set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli --unsafe

# add app
COPY . /app

# start app
#CMD ng serve --host 0.0.0.0
RUN ng build --prod

##################
### production ###
##################

# base image
FROM nginx:1.15.5-alpine

# copy artifact build from the 'build environment'
RUN mkdir -p /usr/share/nginx/html/restaurantetic
COPY --from=builder /app/dist/* /usr/share/nginx/html/restaurantetic
COPY --from=builder /app/restaurantetic.conf /etc/nginx/conf.d

# expose port 8080
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
