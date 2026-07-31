import { CircleHelp } from '@lucide/vue';

const plugin = {
  order: 2,
  slug: 'cloudask',
  name: 'CloudAsk',
  title: '云问答',
  category: '互动玩法',
  version: '1.0-SNAPSHOT',
  repository: 'https://github.com/BalanceSea/CloudAsk',
  minecraft: '1.20.1',
  server: 'Spigot / Paper',
  tone: 'cyan',
  summary: '支持聊天抢答、自动题库、Cron 调度、独立奖励与 Redis 群组服同步的问答插件。',
  keywords: '问答 抢答 聊天 自动问答 Cron Redis 群组服 奖励 Spigot Paper',
  intro: '面向生存服、小游戏服和群组服的聊天问答系统。管理员可以手动发布问题，也可以通过独立题库按固定间隔或 Cron 自动出题；玩家直接在聊天栏作答，首位正确回答者在所在子服获得该题专属的控制台命令奖励。',
  toc: [
    ['overview', '插件概览'],
    ['features', '核心功能'],
    ['installation', '安装依赖'],
    ['commands', '命令权限'],
    ['placeholders', '变量与格式'],
    ['configuration', '全部配置'],
    ['operations', '运维升级']
  ],
  features: [
    ['聊天抢答', '玩家无需输入命令，直接发送聊天消息即可参与。答案可忽略大小写、首尾空白和连续空白；只有与当前答案完全匹配的消息才会提交抢答。'],
    ['自动题库与 Cron', 'automatic.yml 独立管理题库，支持随机不连续重复、顺序循环、固定间隔，以及 UNIX 5 段或 Quartz 6/7 段 Cron 与指定时区。'],
    ['Redis 群组服同步', '所有子服共享当前问题和广播事件。Lua 脚本原子完成答案校验与胜者登记，即使多个子服同时答对也只会产生一位胜者。'],
    ['每题独立奖励', '每道自动题拥有独立 rewards 命令列表，并随问题同步到其他子服；手动题使用 config.yml 的默认奖励。奖励只在获胜玩家实际所在的插件实例执行一次。']
  ],
  acquisition: {
    title: '运行模式与调度边界',
    headers: ['模式', '需要 Redis', '行为'],
    rows: [
      ['local', '否', '问题、答案和奖励仅在当前服务器生效，适合单服。'],
      ['redis', '是', '同一 namespace 的子服共享问题、作答和结果；Redis 不可用时拒绝发布或判定，不会回退成本地模式。'],
      ['interval', '否', '自动题在启动延迟后发布，并按固定秒数重复；有活动问题时按重试间隔等待。'],
      ['cron', '否', '按指定时区计算下一次 Cron 时间；有活动问题时保留本次触发并延后重试，不积压所有错过的触发。']
    ]
  },
  installation: {
    lead: '源码使用 Java 17 工具链、Spigot API 1.20.1 与 api-version 1.20；精确验证目标为 Spigot/Paper 1.20.1，其他版本未声明兼容。',
    steps: [
      ['安装插件 JAR', '将唯一构建产物 CloudAsk-1.0-SNAPSHOT.jar 放入 plugins/，不要解压或二次打包。'],
      ['首次联网启动', 'Spigot/Paper LibraryLoader 根据 plugin.yml 从 Maven Central 下载 Jedis 5.2.0、Gson 2.11.0 和 cron-utils 9.2.1；下载失败时插件无法加载。'],
      ['生成并配置文件', '启动后生成 plugins/CloudAsk/config.yml 与 automatic.yml。单服可保留 mode: local；自动题默认关闭。'],
      ['配置群组服', '所有子服改为 mode: redis，连接同一 Redis database 与 namespace，并为每台子服设置清晰的 server-id，然后重启或执行 /cloudask reload。']
    ],
    dependencies: [
      ['Java 17', '运行环境', '低于 Java 17 无法加载插件。'],
      ['Spigot/Paper 1.20.1', '服务端 API', '其他 Minecraft 或服务端版本没有经过当前源码声明与验证。'],
      ['Redis', 'redis 模式外部服务', '连接失败时群组发布、同步和抢答判定不可用；local 模式不需要 Redis。'],
      ['Jedis 5.2.0 / Gson 2.11.0 / cron-utils 9.2.1', 'LibraryLoader 运行库', '由服务端从 Maven Central 解析；下载或解析失败时插件无法加载。']
    ],
    note: 'plugin.yml 没有 depend 或 softdepend，因此没有必须手动安装的前置插件。Redis 不是 Bukkit 插件，只在启用 redis 模式时需要；三个 Java 依赖不在插件 JAR 内，首次加载必须能访问 Maven Central，之后是否需要联网取决于服务端本地依赖缓存。'
  },
  aliases: '/cask',
  commandHeaders: ['命令', '执行者', '权限', '默认授权', '行为'],
  commands: [
    ['/cloudask', '玩家或控制台', '无', '所有人', '显示帮助、停止、状态和重载用法。'],
    ['/cloudask help', '玩家或控制台', '无', '所有人', '与无参数命令相同。'],
    ['/cloudask ask <答案> <问题...>', '玩家或控制台', 'cloudask.ask', 'OP', '发布单词答案的问题；使用 config.yml 的默认奖励。'],
    ['/cloudask ask <多词答案> | <问题...>', '玩家或控制台', 'cloudask.ask', 'OP', '竖线必须作为独立参数，用于分隔多词答案与问题。'],
    ['/cloudask stop', '玩家或控制台', 'cloudask.admin', 'OP', '原子停止当前问题，并向所有相关服务器广播取消消息。'],
    ['/cloudask status', '玩家或控制台', '无', '所有人', '显示当前问题、来源服务器与剩余秒数。'],
    ['/cloudask reload', '玩家或控制台', 'cloudask.admin', 'OP', '重载 config.yml，重新连接后端，并重新读取 automatic.yml 和建立调度任务。']
  ],
  permissions: [
    ['cloudask.answer', 'true', '允许玩家通过聊天参与当前问题。'],
    ['cloudask.ask', 'op', '允许手动发布问题。'],
    ['cloudask.admin', 'op', '允许停止问题和重载插件配置。']
  ],
  placeholders: {
    intro: '插件不接入 PlaceholderAPI。下列变量仅用于 config.yml 消息模板或奖励命令，替换发生在插件内部。',
    noteTitle: '变量作用域与安全',
    note: '奖励命令以控制台身份执行，配置者应只使用可信命令。{question} 和 {asker} 可能包含管理员配置或命令输入的文本；不要把它们拼接到会改变权限、执行脚本或解释特殊语法的外部命令中。',
    tables: [
      {
        title: '奖励命令变量',
        headers: ['变量', '返回值', '示例'],
        rows: [
          ['{player}', '获胜玩家当前名称', 'Steve'],
          ['{uuid}', '获胜玩家 UUID', '8667ba71-b85a-4004-af54-457a9734eed7'],
          ['{question}', '本题问题文本', '6 × 7 等于多少？'],
          ['{asker}', '手动发布者名称或 automatic.yml 的 asker-name', '自动问答'],
          ['{server}', '获胜玩家所在子服的 server-id', 'survival']
        ]
      },
      {
        title: '消息模板变量',
        headers: ['配置路径', '可用变量', '行为'],
        rows: [
          ['messages.question', '{question}、{seconds}、{server}、{asker}', '问题开始时广播。'],
          ['messages.answered', '{player}、{answer}、{question}、{server}、{elapsed}', '首位正确回答后广播，elapsed 保留一位小数。'],
          ['messages.expired', '{answer}、{question}', '题目超时约 0.5 秒后广播。'],
          ['messages.busy', '{question}', '手动发布时已有问题则发送给命令执行者。'],
          ['messages.status', '{question}、{seconds}、{server}', '执行 status 时发送给执行者。']
        ]
      }
    ]
  },
  configuration: {
    intro: '插件读取并生成 2 个 YAML：主配置 config.yml 与自动题库 automatic.yml。下表覆盖所有固定叶子路径与 questions[] 动态条目，随后原样展示两份默认文件。',
    warning: 'config.yml / redis.password 是敏感凭据。默认文件使用空字符串；部署时不要把真实密码提交到公开仓库或发送到公开日志。',
    inventory: [
      ['config.yml', '运行模式、答案匹配、手动奖励、Redis 与消息', '执行 /cloudask reload', 'redis.password、redis.username'],
      ['automatic.yml', '自动调度、题库与每题独立奖励', '执行 /cloudask reload', '否']
    ],
    referenceHeaders: ['文件与路径', '类型', '默认值', '允许值或范围', '必填', '生效方式', '完整说明'],
    references: [
      {
        title: '主配置 config.yml',
        rows: [
          ['config.yml / mode', '枚举字符串', 'local', 'local / redis；其他值回退 local 并警告', '否', '/cloudask reload', '选择单服内存后端或 Redis 群组后端。Redis 故障时不会自动降级，避免分服重复发奖。'],
          ['config.yml / server-id', '字符串', 'auto', 'auto、空值或任意非空名称', '否', '/cloudask reload', 'auto 与空值转换为 server-<服务端端口>；用于来源显示和奖励 {server}。群组服建议显式配置。'],
          ['config.yml / question.timeout-seconds', '整数（秒）', '60', '运行时最小 5', '否', '/cloudask reload；影响新题', '每道新问题的有效期；Redis 活动键使用相同 TTL。'],
          ['config.yml / question.cancel-correct-answer-message', '布尔值', 'true', 'true / false', '否', '/cloudask reload', '正确答案形态匹配时是否取消原聊天消息，避免答案先显示在公共聊天。'],
          ['config.yml / question.ignore-case', '布尔值', 'true', 'true / false', '否', '/cloudask reload', '是否使用 Locale.ROOT 忽略英文字母大小写。群组服各节点应保持一致。'],
          ['config.yml / question.trim', '布尔值', 'true', 'true / false', '否', '/cloudask reload', '比较前是否移除首尾空白。'],
          ['config.yml / question.collapse-spaces', '布尔值', 'true', 'true / false', '否', '/cloudask reload', '比较前是否将连续空白字符压缩为一个普通空格。'],
          ['config.yml / rewards.commands[]', '字符串列表', 'give {player} diamond 1', '任意控制台命令；可为空；不要写开头 /', '否', '/cloudask reload；影响之后的手动题', '仅供 /cloudask ask 创建的题目使用。发布时复制进题目，之后修改不会改变已经进行中的题。'],
          ['config.yml / redis.host', '字符串', '127.0.0.1', 'Redis 主机名或 IP', 'redis 模式必填', '/cloudask reload', 'Redis 单机连接地址。当前版本没有 Sentinel 或 Cluster 配置。'],
          ['config.yml / redis.port', '整数', '6379', '有效 TCP 端口', 'redis 模式必填', '/cloudask reload', 'Redis 服务端口。'],
          ['config.yml / redis.username', '字符串（敏感）', '空', 'Redis ACL 用户名；空表示不发送用户名', '否', '/cloudask reload', 'Redis 6+ ACL 用户。不要公开真实值。'],
          ['config.yml / redis.password', '字符串（敏感）', '空', 'Redis 密码；空表示不认证', '否', '/cloudask reload', 'Redis 密码或 ACL 密码。不要公开真实值。'],
          ['config.yml / redis.database', '整数', '0', '服务端允许的逻辑数据库编号', '否', '/cloudask reload', '所有子服必须一致。'],
          ['config.yml / redis.ssl', '布尔值', 'false', 'true / false', '否', '/cloudask reload', '是否使用 TLS 连接 Redis。'],
          ['config.yml / redis.timeout-millis', '整数（毫秒）', '3000', '运行时最小 500', '否', '/cloudask reload', '连接和 Socket 超时；订阅断开后每 2 秒重连。'],
          ['config.yml / redis.namespace', '字符串', 'cloudask', '建议使用非空且同群组唯一的前缀', '否', '/cloudask reload', '生成 <namespace>:active Hash 与 <namespace>:events Pub/Sub 频道；空白值回退 cloudask。'],
          ['config.yml / messages.prefix', 'Legacy & 颜色字符串', '&8[&bCloudAsk&8] &r', '任意字符串', '否', '/cloudask reload', '除问题主体外，多数插件消息使用此前缀。'],
          ['config.yml / messages.question', 'Legacy & 颜色字符串', '见完整文件', '支持换行与问题变量', '否', '/cloudask reload', '新题广播主体，不自动附加 prefix。'],
          ['config.yml / messages.answered', 'Legacy & 颜色字符串', '见完整文件', '支持回答结果变量', '否', '/cloudask reload', '正确回答结果广播。'],
          ['config.yml / messages.expired', 'Legacy & 颜色字符串', '见完整文件', '支持 {answer}、{question}', '否', '/cloudask reload', '无人答对且超时后的广播。'],
          ['config.yml / messages.cancelled', 'Legacy & 颜色字符串', '&c本题已被管理员停止。', '任意字符串', '否', '/cloudask reload', '管理员停止问题时广播。'],
          ['config.yml / messages.started', 'Legacy & 颜色字符串', '&a问题已发布。', '任意字符串', '否', '/cloudask reload', '手动发布成功时仅回复执行者。'],
          ['config.yml / messages.busy', 'Legacy & 颜色字符串', '见完整文件', '支持 {question}', '否', '/cloudask reload', '已有活动问题时回复手动发布者。'],
          ['config.yml / messages.no-active', 'Legacy & 颜色字符串', '&c当前没有进行中的问题。', '任意字符串', '否', '/cloudask reload', 'stop 或 status 没有活动问题时回复。'],
          ['config.yml / messages.stopped', 'Legacy & 颜色字符串', '&a已停止当前问题。', '任意字符串', '否', '/cloudask reload', '停止成功时回复管理员。'],
          ['config.yml / messages.status', 'Legacy & 颜色字符串', '见完整文件', '支持 {question}、{seconds}、{server}', '否', '/cloudask reload', '当前问题状态。'],
          ['config.yml / messages.reloaded', 'Legacy & 颜色字符串', '见完整文件', '任意字符串', '否', '下一次 /cloudask reload', '重载完成后使用新配置发送。'],
          ['config.yml / messages.backend-error', 'Legacy & 颜色字符串', '见完整文件', '任意字符串', '否', '/cloudask reload', 'Redis 或后端操作异常时提示。'],
          ['config.yml / messages.no-permission', 'Legacy & 颜色字符串', '&c你没有权限执行此命令。', '任意字符串', '否', '/cloudask reload', '权限检查失败消息。'],
          ['config.yml / messages.usage', 'Legacy & 颜色字符串', '见完整文件', '任意字符串', '否', '/cloudask reload', 'ask 参数无效或显示基础用法时发送。']
        ]
      },
      {
        title: '自动题库 automatic.yml',
        rows: [
          ['automatic.yml / enabled', '布尔值', 'false', 'true / false', '否', '/cloudask reload', '是否创建自动问答任务；文件无论是否启用都会在缺失时生成。'],
          ['automatic.yml / schedule.mode', '枚举字符串', 'interval', 'interval / cron；其他值回退 interval 并警告', '否', '/cloudask reload', '选择固定间隔或 Cron 调度。'],
          ['automatic.yml / schedule.initial-delay-seconds', '整数（秒）', '30', 'interval 模式运行时最小 1', '否', '/cloudask reload', 'interval 模式从任务创建到首次尝试的延迟；cron 模式忽略。'],
          ['automatic.yml / schedule.interval-seconds', '整数（秒）', '300', 'interval 模式运行时最小 5', '否', '/cloudask reload', '一次发布尝试后到下一次尝试的固定间隔；cron 模式忽略。'],
          ['automatic.yml / schedule.cron', 'Cron 字符串', '0 0/5 * * * ?', 'UNIX 5 段或 Quartz 6/7 段', 'cron 模式必填', '/cloudask reload', '字段数自动决定解析规则；表达式无效或不存在未来时间时自动问答不启动。'],
          ['automatic.yml / schedule.timezone', 'IANA 时区字符串', 'Asia/Shanghai', 'ZoneId 可识别值，如 UTC', 'cron 模式必填', '/cloudask reload', 'Cron 下一次执行时间的计算时区；无效时自动问答不启动。'],
          ['automatic.yml / schedule.retry-when-busy-seconds', '整数（秒）', '10', '运行时最小 1', '否', '/cloudask reload', '到点但已有问题时的再次检查间隔。Cron 本次触发会保留到空闲。'],
          ['automatic.yml / order', '枚举字符串', 'random', 'random / sequential；非 sequential 均按 random', '否', '/cloudask reload', '随机模式避免同一插件实例连续抽到同一题；顺序模式循环题库。'],
          ['automatic.yml / asker-name', '字符串', '自动问答', '非空文本；空白回退自动问答', '否', '/cloudask reload', '写入题目发布者并供 {asker} 奖励变量使用。'],
          ['automatic.yml / questions[].question', '字符串', '见完整文件', '非空文本', '每个条目必填', '/cloudask reload', '广播给玩家的问题；缺失或空白会跳过该条目。'],
          ['automatic.yml / questions[].answer', '字符串或 YAML 标量', '见完整文件', '转换后为非空文本', '每个条目必填', '/cloudask reload', '正确答案；数字也会转成字符串，并按 config.yml 的答案规则归一化。'],
          ['automatic.yml / questions[].rewards[]', '字符串列表', '每题不同，见完整文件', '任意控制台命令；可省略或为空', '否', '/cloudask reload', '该题独立奖励；省略或 [] 表示无奖励。发布时随题目进入 Redis，不读取其他子服本地默认奖励。']
        ]
      }
    ],
    files: [
      {
        name: 'config.yml',
        description: '主配置：运行模式、答案规则、Redis、手动奖励与消息',
        language: 'yaml',
        code: String.raw`# local: 仅当前服务器；redis: 所有连接到同一 Redis 和频道的子服
mode: local

# auto 会使用服务端监听端口生成标识。群组服建议为每个子服填写固定且唯一的名称。
server-id: auto

question:
  # 每道题允许玩家回答的时间，单位为秒，最小值为 5。
  timeout-seconds: 60
  # 玩家输入正确答案后，是否阻止该答案作为普通聊天消息发送。
  cancel-correct-answer-message: true
  # 比较答案时是否忽略英文字母大小写。
  ignore-case: true
  # 比较答案前是否移除答案首尾的空白字符。
  trim: true
  # 比较答案时是否将连续空白字符视为一个空格。
  collapse-spaces: true

# 手动使用 /cloudask ask 发布问题时采用的默认奖励。
# 命令由控制台在获胜玩家所在的子服执行，不要填写开头的 /。
# 可用变量：{player}、{uuid}、{question}、{asker}、{server}
rewards:
  commands:
    - "give {player} diamond 1"

redis:
  host: 127.0.0.1
  port: 6379
  username: ""
  password: ""
  database: 0
  ssl: false
  timeout-millis: 3000
  # 所有子服必须保持一致；不同群组可使用不同命名空间。
  namespace: cloudask

messages:
  prefix: "&8[&bCloudAsk&8] &r"
  question: "&6&m------------------------------\n&a新问题 &7(来自 {server})\n&f{question}\n&7请直接在聊天栏输入答案，限时 &e{seconds} 秒&7。\n&6&m------------------------------"
  answered: "&a{player} &f回答正确！答案：&e{answer} &7(用时 {elapsed} 秒)"
  expired: "&c本题已超时，无人答对。答案：&e{answer}"
  cancelled: "&c本题已被管理员停止。"
  started: "&a问题已发布。"
  busy: "&c当前已有进行中的问题：&f{question}"
  no-active: "&c当前没有进行中的问题。"
  stopped: "&a已停止当前问题。"
  status: "&e当前问题：&f{question} &7| 剩余 &f{seconds} &7秒 | 来源 &f{server}"
  reloaded: "&a配置已重载。跨服模式的连接配置会立即重新加载。"
  backend-error: "&c跨服服务暂时不可用，请检查 Redis 连接。"
  no-permission: "&c你没有权限执行此命令。"
  usage: "&e/cloudask ask <答案> <问题> &7或 &e/cloudask ask <多词答案> | <问题>"`
      },
      {
        name: 'automatic.yml',
        description: '自动配置：调度方式、Cron、题库与每题独立奖励',
        language: 'yaml',
        code: String.raw`# 是否启用自动问答。
enabled: false

schedule:
  # interval: 按固定间隔发布；cron: 按 Cron 表达式发布。
  mode: interval

  # interval 模式：插件启动后多久发布第一题，单位为秒。
  initial-delay-seconds: 30
  # interval 模式：两次自动发布之间的时间，单位为秒，最小值为 5。
  interval-seconds: 300

  # cron 模式：支持 UNIX 5 段或 Quartz 6/7 段表达式。
  # 以下 Quartz 示例表示每 5 分钟的第 0 秒执行一次。
  cron: "0 0/5 * * * ?"
  # Cron 计算使用的时区，例如 Asia/Shanghai、UTC。
  timezone: "Asia/Shanghai"

  # 到达发布时间但已有问题进行时，多久后再次尝试，单位为秒。
  retry-when-busy-seconds: 10

# random: 随机抽题且避免连续重复；sequential: 按下方顺序循环。
order: random
# 自动问题的发布者名称，可用于消息及奖励命令中的 {asker}。
asker-name: "自动问答"

# 自动题库。每道题使用自己的 rewards；不填写或填写 [] 代表该题无奖励。
# 可用变量：{player}、{uuid}、{question}、{asker}、{server}。
questions:
  - question: "Minecraft 中钻石矿通常需要使用什么等级以上的镐挖掘？"
    answer: "铁镐"
    rewards:
      - "give {player} iron_ingot 8"
      - "give {player} experience_bottle 4"
  - question: "6 × 7 等于多少？"
    answer: "42"
    rewards:
      - "give {player} diamond 2"`
      }
    ],
    note: '群组服的所有节点必须使用相同 Redis database 与 namespace，并建议保持答案匹配配置一致。每台子服的 server-id 应清晰可辨；奖励使用随机实例 ID 防重，即使 server-id 误重复也不会由两个实例同时执行。'
  },
  operations: {
    intro: '插件没有数据库文件；群组状态由 Redis 短期保存。上线时应重点检查 Redis 可用性、配置重载边界和自动题库升级行为。',
    tables: [
      {
        title: 'Redis 对象',
        headers: ['键或频道', '类型', '保存内容', '生命周期'],
        rows: [
          ['<namespace>:active', 'Hash', '问题、标准化答案、发布者、来源、独立奖励、创建与过期时间', '按 question.timeout-seconds 设置 TTL；答对或取消时立即删除。'],
          ['<namespace>:events', 'Pub/Sub', 'STARTED、ANSWERED、CANCELLED 的 JSON 事件', '不持久化；订阅重连后主动读取 active 补回正在进行的问题。']
        ]
      }
    ],
    notes: [
      {
        title: '性能与一致性',
        items: [
          '普通聊天只在本地标准化结果与正确答案一致时才提交后端，不会让每条聊天都访问 Redis。',
          'Redis 使用一个常驻订阅连接和独立 I/O 线程；断线后每 2 秒重连，并在订阅恢复后同步当前问题。',
          'Lua 脚本原子完成问题互斥和胜者登记；Redis 不可用时明确失败，不切换到可能造成重复奖励的本地后端。',
          '自动任务每秒检查一次到期时间；Cron 的月份、星期、闰日和时区计算交由 cron-utils。'
        ]
      },
      {
        title: '重载与升级',
        items: [
          '/cloudask reload 会取消旧自动任务、关闭旧 Redis 连接、重新读取 config.yml 与 automatic.yml，并创建新后端与新调度。',
          'redis 模式重载后会从 Redis 恢复仍有效的问题；local 模式重载会丢弃当前内存问题，应避开活动题执行。',
        ]
      }
    ]
  }
};

plugin.icon = CircleHelp;

export default plugin;
