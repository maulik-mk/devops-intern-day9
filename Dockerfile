FROM node:18 AS frontend
WORKDIR /frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend .
RUN npm run build

FROM node:18
WORKDIR /app

COPY Backend/package*.json ./Backend/
RUN npm install --prefix ./Backend
COPY Backend ./Backend

COPY --from=frontend /frontend/dist ./Backend/src/public

ENV PORT=10000
EXPOSE 10000

CMD ["node", "Backend/app.js"]
