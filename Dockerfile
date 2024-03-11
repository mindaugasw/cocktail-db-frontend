FROM node:21-bookworm

USER node

WORKDIR /home/node/app

# tail needed to keep container running
CMD tail -f /dev/null
