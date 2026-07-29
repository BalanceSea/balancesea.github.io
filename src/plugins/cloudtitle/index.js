import { Badge } from 'lucide-vue-next';

export default {
  order: 1,
  slug: 'cloudtitle',
  name: 'CloudTitle',
  title: '云称号',
  category: '玩法内容',
  version: '1.0.0',
  minecraft: '1.21.11',
  server: 'Paper',
  icon: Badge,
  tone: 'blue',
  summary: '称号仓库、商城、自定义称号、Buff 与多种获取条件的一体化称号系统。',
  keywords: '称号 商城 仓库 自定义 Buff PlaceholderAPI SQLite MySQL',
  intro: '为生存服、会员服与跨服网络打造的一体化称号系统。玩家可以在可配置 GUI 中收集、购买、创建和佩戴称号，服务器可为称号附加原版药水增益，并通过 SQLite 或 MySQL 持久保存数据。',
  features: [
    ['仓库与自定义 GUI', '称号仓库、商城和工坊分别使用独立配置文件，采用 TrMenu 风格字符布局，支持自定义图标、Lore、动作、翻页与点击冷却。'],
    ['六种获取条件', '支持 Vault 金币、PlayerPoints 点券、权限、免费领取、PAPI 数值判断，以及原版或 CraftEngine 物品分段提交。'],
    ['称号 Buff 与展示', '称号可附加多个原版药水效果，GUI 使用可配置中文名称；PlaceholderAPI 提供彩色、纯文本、描述和称号 ID 等变量。'],
    ['数据库与跨服', '单服可直接使用 SQLite，群组服可共享 MySQL；插件记录 Buff 来源服务器，处理切服时的药水效果清理和重新应用。']
  ],
  installation: {
    lead: '运行环境为 Paper 1.21.11 与 Java 21，插件本身没有强制前置。',
    steps: [
      ['放入插件', '将 CloudTitle-1.0.jar 放入 Paper 服务端的 plugins/ 目录。'],
      ['首次启动', '启动服务端生成默认配置。数据库驱动由 Spigot LibraryLoader 下载，首次启动需允许访问 Maven Central。'],
      ['配置并使用', '编辑 plugins/CloudTitle/ 下的称号、GUI、语言和存储配置，然后执行 /cloudtitle reload。']
    ],
    note: '金币需要 Vault 与经济插件，点券需要 PlayerPoints，变量与 PAPI 条件需要 PlaceholderAPI，CraftEngine 物品兑换需要 CraftEngine。未使用对应功能时无需安装。'
  },
  aliases: '/ct、/title、/称号',
  commands: [
    ['/cloudtitle', '打开称号仓库', 'cloudtitle.use'],
    ['/cloudtitle shop', '打开称号商城', 'cloudtitle.use'],
    ['/cloudtitle custom', '打开自定义称号工坊', 'cloudtitle.use、cloudtitle.custom'],
    ['/cloudtitle set <id>', '佩戴已拥有的称号', 'cloudtitle.use'],
    ['/cloudtitle clear', '卸下当前称号', 'cloudtitle.use'],
    ['/cloudtitle grant <玩家> <id>', '向玩家发放称号', 'cloudtitle.admin'],
    ['/cloudtitle revoke <玩家> <id>', '回收玩家称号', 'cloudtitle.admin'],
    ['/cloudtitle reload', '重载配置并关闭插件 GUI', 'cloudtitle.admin']
  ],
  configuration: {
    intro: '称号定义位于 plugins/CloudTitle/titles.yml。以下称号要求玩家等级达到 30，并提供速度 I 增益。',
    note: '所有子服连接同一个 MySQL 数据库，并为每台服务器设置唯一的 server-id。表名可在 storage.yml 中分别自定义。',
    files: [
      {
        name: 'titles.yml',
        description: '称号定义示例',
        code: `titles:
  experienced_adventurer:
    name: "<gradient:#60A5FA:#2563EB><bold>资深冒险家</bold></gradient>"
    description:
      - "<white>献给不断积累经验、磨炼自我的冒险家。"
      - "<gray>玩家等级达到 30 级后即可领取。"
    icon: EXPERIENCE_BOTTLE
    buffs:
      SPEED:
        amplifier: 0
        particles: false
        icon: true
    shop:
      enabled: true
      display: true
      type: papi
      bypass-permission: "cloudtitle.shop.experienced_adventurer.bypass"
      requirement-display: ""
      papi-conditions:
        - placeholder: "%player_level%"
          operator: ">="
          value: 30
          display: "<white>玩家等级达到 30 级</white>"`
      }
    ]
  }
};
