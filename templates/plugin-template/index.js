/*
AI 必须先阅读 ../AI-INSTRUCTIONS.md，并检查真实源码与实际生成的配置文件。
禁止臆造功能、命令、权限、版本或配置。配置文件必须完整，不能使用省略号。
*/
import { Puzzle } from '@lucide/vue';

export default {
  order: 999,
  slug: 'cloudexample',
  name: 'CloudExample',
  title: '示例插件',
  category: '插件分类',
  version: '1.0.0',
  minecraft: '待确认',
  server: '待确认',
  icon: Puzzle,
  tone: 'lime',
  summary: '根据真实功能填写一句话简介。',
  keywords: '根据实际功能填写搜索关键词',
  intro: '根据源码和实际使用场景填写完整简介。',
  features: [
    ['功能一', '说明真实行为、边界和适用场景。'],
    ['功能二', '说明真实行为、边界和适用场景。'],
    ['功能三', '说明真实行为、边界和适用场景。'],
    ['功能四', '说明真实行为、边界和适用场景。']
  ],
  installation: {
    lead: '写明精确的服务端、Minecraft 和 Java 版本。',
    steps: [
      ['下载插件', '写明真实文件名和下载来源。'],
      ['放入目录', '写明安装目录和强制依赖。'],
      ['启动并检查', '写明首次运行结果和验证命令。']
    ],
    note: '区分强制依赖和软依赖，并说明缺失软依赖时哪些功能不可用。'
  },
  aliases: '列出全部主命令别名',
  commands: [
    ['/example', '真实命令功能', 'cloudexample.use'],
    ['/example reload', '真实重载行为', 'cloudexample.admin']
  ],
  configuration: {
    intro: '必须说明插件生成的全部配置文件。以下 files 数组必须为每个实际配置文件创建一项。',
    note: '记录重载、重启、数据库、迁移和敏感信息注意事项。',
    files: [
      {
        name: 'config.yml',
        description: '主配置 · 必须完整展示',
        code: `# 粘贴插件实际生成的完整 config.yml
# 不允许省略任何键、注释或默认值
enabled: true`
      },
      {
        name: 'messages.yml',
        description: '语言配置 · 必须完整展示',
        code: `# 每个额外配置文件都建立独立条目
prefix: "<green>[CloudExample]</green> "`
      }
    ]
  }
};
