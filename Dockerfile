FROM node:18-slim

WORKDIR /app

COPY Backend ./Backend
COPY Frontend ./Frontend

RUN cd Backend && npm install
RUN cd Frontend && npm install

EXPOSE 3000
EXPOSE 5173

COPY start.sh .

RUN chmod +x start.sh

CMD ["./start.sh"]
