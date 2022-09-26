FROM node:16-alpine AS frontend
WORKDIR /
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM python:3.9
WORKDIR /app
COPY api/app.py api/requirements.txt api/bidirectional_bfs.py api/rubik.py ./
COPY --from=frontend /build ./build
RUN pip install -r ./requirements.txt
ENV FLASK_DEBUG 0

EXPOSE 5000
CMD ["python3", "app.py"]