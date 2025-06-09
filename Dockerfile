FROM node:18-slim

WORKDIR /app

COPY Backend ./Backend
RUN cd Backend && npm install

COPY Frontend ./Frontend
RUN cd Frontend && npm install && npm run build

RUN mkdir -p Backend/public && cp -r Frontend/dist/* Backend/public/

WORKDIR /app/Backend

EXPOSE 3000

CMD ["node", "app.js"]
