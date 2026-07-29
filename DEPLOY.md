# Vue Wiki 发布到 `xxx.github.io`

## 自动部署

假设 GitHub 用户名为 `xxx`：

1. 创建仓库 `xxx.github.io`。
2. 将项目源码推送到仓库 `main` 分支。
3. 打开 **Settings > Pages**，将 Source 设为 **GitHub Actions**。
4. 等待 `Deploy Cloud Wiki to GitHub Pages` 工作流完成。
5. 访问 `https://xxx.github.io/`。

工作流执行：

```text
npm ci
npm run build
上传 dist/
```

## 项目结构

```text
xxx.github.io/
├── .github/workflows/deploy-pages.yml
├── public/
├── scripts/generate-static-routes.mjs
├── src/
│   ├── components/
│   ├── plugins/
│   │   ├── registry.js
│   │   └── cloudtitle/index.js
│   ├── views/
│   ├── App.vue
│   ├── main.js
│   └── router.js
├── templates/
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## 无后缀路由

Vue Router 使用 History 模式。构建后的 `scripts/generate-static-routes.mjs` 会为每个插件复制入口文件：

```text
dist/plugins/cloudtitle/index.html
```

因此可直接访问：

```text
https://xxx.github.io/plugins/cloudtitle/
```

地址不会出现 `.html`。

## 普通项目仓库

如果仓库名为 `cloud-wiki`，Vite 会自动使用 `/cloud-wiki/` 作为 base，访问地址为：

```text
https://xxx.github.io/cloud-wiki/
```

维护模板和 AI 规范仅存在于源码仓库，不会进入构建产物。
