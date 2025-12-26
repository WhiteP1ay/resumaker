# 多阶段构建：构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json用于依赖安装
COPY package.json package-lock.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段：使用nginx提供静态文件服务
FROM nginx:alpine AS production

# 复制构建产物到nginx静态文件目录（考虑到base路径为/resume/）
COPY --from=builder /app/dist /usr/share/nginx/html/resume

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
