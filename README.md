# 云插件系列 Cloud Wiki 模板

一个无需构建工具、可直接部署到 GitHub Pages 的 Minecraft 系列插件文档模板。

## 直接发布

将仓库命名为 `你的GitHub用户名.github.io`，并把本目录全部内容上传到 `main` 分支。内置的 GitHub Actions 工作流会自动发布网站，访问地址为：

```text
https://你的GitHub用户名.github.io/
```

详细步骤见 `DEPLOY.md`。

模板包含带分页的系列插件目录，以及六个互相独立的插件详情 HTML 页面：CloudCore、CloudClaim、CloudMarket、CloudChat、CloudQuest 和 CloudGuard。

## 本地预览

直接打开 `index.html` 即可预览。由于图标和字体来自 CDN，联网时显示效果最佳。

## 修改内容

1. 复制 `plugins/` 中任意插件页面，创建新的独立插件文档。
2. 在新页面中修改插件功能、命令、权限、配置以及前后翻页链接。
3. 在 `catalog-data.js` 中增加对应的首页目录卡片。
4. 将页面中的 `yourname/cloud-plugins` 替换为真实 GitHub 仓库地址。
5. 在 `styles.css` 的 `:root` 中调整主题颜色。
6. 首页插件目录默认每页显示 3 项，可在 `script.js` 中修改 `pageSize`。

也可以直接使用 `templates/plugin-template.html`。完整步骤见 `templates/README.md`。

作者信息已按要求设置为：

- 作者：MoutainSeaL
- QQ：3643203568

## 部署到 GitHub Pages

项目内已包含 `.github/workflows/deploy-pages.yml`，推送到 `main` 后会自动部署。用户主页仓库和普通项目仓库均可使用。

## 文件说明

- `index.html`：系列首页和分页插件目录
- `plugins/cloudcore.html`：CloudCore 独立文档
- `plugins/cloudclaim.html`：CloudClaim 独立文档
- `plugins/cloudmarket.html`：CloudMarket 独立文档
- `plugins/cloudchat.html`：CloudChat 独立文档
- `plugins/cloudquest.html`：CloudQuest 独立文档
- `plugins/cloudguard.html`：CloudGuard 独立文档
- `catalog-data.js`：首页目录所需的简短插件元数据
- `styles.css`：视觉样式与响应式布局
- `favicon.svg`：浏览器标签页与站点品牌图标
- `script.js`：首页分页、搜索、主题切换和移动端菜单
- `plugin-common.js`：各独立文档共用的主题、目录和复制交互
- `templates/plugin-template.html`：新增插件时使用的完整页面模板
- `templates/README.md`：添加插件、首页登记和导航更新说明
- `.github/workflows/deploy-pages.yml`：GitHub Pages 自动部署工作流
- `.nojekyll`：关闭 Jekyll 处理，按原样发布静态文件
- `DEPLOY.md`：直接访问 `xxx.github.io` 的完整发布步骤

## 许可

可自由用于你的 Minecraft 插件项目。
