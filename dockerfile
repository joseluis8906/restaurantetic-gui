#########################
### build environment ###
#########################

# base image
FROM node:8.12.0-alpine as builder

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli --unsafe

# add app
COPY . /usr/src/app

# start app
#CMD ng serve --host 0.0.0.0
RUN ng build --prod

##################
### production ###
##################

# base image
FROM nginx:1.15.5-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# expose port 8080
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
