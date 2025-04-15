#!/bin/bash

# 確保目錄結構存在
mkdir -p app/routes
mkdir -p app/models
mkdir -p app/controllers
mkdir -p app/middlewares
mkdir -p public/uploads

# 檢查是否已安裝 yarn
if ! command -v yarn &> /dev/null
then
    echo "Yarn 未安裝，嘗試使用 npm 安裝..."
    npm install -g yarn
fi

# 安裝依賴
echo "安裝依賴..."
yarn

# 啟動伺服器
echo "啟動伺服器..."
yarn dev 