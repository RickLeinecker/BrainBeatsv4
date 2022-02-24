#!/bin/bash

# Start MySQL
mysql.server start

# Start the backend
cd ../backend
sudo npm install
sudo screen -dm -S Backend ./startbackend.sh

# Start the frontend
cd ../frontend
sudo npm install
sudo screen -dm -S Frontend ./startfrontend.sh

# Alert the user
echo "Started the following screen sessions for the app:"
screen -ls



