import { Badge } from '@lucide/vue';

const plugin = {
  "order": 1,
  "slug": "cloudtitle",
  "name": "CloudTitle",
  "title": "云称号",
  "category": "玩法内容",
  "version": "1.0-SNAPSHOT",
  "minecraft": "1.20+",
  "server": "Paper",
  "tone": "blue",
  "summary": "称号仓库、商城、自定义称号、原版 Buff 与六种获取条件的一体化称号系统。",
  "keywords": "称号 商城 仓库 自定义 Buff PlaceholderAPI SQLite MySQL Vault PlayerPoints CraftEngine",
  "intro": "面向 Paper 1.20+ 生存服、会员服和群组服的完整称号系统。玩家通过称号仓库、商城与工坊管理身份展示，管理员可以组合金币、点券、权限、物品和 PAPI 数值条件，并为称号附加原版药水 Buff。",
  "toc": [
    [
      "overview",
      "插件概览"
    ],
    [
      "features",
      "核心功能"
    ],
    [
      "installation",
      "安装依赖"
    ],
    [
      "commands",
      "命令权限"
    ],
    [
      "placeholders",
      "变量与动作"
    ],
    [
      "configuration",
      "全部配置"
    ],
    [
      "operations",
      "运维升级"
    ]
  ],
  "features": [
    [
      "仓库、商城与工坊",
      "三个独立 TrMenu 风格 GUI，支持字符布局、动态称号槽、MiniMessage、翻页、点击类型、命令动作和 0 - 5000ms 点击冷却。"
    ],
    [
      "六种获取条件",
      "支持 Vault 金币、PlayerPoints 点券、权限、免费领取、PAPI BigDecimal 数值比较，以及原版或 CraftEngine 物品分段提交。"
    ],
    [
      "显示与原版 Buff",
      "提供 Legacy 彩色、MiniMessage、纯文本、描述和 ID 变量。Buff 只清除插件记录的同等级效果，不删除其他系统后来施加的更高等级效果。"
    ],
    [
      "SQLite / MySQL 跨服",
      "数据库 I/O 在专用异步线程执行。共享 MySQL 保存拥有状态、选择、自定义称号和提交进度；每台子服必须使用唯一 server-id。"
    ]
  ],
  "acquisition": {
    "title": "商城获取类型",
    "headers": [
      "类型",
      "依赖",
      "行为"
    ],
    "rows": [
      [
        "money",
        "Vault + 经济插件",
        "扣除 double 金币，数据库失败会退款。"
      ],
      [
        "points",
        "PlayerPoints",
        "价格向上取整为整数点券，数据库失败会退款。"
      ],
      [
        "permission",
        "权限系统",
        "检查 shop.permission，不扣费。"
      ],
      [
        "item",
        "CraftEngine 物品才需要 CraftEngine",
        "扫描玩家主存储栏，可多次分段提交；全部完成后原子授予称号并清除进度。"
      ],
      [
        "papi",
        "PlaceholderAPI",
        "所有有效数值条件均满足才可领取；未展开、非数值或 PAPI 缺失均拒绝。"
      ],
      [
        "free",
        "无",
        "直接授予称号。"
      ]
    ]
  },
  "installation": {
    "lead": "精确运行环境为 Paper 1.21.11 与 Java 21。构建产物名固定为 CloudTitle-1.0.jar，源码版本为 1.0-SNAPSHOT。",
    "steps": [
      [
        "安装 JAR",
        "将 CloudTitle-1.0.jar 放入服务端 plugins/ 目录，不要解压或二次打包。"
      ],
      [
        "首次联网启动",
        "Paper LibraryLoader 从 Maven Central 加载 HikariCP 6.3.0、SQLite JDBC 3.50.3.0 和 MySQL Connector/J 9.4.0。"
      ],
      [
        "选择存储并配置",
        "单服可保持 SQLite；群组服应让所有节点连接同一 MySQL，并为每台服务器设置不同的 server-id，然后完整重启。"
      ]
    ],
    "dependencies": [
      [
        "Paper 1.20+ / Java 21",
        "运行环境",
        "其他实现或版本未声明兼容，不应视为受支持。"
      ],
      [
        "HikariCP、SQLite JDBC、MySQL Connector/J",
        "Spigot/Paper LibraryLoader 运行库",
        "下载或数据库驱动初始化失败时插件停用。"
      ],
      [
        "Vault",
        "软依赖",
        "money 购买和自定义称号金币计费不可用；其余功能正常。"
      ],
      [
        "PlayerPoints",
        "软依赖，反射接入",
        "points 购买和自定义称号点券计费不可用；其余功能正常。"
      ],
      [
        "PlaceholderAPI 2.11.7+",
        "软依赖",
        "不注册 CloudTitle 变量，papi 类型称号不能领取。"
      ],
      [
        "CraftEngine",
        "软依赖，反射接入",
        "原版物品仍可兑换；包含 CraftEngine 物品要求的称号拒绝提交。"
      ]
    ],
    "note": "插件没有必须手动安装的前置插件。金币、点券、PAPI 条件和 CraftEngine 物品仅在使用对应功能时需要相应软依赖；数据库驱动由 LibraryLoader 加载，不会打包进插件 JAR。"
  },
  "aliases": "/ct、/title、/称号",
  "commandHeaders": [
    "命令",
    "执行者",
    "权限",
    "默认授权",
    "行为"
  ],
  "commands": [
    [
      "/cloudtitle",
      "玩家",
      "cloudtitle.use",
      "所有玩家",
      "打开称号仓库第一页。"
    ],
    [
      "/cloudtitle shop",
      "玩家",
      "cloudtitle.use",
      "所有玩家",
      "打开称号商城第一页。"
    ],
    [
      "/cloudtitle custom",
      "玩家",
      "cloudtitle.use + custom-title.permission",
      "默认所有玩家",
      "打开工坊；功能关闭或额外权限不足时拒绝。"
    ],
    [
      "/cloudtitle set <id>",
      "玩家",
      "cloudtitle.use",
      "所有玩家",
      "仅能佩戴自己拥有且仍存在定义的称号。"
    ],
    [
      "/cloudtitle clear",
      "玩家",
      "cloudtitle.use",
      "所有玩家",
      "清空真实选择并移除插件记录的 Buff；显示类 PAPI 可回退默认称号。"
    ],
    [
      "/cloudtitle grant <玩家> <id>",
      "玩家或控制台",
      "cloudtitle.admin",
      "OP",
      "只能发放 titles.yml 中的静态称号，支持离线玩家 UUID。"
    ],
    [
      "/cloudtitle revoke <玩家> <id>",
      "玩家或控制台",
      "cloudtitle.admin",
      "OP",
      "回收拥有记录、自定义称号和提交进度；若正在佩戴则清除。"
    ],
    [
      "/cloudtitle reload",
      "玩家或控制台",
      "cloudtitle.admin",
      "OP",
      "关闭全部插件 GUI、取消工坊聊天输入、重载 YAML 并重应用在线玩家 Buff。"
    ]
  ],
  "permissions": [
    [
      "cloudtitle.use",
      "true",
      "基础玩家命令及 GUI。"
    ],
    [
      "cloudtitle.admin",
      "op",
      "发放、回收和重载。"
    ],
    [
      "cloudtitle.custom",
      "true",
      "默认工坊权限；可由 config.yml 更换。"
    ],
    [
      "cloudtitle.custom.bypass",
      "op",
      "默认自定义称号费用豁免权限。"
    ]
  ],
  "placeholders": {
    "intro": "PlaceholderAPI 扩展只读取玩家登录时异步加载的内存缓存，不会在聊天、TAB 或计分板刷新时同步访问数据库。",
    "noteTitle": "缓存与依赖状态",
    "note": "玩家未登录、数据仍在加载或 PlaceholderAPI 未安装时不会查询数据库，变量可能返回空字符串；未知参数交由 PlaceholderAPI 按未知变量处理。",
    "tables": [
      {
        "title": "PlaceholderAPI 变量",
        "headers": [
          "变量",
          "返回值",
          "示例",
          "默认称号回退"
        ],
        "rows": [
          [
            "%cloudtitle_title% / %cloudtitle_name%",
            "Legacy § 颜色格式称号名",
            "§7云世界居民",
            "是"
          ],
          [
            "%cloudtitle_title_minimessage% / %cloudtitle_minimessage%",
            "原始 MiniMessage 称号名",
            "<gradient:#CBD5E1:#94A3B8><bold>云世界居民</bold></gradient>",
            "是"
          ],
          [
            "%cloudtitle_title_plain% / %cloudtitle_plain%",
            "纯文本称号名",
            "云世界居民",
            "是"
          ],
          [
            "%cloudtitle_description%",
            "纯文本描述，各行以空格连接",
            "生活在云世界中的普通居民。 每一段传奇，都从平凡的名字开始。",
            "是"
          ],
          [
            "%cloudtitle_selected_id%",
            "真实佩戴 ID；未佩戴返回空字符串",
            "resident",
            "否"
          ],
          [
            "%cloudtitle_displayed_id%",
            "最终显示 ID",
            "resident",
            "是"
          ],
          [
            "%cloudtitle_owned_count%",
            "仓库称号数量",
            "4",
            "不适用"
          ]
        ]
      },
      {
        "title": "GUI 可用变量",
        "headers": [
          "范围",
          "变量"
        ],
        "rows": [
          [
            "通用",
            "%player%、%page%、%max_page%、%owned_count%"
          ],
          [
            "动态称号",
            "%title_id%、%title_name%、%title_material%、%title_description%、%title_buffs%、%title_cost%、%title_requirement%、%title_status%"
          ],
          [
            "工坊",
            "%custom_name%、%custom_description%、%custom_cost%"
          ],
          [
            "获取条件",
            "%progress%、%items%、%papi_conditions%"
          ]
        ]
      },
      {
        "title": "GUI 动作语法",
        "headers": [
          "动作",
          "说明"
        ],
        "rows": [
          [
            "close",
            "关闭当前库存。"
          ],
          [
            "menu: previous / next / warehouse / shop / custom",
            "翻页或切换菜单；无上一页或下一页时对应图标自动隐藏。"
          ],
          [
            "title: select / buy / clear",
            "佩戴、购买或提交、卸下称号。"
          ],
          [
            "custom: edit-name / edit-description / create",
            "进入聊天输入或确认创建。"
          ],
          [
            "message: <MiniMessage>",
            "向玩家直接发送不附加语言前缀的消息。"
          ],
          [
            "player: <命令>",
            "以玩家身份执行命令，可带或不带开头斜杠。"
          ],
          [
            "console: <命令>",
            "以控制台身份执行命令。"
          ],
          [
            "sound: <音效> [音量] [音调]",
            "播放 Registry 音效；无命名空间时自动使用 minecraft。"
          ]
        ]
      }
    ]
  },
  "configuration": {
    "intro": "当前版本首次安装会生成 7 个 YAML。参考表覆盖所有固定叶子路径和动态映射允许的全部子项，随后原样展示每份默认文件。",
    "warning": "storage.yml 的 MySQL 密码和连接参数可能包含凭据。下方只展示源码自带安全占位值；部署时应替换，并避免公开真实配置。",
    "inventory": [
      [
        "config.yml",
        "服务器 ID、默认称号、自定义称号与 Buff",
        "多数重载；server-id 和调度周期需重启",
        "否"
      ],
      [
        "storage.yml",
        "SQLite、MySQL 和自定义表名",
        "重启",
        "是"
      ],
      [
        "titles.yml",
        "全部静态称号、Buff 与商城条件",
        "执行 /cloudtitle reload",
        "否"
      ],
      [
        "gui/warehouse.yml",
        "称号仓库",
        "执行 /cloudtitle reload",
        "否"
      ],
      [
        "gui/shop.yml",
        "称号商城",
        "执行 /cloudtitle reload",
        "否"
      ],
      [
        "gui/custom.yml",
        "称号工坊",
        "执行 /cloudtitle reload",
        "否"
      ],
      [
        "lang/zh_CN.yml",
        "消息、条件模板与 Buff 中文名",
        "执行 /cloudtitle reload",
        "否"
      ]
    ],
    "referenceHeaders": [
      "文件与路径",
      "类型",
      "默认值",
      "允许值或范围",
      "必填",
      "生效方式",
      "完整说明"
    ],
    "references": [
      {
        "title": "主配置 config.yml",
        "rows": [
          [
            "config.yml / server-id",
            "字符串",
            "lobby-1",
            "非空服务器唯一标识；跨服节点不可重复",
            "否",
            "重启服务器",
            "写入 Buff 负责服务器字段；TitleService 启动时读取一次，重载不会更新当前实例。"
          ],
          [
            "config.yml / default-language",
            "字符串",
            "zh_CN",
            "lang 目录中已有文件的文件名（不含 .yml）",
            "否",
            "执行 /cloudtitle reload",
            "选择语言文件；目标文件不存在时回退到 lang/zh_CN.yml，并继承内置中文默认键。"
          ],
          [
            "config.yml / default-title.enabled",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "玩家未佩戴称号时是否让显示类 PAPI 变量回退到默认称号；不会授予称号或施加 Buff。"
          ],
          [
            "config.yml / default-title.id",
            "字符串",
            "resident",
            "titles.yml 中存在的称号 ID",
            "否",
            "执行 /cloudtitle reload",
            "默认显示称号 ID；resident 缺失时有内置居民称号回退，其他不存在 ID 会记录警告并返回空显示。"
          ],
          [
            "config.yml / custom-title.enabled",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否允许打开称号工坊；关闭后玩家收到 custom-disabled。"
          ],
          [
            "config.yml / custom-title.permission",
            "字符串",
            "cloudtitle.custom",
            "任意权限节点；空字符串表示不额外检查",
            "否",
            "执行 /cloudtitle reload",
            "进入自定义称号 GUI 所需权限；仍需基础权限 cloudtitle.use。"
          ],
          [
            "config.yml / custom-title.bypass-permission",
            "字符串",
            "cloudtitle.custom.bypass",
            "任意权限节点；空字符串表示无豁免",
            "否",
            "执行 /cloudtitle reload",
            "拥有此权限时创建自定义称号不扣除金币或点券。"
          ],
          [
            "config.yml / custom-title.currency",
            "枚举字符串",
            "money",
            "money / points",
            "否",
            "执行 /cloudtitle reload",
            "自定义称号计费类型。解析器也认识 permission、item、papi、free；这些不属于正常自定义计费方案，未知值会回退为 free。"
          ],
          [
            "config.yml / custom-title.price",
            "数字",
            "1000.0",
            "建议大于等于 0；小于等于 0 时不扣费",
            "否",
            "执行 /cloudtitle reload",
            "创建一个自定义称号的价格；点券会向上取整为整数。"
          ],
          [
            "config.yml / custom-title.max-name-length",
            "整数",
            "16",
            "建议大于等于 1，按 Unicode 码点计数",
            "否",
            "执行 /cloudtitle reload",
            "玩家聊天输入的称号名称最大长度；超限或空白会拒绝。"
          ],
          [
            "config.yml / custom-title.max-description-length",
            "整数",
            "64",
            "建议大于等于 1，按 Unicode 码点计数",
            "否",
            "执行 /cloudtitle reload",
            "玩家聊天输入的称号描述最大长度；超限或空白会拒绝。"
          ],
          [
            "config.yml / custom-title.allow-minimessage",
            "布尔值",
            "false",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "为 false 时转义玩家输入中的 MiniMessage 标签；为 true 时允许玩家提交格式标签，应仅授予可信玩家。"
          ],
          [
            "config.yml / custom-title.name-prefix",
            "MiniMessage 字符串",
            "<gray>[</gray>",
            "任意 MiniMessage 文本",
            "否",
            "执行 /cloudtitle reload",
            "持久化自定义称号前附加的文本。"
          ],
          [
            "config.yml / custom-title.name-suffix",
            "MiniMessage 字符串",
            "<gray>]</gray>",
            "任意 MiniMessage 文本",
            "否",
            "执行 /cloudtitle reload",
            "持久化自定义称号后附加的文本。"
          ],
          [
            "config.yml / buffs.cross-server-cleanup",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload；影响之后登录的玩家",
            "登录时是否按数据库记录清除上一服务器施加的同等级药水效果。"
          ],
          [
            "config.yml / buffs.refresh-ticks",
            "整数（tick）",
            "100",
            "调度周期启动时最小 20；效果时长按 max(80, 值 + 40)",
            "否",
            "重启服务器",
            "Buff 刷新周期。重载会影响新效果时长，但已创建的定时任务周期不会改变，因此修改后应重启。"
          ]
        ]
      },
      {
        "title": "存储配置 storage.yml",
        "rows": [
          [
            "storage.yml / type",
            "枚举字符串",
            "sqlite",
            "sqlite / mysql；其他值按 SQLite",
            "否",
            "重启服务器",
            "选择数据后端；数据库对象只在插件启用时创建。"
          ],
          [
            "storage.yml / tables.players",
            "字符串",
            "ct_players",
            "正则 [A-Za-z][A-Za-z0-9_]{0,47}；四张表名必须互不相同",
            "否",
            "重启服务器",
            "自定义玩家当前称号及跨服 Buff 状态表名；修改会创建新表，不会迁移旧数据。"
          ],
          [
            "storage.yml / tables.owned",
            "字符串",
            "ct_owned",
            "正则 [A-Za-z][A-Za-z0-9_]{0,47}；四张表名必须互不相同",
            "否",
            "重启服务器",
            "自定义玩家拥有的称号表名；修改会创建新表，不会迁移旧数据。"
          ],
          [
            "storage.yml / tables.custom-titles",
            "字符串",
            "ct_custom_titles",
            "正则 [A-Za-z][A-Za-z0-9_]{0,47}；四张表名必须互不相同",
            "否",
            "重启服务器",
            "自定义玩家创建的自定义称号表名；修改会创建新表，不会迁移旧数据。"
          ],
          [
            "storage.yml / tables.item-progress",
            "字符串",
            "ct_item_progress",
            "正则 [A-Za-z][A-Za-z0-9_]{0,47}；四张表名必须互不相同",
            "否",
            "重启服务器",
            "自定义物品分段提交进度表名；修改会创建新表，不会迁移旧数据。"
          ],
          [
            "storage.yml / sqlite.file",
            "相对路径字符串",
            "data.db",
            "插件数据目录内的文件名或相对路径",
            "否",
            "重启服务器",
            "SQLite 数据库文件路径；SQLite 连接池固定为 1。"
          ],
          [
            "storage.yml / mysql.host",
            "字符串",
            "127.0.0.1",
            "MySQL 主机名或 IP",
            "使用 MySQL 时需要",
            "重启服务器",
            "MySQL 服务器地址。"
          ],
          [
            "storage.yml / mysql.port",
            "整数",
            "3306",
            "有效 TCP 端口，通常 1 - 65535",
            "使用 MySQL 时需要",
            "重启服务器",
            "MySQL 服务端口，源码未额外夹取范围。"
          ],
          [
            "storage.yml / mysql.database",
            "字符串",
            "minecraft",
            "已存在且账号可访问的数据库名",
            "使用 MySQL 时需要",
            "重启服务器",
            "保存 CloudTitle 表的数据库。"
          ],
          [
            "storage.yml / mysql.username",
            "字符串（敏感）",
            "root",
            "具备建表、索引及读写权限的账号",
            "使用 MySQL 时需要",
            "重启服务器",
            "MySQL 用户名；生产环境不要使用高权限示例账号。"
          ],
          [
            "storage.yml / mysql.password",
            "字符串（敏感）",
            "password",
            "数据库密码；默认只是示例占位值",
            "使用 MySQL 时需要",
            "重启服务器",
            "MySQL 密码。不要将真实密码提交到公开仓库或发布页面。"
          ],
          [
            "storage.yml / mysql.parameters",
            "字符串（可能敏感）",
            "useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai",
            "JDBC URL 查询参数，不含前导 ?",
            "否",
            "重启服务器",
            "直接拼接到 MySQL JDBC URL；生产环境应按数据库 SSL 和时区策略调整。"
          ],
          [
            "storage.yml / mysql.pool-size",
            "整数",
            "10",
            "运行时最小 2",
            "否",
            "重启服务器",
            "Hikari 最大连接数；异步存储线程数为 max(2, pool-size / 2)。"
          ],
          [
            "storage.yml / mysql.connection-timeout-ms",
            "长整数（毫秒）",
            "10000",
            "HikariCP 接受的正超时值，建议不低于 250",
            "否",
            "重启服务器",
            "获取数据库连接的等待超时。无效值可能令数据库初始化失败并停用插件。"
          ]
        ]
      },
      {
        "title": "称号配置 titles.yml",
        "rows": [
          [
            "titles.yml / titles.<id>",
            "映射",
            "内置 resident、newcomer、dirt_collector、experienced_adventurer、vip、pro、mvp、elite",
            "ID 建议仅使用安全短字符串且不超过数据库 VARCHAR(96)",
            "否",
            "执行 /cloudtitle reload",
            "一个静态称号定义。管理员 grant 只能发放此处存在的 ID；自定义称号存于数据库。"
          ],
          [
            "titles.yml / titles.<id>.name",
            "MiniMessage 字符串",
            "<id>",
            "任意 MiniMessage 文本",
            "否",
            "执行 /cloudtitle reload",
            "称号显示名称；缺失时使用 ID。"
          ],
          [
            "titles.yml / titles.<id>.description[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本列表",
            "否",
            "执行 /cloudtitle reload",
            "GUI 与 PAPI 描述内容。"
          ],
          [
            "titles.yml / titles.<id>.icon",
            "Material 字符串",
            "NAME_TAG",
            "有效且非空气的 Bukkit Material",
            "否",
            "执行 /cloudtitle reload",
            "GUI 图标；无效值回退 NAME_TAG。"
          ],
          [
            "titles.yml / titles.<id>.buffs.<药水效果>.amplifier",
            "整数",
            "0",
            "大于等于 0；0 表示 I 级",
            "否",
            "执行 /cloudtitle reload",
            "原版 PotionEffectType 的等级索引；负数夹为 0，未知效果整项跳过并警告。"
          ],
          [
            "titles.yml / titles.<id>.buffs.<药水效果>.particles",
            "布尔值",
            "false",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否显示药水粒子。"
          ],
          [
            "titles.yml / titles.<id>.buffs.<药水效果>.icon",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否在客户端 HUD 显示效果图标。"
          ],
          [
            "titles.yml / titles.<id>.shop.enabled",
            "布尔值",
            "false",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否允许通过商城领取；关闭后仍可由管理员 grant。"
          ],
          [
            "titles.yml / titles.<id>.shop.display",
            "布尔值",
            "与 enabled 相同",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否出现在商城 GUI；隐藏不等于禁用购买接口。"
          ],
          [
            "titles.yml / titles.<id>.shop.type",
            "枚举字符串",
            "free",
            "money / points / permission / item / papi / free",
            "否",
            "执行 /cloudtitle reload",
            "获取类型；未知值回退 free。"
          ],
          [
            "titles.yml / titles.<id>.shop.price",
            "数字",
            "0",
            "大于等于 0，负数夹为 0",
            "否",
            "执行 /cloudtitle reload",
            "money 或 points 类型价格；点券向上取整。"
          ],
          [
            "titles.yml / titles.<id>.shop.permission",
            "字符串",
            "空字符串",
            "任意权限节点",
            "permission 类型需要",
            "执行 /cloudtitle reload",
            "permission 类型玩家必须拥有的权限。"
          ],
          [
            "titles.yml / titles.<id>.shop.bypass-permission",
            "字符串",
            "空字符串",
            "任意权限节点；空表示禁用豁免",
            "否",
            "执行 /cloudtitle reload",
            "拥有后跳过费用、权限、物品或 PAPI 条件。"
          ],
          [
            "titles.yml / titles.<id>.shop.requirement-display",
            "MiniMessage 字符串",
            "空字符串",
            "支持 %progress%、%items%、%papi_conditions%",
            "否",
            "执行 /cloudtitle reload",
            "覆盖商城自动生成的获取条件；空值按 shop.type 使用语言模板。"
          ],
          [
            "titles.yml / titles.<id>.shop.items[]",
            "对象列表",
            "[]",
            "item 类型至少一条有效记录",
            "item 类型需要",
            "执行 /cloudtitle reload",
            "物品兑换要求列表；多项要求全部完成后授予称号，提交进度持久化。"
          ],
          [
            "titles.yml / titles.<id>.shop.items[].source",
            "枚举字符串",
            "vanilla",
            "vanilla / craftengine / ce；其他值按 vanilla",
            "否",
            "执行 /cloudtitle reload",
            "物品来源。原版识别会排除同材质的 CraftEngine 自定义物品。"
          ],
          [
            "titles.yml / titles.<id>.shop.items[].id",
            "字符串",
            "空字符串",
            "原版 Material 或 CraftEngine namespace:id",
            "是",
            "执行 /cloudtitle reload",
            "物品 ID；无效原版材质、空气、空 ID 或缺少命名空间的 CraftEngine ID 会跳过。"
          ],
          [
            "titles.yml / titles.<id>.shop.items[].amount",
            "整数",
            "0",
            "大于 0",
            "是",
            "执行 /cloudtitle reload",
            "总提交数量；玩家可多次分段提交。"
          ],
          [
            "titles.yml / titles.<id>.shop.items[].display",
            "MiniMessage 字符串",
            "物品 ID",
            "任意 MiniMessage 文本",
            "否",
            "执行 /cloudtitle reload",
            "商城进度中显示的物品名称。"
          ],
          [
            "titles.yml / titles.<id>.shop.papi-conditions[]",
            "对象列表",
            "[]",
            "papi 类型至少一条有效记录；多条全部满足",
            "papi 类型需要",
            "执行 /cloudtitle reload",
            "PlaceholderAPI 数值条件列表。"
          ],
          [
            "titles.yml / titles.<id>.shop.papi-conditions[].placeholder",
            "字符串",
            "空字符串",
            "包含 % 的 PAPI 变量",
            "是",
            "执行 /cloudtitle reload",
            "传给 PlaceholderAPI 解析；未展开或非数值时条件失败。"
          ],
          [
            "titles.yml / titles.<id>.shop.papi-conditions[].operator",
            "枚举字符串",
            ">=",
            "> / >= / ≥ / < / <= / ≤ / == / = / != / ≠",
            "否",
            "执行 /cloudtitle reload",
            "BigDecimal 数值比较运算符；无效条件会跳过。"
          ],
          [
            "titles.yml / titles.<id>.shop.papi-conditions[].value",
            "十进制数",
            "无",
            "BigDecimal 可解析数值",
            "是",
            "执行 /cloudtitle reload",
            "领取目标值。"
          ],
          [
            "titles.yml / titles.<id>.shop.papi-conditions[].display",
            "MiniMessage 字符串",
            "placeholder 原文",
            "任意 MiniMessage 文本",
            "否",
            "执行 /cloudtitle reload",
            "商城中该条件的友好描述。"
          ]
        ]
      },
      {
        "title": "GUI 配置通用结构",
        "rows": [
          [
            "gui/warehouse.yml / Title",
            "MiniMessage 字符串",
            "<gradient:#67E8F9:#38BDF8><bold>云称号</bold></gradient> <dark_gray>·</dark_gray> <white>仓库",
            "支持当前菜单变量",
            "否",
            "执行 /cloudtitle reload",
            "库存 GUI 标题；旧版“云世界”默认标题会在精确匹配时自动迁移。"
          ],
          [
            "gui/warehouse.yml / Options.Click-Cooldown-Millis",
            "长整数（毫秒）",
            "300",
            "0 - 5000，超出范围会夹取",
            "否",
            "执行 /cloudtitle reload",
            "同一玩家在该 GUI 内触发已绑定动作的最小间隔；0 表示关闭限制。"
          ],
          [
            "gui/warehouse.yml / Layout[]",
            "字符串列表",
            "见完整默认文件",
            "1 - 6 行，每行 9 个字符",
            "运行需要",
            "执行 /cloudtitle reload",
            "字符布局。加载会警告非法长度；渲染时空布局回退一行空格，行数夹为 1 - 6，并自动补齐或截断到 9 字符。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Type",
            "枚举字符串",
            "static",
            "static / title",
            "否",
            "执行 /cloudtitle reload",
            "title 表示动态称号槽；仓库和商城至少需要一个动态槽，否则菜单不打开。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Material",
            "字符串",
            "动态槽回退称号图标；静态槽回退 PAPER",
            "有效 Material 或 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品材质；静态无效材质回退 PAPER，动态无效材质回退称号 icon。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Amount",
            "整数",
            "1",
            "1 - 64，超出范围夹取",
            "否",
            "执行 /cloudtitle reload",
            "图标堆叠数量。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Name",
            "MiniMessage 字符串",
            "单个空格",
            "支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品显示名，插件自动禁用斜体。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Lore[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本；支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品 Lore；包含 %title_description% 的行会按描述行数展开。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Glow",
            "布尔值",
            "false",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否强制显示附魔光效。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Custom-Model-Data",
            "整数",
            "未设置",
            "任意整数",
            "否",
            "执行 /cloudtitle reload",
            "可选自定义模型数据。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Display.Item-Flags[]",
            "字符串列表",
            "[]",
            "Bukkit ItemFlag 枚举名",
            "否",
            "执行 /cloudtitle reload",
            "物品标记；未知值忽略并写入警告。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Selected.Glow",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "仓库动态称号被选中时是否显示光效。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Selected.Lore-Append[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本；支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "仓库动态称号被选中时追加的 Lore。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Actions.all[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "all 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Actions.left[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "left 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Actions.right[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "right 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Actions.shift-left[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "shift-left 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/warehouse.yml / Icons.<字符>.Actions.shift-right[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "shift-right 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/shop.yml / Title",
            "MiniMessage 字符串",
            "<gradient:#FDE68A:#F59E0B><bold>云称号</bold></gradient> <dark_gray>·</dark_gray> <white>商城",
            "支持当前菜单变量",
            "否",
            "执行 /cloudtitle reload",
            "库存 GUI 标题；旧版“云世界”默认标题会在精确匹配时自动迁移。"
          ],
          [
            "gui/shop.yml / Options.Click-Cooldown-Millis",
            "长整数（毫秒）",
            "300",
            "0 - 5000，超出范围会夹取",
            "否",
            "执行 /cloudtitle reload",
            "同一玩家在该 GUI 内触发已绑定动作的最小间隔；0 表示关闭限制。"
          ],
          [
            "gui/shop.yml / Layout[]",
            "字符串列表",
            "见完整默认文件",
            "1 - 6 行，每行 9 个字符",
            "运行需要",
            "执行 /cloudtitle reload",
            "字符布局。加载会警告非法长度；渲染时空布局回退一行空格，行数夹为 1 - 6，并自动补齐或截断到 9 字符。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Type",
            "枚举字符串",
            "static",
            "static / title",
            "否",
            "执行 /cloudtitle reload",
            "title 表示动态称号槽；仓库和商城至少需要一个动态槽，否则菜单不打开。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Material",
            "字符串",
            "动态槽回退称号图标；静态槽回退 PAPER",
            "有效 Material 或 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品材质；静态无效材质回退 PAPER，动态无效材质回退称号 icon。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Amount",
            "整数",
            "1",
            "1 - 64，超出范围夹取",
            "否",
            "执行 /cloudtitle reload",
            "图标堆叠数量。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Name",
            "MiniMessage 字符串",
            "单个空格",
            "支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品显示名，插件自动禁用斜体。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Lore[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本；支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品 Lore；包含 %title_description% 的行会按描述行数展开。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Glow",
            "布尔值",
            "false",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否强制显示附魔光效。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Custom-Model-Data",
            "整数",
            "未设置",
            "任意整数",
            "否",
            "执行 /cloudtitle reload",
            "可选自定义模型数据。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Display.Item-Flags[]",
            "字符串列表",
            "[]",
            "Bukkit ItemFlag 枚举名",
            "否",
            "执行 /cloudtitle reload",
            "物品标记；未知值忽略并写入警告。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Selected.Glow",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "仓库动态称号被选中时是否显示光效。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Selected.Lore-Append[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本；支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "仓库动态称号被选中时追加的 Lore。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Actions.all[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "all 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Actions.left[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "left 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Actions.right[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "right 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Actions.shift-left[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "shift-left 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/shop.yml / Icons.<字符>.Actions.shift-right[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "shift-right 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/custom.yml / Title",
            "MiniMessage 字符串",
            "<gradient:#C4B5FD:#F0ABFC><bold>云称号</bold></gradient> <dark_gray>·</dark_gray> <white>工坊",
            "支持当前菜单变量",
            "否",
            "执行 /cloudtitle reload",
            "库存 GUI 标题；旧版“云世界”默认标题会在精确匹配时自动迁移。"
          ],
          [
            "gui/custom.yml / Options.Click-Cooldown-Millis",
            "长整数（毫秒）",
            "500",
            "0 - 5000，超出范围会夹取",
            "否",
            "执行 /cloudtitle reload",
            "同一玩家在该 GUI 内触发已绑定动作的最小间隔；0 表示关闭限制。"
          ],
          [
            "gui/custom.yml / Layout[]",
            "字符串列表",
            "见完整默认文件",
            "1 - 6 行，每行 9 个字符",
            "运行需要",
            "执行 /cloudtitle reload",
            "字符布局。加载会警告非法长度；渲染时空布局回退一行空格，行数夹为 1 - 6，并自动补齐或截断到 9 字符。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Type",
            "枚举字符串",
            "static",
            "static / title",
            "否",
            "执行 /cloudtitle reload",
            "title 表示动态称号槽；仓库和商城至少需要一个动态槽，否则菜单不打开。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Material",
            "字符串",
            "动态槽回退称号图标；静态槽回退 PAPER",
            "有效 Material 或 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品材质；静态无效材质回退 PAPER，动态无效材质回退称号 icon。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Amount",
            "整数",
            "1",
            "1 - 64，超出范围夹取",
            "否",
            "执行 /cloudtitle reload",
            "图标堆叠数量。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Name",
            "MiniMessage 字符串",
            "单个空格",
            "支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品显示名，插件自动禁用斜体。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Lore[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本；支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "物品 Lore；包含 %title_description% 的行会按描述行数展开。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Glow",
            "布尔值",
            "false",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "是否强制显示附魔光效。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Custom-Model-Data",
            "整数",
            "未设置",
            "任意整数",
            "否",
            "执行 /cloudtitle reload",
            "可选自定义模型数据。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Display.Item-Flags[]",
            "字符串列表",
            "[]",
            "Bukkit ItemFlag 枚举名",
            "否",
            "执行 /cloudtitle reload",
            "物品标记；未知值忽略并写入警告。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Selected.Glow",
            "布尔值",
            "true",
            "true / false",
            "否",
            "执行 /cloudtitle reload",
            "仓库动态称号被选中时是否显示光效。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Selected.Lore-Append[]",
            "字符串列表",
            "[]",
            "MiniMessage 文本；支持 GUI 变量",
            "否",
            "执行 /cloudtitle reload",
            "仓库动态称号被选中时追加的 Lore。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Actions.all[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "all 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Actions.left[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "left 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Actions.right[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "right 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Actions.shift-left[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "shift-left 点击动作；精确点击类型未配置时回退到 all。"
          ],
          [
            "gui/custom.yml / Icons.<字符>.Actions.shift-right[]",
            "字符串或字符串列表",
            "[]",
            "见 GUI 动作列表",
            "否",
            "执行 /cloudtitle reload",
            "shift-right 点击动作；精确点击类型未配置时回退到 all。"
          ]
        ]
      },
      {
        "title": "语言配置 lang/zh_CN.yml",
        "rows": [
          [
            "lang/zh_CN.yml / prefix",
            "MiniMessage 字符串",
            "\"<dark_gray>[<aqua>云称号</aqua>]</dark_gray> \"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "发送普通语言消息时附加的 MiniMessage 前缀；旧版默认“云世界称号”会精确迁移为“云称号”。"
          ],
          [
            "lang/zh_CN.yml / no-permission",
            "MiniMessage 字符串",
            "\"<red>你没有权限这样做。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "权限检查失败。"
          ],
          [
            "lang/zh_CN.yml / player-only",
            "MiniMessage 字符串",
            "\"<red>该命令只能由玩家使用。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "控制台执行玩家专用命令。"
          ],
          [
            "lang/zh_CN.yml / loading",
            "MiniMessage 字符串",
            "\"<yellow>称号数据正在加载，请稍候。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "玩家异步数据尚未加载。"
          ],
          [
            "lang/zh_CN.yml / storage-error",
            "MiniMessage 字符串",
            "\"<red>存储服务发生错误，请联系管理员。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "数据库操作失败。"
          ],
          [
            "lang/zh_CN.yml / title-equipped",
            "MiniMessage 字符串",
            "\"<green>已佩戴称号：%title%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "成功佩戴称号，%title% 为称号名。"
          ],
          [
            "lang/zh_CN.yml / title-cleared",
            "MiniMessage 字符串",
            "\"<green>已卸下当前称号。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "成功卸下称号。"
          ],
          [
            "lang/zh_CN.yml / title-obtained",
            "MiniMessage 字符串",
            "\"<green>已获得称号：%title%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "成功获得称号，%title% 为称号名。"
          ],
          [
            "lang/zh_CN.yml / title-owned",
            "MiniMessage 字符串",
            "\"<yellow>你已经拥有该称号。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "玩家已经拥有目标称号。"
          ],
          [
            "lang/zh_CN.yml / title-not-owned",
            "MiniMessage 字符串",
            "\"<red>你尚未拥有该称号。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "玩家尝试佩戴未拥有称号。"
          ],
          [
            "lang/zh_CN.yml / title-not-found",
            "MiniMessage 字符串",
            "\"<red>找不到称号：%id%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "称号 ID 不存在，%id% 为输入 ID。"
          ],
          [
            "lang/zh_CN.yml / insufficient-money",
            "MiniMessage 字符串",
            "\"<red>金币不足，需要 %amount%。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "Vault 金币不足，%amount% 为价格。"
          ],
          [
            "lang/zh_CN.yml / insufficient-points",
            "MiniMessage 字符串",
            "\"<red>点券不足，需要 %amount%。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "PlayerPoints 点券不足，%amount% 为价格。"
          ],
          [
            "lang/zh_CN.yml / economy-unavailable",
            "MiniMessage 字符串",
            "\"<red>对应的经济服务不可用。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "目标经济服务未安装或未接入。"
          ],
          [
            "lang/zh_CN.yml / requirement-missing",
            "MiniMessage 字符串",
            "\"<red>你不满足领取该称号的权限条件。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "权限型称号条件不满足。"
          ],
          [
            "lang/zh_CN.yml / papi-unavailable",
            "MiniMessage 字符串",
            "\"<red>PlaceholderAPI 当前不可用，无法检查称号变量条件。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "PAPI 条件需要 PlaceholderAPI 但当前不可用。"
          ],
          [
            "lang/zh_CN.yml / papi-config-error",
            "MiniMessage 字符串",
            "\"<red>该称号没有配置有效的 PAPI 数值条件，请联系管理员。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "PAPI 类型称号没有有效条件。"
          ],
          [
            "lang/zh_CN.yml / papi-requirement-missing",
            "MiniMessage 字符串",
            "\"<red>你的变量数值尚未达到该称号的领取条件。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "至少一项 PAPI 数值条件不满足。"
          ],
          [
            "lang/zh_CN.yml / purchase-failed",
            "MiniMessage 字符串",
            "\"<red>购买失败，没有扣除费用。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "扣费服务返回失败。"
          ],
          [
            "lang/zh_CN.yml / item-config-error",
            "MiniMessage 字符串",
            "\"<red>该称号没有配置有效的兑换物品，请联系管理员。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "item 类型没有有效物品要求。"
          ],
          [
            "lang/zh_CN.yml / item-submit-processing",
            "MiniMessage 字符串",
            "\"<yellow>上一次物品提交仍在处理中，请稍候。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "同一玩家同一称号的上次提交尚未完成。"
          ],
          [
            "lang/zh_CN.yml / item-submit-empty",
            "MiniMessage 字符串",
            "\"<yellow>背包中没有可提交的物品。当前进度：%progress%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "背包没有可提交物品，%progress% 为当前进度。"
          ],
          [
            "lang/zh_CN.yml / item-submit-progress",
            "MiniMessage 字符串",
            "\"<green>本次已提交 %submitted% 个物品。</green> <gray>当前进度：%progress%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "分段提交成功，%submitted% 为本次数量，%progress% 为累计进度。"
          ],
          [
            "lang/zh_CN.yml / craftengine-unavailable",
            "MiniMessage 字符串",
            "\"<red>该称号需要 CraftEngine 物品，但 CraftEngine API 当前不可用。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "要求 CraftEngine 物品但 API 不可用。"
          ],
          [
            "lang/zh_CN.yml / custom-disabled",
            "MiniMessage 字符串",
            "\"<red>自定义称号功能未启用。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "自定义称号功能关闭。"
          ],
          [
            "lang/zh_CN.yml / custom-input-name",
            "MiniMessage 字符串",
            "\"<yellow>请在聊天中输入称号名称，输入 cancel 取消。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "提示聊天输入名称。"
          ],
          [
            "lang/zh_CN.yml / custom-input-description",
            "MiniMessage 字符串",
            "\"<yellow>请在聊天中输入称号描述，输入 cancel 取消。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "提示聊天输入描述。"
          ],
          [
            "lang/zh_CN.yml / custom-input-cancelled",
            "MiniMessage 字符串",
            "\"<gray>已取消本次输入。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "玩家输入 cancel 取消。"
          ],
          [
            "lang/zh_CN.yml / custom-name-required",
            "MiniMessage 字符串",
            "\"<red>请先设置称号名称。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "确认创建前名称为空。"
          ],
          [
            "lang/zh_CN.yml / custom-invalid-length",
            "MiniMessage 字符串",
            "\"<red>输入长度必须在 1 到 %max% 个字符之间。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "输入为空或超限，%max% 为最大码点数。"
          ],
          [
            "lang/zh_CN.yml / custom-created",
            "MiniMessage 字符串",
            "\"<green>自定义称号创建成功并已放入仓库。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "自定义称号已持久化。"
          ],
          [
            "lang/zh_CN.yml / custom-failed",
            "MiniMessage 字符串",
            "\"<red>自定义称号创建失败。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "自定义称号持久化失败。"
          ],
          [
            "lang/zh_CN.yml / reload-success",
            "MiniMessage 字符串",
            "\"<green>配置与称号定义已重新加载。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "配置重载成功。"
          ],
          [
            "lang/zh_CN.yml / command-help[]",
            "字符串列表",
            "\"<aqua>/cloudtitle</aqua> <gray>- 打开称号仓库\" | \"<aqua>/cloudtitle shop</aqua> <gray>- 打开称号商城\" | \"<aqua>/cloudtitle custom</aqua> <gray>- 打开称号自定义\" | \"<aqua>/cloudtitle set <id></aqua> <gray>- 佩戴称号\" | \"<aqua>/cloudtitle clear</aqua> <gray>- 卸下称号\" | \"<aqua>/cloudtitle grant/revoke <玩家> <id></aqua> <gray>- 管理称号\" | \"<aqua>/cloudtitle reload</aqua> <gray>- 重载配置\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "完整命令帮助列表；help 输出不附加 prefix。"
          ],
          [
            "lang/zh_CN.yml / admin-success",
            "MiniMessage 字符串",
            "\"<green>操作成功：%player% / %id%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "管理员操作完成，%player% 和 %id% 为目标。"
          ],
          [
            "lang/zh_CN.yml / admin-failed",
            "MiniMessage 字符串",
            "\"<red>操作失败，请检查称号 ID 或后台日志。\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "管理员发放或回收失败。"
          ],
          [
            "lang/zh_CN.yml / buff-display[]",
            "字符串列表",
            "",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "插件语言消息模板；缺失时继承内置 zh_CN 默认值。"
          ],
          [
            "lang/zh_CN.yml / buff-display.none",
            "MiniMessage 字符串",
            "\"<gray>无增益</gray>\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "称号没有 Buff 时的 GUI 文本。"
          ],
          [
            "lang/zh_CN.yml / buff-display.format",
            "MiniMessage 字符串",
            "\"<aqua>%effect%</aqua> <white>%level%</white>\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "单个 Buff 格式，支持 %effect% 和 %level%。"
          ],
          [
            "lang/zh_CN.yml / buff-display.separator",
            "MiniMessage 字符串",
            "\"<dark_gray>、</dark_gray> \"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "多个 Buff 之间的连接文本。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements[]",
            "字符串列表",
            "",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "插件语言消息模板；缺失时继承内置 zh_CN 默认值。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements.money",
            "MiniMessage 字符串",
            "\"<gold><bold>金币购买</bold></gold> <dark_gray>·</dark_gray> <white>%amount% 金币</white>\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "金币获取条件模板，支持 %amount%。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements.points",
            "MiniMessage 字符串",
            "\"<aqua><bold>点券兑换</bold></aqua> <dark_gray>·</dark_gray> <white>%amount% 点券</white>\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "点券获取条件模板，支持 %amount%。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements.permission",
            "MiniMessage 字符串",
            "\"<light_purple><bold>权限解锁</bold></light_purple> <dark_gray>·</dark_gray> <white>满足指定权限</white>\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "权限获取条件模板，支持 %permission%。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements.item",
            "MiniMessage 字符串",
            "\"<yellow><bold>物品提交</bold></yellow> <dark_gray>·</dark_gray> %items%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "物品提交条件模板，支持 %items% 和 %progress%。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements.papi",
            "MiniMessage 字符串",
            "\"<blue><bold>变量条件</bold></blue> <dark_gray>·</dark_gray> %papi_conditions%\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "PAPI 条件模板，支持 %papi_conditions%。"
          ],
          [
            "lang/zh_CN.yml / shop-requirements.free",
            "MiniMessage 字符串",
            "\"<green><bold>免费领取</bold></green>\"",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "免费领取条件模板。"
          ],
          [
            "lang/zh_CN.yml / potion-effects[]",
            "字符串列表",
            "",
            "任意 MiniMessage 文本；保留所需 %变量%",
            "否",
            "执行 /cloudtitle reload",
            "插件语言消息模板；缺失时继承内置 zh_CN 默认值。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.speed",
            "MiniMessage 字符串",
            "\"速度\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 speed 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.slowness",
            "MiniMessage 字符串",
            "\"缓慢\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 slowness 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.haste",
            "MiniMessage 字符串",
            "\"急迫\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 haste 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.mining_fatigue",
            "MiniMessage 字符串",
            "\"挖掘疲劳\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 mining_fatigue 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.strength",
            "MiniMessage 字符串",
            "\"力量\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 strength 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.instant_health",
            "MiniMessage 字符串",
            "\"瞬间治疗\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 instant_health 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.instant_damage",
            "MiniMessage 字符串",
            "\"瞬间伤害\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 instant_damage 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.jump_boost",
            "MiniMessage 字符串",
            "\"跳跃提升\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 jump_boost 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.nausea",
            "MiniMessage 字符串",
            "\"反胃\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 nausea 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.regeneration",
            "MiniMessage 字符串",
            "\"生命恢复\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 regeneration 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.resistance",
            "MiniMessage 字符串",
            "\"抗性提升\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 resistance 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.fire_resistance",
            "MiniMessage 字符串",
            "\"抗火\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 fire_resistance 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.water_breathing",
            "MiniMessage 字符串",
            "\"水下呼吸\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 water_breathing 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.invisibility",
            "MiniMessage 字符串",
            "\"隐身\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 invisibility 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.blindness",
            "MiniMessage 字符串",
            "\"失明\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 blindness 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.night_vision",
            "MiniMessage 字符串",
            "\"夜视\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 night_vision 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.hunger",
            "MiniMessage 字符串",
            "\"饥饿\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 hunger 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.weakness",
            "MiniMessage 字符串",
            "\"虚弱\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 weakness 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.poison",
            "MiniMessage 字符串",
            "\"中毒\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 poison 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.wither",
            "MiniMessage 字符串",
            "\"凋零\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 wither 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.health_boost",
            "MiniMessage 字符串",
            "\"生命提升\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 health_boost 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.absorption",
            "MiniMessage 字符串",
            "\"伤害吸收\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 absorption 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.saturation",
            "MiniMessage 字符串",
            "\"饱和\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 saturation 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.glowing",
            "MiniMessage 字符串",
            "\"发光\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 glowing 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.levitation",
            "MiniMessage 字符串",
            "\"飘浮\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 levitation 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.luck",
            "MiniMessage 字符串",
            "\"幸运\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 luck 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.unluck",
            "MiniMessage 字符串",
            "\"霉运\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 unluck 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.slow_falling",
            "MiniMessage 字符串",
            "\"缓降\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 slow_falling 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.conduit_power",
            "MiniMessage 字符串",
            "\"潮涌能量\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 conduit_power 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.dolphins_grace",
            "MiniMessage 字符串",
            "\"海豚的恩惠\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 dolphins_grace 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.bad_omen",
            "MiniMessage 字符串",
            "\"不祥之兆\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 bad_omen 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.hero_of_the_village",
            "MiniMessage 字符串",
            "\"村庄英雄\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 hero_of_the_village 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.darkness",
            "MiniMessage 字符串",
            "\"黑暗\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 darkness 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.trial_omen",
            "MiniMessage 字符串",
            "\"试炼之兆\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 trial_omen 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.raid_omen",
            "MiniMessage 字符串",
            "\"袭击之兆\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 raid_omen 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.wind_charged",
            "MiniMessage 字符串",
            "\"蓄风\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 wind_charged 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.weaving",
            "MiniMessage 字符串",
            "\"盘丝\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 weaving 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.oozing",
            "MiniMessage 字符串",
            "\"渗浆\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 oozing 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.infested",
            "MiniMessage 字符串",
            "\"寄生\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 infested 的 GUI 中文名。"
          ],
          [
            "lang/zh_CN.yml / potion-effects.breath_of_the_nautilus",
            "MiniMessage 字符串",
            "\"鹦鹉螺之息\"",
            "任意中文或 MiniMessage 显示名",
            "否",
            "执行 /cloudtitle reload",
            "原版药水效果 breath_of_the_nautilus 的 GUI 中文名。"
          ]
        ]
      }
    ],
    "files": [
      {
        "name": "config.yml",
        "description": "主配置：服务器标识、默认称号、自定义称号与 Buff",
        "language": "yaml",
        "code": String.raw`server-id: "lobby-1"
default-language: "zh_CN"

# 玩家没有佩戴称号时，仅在 PAPI 显示中使用该称号。
# 不会自动授予、佩戴或施加 Buff。
default-title:
  enabled: true
  id: resident

custom-title:
  enabled: true
  permission: "cloudtitle.custom"
  bypass-permission: "cloudtitle.custom.bypass"
  currency: "money"
  price: 1000.0
  max-name-length: 16
  max-description-length: 64
  allow-minimessage: false
  name-prefix: "<gray>[</gray>"
  name-suffix: "<gray>]</gray>"
buffs:
  cross-server-cleanup: true
  refresh-ticks: 100`
      },
      {
        "name": "storage.yml",
        "description": "存储配置：SQLite、MySQL 与自定义表名",
        "language": "yaml",
        "code": String.raw`type: sqlite

# 修改名称后会创建新的空表，不会自动迁移旧表数据。
# 只能使用字母、数字和下划线，且必须以字母开头。
tables:
  players: ct_players
  owned: ct_owned
  custom-titles: ct_custom_titles
  item-progress: ct_item_progress

sqlite:
  file: data.db
mysql:
  host: 127.0.0.1
  port: 3306
  database: minecraft
  username: root
  password: "password"
  parameters: "useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai"
  pool-size: 10
  connection-timeout-ms: 10000`
      },
      {
        "name": "titles.yml",
        "description": "称号定义：名称、描述、Buff 与商城条件",
        "language": "yaml",
        "code": String.raw`titles:
  resident:
    name: "<gradient:#CBD5E1:#94A3B8><bold>云世界居民</bold></gradient>"
    description:
      - "<white>生活在云世界中的普通居民。"
      - "<gray>每一段传奇，都从平凡的名字开始。"
    icon: COMPASS
    buffs: {}
    shop:
      enabled: false
      display: false
      type: free
      price: 0
      permission: ""
      bypass-permission: ""
      requirement-display: ""

  newcomer:
    name: "<gradient:#86EFAC:#22C55E><bold>初来乍到</bold></gradient>"
    description:
      - "<white>记录你踏入云世界的第一段旅程。"
      - "<gray>愿每一次启程，都能遇见新的风景。"
    icon: PAPER
    buffs:
      SPEED:
        amplifier: 0
        particles: false
        icon: true
    shop:
      enabled: true
      # false 时不出现在商城，但管理员仍可通过 grant 发放。
      display: true
      type: money
      price: 500.0
      permission: ""
      bypass-permission: "cloudtitle.shop.newcomer.bypass"
      # 留空时根据 type 自动生成中文获取条件。
      requirement-display: ""

  dirt_collector:
    name: "<gradient:#A16207:#713F12><bold>泥土收藏家</bold></gradient>"
    description:
      - "<white>平凡的泥土，也值得被认真收藏。"
      - "<gray>累计提交 1000 个泥土后即可获得。"
    icon: DIRT
    buffs:
      LUCK:
        amplifier: 0
        particles: false
        icon: true
    shop:
      enabled: true
      display: true
      type: item
      price: 0
      permission: ""
      bypass-permission: "cloudtitle.shop.dirt_collector.bypass"
      # 留空时自动显示每种物品的“已提交/总需求”进度。
      requirement-display: ""
      items:
        - source: vanilla
          id: DIRT
          amount: 1000
          display: "<white>泥土</white>"
        # CraftEngine 物品示例：
        # - source: craftengine
        #   id: your_namespace:your_item
        #   amount: 100
        #   display: "<aqua>自定义物品</aqua>"

  experienced_adventurer:
    name: "<gradient:#60A5FA:#2563EB><bold>资深冒险家</bold></gradient>"
    description:
      - "<white>献给不断积累经验、磨炼自我的冒险家。"
      - "<gray>玩家等级达到 30 级后即可领取。"
    icon: EXPERIENCE_BOTTLE
    buffs: {}
    shop:
      enabled: true
      display: true
      type: papi
      price: 0
      permission: ""
      bypass-permission: "cloudtitle.shop.experienced_adventurer.bypass"
      # 可使用 %papi_conditions% 显示实时判断结果。
      requirement-display: ""
      papi-conditions:
        - placeholder: "%player_level%"
          operator: ">="
          value: 30
          display: "<white>玩家等级达到 30 级</white>"

  vip:
    name: "<gradient:#FDE68A:#F59E0B><bold>VIP</bold></gradient> <white>会员</white>"
    description:
      - "<white>云世界 VIP 会员专属身份象征。"
      - "<gray>感谢你的支持，愿冒险始终闪耀。"
    icon: GOLD_INGOT
    buffs:
      HASTE:
        amplifier: 0
        particles: false
        icon: true
    shop:
      enabled: true
      display: true
      type: permission
      price: 0
      permission: "group.vip"
      bypass-permission: ""
      requirement-display: "<gold><bold>VIP 专属</bold></gold> <dark_gray>·</dark_gray> <white>拥有 VIP 会员身份</white>"

  pro:
    name: "<gradient:#67E8F9:#0EA5E9><bold>PRO</bold></gradient> <white>会员</white>"
    description:
      - "<white>属于资深冒险家的进阶会员称号。"
      - "<gray>以专业之名，探索更辽阔的云世界。"
    icon: DIAMOND
    buffs:
      SPEED:
        amplifier: 0
        particles: false
        icon: true
      HASTE:
        amplifier: 0
        particles: false
        icon: true
    shop:
      enabled: true
      display: true
      type: permission
      price: 0
      permission: "group.pro"
      bypass-permission: ""
      requirement-display: "<aqua><bold>PRO 专属</bold></aqua> <dark_gray>·</dark_gray> <white>拥有 PRO 会员身份</white>"

  mvp:
    name: "<gradient:#C4B5FD:#A855F7><bold>MVP</bold></gradient> <white>会员</white>"
    description:
      - "<white>献给云世界中卓越而耀眼的冒险家。"
      - "<gray>你的足迹，正在书写不凡的篇章。"
    icon: AMETHYST_SHARD
    buffs:
      SPEED:
        amplifier: 0
        particles: false
        icon: true
      HASTE:
        amplifier: 1
        particles: false
        icon: true
    shop:
      enabled: true
      display: true
      type: permission
      price: 0
      permission: "group.mvp"
      bypass-permission: ""
      requirement-display: "<light_purple><bold>MVP 专属</bold></light_purple> <dark_gray>·</dark_gray> <white>拥有 MVP 会员身份</white>"

  elite:
    name: "<gradient:#FCA5A5:#EF4444><bold>ELITE</bold></gradient> <white>精英会员</white>"
    description:
      - "<white>云世界精英冒险家的至高身份标志。"
      - "<gray>荣耀与实力汇聚于此，锋芒无可替代。"
    icon: NETHER_STAR
    buffs:
      SPEED:
        amplifier: 1
        particles: false
        icon: true
      HASTE:
        amplifier: 1
        particles: false
        icon: true
      RESISTANCE:
        amplifier: 0
        particles: false
        icon: true
    shop:
      enabled: true
      display: true
      type: permission
      price: 0
      permission: "group.elite"
      bypass-permission: ""
      requirement-display: "<red><bold>ELITE 专属</bold></red> <dark_gray>·</dark_gray> <white>拥有 ELITE 精英身份</white>"`
      },
      {
        "name": "gui/warehouse.yml",
        "description": "称号仓库：TrMenu 风格布局与动作",
        "language": "yaml",
        "code": String.raw`# TrMenu 风格字符布局：每行必须为 9 个字符，最多 6 行。
Title: "<gradient:#67E8F9:#38BDF8><bold>云称号</bold></gradient> <dark_gray>·</dark_gray> <white>仓库"
Options:
  # 0 表示关闭限制，最大支持 5000 毫秒。
  Click-Cooldown-Millis: 300
Layout:
  - "#########"
  - "#TTTTTTT#"
  - "#TTTTTTT#"
  - "#TTTTTTT#"
  - "#P#SUC#N#"
  - "#########"

Icons:
  '#':
    Display:
      Material: BLACK_STAINED_GLASS_PANE
      Name: " "
  'T':
    Type: title
    Display:
      Material: "%title_material%"
      Name: "<gradient:#F8FAFC:#BAE6FD><bold>✦</bold></gradient> %title_name%"
      Lore:
        - "<dark_gray>━━━━━━━━━━━━━━━━━━━━"
        - "<gray>称号介绍"
        - "<dark_gray>  ▪</dark_gray> <white>%title_description%"
        - ""
        - "<gray>增益效果 <dark_gray>│</dark_gray> <aqua>%title_buffs%"
        - "<gray>当前状态 <dark_gray>│</dark_gray> %title_status%"
        - "<dark_gray>━━━━━━━━━━━━━━━━━━━━"
        - "<yellow>▶ 点击佩戴此称号"
    Selected:
      Glow: true
      Lore-Append:
        - "<green>✔ 该称号正在展示"
    Actions:
      all:
        - "title: select"
  'P':
    Display:
      Material: SPECTRAL_ARROW
      Name: "<yellow><bold>← 上一页</bold>"
      Lore:
        - "<gray>当前页数：<white>%page%</white>/<white>%max_page%"
    Actions:
      all: ["menu: previous"]
  'N':
    Display:
      Material: SPECTRAL_ARROW
      Name: "<yellow><bold>下一页 →</bold>"
      Lore:
        - "<gray>当前页数：<white>%page%</white>/<white>%max_page%"
    Actions:
      all: ["menu: next"]
  'S':
    Display:
      Material: EMERALD
      Name: "<green><bold>称号商城</bold>"
      Lore:
        - "<gray>浏览金币、点券和权限称号"
        - ""
        - "<green>▶ 点击进入"
    Actions:
      all: ["menu: shop"]
  'U':
    Display:
      Material: RED_DYE
      Name: "<red><bold>卸下当前称号</bold>"
      Lore:
        - "<gray>保留拥有权，仅停止展示和 Buff"
        - ""
        - "<red>▶ 点击卸下"
    Actions:
      all: ["title: clear"]
  'C':
    Display:
      Material: NAME_TAG
      Name: "<aqua><bold>自定义称号</bold>"
      Lore:
        - "<gray>打造只属于你的个性称号"
        - "<gray>当前拥有：<white>%owned_count%</white> 个"
        - ""
        - "<aqua>▶ 点击设计"
    Actions:
      all: ["menu: custom"]`
      },
      {
        "name": "gui/shop.yml",
        "description": "称号商城：TrMenu 风格布局与动作",
        "language": "yaml",
        "code": String.raw`Title: "<gradient:#FDE68A:#F59E0B><bold>云称号</bold></gradient> <dark_gray>·</dark_gray> <white>商城"
Options:
  Click-Cooldown-Millis: 300
Layout:
  - "#########"
  - "#TTTTTTT#"
  - "#TTTTTTT#"
  - "#TTTTTTT#"
  - "#P###B#N#"
  - "#########"

Icons:
  '#':
    Display:
      Material: BROWN_STAINED_GLASS_PANE
      Name: " "
  'T':
    Type: title
    Display:
      Material: "%title_material%"
      Name: "<gradient:#FEF3C7:#FBBF24><bold>✦</bold></gradient> %title_name%"
      Lore:
        - "<dark_gray>━━━━━━━━━━━━━━━━━━━━"
        - "<gray>称号故事"
        - "<dark_gray>  ▪</dark_gray> <white>%title_description%"
        - ""
        - "<gray>增益效果 <dark_gray>│</dark_gray> <aqua>%title_buffs%"
        - "<gray>获取方式 <dark_gray>│</dark_gray> %title_requirement%"
        - "<dark_gray>━━━━━━━━━━━━━━━━━━━━"
        - "<yellow>▶ 点击购买或领取"
    Actions:
      all:
        - "title: buy"
  'P':
    Display:
      Material: SPECTRAL_ARROW
      Name: "<yellow><bold>← 上一页</bold>"
      Lore: ["<gray>第 <white>%page%</white>/<white>%max_page%</white> 页"]
    Actions:
      all: ["menu: previous"]
  'N':
    Display:
      Material: SPECTRAL_ARROW
      Name: "<yellow><bold>下一页 →</bold>"
      Lore: ["<gray>第 <white>%page%</white>/<white>%max_page%</white> 页"]
    Actions:
      all: ["menu: next"]
  'B':
    Display:
      Material: CHEST
      Name: "<aqua><bold>返回称号仓库</bold>"
      Lore:
        - "<gray>查看并佩戴已经拥有的称号"
        - ""
        - "<aqua>▶ 点击返回"
    Actions:
      all: ["menu: warehouse"]`
      },
      {
        "name": "gui/custom.yml",
        "description": "称号工坊：TrMenu 风格布局与动作",
        "language": "yaml",
        "code": String.raw`Title: "<gradient:#C4B5FD:#F0ABFC><bold>云称号</bold></gradient> <dark_gray>·</dark_gray> <white>工坊"
Options:
  Click-Cooldown-Millis: 500
Layout:
  - "#########"
  - "#N##V##D#"
  - "#########"
  - "#B#####C#"
  - "#########"

Icons:
  '#':
    Display:
      Material: PURPLE_STAINED_GLASS_PANE
      Name: " "
  'V':
    Display:
      Material: NAME_TAG
      Glow: true
      Name: "<gradient:#DDD6FE:#F5D0FE><bold>称号预览</bold></gradient>"
      Lore:
        - "<dark_gray>━━━━━━━━━━━━━━━━━━━━"
        - "<gray>展示名称"
        - "  <white>%custom_name%"
        - ""
        - "<gray>称号描述"
        - "  <white>%custom_description%"
        - "<dark_gray>━━━━━━━━━━━━━━━━━━━━"
        - "<gray>创建花费：<yellow>%custom_cost%"
  'N':
    Display:
      Material: OAK_HANGING_SIGN
      Name: "<yellow><bold>编辑称号名称</bold>"
      Lore:
        - "<gray>当前：<white>%custom_name%"
        - ""
        - "<yellow>▶ 点击后在聊天栏输入"
    Actions:
      all: ["custom: edit-name"]
  'D':
    Display:
      Material: WRITABLE_BOOK
      Name: "<yellow><bold>编辑称号描述</bold>"
      Lore:
        - "<gray>当前：<white>%custom_description%"
        - ""
        - "<yellow>▶ 点击后在聊天栏输入"
    Actions:
      all: ["custom: edit-description"]
  'B':
    Display:
      Material: ARROW
      Name: "<red><bold>返回仓库</bold>"
      Lore: ["<gray>本次未确认的内容将暂时保留"]
    Actions:
      all: ["menu: warehouse"]
  'C':
    Display:
      Material: LIME_CONCRETE
      Name: "<green><bold>确认创建</bold>"
      Lore:
        - "<gray>创建后称号会存入你的仓库"
        - "<gray>费用：<yellow>%custom_cost%"
        - ""
        - "<green>▶ 点击确认"
    Actions:
      all: ["custom: create"]`
      },
      {
        "name": "lang/zh_CN.yml",
        "description": "中文语言：消息、条件模板与 Buff 名称",
        "language": "yaml",
        "code": String.raw`prefix: "<dark_gray>[<aqua>云称号</aqua>]</dark_gray> "
no-permission: "<red>你没有权限这样做。"
player-only: "<red>该命令只能由玩家使用。"
loading: "<yellow>称号数据正在加载，请稍候。"
storage-error: "<red>存储服务发生错误，请联系管理员。"
title-equipped: "<green>已佩戴称号：%title%"
title-cleared: "<green>已卸下当前称号。"
title-obtained: "<green>已获得称号：%title%"
title-owned: "<yellow>你已经拥有该称号。"
title-not-owned: "<red>你尚未拥有该称号。"
title-not-found: "<red>找不到称号：%id%"
insufficient-money: "<red>金币不足，需要 %amount%。"
insufficient-points: "<red>点券不足，需要 %amount%。"
economy-unavailable: "<red>对应的经济服务不可用。"
requirement-missing: "<red>你不满足领取该称号的权限条件。"
papi-unavailable: "<red>PlaceholderAPI 当前不可用，无法检查称号变量条件。"
papi-config-error: "<red>该称号没有配置有效的 PAPI 数值条件，请联系管理员。"
papi-requirement-missing: "<red>你的变量数值尚未达到该称号的领取条件。"
purchase-failed: "<red>购买失败，没有扣除费用。"
item-config-error: "<red>该称号没有配置有效的兑换物品，请联系管理员。"
item-submit-processing: "<yellow>上一次物品提交仍在处理中，请稍候。"
item-submit-empty: "<yellow>背包中没有可提交的物品。当前进度：%progress%"
item-submit-progress: "<green>本次已提交 %submitted% 个物品。</green> <gray>当前进度：%progress%"
craftengine-unavailable: "<red>该称号需要 CraftEngine 物品，但 CraftEngine API 当前不可用。"
custom-disabled: "<red>自定义称号功能未启用。"
custom-input-name: "<yellow>请在聊天中输入称号名称，输入 cancel 取消。"
custom-input-description: "<yellow>请在聊天中输入称号描述，输入 cancel 取消。"
custom-input-cancelled: "<gray>已取消本次输入。"
custom-name-required: "<red>请先设置称号名称。"
custom-invalid-length: "<red>输入长度必须在 1 到 %max% 个字符之间。"
custom-created: "<green>自定义称号创建成功并已放入仓库。"
custom-failed: "<red>自定义称号创建失败。"
reload-success: "<green>配置与称号定义已重新加载。"
command-help:
  - "<aqua>/cloudtitle</aqua> <gray>- 打开称号仓库"
  - "<aqua>/cloudtitle shop</aqua> <gray>- 打开称号商城"
  - "<aqua>/cloudtitle custom</aqua> <gray>- 打开称号自定义"
  - "<aqua>/cloudtitle set <id></aqua> <gray>- 佩戴称号"
  - "<aqua>/cloudtitle clear</aqua> <gray>- 卸下称号"
  - "<aqua>/cloudtitle grant/revoke <玩家> <id></aqua> <gray>- 管理称号"
  - "<aqua>/cloudtitle reload</aqua> <gray>- 重载配置"
admin-success: "<green>操作成功：%player% / %id%"
admin-failed: "<red>操作失败，请检查称号 ID 或后台日志。"

# GUI 中的 Buff 显示格式。药水名称可在下方逐项修改。
buff-display:
  none: "<gray>无增益</gray>"
  format: "<aqua>%effect%</aqua> <white>%level%</white>"
  separator: "<dark_gray>、</dark_gray> "

# 商城未设置 requirement-display 时使用的默认获取条件。
shop-requirements:
  money: "<gold><bold>金币购买</bold></gold> <dark_gray>·</dark_gray> <white>%amount% 金币</white>"
  points: "<aqua><bold>点券兑换</bold></aqua> <dark_gray>·</dark_gray> <white>%amount% 点券</white>"
  permission: "<light_purple><bold>权限解锁</bold></light_purple> <dark_gray>·</dark_gray> <white>满足指定权限</white>"
  item: "<yellow><bold>物品提交</bold></yellow> <dark_gray>·</dark_gray> %items%"
  papi: "<blue><bold>变量条件</bold></blue> <dark_gray>·</dark_gray> %papi_conditions%"
  free: "<green><bold>免费领取</bold></green>"

potion-effects:
  speed: "速度"
  slowness: "缓慢"
  haste: "急迫"
  mining_fatigue: "挖掘疲劳"
  strength: "力量"
  instant_health: "瞬间治疗"
  instant_damage: "瞬间伤害"
  jump_boost: "跳跃提升"
  nausea: "反胃"
  regeneration: "生命恢复"
  resistance: "抗性提升"
  fire_resistance: "抗火"
  water_breathing: "水下呼吸"
  invisibility: "隐身"
  blindness: "失明"
  night_vision: "夜视"
  hunger: "饥饿"
  weakness: "虚弱"
  poison: "中毒"
  wither: "凋零"
  health_boost: "生命提升"
  absorption: "伤害吸收"
  saturation: "饱和"
  glowing: "发光"
  levitation: "飘浮"
  luck: "幸运"
  unluck: "霉运"
  slow_falling: "缓降"
  conduit_power: "潮涌能量"
  dolphins_grace: "海豚的恩惠"
  bad_omen: "不祥之兆"
  hero_of_the_village: "村庄英雄"
  darkness: "黑暗"
  trial_omen: "试炼之兆"
  raid_omen: "袭击之兆"
  wind_charged: "蓄风"
  weaving: "盘丝"
  oozing: "渗浆"
  infested: "寄生"
  breath_of_the_nautilus: "鹦鹉螺之息"`
      }
    ],
    "note": "所有子服连接同一 MySQL 时，每台服务器必须配置唯一 server-id。修改表名会创建新的空表，不会自动搬迁旧数据；变更存储配置后必须完整重启。"
  },
  "operations": {
    "intro": "数据库连接、异步任务、跨服 Buff 清理和配置迁移均有明确边界；上线前应按本节规划重启与数据迁移。",
    "tables": [
      {
        "title": "数据库表结构",
        "headers": [
          "配置表",
          "主键",
          "保存内容"
        ],
        "rows": [
          [
            "tables.players",
            "uuid",
            "selected_title、applied_buffs、applied_server"
          ],
          [
            "tables.owned",
            "uuid + title_id",
            "玩家拥有的称号"
          ],
          [
            "tables.custom-titles",
            "id",
            "owner_uuid、name、description、created_at，并自动创建 owner_uuid 索引"
          ],
          [
            "tables.item-progress",
            "uuid + title_id + item_key",
            "分段提交数量"
          ]
        ]
      }
    ],
    "notes": [
      {
        "title": "性能与一致性",
        "items": [
          "SQLite 使用单连接和单异步存储线程；MySQL 使用 HikariCP，异步线程数为连接池的一半且最少为 2。",
          "PAPI 查询只读内存缓存；GUI 与聊天监听在主线程更新 Bukkit 状态，数据库回调切回主线程。",
          "MySQL 物品提交使用事务和 FOR UPDATE 防止同一进度并发超交；SQLite 依赖单线程串行。",
          "插件卸载时关闭全部插件 GUI、卸载在线玩家、等待数据库任务最多 5 秒并关闭数据源。"
        ]
      },
      {
        "title": "重载与升级",
        "items": [
          "/cloudtitle reload 会关闭全部插件 GUI、取消未完成的工坊聊天输入、重载 YAML、重新接入经济服务并重应用在线 Buff；不会重建数据库连接，也不会改变已创建的定时任务周期。",
          "旧版默认语言前缀“云世界称号”和三个旧版默认 GUI 标题仅在精确匹配时迁移为“云称号”；管理员自定义内容不会被覆盖。",
          "旧测试目录可能存在根目录 gui.yml，当前版本不读取该文件；实际 GUI 位于 gui/ 子目录。",
          "语言文件缺失键会从内置 zh_CN 获取运行时默认值，但不会自动把所有新键写回磁盘。",
          "跨服清理只移除数据库记录的同等级药水效果；其他插件后来施加的更高等级效果不会被删除。"
        ]
      }
    ]
  }
};

plugin.icon = Badge;

export default plugin;
