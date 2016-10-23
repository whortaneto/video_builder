#!/usr/bin/env bash

# Project main page:
# http://4c-video-builder.tk/index.html

# Project API:
# http://4c-video-builder.tk:9000/api/lessons

# If necessary access the server just run:
# ssh -i ~/.ssh/4c.pem ubuntu@52.67.125.122


# Remove the content of ROOT folder
ssh -o "StrictHostKeyChecking no" -i ~/.ssh/4c.pem ubuntu@52.67.125.122 'cd /home/ubuntu/apache-tomcat-7.0.72/webapps/ROOT && rm -rf *'

# Copy the frontend project to ROOT folder
cd frontend
scp -i ~/.ssh/4c.pem -r * ubuntu@52.67.125.122:/home/ubuntu/apache-tomcat-7.0.72/webapps/ROOT

# Kill the node server
ssh -o "StrictHostKeyChecking no" -i ~/.ssh/4c.pem ubuntu@52.67.125.122 'fuser -n tcp -k 9000'

# Remove the node server folder content
ssh -o "StrictHostKeyChecking no" -i ~/.ssh/4c.pem ubuntu@52.67.125.122 'cd /home/ubuntu/node_server && rm -rf *'

# Zip and send the backend to Amazon EC2
cd ../backend
sudo zip -r backend.zip *
scp -i ~/.ssh/4c.pem -r backend.zip ubuntu@52.67.125.122:/home/ubuntu/node_server

# Unzip the backend
ssh -o "StrictHostKeyChecking no" -i ~/.ssh/4c.pem ubuntu@52.67.125.122 'cd /home/ubuntu/node_server && unzip backend.zip'

# Run the node server
ssh -o "StrictHostKeyChecking no" -i ~/.ssh/4c.pem ubuntu@52.67.125.122 'cd /home/ubuntu/node_server/server && node app.js &'