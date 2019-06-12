docker run -it\
        --name restaurantetic-gui\
        -p 4000:4000\
        -v $HOME/Developments/restaurantetic-gui:/app\
        -d node:10.15.3-stretch

