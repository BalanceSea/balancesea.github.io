# 添加 Vue 插件文档

## 1. 复制插件模块模板

将模板目录复制到 Vue 插件目录，并使用小写 slug 命名：

```text
templates/plugin-template/  ->  src/plugins/cloudbackup/
```

最终结构：

```text
src/plugins/cloudbackup/
└── index.js
```

`src/plugins/registry.js` 使用 `import.meta.glob` 自动发现所有插件模块，侧栏和搜索无需手工登记。

## 2. 修改模块数据

编辑 `src/plugins/cloudbackup/index.js`，至少替换：

- `slug`、英文名、中文名、分类和版本
- Minecraft、Java 与服务端版本
- Lucide 图标与主题色
- 简介、全部主要功能和安装步骤
- 全部命令、别名、参数与权限
- 全部配置文件

路由会自动变为：

```text
/plugins/cloudbackup/
```

## 3. 配置文档要求

将 `templates/AI-INSTRUCTIONS.md`、插件完整源码和实际生成的配置目录一起提供给 AI。

AI 必须完整记录所有配置文件。`configuration.files` 中一个对象对应一个实际文件，`code` 必须是完整内容，禁止使用省略号。

## 4. 本地验证

```bash
npm install
npm run dev
npm run build
```

构建脚本会为每个 `src/plugins/*/` 生成 `dist/plugins/<slug>/index.html`，因此 GitHub Pages 地址不显示 `.html`。
