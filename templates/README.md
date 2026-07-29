# 添加新插件

## 1. 复制整个模板目录

不要只复制 HTML。将完整目录复制到 `plugins/`，目录名必须等于插件的小写 slug：

```text
templates/plugin-template/  ->  plugins/cloudbackup/
```

完成后应为：

```text
plugins/cloudbackup/
├── index.html
└── plugin.json
```

页面地址将是 `/plugins/cloudbackup/`，不会显示 `.html` 后缀。

## 2. 修改插件元数据

编辑新目录中的 `plugin.json`：

```json
{
  "slug": "cloudbackup",
  "name": "CloudBackup",
  "title": "云备份",
  "category": "运维工具",
  "version": "1.0.0",
  "icon": "archive-restore",
  "tone": "cyan",
  "summary": "自动备份世界、配置和玩家数据。",
  "keywords": "备份 恢复 世界 数据 定时任务"
}
```

`slug` 必须与目录名一致。可用色调为 `lime`、`blue`、`amber`、`violet`、`rose` 和 `cyan`。

## 3. 生成动态插件列表

本地修改后运行：

```bash
node scripts/generate-plugin-registry.mjs
```

脚本会扫描全部 `plugins/*/plugin.json` 并生成 `catalog-data.js`。首页和每个插件页面的侧栏都会自动更新，不需要逐页添加链接。

推送到 GitHub 后，部署工作流会自动运行该命令。

## 4. 让 AI 创建完整文档

将以下内容同时提供给 AI：

- `templates/AI-INSTRUCTIONS.md`
- 新插件的完整源码
- 插件实际生成的配置目录
- `templates/plugin-template/index.html`

AI 必须记录插件的全部配置文件和全部配置项，不能只提供配置示例。具体要求见 `AI-INSTRUCTIONS.md`。

## 5. 完成前检查

- `plugin.json` 的 slug 与目录名一致
- 页面 `body` 的 `data-plugin` 等于 slug
- 功能、命令、权限和占位符来自真实源码
- 所有配置文件均完整展示
- 每个叶子配置路径都有类型、默认值、允许值、生效方式和说明
- 不使用省略号跳过配置
- 页面地址不包含 `.html`
- 作者为 `MoutainSeaL`
- 作者 QQ 为 `3643203568`
