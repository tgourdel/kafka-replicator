FROM node:carbon-slim

ADD replicator.js ./
ADD package*.json ./

ENV SOURCE ""
ENV DESTINATION ""
ENV TOPIC ""
ENV GROUPID ""
ENV TIMER 15000

RUN npm install

CMD ["npm", "start"]
