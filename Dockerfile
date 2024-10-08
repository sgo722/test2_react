# 1. 빌드 스테이지
FROM node:14.17.0 AS build
WORKDIR /app

# package.json과 package-lock.json을 복사하고 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2. 프로덕션 스테이지
FROM nginx:stable-alpine

# 빌드된 파일을 Nginx의 기본 정적 파일 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 권한 설정: Nginx가 파일을 읽을 수 있도록 755 권한을 부여
RUN chmod -R 755 /usr/share/nginx/html

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]