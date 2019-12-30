FROM node
COPY . /app
WORKDIR /app
RUN yarn install
RUN npm run build
RUN npm install -g serve
CMD serve -s build -l 80
EXPOSE 80
