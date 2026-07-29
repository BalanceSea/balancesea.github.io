# 云插件系列 Cloud Wiki

## 当前插件

- [CloudTitle](plugins/cloudtitle/)：云称号

插件列表由 `plugins/*/plugin.json` 自动生成。新增插件请复制 `templates/plugin-template/`，并遵循 `templates/AI-INSTRUCTIONS.md` 的完整配置文档规范。

本地生成插件注册表：

```bash
node scripts/generate-plugin-registry.mjs
```

GitHub Pages 发布说明见 `DEPLOY.md`。
