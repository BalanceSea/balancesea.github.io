# 云插件系列 Cloud Wiki 模板

一个无需构建工具、可直接部署到 GitHub Pages 的 Minecraft 系列插件文档模板。

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

1. 创建 GitHub 仓库，例如 `yourname.github.io` 或 `plugin-wiki`。
2. 将本目录中的文件推送到仓库 `main` 分支。
3. 打开仓库的 **Settings > Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. 选择 `main` 分支与 `/ (root)` 目录并保存。

几分钟后即可通过 `https://yourname.github.io/` 或 `https://yourname.github.io/plugin-wiki/` 访问。

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
- `script.js`：首页分页、搜索、主题切换和移动端菜单
- `plugin-common.js`：各独立文档共用的主题、目录和复制交互
- `templates/plugin-template.html`：新增插件时使用的完整页面模板
- `templates/README.md`：添加插件、首页登记和导航更新说明

## 许可

可自由用于你的 Minecraft 插件项目。
