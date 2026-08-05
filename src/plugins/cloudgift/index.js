import { Gift } from '@lucide/vue';

const plugin = {
  order: 3,
  slug: 'cloudgift',
  name: 'CloudGift',
  title: '云礼包',
  category: '服务器工具',
  version: '1.5.0',
  repository: 'https://github.com/BalanceSea/CloudGift',
  minecraft: '1.21.11',
  server: 'Paper',
  tone: 'lime',
  summary: '支持自然日刷新、精确小时冷却、领取次数限制、GUI 编辑和 SQLite/MySQL 跨服共享的礼包插件。',
  keywords: '礼包 自然日刷新 24点 冷却 次数限制 GUI SQLite MySQL MariaDB PlaceholderAPI Paper',
  intro: '面向生存服、会员服和群组服的可配置礼包系统。管理员可以为礼包组合权限、累计领取次数、精确小时冷却或跨零点刷新，并通过游戏内 GUI 维护命令与完整物品奖励；单服使用 SQLite 即装即用，群组服可通过 MySQL/MariaDB 原子共享领取记录。',
  toc: [
    ['overview', '插件概览'],
    ['features', '核心功能'],
    ['installation', '安装依赖'],
    ['commands', '命令权限'],
    ['placeholders', '变量与奖励'],
    ['configuration', '全部配置'],
    ['operations', '运维升级']
  ],
  features: [
    ['两种刷新方式', 'reset-at-midnight 为 true 时，玩家跨过配置时区的下一次 00:00 即可领取，并忽略 cooldown-hours；为 false 时才从上次成功领取起精确等待指定小时数。'],
    ['次数与权限控制', '每个礼包可独立设置权限和累计领取次数上限。次数上限优先于冷却判断，0 表示不限次数。'],
    ['命令与完整物品奖励', '奖励按 YAML 顺序发放。命令以控制台身份执行；物品通过 Bukkit ItemStack 完整保存名称、Lore、附魔和组件，背包已满时掉落在玩家脚下。'],
    ['游戏内礼包编辑器', '管理员可在 GUI 中新建、编辑、删除礼包，调整名称、权限、冷却、跨零点刷新和次数上限，并一次投放最多 45 项物品奖励。'],
    ['单服与群组服存储', 'SQLite 适合单服；MySQL/MariaDB 适合多子服共享。条件更新和玩家+礼包唯一键共同保证并发领取只成功一次。'],
    ['无阻塞状态变量', '玩家进服后异步预载领取记录，PlaceholderAPI 从缓存返回可领取状态、下次时间、已用次数和剩余次数。']
  ],
  acquisition: {
    title: '领取模式与适用场景',
    headers: ['场景', '关键配置', '实际行为'],
    rows: [
      ['单服礼包', 'storage.type: sqlite', '领取记录保存在 plugins/CloudGift/data.db，不需要独立数据库服务。'],
      ['群组服礼包', 'storage.type: mysql 或 mariadb', '所有节点连接同一数据库并使用相同 table-prefix；领取通过数据库原子竞争防止跨服重复发奖。'],
      ['每日零点礼包', 'reset-at-midnight: true', '上次领取后的下一自然日 00:00 即刷新。自然日由 time.zone-id 决定，cooldown-hours 在此模式下不参与判断。'],
      ['精确 24 小时礼包', 'reset-at-midnight: false + cooldown-hours: 24', '必须从上次成功领取时刻起等待完整 24 小时，不会因为经过 00:00 提前刷新。'],
      ['一次性礼包', 'max-claims: 1', '成功领取一次后永久达到次数上限，除非管理员执行 remove/reset 删除该玩家的领取记录。']
    ]
  },
  installation: {
    lead: '当前源码以 Java 21、Paper API 1.21.11 和 api-version 1.21 构建，精确验证目标为 Paper 1.21.11；构建产物为 CloudGift-1.5.0.jar。',
    steps: [
      ['安装插件 JAR', '将 CloudGift-1.5.0.jar 放入服务端 plugins/，保持 JAR 原样，不要解压或二次打包。'],
      ['首次联网启动', 'Paper Library Loader 从 Maven 仓库加载 HikariCP 7.1.0、MySQL Connector/J 9.7.0 和 SQLite JDBC 3.53.2.0；首次解析依赖需要服务端可联网。'],
      ['检查默认文件', '首次启动会生成 config.yml、messages.yml、items.yml、gifts/novice.yml、gifts/monthly.yml 和 SQLite 的 data.db。控制台应显示 CloudGift 已启用及载入礼包数量。'],
      ['选择存储模式', '单服保留 sqlite；群组服填写 MySQL/MariaDB 参数，让所有节点使用同一数据库、table-prefix、礼包文件和 time.zone-id，然后完整重启。'],
      ['按需安装 PlaceholderAPI', '安装 PlaceholderAPI 2.12.3 后重启，即可使用 cloudgift 变量，并允许奖励命令继续展开其他 PAPI 变量。']
    ],
    dependencies: [
      ['Java 21', '运行环境', '低于 Java 21 时插件不会加载。'],
      ['Paper 1.21.11', '服务端 API', '当前源码和启停测试均以此版本为目标；Spigot 与其他 Minecraft 版本未声明兼容。'],
      ['HikariCP 7.1.0', 'Library Loader 运行库', '负责 SQLite 与 MySQL/MariaDB 连接池；加载失败时数据库无法初始化，插件会停用。'],
      ['MySQL Connector/J 9.7.0', 'Library Loader 运行库', 'mysql 和 mariadb 存储模式使用；SQLite 模式仍由 plugin.yml 声明并解析该库。'],
      ['SQLite JDBC 3.53.2.0', 'Library Loader 运行库', 'sqlite 存储模式使用；MySQL/MariaDB 模式仍由 plugin.yml 声明并解析该库。'],
      ['PlaceholderAPI 2.12.3', '可选软依赖', '缺失时 cloudgift 变量不注册，奖励命令中的其他 PAPI 变量不展开；礼包、GUI、数据库和内置奖励变量仍可使用。']
    ],
    note: '插件没有必须手动安装的 Bukkit 前置插件。三个 JDBC/连接池运行库由 Paper Library Loader 提供，不打包进 CloudGift JAR；依赖解析失败会阻止插件完成加载。PlaceholderAPI 是 softdepend，缺失时只关闭变量扩展能力。'
  },
  aliases: '/gift：/libao、/cgift； /cloudgift：/cloudgifts； menu：gui、editor； add：saveitem； remove：reset',
  commandHeaders: ['命令', '执行者', '权限', '默认授权', '行为'],
  commands: [
    ['/gift <礼包ID>', '仅玩家', 'cloudgift.command.gift + 礼包权限', '所有人 + 礼包自定', '领取指定礼包；/libao 与 /cgift 行为相同。'],
    ['/cloudgift', '玩家或控制台', '按可见子命令过滤', '所有人', '显示当前执行者有权使用的命令帮助。'],
    ['/cloudgift help', '玩家或控制台', '无', '所有人', '显示当前执行者有权使用的命令帮助。'],
    ['/cloudgift reload', '玩家或控制台', 'cloudgift.command.reload', 'OP', '重载 config.yml 的非存储设置、messages.yml、items.yml 和全部礼包 YAML；数据库连接设置仍需重启。'],
    ['/cloudgift menu', '仅玩家', 'cloudgift.command.menu', 'OP', '打开礼包编辑器；别名为 gui、editor。'],
    ['/cloudgift add <物品ID>', '仅玩家', 'cloudgift.command.add', 'OP', '把主手完整 ItemStack 保存到 items.yml；别名为 saveitem。'],
    ['/cloudgift remove <在线玩家名或UUID> <礼包ID>', '玩家或控制台', 'cloudgift.command.remove', 'OP', '删除指定玩家与礼包的整条领取记录；离线玩家必须填写 UUID。别名为 reset。'],
    ['/cloudgift claim <礼包ID>', '仅玩家', 'cloudgift.command.gift + 礼包权限', '所有人 + 礼包自定', '与 /gift <礼包ID> 相同。'],
    ['/cloudgift list', '玩家或控制台', 'cloudgift.command.list', 'OP', '列出当前成功载入的全部礼包 ID 与显示名称。']
  ],
  permissions: [
    ['cloudgift.admin', 'op', '管理权限父节点，包含 reload、menu、add、remove、list；不包含玩家领取权限。'],
    ['cloudgift.command.gift', 'true', '允许使用 /gift 和 /cloudgift claim。'],
    ['cloudgift.command.reload', 'op', '允许重载非连接类配置、消息、保存物品和礼包定义。'],
    ['cloudgift.command.menu', 'op', '允许打开游戏内礼包编辑器。'],
    ['cloudgift.command.add', 'op', '允许保存主手物品到 items.yml。'],
    ['cloudgift.command.remove', 'op', '允许删除玩家的礼包领取记录。'],
    ['cloudgift.command.list', 'op', '允许查看已载入礼包列表。'],
    ['gifts.<id>.permission', '由每个礼包配置', '可选的礼包领取权限；空字符串表示不额外限制。该节点不是 plugin.yml 中的固定权限。']
  ],
  placeholders: {
    intro: '安装 PlaceholderAPI 后注册 cloudgift 标识符。礼包 ID 会转为小写查询；状态读取使用进服预载的内存缓存，不在占位符解析线程中同步访问数据库。',
    noteTitle: '奖励命令执行边界',
    note: '奖励命令以控制台身份按配置顺序执行，开头的 / 会被移除。请只配置可信命令。领取记录会先在数据库中提交，再发放奖励；命令返回失败、物品引用缺失或玩家在数据库完成后离线时，领取记录不会自动回滚。',
    tables: [
      {
        title: 'PlaceholderAPI 变量',
        headers: ['变量', '返回值', '边界'],
        rows: [
          ['%cloudgift_can_<礼包ID>%', 'yes / no', '可领取时为 yes；无权限、未知礼包、载入中、冷却中或次数已用尽均为 no。载入中会触发异步预载。'],
          ['%cloudgift_next_<礼包ID>%', '配置文本或格式化时间', '依次处理未知礼包、无权限、载入中、次数耗尽、可领取；冷却中按 time.pattern 和 time.zone-id 返回时间。'],
          ['%cloudgift_used_<礼包ID>%', '整数', '返回缓存中的累计领取次数；未知礼包返回 placeholder.unknown-gift，尚无缓存记录时返回 0。'],
          ['%cloudgift_limit_<礼包ID>%', '整数或 ∞', '返回 max-claims；0 表示不限并返回 ∞，未知礼包返回 placeholder.unknown-gift。'],
          ['%cloudgift_remaining_<礼包ID>%', '整数或 ∞', '返回 max(0, 上限 - 已用次数)；不限次数返回 ∞，未知礼包返回 placeholder.unknown-gift。']
        ]
      },
      {
        title: '奖励命令变量',
        headers: ['变量', '返回值', '示例'],
        rows: [
          ['%player%', '领取玩家当前名称', 'Steve'],
          ['%uuid%', '领取玩家 UUID', '8667ba71-b85a-4004-af54-457a9734eed7'],
          ['%gift%', '规范化后的小写礼包 ID', 'monthly'],
          ['其他 PlaceholderAPI 变量', '由已安装扩展返回', '%vault_eco_balance%']
        ]
      }
    ]
  },
  configuration: {
    intro: '新安装生成 5 个 YAML 配置文件：config.yml、messages.yml、items.yml、gifts/novice.yml、gifts/monthly.yml。礼包还兼容根目录 gifts.yml / gifts.yaml，并递归扫描 gifts/ 下任意 .yml / .yaml；下表逐项覆盖所有固定和动态叶子路径，随后完整展示默认资源。',
    warning: 'config.yml / storage.mysql.password 是敏感凭据。不要把真实密码提交到公开仓库或发送到公开日志。storage.* 连接设置必须重启；其余主配置、消息、物品和礼包定义可用 /cloudgift reload 生效。',
    inventory: [
      ['config.yml', '数据库、时间格式、PAPI 返回文本与预载设置', '非 storage.* 可 /cloudgift reload；storage.* 重启', 'storage.mysql.password'],
      ['messages.yml', 'MiniMessage 命令反馈、领取状态与 GUI 聊天输入提示', '/cloudgift reload', '否'],
      ['items.yml', '命令或 GUI 保存的完整 Bukkit ItemStack', '/cloudgift reload；命令/GUI 写入后立即使用', '否'],
      ['gifts/novice.yml', '首次安装生成的新手礼包示例', '/cloudgift reload', '否'],
      ['gifts/monthly.yml', '首次安装生成的跨零点月卡礼包示例', '/cloudgift reload', '否'],
      ['gifts.yml', 'JAR 内置的旧版兼容完整模板；新安装默认不生成', '/cloudgift reload', '否']
    ],
    referenceHeaders: ['文件与路径', '类型', '默认值', '允许值或范围', '必填', '生效方式', '完整说明'],
    references: [
      {
        title: '主配置 config.yml',
        rows: [
          ['config.yml / storage.type', '枚举字符串', 'sqlite', 'sqlite / mysql / mariadb；其他值停用插件', '否', '重启服务器', '选择本地 SQLite 或共享 MySQL/MariaDB。mariadb 仍使用 MySQL Connector/J 与 jdbc:mysql URL。'],
          ['config.yml / storage.table-prefix', '字符串', 'cloudgift_', '仅字母、数字、下划线', '否', '重启服务器', '最终表名为 <前缀>claims；无效值会使数据库初始化失败并停用插件。'],
          ['config.yml / storage.mysql.host', '字符串', '127.0.0.1', '可解析主机名或 IP', 'MySQL/MariaDB 必填', '重启服务器', '数据库服务器地址。'],
          ['config.yml / storage.mysql.port', '整数', '3306', '数据库实际监听端口', 'MySQL/MariaDB 必填', '重启服务器', '拼接到 JDBC URL。'],
          ['config.yml / storage.mysql.database', '字符串', 'minecraft', '已创建且账号可访问的数据库名', 'MySQL/MariaDB 必填', '重启服务器', '插件创建 claims 表，但不会创建数据库。'],
          ['config.yml / storage.mysql.username', '字符串', 'root', '有效数据库账号', 'MySQL/MariaDB 必填', '重启服务器', '建议使用只具备目标数据库所需权限的独立账号。'],
          ['config.yml / storage.mysql.password', '敏感字符串', 'change_me', '账号对应密码', 'MySQL/MariaDB 必填', '重启服务器', '生产环境必须修改，不要公开。'],
          ['config.yml / storage.mysql.parameters', 'JDBC 参数字符串', '见完整文件', '空值或不含开头 ? 的参数串', '否', '重启服务器', '非空时自动在 JDBC URL 前添加 ?。'],
          ['config.yml / storage.pool.maximum-pool-size', '整数', '10', 'MySQL/MariaDB 运行时最小 2', '否', '重启服务器', '共享数据库连接池最大连接数；SQLite 固定为 1。'],
          ['config.yml / storage.pool.minimum-idle', '整数', '2', 'MySQL/MariaDB 最小 0 且不超过最大池大小', '否', '重启服务器', '超出范围时运行时自动夹到有效范围；SQLite 固定为 1。'],
          ['config.yml / storage.pool.connection-timeout-ms', '长整数（毫秒）', '5000', 'HikariCP 可接受的正数', '否', '重启服务器', '从连接池获取连接的最长等待时间。'],
          ['config.yml / storage.pool.max-lifetime-ms', '长整数（毫秒）', '1800000', 'HikariCP 可接受的毫秒值', '否', '重启服务器', '连接在池中的最大生命周期。'],
          ['config.yml / time.pattern', 'DateTimeFormatter 模式', 'yyyy-MM-dd HH:mm:ss', 'Java DateTimeFormatter 可解析格式', '否', '/cloudgift reload', 'PAPI 下次领取时间格式；无效时回退默认格式。'],
          ['config.yml / time.zone-id', 'IANA 时区字符串', 'Asia/Shanghai', 'ZoneId 可识别值，如 UTC', '否', '/cloudgift reload', '同时决定时间显示和 reset-at-midnight 的自然日边界；无效时回退 Asia/Shanghai。'],
          ['config.yml / placeholder.available-time', '字符串', '可领取', '任意文本', '否', '/cloudgift reload', '%cloudgift_next_<ID>% 已可领取时返回。'],
          ['config.yml / placeholder.no-permission-time', '字符串', '无权限', '任意文本', '否', '/cloudgift reload', '%cloudgift_next_<ID>% 权限不足时返回。'],
          ['config.yml / placeholder.unknown-gift', '字符串', '未知礼包', '任意文本', '否', '/cloudgift reload', 'next、used、limit、remaining 查询未知礼包时返回。'],
          ['config.yml / placeholder.loading-time', '字符串', '数据加载中', '任意文本', '否', '/cloudgift reload', '%cloudgift_next_<ID>% 等待异步预载时返回。'],
          ['config.yml / placeholder.limit-reached-time', '字符串', '次数已用尽', '任意文本', '否', '/cloudgift reload', '%cloudgift_next_<ID>% 达到 max-claims 时返回，优先于冷却时间。'],
          ['config.yml / data.preload-on-join', '布尔值', 'true', 'true / false', '否', '/cloudgift reload；影响之后进服', '是否在玩家加入时异步读取全部领取记录；关闭后 can/next 变量仍会按需触发预载。']
        ]
      },
      {
        title: '礼包文件 gifts/*.yml、gifts/*.yaml、gifts.yml、gifts.yaml',
        rows: [
          ['礼包文件 / gifts.<id>.display-name', 'MiniMessage 字符串', '礼包 ID', '任意非空 MiniMessage；空值回退 ID', '否', '/cloudgift reload', '玩家消息和礼包列表中的显示名称。'],
          ['礼包文件 / gifts.<id>.permission', '权限字符串', '空', '空或任意 Bukkit 权限节点', '否', '/cloudgift reload', '空表示不额外限制；领取命令本身仍需要 cloudgift.command.gift。'],
          ['礼包文件 / gifts.<id>.cooldown-hours', '数字（小时）', '24', '0 至 2,562,047,788，可为小数', '否', '/cloudgift reload', 'reset-at-midnight 为 false 时，从上次成功领取时刻精确计算；0 表示可立即再次领取。非法值会跳过整个礼包。'],
          ['礼包文件 / gifts.<id>.reset-at-midnight', '布尔值', 'false', 'true / false', '否', '/cloudgift reload', 'true 时忽略 cooldown-hours，跨过 time.zone-id 的下一自然日 00:00 即可领取；false 时按正常小时冷却。'],
          ['礼包文件 / gifts.<id>.max-claims', '整数', '0', '0 至 1,000,000；超范围自动夹取', '否', '/cloudgift reload', '每位玩家累计成功领取上限；0 表示不限。次数判断优先于冷却。'],
          ['礼包文件 / gifts.<id>.rewards[].type', '枚举字符串', '无', 'command / item', '每项必填', '/cloudgift reload', '未知类型会跳过该奖励，不影响同礼包其他有效奖励。'],
          ['礼包文件 / gifts.<id>.rewards[].command', '命令字符串', '无', '非空控制台命令', 'command 必填', '/cloudgift reload', '支持 %player%、%uuid%、%gift% 及已安装的其他 PAPI 变量；开头 / 自动移除。'],
          ['礼包文件 / gifts.<id>.rewards[].item', '物品 ID', '无', 'items.yml 中存在的 ID', 'item 必填', '/cloudgift reload', '引用缺失时领取仍记录成功，该项发放失败并记录警告。'],
          ['礼包文件 / gifts.<id>.rewards[].amount', '整数', '保存物品原数量', '1 至 1,000,000', '否', '/cloudgift reload', '省略时使用保存 ItemStack 的原数量；非法值会跳过该奖励。发放时按物品最大堆叠数拆分。']
        ]
      },
      {
        title: '保存物品 items.yml',
        rows: [
          ['items.yml / items.<id>', 'Bukkit ItemStack YAML 对象', '{}', 'ID 仅小写字母、数字、下划线、连字符', '按 item 奖励需要', '/cloudgift reload；命令/GUI 写入后立即使用', '保存完整物品序列化数据。GUI 自动生成的内部 ID 以 __cloudgift_gui_ 开头；删除仍被礼包引用的条目会导致该奖励发放失败。']
        ]
      },
      {
        title: '消息配置 messages.yml',
        rows: [
          ['messages.yml / prefix', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '追加到所有 MessageService 消息正文之前。'],
          ['messages.yml / no-permission', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', '玩家缺少礼包权限或领取命令权限时发送。'],
          ['messages.yml / unknown-gift', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', '礼包 ID 不存在时发送。'],
          ['messages.yml / cooldown', 'MiniMessage 字符串', '见完整文件', '支持 <gift>、<next_time>', '否', '/cloudgift reload', '数据库拒绝冷却中的领取时发送。'],
          ['messages.yml / limit-reached', 'MiniMessage 字符串', '见完整文件', '支持 <gift>、<used>、<limit>', '否', '/cloudgift reload', '累计次数已满时发送。'],
          ['messages.yml / claim-success', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', '数据库提交且全部奖励成功后发送。'],
          ['messages.yml / claim-busy', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '同一节点内同一玩家礼包已有领取请求处理中时发送。'],
          ['messages.yml / database-error', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '领取或重置相关数据库操作失败时发送；玩家数据预载失败只记录控制台日志。'],
          ['messages.yml / players-only', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '控制台执行仅玩家命令时发送。'],
          ['messages.yml / usage-gift', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '/gift 参数数量错误时发送。'],
          ['messages.yml / usage-admin', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '保留的管理命令用法消息键；当前模块化路由不直接引用。'],
          ['messages.yml / usage-saveitem', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '保留的 add 用法消息键；当前模块使用 command.add.usage。'],
          ['messages.yml / usage-reset', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '保留的 remove 用法消息键；当前模块使用 command.remove.usage。'],
          ['messages.yml / empty-hand', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'add 时主手为空发送。'],
          ['messages.yml / item-saved', 'MiniMessage 字符串', '见完整文件', '支持 <item>', '否', '/cloudgift reload', '主手物品保存成功后发送。'],
          ['messages.yml / reload-success', 'MiniMessage 字符串', '见完整文件', '支持 <count>', '否', '/cloudgift reload', '重载成功后显示礼包数量并提示存储设置需重启。'],
          ['messages.yml / reset-success', 'MiniMessage 字符串', '见完整文件', '支持 <player>、<gift>', '否', '/cloudgift reload', '领取记录删除成功后发送。'],
          ['messages.yml / player-not-found', 'MiniMessage 字符串', '见完整文件', '支持 <player>', '否', '/cloudgift reload', 'remove 的玩家名不在线且不是 UUID 时发送。'],
          ['messages.yml / gift-list-header', 'MiniMessage 字符串', '见完整文件', '支持 <count>', '否', '/cloudgift reload', 'list 输出首行。'],
          ['messages.yml / gift-list-entry', 'MiniMessage 字符串', '见完整文件', '支持 <id>、<display_name>', '否', '/cloudgift reload', 'list 为每个礼包输出一行。'],
          ['messages.yml / reward-error', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', '领取已记录但至少一项奖励失败时发送。'],
          ['messages.yml / gui-saved', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', 'GUI 保存礼包成功后发送。'],
          ['messages.yml / gui-save-failed', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 保存或删除礼包失败时发送。'],
          ['messages.yml / gui-deleted', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', 'GUI 删除礼包成功后发送。'],
          ['messages.yml / gui-prompt-name', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 等待聊天输入显示名称时发送。'],
          ['messages.yml / gui-prompt-permission', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 等待聊天输入权限时发送。'],
          ['messages.yml / gui-prompt-newid', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 等待聊天输入新礼包 ID 时发送。'],
          ['messages.yml / gui-prompt-command', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 等待聊天输入奖励命令时发送。'],
          ['messages.yml / gui-prompt-item', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 等待聊天输入已有物品 ID 与数量时发送。'],
          ['messages.yml / gui-invalid-id', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 新礼包 ID 格式无效时发送。'],
          ['messages.yml / gui-duplicate-id', 'MiniMessage 字符串', '见完整文件', '支持 <gift>', '否', '/cloudgift reload', 'GUI 新礼包 ID 已存在时发送。'],
          ['messages.yml / gui-item-missing', 'MiniMessage 字符串', '见完整文件', '支持 <item>', '否', '/cloudgift reload', 'GUI 引用的保存物品不存在时发送。'],
          ['messages.yml / gui-items-added', 'MiniMessage 字符串', '见完整文件', '支持 <count>、<returned>', '否', '/cloudgift reload', '批量保存物品奖励成功后发送。'],
          ['messages.yml / gui-item-add-failed', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'GUI 批量保存物品失败时发送。'],
          ['messages.yml / gui-item-remove-failed', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '删除临时 GUI 物品失败时发送。'],
          ['messages.yml / gui-rewards-full', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '礼包已有 45 项奖励时发送。'],
          ['messages.yml / gui-item-input-empty', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '物品投放区为空时发送。'],
          ['messages.yml / gui-item-input-too-many', 'MiniMessage 字符串', '见完整文件', '支持 <count>、<remaining>', '否', '/cloudgift reload', '投放物品组数超过剩余奖励位置时发送。'],
          ['messages.yml / gui-item-input-returned', 'MiniMessage 字符串', '见完整文件', '支持 <count>', '否', '/cloudgift reload', '关闭或取消物品投放 GUI 并返还物品时发送。'],
          ['messages.yml / help.header', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '命令帮助首行。'],
          ['messages.yml / help.command.help', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'help 命令帮助行。'],
          ['messages.yml / help.command.reload', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '有 reload 权限时显示。'],
          ['messages.yml / help.command.menu', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '有 menu 权限时显示。'],
          ['messages.yml / help.command.add', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '有 add 权限时显示。'],
          ['messages.yml / help.command.remove', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '有 remove 权限时显示。'],
          ['messages.yml / help.command.claim', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '有领取权限时显示。'],
          ['messages.yml / help.command.list', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '有 list 权限时显示。'],
          ['messages.yml / command.unknown', 'MiniMessage 字符串', '见完整文件', '支持 <command>', '否', '/cloudgift reload', '未知 cloudgift 子命令时发送，随后显示帮助。'],
          ['messages.yml / command.no-permission', 'MiniMessage 字符串', '见完整文件', '支持 <command>、<permission>', '否', '/cloudgift reload', '子命令模块权限不足时发送。'],
          ['messages.yml / command.help.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'help 带额外参数时发送。'],
          ['messages.yml / command.reload.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'reload 带额外参数时发送。'],
          ['messages.yml / command.reload.failed', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '重载过程抛出异常时发送。'],
          ['messages.yml / command.menu.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'menu 带额外参数时发送。'],
          ['messages.yml / command.add.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'add 参数数量或 ID 格式无效时发送。'],
          ['messages.yml / command.add.failed', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', '保存主手物品抛出异常时发送。'],
          ['messages.yml / command.remove.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'remove 参数数量错误时发送。'],
          ['messages.yml / command.claim.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'cloudgift claim 参数数量错误时发送。'],
          ['messages.yml / command.list.usage', 'MiniMessage 字符串', '见完整文件', '任意 MiniMessage', '否', '/cloudgift reload', 'list 带额外参数时发送。']
        ]
      }
    ],
    files: [
      {
        name: 'config.yml',
        description: '主配置：存储、时间、PAPI 文本与玩家数据预载',
        language: 'yaml',
        code: String.raw`# 存储类型：sqlite（单服）或 mysql（群组服推荐）；修改后需要重启服务器。
storage:
  type: sqlite # 允许值：sqlite、mysql；默认值：sqlite。
  table-prefix: cloudgift_ # 数据表前缀，只能使用字母、数字和下划线。
  mysql:
    host: 127.0.0.1 # MySQL/MariaDB 地址；默认值：127.0.0.1。
    port: 3306 # 数据库端口；默认值：3306。
    database: minecraft # 数据库名称，需提前创建。
    username: root # 数据库账号，建议只授予 CloudGift 所需权限。
    password: change_me # 数据库密码；生产环境请改为独立账号密码。
    parameters: useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai # JDBC 参数。
  pool:
    maximum-pool-size: 10 # 连接池最大连接数，默认值：10。
    minimum-idle: 2 # 最小空闲连接数，默认值：2。
    connection-timeout-ms: 5000 # 获取连接超时时间，单位：毫秒。
    max-lifetime-ms: 1800000 # 连接最大存活时间，单位：毫秒。

# DateTimeFormatter 格式；参考 Java DateTimeFormatter 文档
time:
  pattern: yyyy-MM-dd HH:mm:ss # Java DateTimeFormatter 格式，默认值：yyyy-MM-dd HH:mm:ss。
  zone-id: Asia/Shanghai # 时区 ID，默认值：Asia/Shanghai；也用于 reset-at-midnight 的自然日边界。

# PlaceholderAPI 返回的文本；修改后执行 /cloudgift reload 即可生效。
placeholder:
  available-time: 可领取 # 没有领取记录或冷却结束时返回。
  no-permission-time: 无权限 # 玩家没有礼包权限时返回。
  unknown-gift: 未知礼包 # 礼包 ID 不存在时返回。
  loading-time: 数据加载中 # 玩家数据异步载入期间返回。
  limit-reached-time: 次数已用尽 # 达到 max-claims 时返回。

# 玩家进入服务器时会异步载入其领取记录，供 PAPI 无阻塞读取。
data:
  preload-on-join: true # 是否在玩家进入时预加载记录；默认值：true。`
      },
      {
        name: 'messages.yml',
        description: '完整消息配置：领取、命令、帮助与 GUI 输入提示',
        language: 'yaml',
        code: String.raw`# 使用 MiniMessage 格式，例如 <green>、<red>、<#66ccff>。
prefix: '<gray>[<aqua>CloudGift</aqua>]</gray> '
no-permission: '<red>你没有权限领取礼包 <white><gift></white>。'
unknown-gift: '<red>不存在礼包 <white><gift></white>。'
cooldown: '<yellow>礼包 <white><gift></white> 尚未刷新，下次可领取时间：<white><next_time></white>。'
limit-reached: '<red>礼包 <white><gift></white> 已达使用次数上限（<white><used></white>/<white><limit></white>）。'
claim-success: '<green>成功领取礼包 <white><gift></white>！'
claim-busy: '<yellow>该礼包正在处理中，请勿重复操作。'
database-error: '<red>数据库操作失败，请稍后重试并联系管理员。'
players-only: '<red>此命令只能由玩家执行。'
usage-gift: '<yellow>用法：/gift <礼包ID>'
usage-admin: '<yellow>用法：/cloudgift <help|reload|menu|add|remove|claim|list>'
usage-saveitem: '<yellow>用法：/cloudgift add <物品ID>'
usage-reset: '<yellow>用法：/cloudgift remove <玩家名或UUID> <礼包ID>'
empty-hand: '<red>请先把要保存的物品拿在主手上。'
item-saved: '<green>已将主手物品保存为 <white><item></white>。'
reload-success: '<green>配置已重载，共载入 <white><count></white> 个礼包。存储连接设置需重启服务器后生效。'
reset-success: '<green>已重置玩家 <white><player></white> 的礼包 <white><gift></white>。'
player-not-found: '<red>找不到玩家 <white><player></white>，离线玩家请填写 UUID。'
gift-list-header: '<aqua>已载入礼包（<count>）：'
gift-list-entry: '<gray>- <white><id></white>：<display_name>'
reward-error: '<red>礼包已记录领取，但部分奖励发放失败，请联系管理员。'
gui-saved: '<green>已保存礼包 <white><gift></white> 并重载配置。'
gui-save-failed: '<red>保存失败，请查看控制台日志。'
gui-deleted: '<green>已删除礼包 <white><gift></white>。'
gui-prompt-name: '<yellow>请在聊天栏输入新的显示名称（支持 MiniMessage），输入 cancel 取消。'
gui-prompt-permission: '<yellow>请输入权限节点，输入 none 清空，输入 cancel 取消。'
gui-prompt-newid: '<yellow>请输入新礼包 ID（小写字母、数字、下划线、连字符），输入 cancel 取消。'
gui-prompt-command: '<yellow>请输入命令（不含前导斜杠），输入 cancel 取消。'
gui-prompt-item: '<yellow>请输入：<white>物品ID 数量</white>，输入 cancel 取消。'
gui-invalid-id: '<red>礼包 ID 无效，只能包含小写字母、数字、下划线和连字符。'
gui-duplicate-id: '<red>礼包 ID <white><gift></white> 已存在。'
gui-item-missing: '<red>未找到已保存的物品 <white><item></white>，请先用 /cloudgift add 保存。'
gui-items-added: '<green>已保存 <white><count></white> 项物品奖励，并返还 <white><returned></white> 组原物品。'
gui-item-add-failed: '<red>保存物品奖励失败，本次内容仍保留在 GUI 中，请查看控制台日志。'
gui-item-remove-failed: '<red>移除物品奖励失败，原奖励已保留，请查看控制台日志。'
gui-rewards-full: '<red>该礼包已有 45 项奖励，请先删除一项再添加。'
gui-item-input-empty: '<yellow>请先把至少一件物品放入 GUI 的前 45 格。'
gui-item-input-too-many: '<red>GUI 中有 <white><count></white> 项物品，但该礼包只剩 <white><remaining></white> 个奖励位置。'
gui-item-input-returned: '<yellow>已返还物品投放 GUI 中的 <white><count></white> 组物品。'

# 命令帮助和参数错误消息。命令模块只引用这里的键，修改后执行 /cloudgift reload 即可生效。
help:
  header: '<aqua>CloudGift 可用命令：'
  command:
    help: '<gray>/cloudgift help <dark_gray>- 查看命令帮助'
    reload: '<gray>/cloudgift reload <dark_gray>- 重载配置和礼包'
    menu: '<gray>/cloudgift menu <dark_gray>- 打开礼包编辑菜单'
    add: '<gray>/cloudgift add <物品ID> <dark_gray>- 保存主手物品'
    remove: '<gray>/cloudgift remove <玩家名或UUID> <礼包ID> <dark_gray>- 移除领取记录'
    claim: '<gray>/cloudgift claim <礼包ID> <dark_gray>- 领取礼包'
    list: '<gray>/cloudgift list <dark_gray>- 查看已载入的礼包'
command:
  unknown: '<red>未知命令：<white><command></white>。'
  no-permission: '<red>你没有执行 <white><command></white> 所需的权限 <white><permission></white>。'
  help:
    usage: '<yellow>用法：/cloudgift help'
  reload:
    usage: '<yellow>用法：/cloudgift reload'
    failed: '<red>重载失败，请查看控制台日志。'
  menu:
    usage: '<yellow>用法：/cloudgift menu'
  add:
    usage: '<yellow>用法：/cloudgift add <物品ID>'
    failed: '<red>保存物品失败，请查看控制台日志。'
  remove:
    usage: '<yellow>用法：/cloudgift remove <玩家名或UUID> <礼包ID>'
  claim:
    usage: '<yellow>用法：/cloudgift claim <礼包ID>'
  list:
    usage: '<yellow>用法：/cloudgift list'`
      },
      {
        name: 'items.yml',
        description: '完整保存物品仓库；初始为空',
        language: 'yaml',
        code: String.raw`# 使用 /cloudgift add <物品ID> 保存主手物品后，本文件会自动写入物品数据。
# 在礼包奖励 GUI 中直接放入物品时，会自动生成 __cloudgift_gui_ 开头的内部物品 ID。
# 修改已有条目后执行 /cloudgift reload 生效；不要删除仍被礼包 YAML 引用的物品。
items: {}`
      },
      {
        name: 'gifts/novice.yml',
        description: '首次安装生成的新手礼包示例',
        language: 'yaml',
        code: String.raw`# 新手礼包示例：每个 YAML 文件可以只维护一个或多个礼包。
# 修改后执行 /cloudgift reload；礼包 ID 必须在整个 gifts 目录内保持唯一。
gifts:
  novice:
    # 显示名称支持 MiniMessage 格式。
    display-name: '<green>新手礼包'
    # 留空表示不额外要求权限。
    permission: ''
    # 冷却时间单位为小时，默认值：24；0 表示领取后可以立即再次领取。
    cooldown-hours: 24
    # 是否跨过下一自然日 00:00 后立即刷新；允许 true/false，默认 false。
    # 开启时忽略 cooldown-hours，自然日使用 config.yml 的 time.zone-id；支持热重载。
    reset-at-midnight: false
    # 累计领取次数上限，0 表示无限。
    max-claims: 1
    rewards:
      - type: command
        command: 'xp add %player% 5 levels'`
      },
      {
        name: 'gifts/monthly.yml',
        description: '首次安装生成的跨零点刷新礼包示例',
        language: 'yaml',
        code: String.raw`# 月卡礼包示例：可以继续在 gifts 目录中创建更多 .yml 或 .yaml 文件。
# 修改后执行 /cloudgift reload；不要在不同文件中使用相同的礼包 ID。
gifts:
  monthly:
    # 显示名称支持 MiniMessage 格式。
    display-name: '<gold>月卡礼包'
    # 领取所需权限；留空表示不额外要求权限。
    permission: cloudgift.gift.monthly
    # 冷却时间单位为小时，默认值：24。
    cooldown-hours: 24
    # true 表示进入下一自然日的 00:00 后即可再次领取；默认 false，本示例启用。
    # 开启时忽略 cooldown-hours，自然日使用 config.yml 的 time.zone-id；支持热重载。
    reset-at-midnight: true
    # 累计领取次数上限；0 表示无限。
    max-claims: 0
    # 奖励按列表顺序执行。
    rewards:
      - type: command
        command: 'give %player% diamond 3'`
      },
      {
        name: 'gifts.yml',
        description: '旧版根目录兼容模板；JAR 内置但新安装默认不生成',
        language: 'yaml',
        code: String.raw`# 礼包配置入口：旧版本可以继续使用本文件；推荐把礼包拆分到 plugins/CloudGift/gifts/ 下。
# gifts/ 目录会递归读取所有 .yml 和 .yaml 文件，文件名可以自定义，修改后执行 /cloudgift reload。
# 目录中的礼包优先于本文件；同一个礼包 ID 只能生效一次，重复 ID 会保留目录中先读取的定义。
# 每个拆分文件都使用下面的 gifts: 顶层结构，文件夹不存在时插件会自动创建。
gifts:
  novice:
    # 显示名称支持 MiniMessage 格式，例如 <green>新手礼包。
    display-name: '<green>新手礼包'
    # 领取所需权限；留空表示所有拥有领取命令权限的玩家都可以领取。
    permission: ''
    # 两次成功领取之间的冷却时间，单位：小时；允许 0，默认值：24。
    cooldown-hours: 24
    # 是否在进入下一自然日后立即刷新；允许 true/false，默认 false；开启时忽略 cooldown-hours。
    # 自然日按 config.yml 的 time.zone-id 判断，修改后执行 /cloudgift reload 生效。
    reset-at-midnight: false
    # 每位玩家累计可领取的总次数；0 表示不限次数，次数上限优先于冷却时间。
    max-claims: 1
    # 奖励按列表顺序发放；command 执行控制台命令，item 引用 items.yml 中保存的物品。
    rewards:
      - type: command
        command: 'xp add %player% 5 levels'

  monthly:
    # 显示名称支持 MiniMessage 格式。
    display-name: '<gold>月卡礼包'
    # 领取所需权限；留空表示不额外要求权限。
    permission: cloudgift.gift.monthly
    # 冷却时间单位为小时，默认值：24。
    cooldown-hours: 24
    # true 表示进入下一自然日的 00:00 后即可再次领取；默认 false，本示例启用。
    # 开启时忽略 cooldown-hours，自然日使用 config.yml 的 time.zone-id；支持热重载。
    reset-at-midnight: true
    # 累计领取次数上限；0 表示无限。
    max-claims: 0
    # 奖励按列表顺序执行。
    rewards:
      - type: command
        command: 'give %player% diamond 3'
      # 先执行 /cloudgift add monthly_bonus 保存主手物品，再取消下方三行的注释。
      # - type: item
      #   item: monthly_bonus
      #   amount: 1`
      }
    ],
    note: 'gifts/ 目录按相对路径不区分大小写排序并递归加载，随后才读取根目录 gifts.yml、gifts.yaml；重复 ID 保留先载入项。GUI 新建礼包写入 gifts/<id>.yml，编辑已有礼包写回原文件，保存使用临时文件并优先原子替换。'
  },
  operations: {
    intro: '领取记录是权威数据。上线时应重点确认存储类型、跨服节点的一致配置、重载边界，以及奖励失败不会回滚已提交领取记录这一行为。',
    tables: [
      {
        title: '数据库结构',
        headers: ['对象', '字段或约束', '行为'],
        rows: [
          ['<table-prefix>claims', 'player_uuid、gift_id、last_claim、claim_token、claim_count', 'player_uuid + gift_id 为主键；每位玩家每个礼包只保存一条记录。'],
          ['last_claim', '毫秒时间戳', '精确冷却使用 last_claim + cooldown；自然日模式使用配置时区计算下一日 00:00。'],
          ['claim_count', '非负整数', '每次成功领取原子加 1；达到 max-claims 后优先返回次数耗尽。'],
          ['条件 UPDATE', 'claim_count < limit 且 last_claim <= cutoff', '次数与冷却在同一 SQL 中校验，避免两个子服同时通过先查后写。'],
          ['首次 INSERT', '依赖玩家+礼包唯一键', '并发首次领取只有一个节点插入成功，竞争失败者读取胜者记录并返回冷却或次数状态。']
        ]
      },
      {
        title: '存储实现',
        headers: ['模式', '位置或驱动', '连接行为'],
        rows: [
          ['sqlite', 'plugins/CloudGift/data.db / SQLite JDBC', '固定最大池 1、最小空闲 1、busy timeout 5000ms，适合单服。'],
          ['mysql', 'MySQL Connector/J / jdbc:mysql', 'HikariCP 池大小来自 storage.pool，适合共享数据库。'],
          ['mariadb', 'MySQL Connector/J / jdbc:mysql', '与 mysql 分支相同；当前版本没有 MariaDB 专用驱动或 URL。']
        ]
      }
    ],
    notes: [
      {
        title: '重载与文件边界',
        items: [
          '/cloudgift reload 会重读 time、placeholder、data、messages.yml、items.yml 和全部礼包文件，并原子替换内存中的礼包快照。',
          'storage.type、table-prefix、MySQL 地址、账号密码和连接池参数只在插件启用时创建连接池；修改后必须完整重启服务器。',
          '新安装只有在根目录 gifts.yml 不存在且 gifts/ 目录也不存在时，才生成 novice.yml 与 monthly.yml；升级旧服不会覆盖或自动拆分已有礼包。',
          '礼包 ID 只能使用 [a-z0-9_-]+ 且最长 128 字符。无效 YAML、无效礼包或无效奖励会记录文件路径并跳过，不会覆盖其他已载入定义。'
        ]
      },
      {
        title: '并发、性能与奖励',
        items: [
          '领取、玩家预载和管理员重置均在 Bukkit 异步任务中访问数据库；主线程只处理玩家、GUI、缓存更新和奖励发放。',
          '同一节点使用 in-flight 集合拦截同一玩家对同一礼包的重复点击；跨节点依靠条件 UPDATE、事务和唯一键竞争。',
          '领取记录先提交，随后回到主线程发奖。部分奖励失败时显示 reward-error，但不会删除记录或自动补发，管理员应根据日志人工处理。',
          '物品数量超过单堆上限时自动拆分；背包溢出的物品自然掉落到玩家脚下。GUI 投放界面关闭、取消或玩家退出时会返还物品，背包溢出同样掉落。',
          '礼包编辑器列表当前只展示排序后的前 45 个礼包且没有分页；每个礼包也最多维护 45 项奖励。礼包数量更多时应直接编辑 YAML。',
          '插件停用时清理缓存、编辑草稿与临时 GUI 物品，并关闭 HikariCP 数据源。'
        ]
      },
      {
        title: '升级与群组服检查',
        items: [
          '从没有 claim_count 的旧数据表升级时，插件启动会自动 ALTER TABLE 添加字段，默认值为 0；原有领取时间保留，历史领取次数不会反推。',
          '群组服所有节点必须保持礼包 ID、奖励、max-claims、reset-at-midnight 和 time.zone-id 一致，否则数据库仍能防止重复写入，但各节点可能显示或发放不同内容。',
          '切换 storage.type 或 table-prefix 不会自动迁移旧数据库数据；部署前应自行备份并迁移对应 claims 表。',
          '作者：MoutainSeaL；反馈 QQ：3643203568；QQ群：342097496。'
        ]
      }
    ]
  }
};

plugin.icon = Gift;

export default plugin;
