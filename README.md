# 云插件系列 Cloud Wiki

基于 Vue 3、Vite 和 Vue Router 的 Minecraft 插件 Wiki。

## 当前插件

- CloudTitle：云称号

插件模块位于 `src/plugins/*/index.js`。`src/plugins/registry.js` 使用 `import.meta.glob` 自动发现插件，侧栏和搜索会同步更新。

## 本地开发

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

构建结果位于 `dist/`。构建脚本会为每个插件生成无后缀路由入口，例如：

```text
/plugins/cloudtitle/
```

## 添加插件

复制 `templates/plugin-template/` 到 `src/plugins/<slug>/`，再填写插件数据。完整要求见：

- `templates/README.md`
- `templates/AI-INSTRUCTIONS.md`

维护模板不会出现在面向用户的 Wiki 中，也不会进入 `dist/`。

## 作者

- 作者：MoutainSeaL
- QQ：3643203568

GitHub Pages 部署说明见 `DEPLOY.md`。
