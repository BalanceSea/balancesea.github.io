# 添加新插件

## 1. 复制页面模板

复制 `templates/plugin-template.html` 到 `plugins/`，并将文件改为插件的小写名称，例如：

```text
plugins/cloudbackup.html
```

## 2. 替换模板内容

在新文件中搜索并修改以下内容：

| 模板内容 | 替换示例 |
| --- | --- |
| `CloudExample` | `CloudBackup` |
| `示例插件` | `云备份` |
| `cloudexample` | `cloudbackup` |
| `example` | `backup` |
| `插件分类` | `运维工具` |
| `v1.0.0` | 实际版本号 |
| `puzzle` | Lucide 图标名称 |
| `plugin-template.html` | 新插件的实际文件名 |

同时填写插件简介、四个功能、安装步骤、命令权限和配置示例。

## 3. 登记首页目录

打开根目录的 `catalog-data.js`，在数组末尾添加：

```js
{
  slug: 'cloudbackup',
  name: 'CloudBackup',
  title: '云备份',
  category: '运维工具',
  version: '1.0.0',
  icon: 'archive-restore',
  tone: 'cyan',
  summary: '自动备份世界、配置和玩家数据。',
  keywords: '备份 恢复 世界 数据 定时任务'
}
```

首页会自动重新计算分页数量。可用色调为 `lime`、`blue`、`amber`、`violet`、`rose` 和 `cyan`。

## 4. 更新插件导航

在 `plugins/` 中已有的插件页面侧栏加入新插件链接，并根据目录顺序调整底部的“上一个插件”和“下一个插件”。

新插件页面中的链接示例：

```html
<a class="nav-link active" href="cloudbackup.html">
  <i data-lucide="archive-restore"></i>
  <span>CloudBackup<small>云备份</small></span>
</a>
```

## 5. 本地检查

确认首页卡片可以进入新文件，并测试：

- 桌面端和手机端布局
- 侧栏当前插件高亮
- 上一个和下一个插件链接
- 配置复制按钮
- 作者为 `MoutainSeaL`
- 作者 QQ 为 `3643203568`
