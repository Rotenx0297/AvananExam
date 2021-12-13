FROM node:latest
WORKDIR /AvananExam
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY ["server.js", "./"]
CMD [ "node", "server.js" ]
EXPOSE 80