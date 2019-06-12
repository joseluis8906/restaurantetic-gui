docker run -it\
	-w /app \
	--name restaurantetic-gui\
	-p 4000:4000\
	-v $(pwd):/app\
	-d node:10.15.3-alpine