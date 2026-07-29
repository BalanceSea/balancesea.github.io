# 发布到 `xxx.github.io`

## 最简单的发布方式

假设你的 GitHub 用户名是 `xxx`：

1. 在 GitHub 创建一个公开仓库，仓库名称必须是 `xxx.github.io`。
2. 解压本项目，确保 `index.html` 位于仓库根目录，而不是额外的子文件夹中。
3. 将项目内全部文件和目录上传到仓库的 `main` 分支，包括 `.github`、`plugins`、`templates` 和 `.nojekyll`。
4. 打开仓库的 **Actions** 页面，等待 `Deploy Cloud Wiki to GitHub Pages` 运行完成。
5. 访问 `https://xxx.github.io/`。

工作流会尝试自动启用 GitHub Pages。若首次运行提示 Pages 尚未启用，请打开：

```text
Settings > Pages > Build and deployment > Source
```

选择 **GitHub Actions**，再到 Actions 页面重新运行工作流。该设置只需操作一次。

## 正确的仓库结构

```text
xxx.github.io/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── plugins/
├── templates/
├── .nojekyll
├── favicon.svg
├── index.html
├── styles.css
├── script.js
├── catalog-data.js
└── plugin-common.js
```

不要上传成下面这种结构：

```text
xxx.github.io/
└── minecraft-plugin-wiki/
    └── index.html
```

否则主页无法在 `https://xxx.github.io/` 根路径打开。

## 普通仓库名称

如果仓库名称是 `cloud-wiki`，发布地址将是：

```text
https://xxx.github.io/cloud-wiki/
```

模板使用相对路径，因此普通项目仓库也可以正常运行。

## 自定义域名

需要使用自己的域名时，在仓库 **Settings > Pages > Custom domain** 中填写域名。不要为 `xxx.github.io` 地址创建 `CNAME` 文件。
