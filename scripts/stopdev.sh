#!/bin/bash

echo "Stopping development..."

sudo screen -S Frontend -X quit
sudo screen -S Backend -X quit
