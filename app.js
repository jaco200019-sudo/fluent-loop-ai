const STORAGE_KEY = "fluent-loop-pwa-state-v1";

const defaultState = {
  email: "me@example.com",
  goal: "daily-speaking",
  minutes: 20,
  level: "B1",
  testScore: 0,
  completedTaskIds: [],
  activeScenario: "coffee",
  cardIndex: 0,
  showChinese: true,
  lastMethod: "先用中文辅助建立安全感，每天练 1 个高频场景，再复习 5 个高频表达。",
  hasOnboarded: false,
  todayKey: "",
  lessonSalt: 0,
  streak: 6,
  practiceTest: null,
  learningData: {
    events: []
  }
};

const extraLifeScenarios = {
  apartment: {
    label: "租房",
    icon: "home",
    name: "Iris, leasing agent",
    hint: "练租房看房和询问费用",
    start: "Hi. Are you here for the apartment viewing?",
    startCn: "你好。你是来看这套公寓的吗？",
    suggestions: ["Is the rent negotiable?", "Are utilities included?", "How much is the deposit?"],
    suggestionsCn: ["房租可以商量吗？", "水电包含在内吗？", "押金是多少？"],
    replies: [
      "Yes. Let me show you the living room first.",
      "The rent includes water, but electricity is separate.",
      "The deposit is one month's rent.",
      "The lease is for twelve months.",
      "You can move in next week if you decide today.",
      "There is a laundry room on the first floor."
    ],
    repliesCn: [
      "是的。我先带你看客厅。",
      "房租包含水费，但电费另算。",
      "押金是一个月房租。",
      "租期是十二个月。",
      "如果你今天决定，下周可以搬进来。",
      "一楼有洗衣房。"
    ]
  },
  bank: {
    label: "银行",
    icon: "wallet",
    name: "Mason, bank clerk",
    hint: "练银行开户、转账和手续费",
    start: "Hello. How can I help you today?",
    startCn: "你好。今天需要办理什么业务？",
    suggestions: ["I would like to open an account.", "Is there a monthly fee?", "Can I transfer money online?"],
    suggestionsCn: ["我想开一个账户。", "有月费吗？", "我可以网上转账吗？"],
    replies: [
      "Sure. May I see your ID, please?",
      "There is no monthly fee for this account.",
      "You can transfer money through the mobile app.",
      "The card will arrive in five business days.",
      "Please fill out this form first.",
      "Would you like a checking or savings account?"
    ],
    repliesCn: [
      "可以。请给我看一下你的证件。",
      "这个账户没有月费。",
      "你可以通过手机应用转账。",
      "银行卡会在五个工作日内寄到。",
      "请先填写这张表。",
      "你想开支票账户还是储蓄账户？"
    ]
  },
  delivery: {
    label: "快递退货",
    icon: "package",
    name: "Riley, support agent",
    hint: "练快递取件、退货和退款",
    start: "Hi. What is the issue with your order?",
    startCn: "你好。你的订单有什么问题？",
    suggestions: ["I would like to return this.", "Can I get a refund?", "My package has not arrived."],
    suggestionsCn: ["我想退这个。", "可以退款吗？", "我的包裹还没到。"],
    replies: [
      "I can help with that. Do you have the order number?",
      "The refund usually takes three to five business days.",
      "We can send you a return label by email.",
      "Please keep the receipt until the refund is complete.",
      "The courier can pick it up tomorrow.",
      "I am sorry about the delay."
    ],
    repliesCn: [
      "我可以帮你处理。你有订单号吗？",
      "退款通常需要三到五个工作日。",
      "我们可以通过邮件给你退货标签。",
      "退款完成前请保留小票。",
      "快递员明天可以上门取件。",
      "很抱歉延误了。"
    ]
  },
  appointment: {
    label: "预约",
    icon: "phone",
    name: "Ava, receptionist",
    hint: "练电话预约和改时间",
    start: "Good morning. What would you like to schedule?",
    startCn: "早上好。你想预约什么？",
    suggestions: ["I would like to make an appointment.", "Can I reschedule?", "Do you have anything available tomorrow?"],
    suggestionsCn: ["我想预约。", "我可以改时间吗？", "明天有空位吗？"],
    replies: [
      "Sure. What day works best for you?",
      "We have an opening tomorrow at three.",
      "I can reschedule it for Friday morning.",
      "May I have your name and phone number?",
      "Please arrive ten minutes early.",
      "I will send you a confirmation message."
    ],
    repliesCn: [
      "可以。哪一天最适合你？",
      "我们明天下午三点有空位。",
      "我可以帮你改到周五上午。",
      "可以留下你的姓名和电话吗？",
      "请提前十分钟到。",
      "我会给你发确认短信。"
    ]
  },
  emergency: {
    label: "紧急求助",
    icon: "alert",
    name: "Pat, help desk",
    hint: "练紧急情况下清楚求助",
    start: "Are you safe right now? Tell me what happened.",
    startCn: "你现在安全吗？告诉我发生了什么。",
    suggestions: ["I need help.", "I lost my phone.", "Can you call the police?"],
    suggestionsCn: ["我需要帮助。", "我的手机丢了。", "你可以报警吗？"],
    replies: [
      "Stay where you are. I will help you step by step.",
      "Please tell me your location.",
      "I can call the police for you.",
      "Do you need medical help?",
      "Keep your documents with you if you can.",
      "I will stay on the line with you."
    ],
    repliesCn: [
      "待在原地。我会一步一步帮你。",
      "请告诉我你的位置。",
      "我可以帮你报警。",
      "你需要医疗帮助吗？",
      "如果可以，请把证件带在身边。",
      "我会一直在线陪你。"
    ]
  },
  social: {
    label: "社交",
    icon: "smile",
    name: "Jamie, new friend",
    hint: "练自我介绍和轻松聊天",
    start: "Hi, I don't think we've met. I'm Jamie.",
    startCn: "你好，我们好像还没见过。我是 Jamie。",
    suggestions: ["Nice to meet you.", "I am learning English.", "What do you do?"],
    suggestionsCn: ["很高兴认识你。", "我正在学英语。", "你是做什么的？"],
    replies: [
      "Nice to meet you too. How is your day going?",
      "That is great. What made you start learning English?",
      "I work in design. What about you?",
      "Do you live around here?",
      "What do you like to do on weekends?",
      "Your English is clear. Keep going."
    ],
    repliesCn: [
      "我也很高兴认识你。今天过得怎么样？",
      "很好。是什么让你开始学英语的？",
      "我做设计。你呢？",
      "你住在这附近吗？",
      "你周末喜欢做什么？",
      "你的英语很清楚。继续说。"
    ]
  }
};

const taskTemplates = [
  {
    id: "review",
    title: "复习 3 个表达",
    description: "supposed to / clarify / depends on",
    icon: "book"
  },
  {
    id: "listening",
    title: "听力 4 分钟",
    description: "咖啡店里的自然寒暄",
    icon: "audio"
  },
  {
    id: "conversation",
    title: "AI 场景对话",
    description: "点咖啡，要求换成燕麦奶",
    icon: "chat"
  },
  {
    id: "writing",
    title: "写 3 句话总结",
    description: "用今天的表达写自己的例句",
    icon: "pen"
  },
  {
    id: "test",
    title: "今日小测",
    description: "选择题 + 情景造句，马上看对错",
    icon: "test"
  }
];

const taskPools = {
  review: [
    { title: "复习 3 个表达", description: "supposed to / clarify / depends on", icon: "book" },
    { title: "复习礼貌请求", description: "Could I get / Can I have / Would it be possible", icon: "book" },
    { title: "复习追问句", description: "Could you clarify / What do you mean by / Could you repeat", icon: "book" },
    { title: "复习高频动词", description: "get / need / help / make / take", icon: "book" },
    { title: "复习餐厅表达", description: "menu / order / bill / recommend", icon: "book" },
    { title: "复习酒店表达", description: "reservation / check in / room / key card", icon: "book" },
    { title: "复习求助表达", description: "Could you help / I am looking for / I feel", icon: "book" },
    { title: "复习租房表达", description: "rent / deposit / utilities / viewing", icon: "book" },
    { title: "复习银行表达", description: "account / transfer / fee / statement", icon: "book" },
    { title: "复习退货表达", description: "return / refund / receipt / exchange", icon: "book" },
    { title: "复习预约表达", description: "appointment / available / reschedule", icon: "book" },
    { title: "复习紧急表达", description: "emergency / lost / help / police", icon: "book" }
  ],
  listening: [
    { title: "听力 4 分钟", description: "咖啡店里的自然寒暄", icon: "audio" },
    { title: "听力 5 分钟", description: "机场、酒店、车站里的短问答", icon: "audio" },
    { title: "听力 6 分钟", description: "会议开头的 update 和 blocker", icon: "audio" },
    { title: "听力 4 分钟", description: "面试里的 tell me about yourself", icon: "audio" },
    { title: "听力 5 分钟", description: "餐厅点餐和买单", icon: "audio" },
    { title: "听力 4 分钟", description: "打车确认目的地和价格", icon: "audio" },
    { title: "听力 6 分钟", description: "医生问症状和过敏史", icon: "audio" },
    { title: "听力 5 分钟", description: "银行开户和手续费说明", icon: "audio" },
    { title: "听力 5 分钟", description: "电话预约和改时间", icon: "audio" },
    { title: "听力 4 分钟", description: "快递取件和退货流程", icon: "audio" },
    { title: "听力 6 分钟", description: "租房看房和押金说明", icon: "audio" }
  ],
  conversation: [
    { title: "AI 场景对话", description: "点咖啡，要求换成燕麦奶", icon: "chat", scenario: "coffee" },
    { title: "AI 场景对话", description: "旅行问路，确认站台和时间", icon: "chat", scenario: "travel" },
    { title: "AI 场景对话", description: "会议同步，说明进度和卡点", icon: "chat", scenario: "meeting" },
    { title: "AI 场景对话", description: "面试介绍，讲一个具体例子", icon: "chat", scenario: "interview" },
    { title: "AI 场景对话", description: "餐厅点餐，询问推荐和买单", icon: "chat", scenario: "restaurant" },
    { title: "AI 场景对话", description: "酒店入住，确认预订和早餐", icon: "chat", scenario: "hotel" },
    { title: "AI 场景对话", description: "超市购物，询问价格和付款", icon: "chat", scenario: "shopping" },
    { title: "AI 场景对话", description: "打车出行，确认目的地和费用", icon: "chat", scenario: "taxi" },
    { title: "AI 场景对话", description: "看医生，描述症状和用药", icon: "chat", scenario: "doctor" },
    { title: "AI 场景对话", description: "租房看房，询问押金和水电", icon: "chat", scenario: "apartment" },
    { title: "AI 场景对话", description: "银行办事，开户和转账咨询", icon: "chat", scenario: "bank" },
    { title: "AI 场景对话", description: "快递退货，说明订单和退款", icon: "chat", scenario: "delivery" },
    { title: "AI 场景对话", description: "电话预约，确认时间和改期", icon: "chat", scenario: "appointment" },
    { title: "AI 场景对话", description: "紧急求助，说明位置和问题", icon: "chat", scenario: "emergency" },
    { title: "AI 场景对话", description: "社交寒暄，认识新朋友", icon: "chat", scenario: "social" }
  ],
  writing: [
    { title: "写 3 句话总结", description: "用今天的表达写自己的例句", icon: "pen" },
    { title: "写 1 段小对话", description: "把今天场景改成自己的真实需求", icon: "pen" },
    { title: "写 3 个替换句", description: "把 I want 换成更自然的表达", icon: "pen" },
    { title: "写 1 个复盘", description: "记录今天最想记住的 1 个词", icon: "pen" },
    { title: "写 3 个请求句", description: "用 Could I / Could you / I need 写真实需求", icon: "pen" },
    { title: "写 1 个生活任务", description: "模拟今天要在国外完成的一件小事", icon: "pen" },
    { title: "写 1 个预约短信", description: "说明想预约的时间和服务", icon: "pen" },
    { title: "写 1 个退货说明", description: "用英文解释订单问题和退款请求", icon: "pen" },
    { title: "写 1 个求助句", description: "说明你在哪里、遇到什么问题", icon: "pen" }
  ],
  test: [
    { title: "今日小测", description: "选择正确表达，再写 1 句真实英语", icon: "test" },
    { title: "场景反应测试", description: "餐厅、酒店、打车里的高频句判断", icon: "test" },
    { title: "5 分钟出口测", description: "测你能不能把中文需求变成英文", icon: "test" }
  ]
};

const dailyProfiles = {
  "daily-speaking": {
    scenarios: ["coffee", "restaurant", "shopping", "taxi", "doctor", "hotel", "travel", "apartment", "bank", "delivery", "appointment", "emergency", "social", "meeting", "interview"],
    titles: ["今天练 1 场真实开口，复习 3 个高频表达", "今天把一句话说自然，再练一个生活场景", "今天用英语完成一个小任务"],
    copies: ["内容会根据你的目标、等级和日期轮换；先敢说，再慢慢说自然。", "系统会优先安排日常最常用的词和句型，降低开口压力。", "今天重点是礼貌请求、确认信息和自然追问。"]
  },
  "work-english": {
    scenarios: ["meeting", "interview", "appointment", "bank", "hotel", "taxi", "coffee", "restaurant", "travel", "social"],
    titles: ["今天练工作同步，复习会议高频表达", "今天练清楚表达进度和卡点", "今天把工作英语说得更礼貌"],
    copies: ["重点练 update、blocker、clarify 这类工作场景高频表达。", "内容会向会议、面试和协作沟通倾斜。", "先学能马上用的短句，再练更完整的解释。"]
  },
  travel: {
    scenarios: ["travel", "hotel", "taxi", "restaurant", "shopping", "coffee", "doctor", "delivery", "emergency", "appointment", "social", "meeting", "interview"],
    titles: ["今天练旅行问路，复习求助表达", "今天练机场/车站/点餐里的常用句", "今天把旅行英语说完整"],
    copies: ["重点练问路、确认时间、求助和点餐。", "先掌握旅行中最常遇到的短问答。", "今天的内容更偏向出门就能用的表达。"]
  },
  exam: {
    scenarios: ["interview", "meeting", "restaurant", "hotel", "coffee", "travel", "shopping", "appointment", "bank", "social"],
    titles: ["今天练基础语法和高频搭配", "今天用短句建立英语反应速度", "今天复习容易错的基础表达"],
    copies: ["重点练搭配、时态和更自然的句子选择。", "先把高频错误改掉，再慢慢提高表达长度。", "每题会给正确答案和中文解释，方便你复盘。"]
  }
};

const lifeCourses = [
  {
    scenario: "coffee",
    title: "咖啡点单",
    description: "饮品、杯型、奶类、堂食外带",
    phrases: ["Could I get an iced latte?", "For here, please."]
  },
  {
    scenario: "travel",
    title: "旅行问路",
    description: "路线、站台、车票、时间",
    phrases: ["How do I get to the airport?", "Which platform should I use?"]
  },
  {
    scenario: "interview",
    title: "面试介绍",
    description: "经验、优势、例子、追问",
    phrases: ["My strength is...", "Could you clarify the role?"]
  },
  {
    scenario: "restaurant",
    title: "餐厅点餐",
    description: "推荐、点菜、过敏、买单",
    phrases: ["What do you recommend?", "Can I get the bill?"]
  },
  {
    scenario: "hotel",
    title: "酒店入住",
    description: "预订、入住、早餐、退房",
    phrases: ["I have a reservation.", "Is breakfast included?"]
  },
  {
    scenario: "shopping",
    title: "超市购物",
    description: "询价、尺码、付款、退换",
    phrases: ["How much is this?", "Can I pay by card?"]
  },
  {
    scenario: "taxi",
    title: "打车出行",
    description: "目的地、路线、费用、下车点",
    phrases: ["Could you take me to this address?", "How long will it take?"]
  },
  {
    scenario: "doctor",
    title: "看医生",
    description: "症状、发烧、过敏、用药",
    phrases: ["I have a sore throat.", "Do I need any medicine?"]
  },
  {
    scenario: "apartment",
    title: "租房看房",
    description: "看房、房租、押金、水电",
    phrases: ["Is the rent negotiable?", "Are utilities included?"]
  },
  {
    scenario: "bank",
    title: "银行办事",
    description: "开户、转账、手续费、流水",
    phrases: ["I would like to open an account.", "Is there a fee?"]
  },
  {
    scenario: "delivery",
    title: "快递退货",
    description: "取件、订单、退货、退款",
    phrases: ["I would like to return this.", "Can I get a refund?"]
  },
  {
    scenario: "appointment",
    title: "电话预约",
    description: "预约、改期、确认时间",
    phrases: ["I would like to make an appointment.", "Can I reschedule?"]
  },
  {
    scenario: "emergency",
    title: "紧急求助",
    description: "迷路、丢东西、生病、报警",
    phrases: ["I need help.", "I lost my phone."]
  },
  {
    scenario: "social",
    title: "社交寒暄",
    description: "介绍自己、兴趣、继续聊天",
    phrases: ["Nice to meet you.", "What do you do?"]
  },
  {
    scenario: "meeting",
    title: "会议沟通",
    description: "进度、卡点、时间线、跟进",
    phrases: ["The blocker is...", "I can follow up tomorrow."]
  }
];

const questions = [
  {
    skill: "口语表达",
    text: "你想礼貌地点一杯冰拿铁，哪句更自然？",
    explanation: "点餐时用 Could I get...? 更礼貌、更自然，也更接近真实英语环境。",
    options: [
      { text: "I want iced latte.", correct: false },
      { text: "Could I get an iced latte?", correct: true },
      { text: "Give me iced latte.", correct: false }
    ]
  },
  {
    skill: "听力理解",
    text: "店员问 “For here or to go?”，意思是？",
    explanation: "For here 是在店里吃/喝，to go 是打包带走。",
    options: [
      { text: "在这里喝还是带走", correct: true },
      { text: "要不要加冰", correct: false },
      { text: "现在还是稍后", correct: false }
    ]
  },
  {
    skill: "工作表达",
    text: "你没听懂对方的意思，哪句更礼貌？",
    explanation: "Could you clarify...? 是礼貌请对方解释，适合会议、面试和客服场景。",
    options: [
      { text: "What?", correct: false },
      { text: "Say again.", correct: false },
      { text: "Could you clarify what you mean?", correct: true }
    ]
  },
  {
    skill: "日常表达",
    text: "你想说“我今天下午有空”，哪句最自然？",
    explanation: "I'm available this afternoon. 简洁、自然，工作和日常都能用。",
    options: [
      { text: "I am convenient this afternoon.", correct: false },
      { text: "I'm available this afternoon.", correct: true },
      { text: "I have free on afternoon.", correct: false }
    ]
  },
  {
    skill: "高频搭配",
    text: "补全句子：It depends ___ the weather.",
    explanation: "depend on 是固定搭配，意思是“取决于”。",
    options: [
      { text: "in", correct: false },
      { text: "on", correct: true },
      { text: "at", correct: false }
    ]
  },
  {
    skill: "旅行沟通",
    text: "你想问“去机场要多久？”，哪句最自然？",
    explanation: "How long does it take to...? 是询问所需时间的高频句型。",
    options: [
      { text: "How long does it take to get to the airport?", correct: true },
      { text: "How many time to airport?", correct: false },
      { text: "How far minutes airport?", correct: false }
    ]
  },
  {
    skill: "工作表达",
    text: "你想说“我明天跟进”，哪句更自然？",
    explanation: "follow up 是工作沟通里非常常见的“继续跟进”。",
    options: [
      { text: "I follow tomorrow.", correct: false },
      { text: "I can follow up tomorrow.", correct: true },
      { text: "I will continue you tomorrow.", correct: false }
    ]
  },
  {
    skill: "语法基础",
    text: "补全句子：I am good ___ explaining ideas.",
    explanation: "be good at 是固定搭配，后面可以接名词或动名词。",
    options: [
      { text: "in", correct: false },
      { text: "at", correct: true },
      { text: "for", correct: false }
    ]
  },
  {
    skill: "礼貌表达",
    text: "你想请别人重复一遍，哪句最礼貌？",
    explanation: "Could you repeat that? 比 What? 更礼貌，也更适合新手开口。",
    options: [
      { text: "Could you repeat that?", correct: true },
      { text: "What you say?", correct: false },
      { text: "Again.", correct: false }
    ]
  },
  {
    skill: "日常表达",
    text: "你想说“我不太确定”，哪句最自然？",
    explanation: "I'm not sure yet. 是日常和工作里都很自然的表达。",
    options: [
      { text: "I don't very sure.", correct: false },
      { text: "I'm not sure yet.", correct: true },
      { text: "I no sure now.", correct: false }
    ]
  },
  {
    skill: "高频动词",
    text: "你想说“我需要一点帮助”，哪句最自然？",
    explanation: "I need a little help. 简单、直接，而且非常高频。",
    options: [
      { text: "I need a little help.", correct: true },
      { text: "I need a few help.", correct: false },
      { text: "I want some helps.", correct: false }
    ]
  },
  {
    skill: "会议表达",
    text: "你想说“主要问题是时间线”，哪句更自然？",
    explanation: "The main issue is... 可以自然说明问题或风险。",
    options: [
      { text: "The main issue is the timeline.", correct: true },
      { text: "The big question is time line.", correct: false },
      { text: "Problem mostly timeline is.", correct: false }
    ]
  },
  {
    skill: "餐厅表达",
    text: "你想请服务员推荐一道菜，哪句最自然？",
    explanation: "What do you recommend? 是餐厅里询问推荐的高频句。",
    options: [
      { text: "What do you recommend?", correct: true },
      { text: "What food is good for you?", correct: false },
      { text: "You recommend me food?", correct: false }
    ]
  },
  {
    skill: "酒店入住",
    text: "你到酒店前台，想说“我有预订”，哪句最自然？",
    explanation: "I have a reservation. 是酒店入住时最常用的开场句。",
    options: [
      { text: "I have a reservation.", correct: true },
      { text: "I did a room.", correct: false },
      { text: "I have ordered hotel.", correct: false }
    ]
  },
  {
    skill: "购物表达",
    text: "你想问“这个多少钱？”，哪句最自然？",
    explanation: "How much is this? 简单直接，购物场景非常高频。",
    options: [
      { text: "How much is this?", correct: true },
      { text: "How money this?", correct: false },
      { text: "What price are this?", correct: false }
    ]
  },
  {
    skill: "打车表达",
    text: "你想说“请带我去这个地址”，哪句最自然？",
    explanation: "Could you take me to this address? 礼貌且清楚，适合打车。",
    options: [
      { text: "Could you take me to this address?", correct: true },
      { text: "You go me this address.", correct: false },
      { text: "Please drive this place me.", correct: false }
    ]
  },
  {
    skill: "看医生",
    text: "你想说“我喉咙痛”，哪句最自然？",
    explanation: "I have a sore throat. 是描述症状的常用表达。",
    options: [
      { text: "I have a sore throat.", correct: true },
      { text: "My throat is pain.", correct: false },
      { text: "I am throat hurt.", correct: false }
    ]
  },
  {
    skill: "付款表达",
    text: "你想问“可以刷卡吗？”，哪句最自然？",
    explanation: "Can I pay by card? 适合餐厅、商店、酒店等付款场景。",
    options: [
      { text: "Can I pay by card?", correct: true },
      { text: "Can I pay with carding?", correct: false },
      { text: "I use card money?", correct: false }
    ]
  },
  {
    skill: "礼貌求助",
    text: "你想问“你能帮我一下吗？”，哪句最自然？",
    explanation: "Could you help me with this? 礼貌、清楚，也适合新手。",
    options: [
      { text: "Could you help me with this?", correct: true },
      { text: "Can you help for me this?", correct: false },
      { text: "You help me this thing?", correct: false }
    ]
  },
  {
    skill: "时间表达",
    text: "你想说“我五分钟后到”，哪句最自然？",
    explanation: "I'll be there in five minutes. 是到达时间的自然表达。",
    options: [
      { text: "I'll be there in five minutes.", correct: true },
      { text: "I arrive after five minute.", correct: false },
      { text: "I go there five minutes later now.", correct: false }
    ]
  }
];

const practiceTestBank = [
  {
    id: "test-restaurant-recommend",
    scenario: "restaurant",
    skill: "餐厅推荐",
    prompt: "你在餐厅想问“你推荐什么？”，哪句最自然？",
    correct: "What do you recommend?",
    options: ["What do you recommend?", "What you recommend?", "Give me good food."],
    explanation: "What do you recommend? 简单、礼貌，适合餐厅和咖啡店。"
  },
  {
    id: "test-hotel-reservation",
    scenario: "hotel",
    skill: "酒店入住",
    prompt: "你到酒店前台，想说“我有预订”。",
    correct: "I have a reservation.",
    options: ["I have a reservation.", "I am reservation.", "I booked me."],
    explanation: "I have a reservation. 是入住酒店最常用的开场句。"
  },
  {
    id: "test-shopping-price",
    scenario: "shopping",
    skill: "购物询价",
    prompt: "你想问“这个多少钱？”。",
    correct: "How much is this?",
    options: ["How much is this?", "How many money?", "What price this?"],
    explanation: "How much is this? 是购物时最实用的基础句。"
  },
  {
    id: "test-taxi-address",
    scenario: "taxi",
    skill: "打车目的地",
    prompt: "你想让司机带你去这个地址。",
    correct: "Could you take me to this address?",
    options: ["Could you take me to this address?", "You go this address.", "Drive me address."],
    explanation: "Could you take me to this address? 礼貌清楚，适合打车。"
  },
  {
    id: "test-doctor-symptom",
    scenario: "doctor",
    skill: "描述症状",
    prompt: "你看医生时想说“我喉咙痛”。",
    correct: "I have a sore throat.",
    options: ["I have a sore throat.", "My throat is bad pain thing.", "I am throat sore."],
    explanation: "I have a sore throat. 是描述症状的自然表达。"
  },
  {
    id: "test-payment-card",
    scenario: "shopping",
    skill: "付款方式",
    prompt: "你想问“可以刷卡吗？”。",
    correct: "Can I pay by card?",
    options: ["Can I pay by card?", "Can I pay card?", "I use card pay?"],
    explanation: "Can I pay by card? 餐厅、商店、酒店都能用。"
  },
  {
    id: "test-help-clarify",
    scenario: "travel",
    skill: "礼貌求助",
    prompt: "你没有听懂，想请对方再解释一下。",
    correct: "Could you clarify that?",
    options: ["Could you clarify that?", "What?", "Say again now."],
    explanation: "Could you clarify that? 比 What? 更礼貌，也更适合真实交流。"
  },
  {
    id: "test-apartment-utilities",
    scenario: "apartment",
    skill: "租房看房",
    prompt: "你想问“水电包含在房租里吗？”。",
    correct: "Are utilities included?",
    options: ["Are utilities included?", "Utilities are rent inside?", "Water electric have?"],
    explanation: "Are utilities included? 是租房时询问水电费用是否包含的自然表达。"
  },
  {
    id: "test-bank-account",
    scenario: "bank",
    skill: "银行开户",
    prompt: "你想说“我想开一个账户”。",
    correct: "I would like to open an account.",
    options: ["I would like to open an account.", "I want make bank thing.", "Open account me."],
    explanation: "I would like to open an account. 礼貌清楚，适合银行柜台。"
  },
  {
    id: "test-delivery-refund",
    scenario: "delivery",
    skill: "退货退款",
    prompt: "你想问“可以退款吗？”。",
    correct: "Can I get a refund?",
    options: ["Can I get a refund?", "Can money back me?", "I want return money now."],
    explanation: "Can I get a refund? 是退货和售后场景的高频句。"
  },
  {
    id: "test-appointment-reschedule",
    scenario: "appointment",
    skill: "预约改期",
    prompt: "你想问“我可以改时间吗？”。",
    correct: "Can I reschedule?",
    options: ["Can I reschedule?", "Can I change other time me?", "I want new time change."],
    explanation: "Can I reschedule? 简短自然，适合电话预约、医生、理发等场景。"
  },
  {
    id: "test-emergency-help",
    scenario: "emergency",
    skill: "紧急求助",
    prompt: "你遇到麻烦，想先说“我需要帮助”。",
    correct: "I need help.",
    options: ["I need help.", "Help me problem thing.", "I am need helping."],
    explanation: "I need help. 最短、最清楚，紧急情况下优先学会。"
  }
];

const questionBank = questions.slice();

const scenarios = {
  coffee: {
    label: "点咖啡",
    icon: "coffee",
    name: "Mia, barista",
    hint: "请用英文点一杯咖啡",
    start: "Hi there. What can I get for you today?",
    startCn: "你好，今天想喝点什么？",
    suggestions: ["Could I get an iced latte?", "Can I have it with oat milk?", "For here, please."],
    suggestionsCn: ["我可以要一杯冰拿铁吗？", "可以换成燕麦奶吗？", "在这里喝。"],
    replies: [
      "Sure. What size would you like?",
      "Got it. Would you like that for here or to go?",
      "No problem. Anything else for you?",
      "Of course. Would you like it hot or iced?",
      "Sounds good. Can I get your name for the order?",
      "Sure thing. That will be ready in a few minutes."
    ],
    repliesCn: [
      "当然。你想要什么杯型？",
      "好的。你是在这里喝还是带走？",
      "没问题。还需要别的吗？",
      "当然。你想要热的还是冰的？",
      "好的。可以留一下点单名字吗？",
      "没问题。几分钟后就好。"
    ]
  },
  interview: {
    label: "面试",
    icon: "briefcase",
    name: "Alex, recruiter",
    hint: "用英文回答面试问题",
    start: "Thanks for joining. Could you tell me a little about yourself?",
    startCn: "谢谢你来面试。可以简单介绍一下你自己吗？",
    suggestions: ["I have three years of experience in...", "My strength is...", "Could you clarify the role?"],
    suggestionsCn: ["我有三年……经验。", "我的优势是……", "可以解释一下这个职位吗？"],
    replies: [
      "That is a good start. Could you give me one concrete example?",
      "Interesting. What kind of team do you work best with?",
      "Thanks. What are you hoping to improve in your next role?",
      "Could you tell me about a challenge you solved recently?",
      "That makes sense. What would you like to learn next?",
      "Great. How do you usually communicate with teammates?"
    ],
    repliesCn: [
      "这是个不错的开头。你能举一个具体例子吗？",
      "有意思。你最适合什么样的团队？",
      "谢谢。你希望在下一份工作里提升什么？",
      "你可以讲一个最近解决的挑战吗？",
      "有道理。你接下来想学习什么？",
      "很好。你平时怎么和队友沟通？"
    ]
  },
  meeting: {
    label: "会议",
    icon: "calendar",
    name: "Nora, teammate",
    hint: "练工作会议表达",
    start: "Can you give us a quick update on your task?",
    startCn: "你可以简单同步一下你的任务进展吗？",
    suggestions: ["I am currently working on...", "The blocker is...", "I can follow up tomorrow."],
    suggestionsCn: ["我现在正在做……", "目前的阻碍是……", "我明天可以继续跟进。"],
    replies: [
      "Thanks. What is the main blocker right now?",
      "Could you clarify the timeline?",
      "That works. Please share a short summary after the meeting.",
      "Good update. What support do you need from us?",
      "Understood. Can you follow up with the next step?",
      "Thanks. Is there any risk we should know about?"
    ],
    repliesCn: [
      "谢谢。现在主要卡点是什么？",
      "你可以说明一下时间线吗？",
      "可以。会后请发一个简短总结。",
      "更新得很好。你需要我们什么支持？",
      "明白。你可以继续跟进下一步吗？",
      "谢谢。有没有我们需要知道的风险？"
    ]
  },
  travel: {
    label: "旅行",
    icon: "map",
    name: "Sam, station staff",
    hint: "练旅行问路",
    start: "Hi. Where are you trying to go?",
    startCn: "你好，你想去哪里？",
    suggestions: ["How do I get to the airport?", "Which platform should I use?", "How long does it take?"],
    suggestionsCn: ["我怎么去机场？", "我应该去哪个站台？", "大概要多久？"],
    replies: [
      "Take the blue line and change at Central Station.",
      "It usually takes about thirty minutes.",
      "You can buy a ticket at the machine on your left.",
      "Use platform two. The next train leaves in ten minutes.",
      "Go straight for two blocks, then turn right.",
      "You can ask the driver to stop near the hotel."
    ],
    repliesCn: [
      "坐蓝线，在中央站换乘。",
      "通常大约需要三十分钟。",
      "你可以在左边的机器上买票。",
      "去二号站台。下一班车十分钟后出发。",
      "直走两个街区，然后右转。",
      "你可以请司机在酒店附近停。"
    ]
  },
  restaurant: {
    label: "餐厅",
    icon: "utensils",
    name: "Lena, server",
    hint: "练餐厅点餐和买单",
    start: "Welcome in. Would you like to see the menu?",
    startCn: "欢迎光临。你想先看菜单吗？",
    suggestions: ["What do you recommend?", "Could I have the chicken rice?", "Can I get the bill, please?"],
    suggestionsCn: ["你推荐什么？", "我可以要一份鸡肉饭吗？", "可以给我账单吗？"],
    replies: [
      "Of course. The chicken rice is very popular today.",
      "Sure. Would you like anything to drink?",
      "No problem. I will bring the bill to your table.",
      "Would you like it spicy or mild?",
      "Do you have any allergies we should know about?",
      "Your order will be ready in about ten minutes."
    ],
    repliesCn: [
      "当然。今天鸡肉饭很受欢迎。",
      "可以。你想喝点什么吗？",
      "没问题。我会把账单拿到你桌上。",
      "你想要辣一点还是温和一点？",
      "你有什么过敏需要我们知道吗？",
      "你的餐大约十分钟后好。"
    ]
  },
  hotel: {
    label: "酒店",
    icon: "hotel",
    name: "Eva, front desk",
    hint: "练酒店入住和询问服务",
    start: "Good evening. Do you have a reservation with us?",
    startCn: "晚上好。你有预订吗？",
    suggestions: ["I have a reservation.", "Could I check in, please?", "Is breakfast included?"],
    suggestionsCn: ["我有预订。", "我可以办理入住吗？", "包含早餐吗？"],
    replies: [
      "Sure. May I have your passport or ID, please?",
      "Your room is on the fifth floor. Here is your key card.",
      "Breakfast is served from seven to ten in the morning.",
      "Check-out is before eleven tomorrow.",
      "Would you like a room with one bed or two beds?",
      "The elevator is just around the corner."
    ],
    repliesCn: [
      "可以。请给我你的护照或身份证件。",
      "你的房间在五楼。这是你的房卡。",
      "早餐是早上七点到十点。",
      "退房时间是明天十一点前。",
      "你想要一张床还是两张床的房间？",
      "电梯就在拐角处。"
    ]
  },
  shopping: {
    label: "购物",
    icon: "shopping",
    name: "Noah, shop assistant",
    hint: "练超市购物和询价付款",
    start: "Hi. Are you looking for anything in particular?",
    startCn: "你好。你在找什么特别的东西吗？",
    suggestions: ["How much is this?", "Do you have a smaller size?", "Can I pay by card?"],
    suggestionsCn: ["这个多少钱？", "有小一点的尺码吗？", "可以刷卡吗？"],
    replies: [
      "This one is twelve dollars.",
      "Yes, we have a smaller size over here.",
      "Sure. You can pay by card or cash.",
      "This item is on sale today.",
      "Would you like a bag?",
      "You can return it within seven days with the receipt."
    ],
    repliesCn: [
      "这个十二美元。",
      "有，我们这边有小一点的尺码。",
      "当然。你可以刷卡或付现金。",
      "这个商品今天打折。",
      "你需要袋子吗？",
      "凭小票七天内可以退货。"
    ]
  },
  taxi: {
    label: "打车",
    icon: "car",
    name: "Owen, driver",
    hint: "练打车确认目的地和路线",
    start: "Hi. Where would you like to go?",
    startCn: "你好。你想去哪里？",
    suggestions: ["Could you take me to this address?", "How long will it take?", "Can I pay by card?"],
    suggestionsCn: ["你可以带我去这个地址吗？", "大概要多久？", "可以刷卡吗？"],
    replies: [
      "Sure. It should take about twenty minutes.",
      "There is a little traffic, but this route is faster.",
      "Yes, you can pay by card at the end.",
      "Do you want me to drop you at the main entrance?",
      "Please check if this is the right address.",
      "I can wait here for a few minutes."
    ],
    repliesCn: [
      "可以。大约需要二十分钟。",
      "有点堵车，但这条路线更快。",
      "可以，最后可以刷卡。",
      "你想让我在正门放你下车吗？",
      "请确认一下这个地址是否正确。",
      "我可以在这里等几分钟。"
    ]
  },
  doctor: {
    label: "看医生",
    icon: "heart",
    name: "Dr. Kim",
    hint: "练描述症状和听懂建议",
    start: "Hi. What seems to be the problem today?",
    startCn: "你好。今天哪里不舒服？",
    suggestions: ["I have a sore throat.", "I have had a fever since yesterday.", "Do I need any medicine?"],
    suggestionsCn: ["我喉咙痛。", "我从昨天开始发烧。", "我需要吃药吗？"],
    replies: [
      "I see. How long have you had this symptom?",
      "Do you have a fever or a cough?",
      "Please drink more water and rest today.",
      "I will prescribe some medicine for the pain.",
      "Are you allergic to any medicine?",
      "If it gets worse, please come back tomorrow."
    ],
    repliesCn: [
      "我明白。这个症状持续多久了？",
      "你有发烧或咳嗽吗？",
      "今天请多喝水并休息。",
      "我会开一些止痛药。",
      "你对任何药物过敏吗？",
      "如果情况变严重，请明天再来。"
    ]
  },
  ...extraLifeScenarios
};

const cards = [
  {
    phrase: "Could I get...?",
    meaning: "礼貌地点单、提出请求。比 “I want...” 更自然。",
    example: "Could I get an iced latte with oat milk?",
    exampleCn: "我可以要一杯加燕麦奶的冰拿铁吗？",
    tag: "来自昨日对话"
  },
  {
    phrase: "It depends on...",
    meaning: "表达“取决于某个条件”，适合工作和日常聊天。",
    example: "It depends on the deadline and the budget.",
    exampleCn: "这取决于截止时间和预算。",
    tag: "高频表达"
  },
  {
    phrase: "Could you clarify...?",
    meaning: "听不懂或需要对方解释时，比 What? 更礼貌。",
    example: "Could you clarify what you mean by launch date?",
    exampleCn: "你能解释一下你说的发布日期是什么意思吗？",
    tag: "会议场景"
  },
  {
    phrase: "I am supposed to...",
    meaning: "表达“我应该/按安排要做某事”。",
    example: "I am supposed to send the report today.",
    exampleCn: "我今天应该把报告发出去。",
    tag: "语法薄弱点"
  },
  {
    phrase: "For here or to go?",
    meaning: "店员常问“在这里喝还是带走”。",
    example: "For here, please.",
    exampleCn: "在这里喝，谢谢。",
    tag: "听力连读"
  },
  {
    phrase: "What do you recommend?",
    meaning: "询问推荐。餐厅、咖啡店、商店都能用。",
    example: "What do you recommend for dinner?",
    exampleCn: "晚餐你推荐什么？",
    tag: "餐厅场景"
  },
  {
    phrase: "I have a reservation.",
    meaning: "表达“我有预订”，酒店和餐厅都很常见。",
    example: "I have a reservation under Chen.",
    exampleCn: "我有一个陈姓的预订。",
    tag: "酒店入住"
  },
  {
    phrase: "How much is this?",
    meaning: "询问价格。购物时最实用的基础句。",
    example: "How much is this bottle of water?",
    exampleCn: "这瓶水多少钱？",
    tag: "购物场景"
  },
  {
    phrase: "Could you take me to...?",
    meaning: "打车时告诉司机目的地，比 Go to... 更礼貌。",
    example: "Could you take me to this address?",
    exampleCn: "你可以带我去这个地址吗？",
    tag: "打车场景"
  },
  {
    phrase: "I have a sore throat.",
    meaning: "描述症状。看医生时非常常用。",
    example: "I have a sore throat and a fever.",
    exampleCn: "我喉咙痛，而且发烧。",
    tag: "看医生"
  },
  {
    phrase: "Can I pay by card?",
    meaning: "询问是否可以刷卡，付款场景高频。",
    example: "Can I pay by card or cash?",
    exampleCn: "我可以刷卡还是付现金？",
    tag: "付款表达"
  },
  {
    phrase: "I'll be there in...",
    meaning: "表达多久后到达，比 I arrive after... 更自然。",
    example: "I'll be there in five minutes.",
    exampleCn: "我五分钟后到。",
    tag: "时间表达"
  },
  {
    phrase: "Are utilities included?",
    meaning: "租房时询问水电、网络等费用是否包含在房租里。",
    example: "Are utilities included in the rent?",
    exampleCn: "水电包含在房租里吗？",
    tag: "租房看房"
  },
  {
    phrase: "I would like to open an account.",
    meaning: "银行开户的礼貌表达，比 I want account 更自然。",
    example: "I would like to open a savings account.",
    exampleCn: "我想开一个储蓄账户。",
    tag: "银行办事"
  },
  {
    phrase: "Can I reschedule?",
    meaning: "预约改时间时最短、最自然的说法。",
    example: "Can I reschedule my appointment for Friday?",
    exampleCn: "我可以把预约改到周五吗？",
    tag: "电话预约"
  },
  {
    phrase: "Can I get a refund?",
    meaning: "退货、服务取消或订单出错时请求退款。",
    example: "The item is damaged. Can I get a refund?",
    exampleCn: "这个商品坏了。可以退款吗？",
    tag: "退货退款"
  },
  {
    phrase: "I need help.",
    meaning: "紧急情况下最重要的短句，先把需求说清楚。",
    example: "I need help. I lost my phone.",
    exampleCn: "我需要帮助。我的手机丢了。",
    tag: "紧急求助"
  }
];

const highFrequencyWords = [
  {
    word: "get",
    meaning: "得到、买、到达、理解。口语里非常万能。",
    rank: 1,
    usage: "98%",
    example: "Could I get an iced latte?",
    exampleCn: "我可以要一杯冰拿铁吗？",
    reason: "点餐、请求、购物都会用到。"
  },
  {
    word: "go",
    meaning: "去、进行、变成。旅行和日常对话核心词。",
    rank: 2,
    usage: "96%",
    example: "How do I get to the airport?",
    exampleCn: "我怎么去机场？",
    reason: "问路、计划、移动场景都离不开。"
  },
  {
    word: "need",
    meaning: "需要。比复杂词更适合新手表达真实需求。",
    rank: 3,
    usage: "94%",
    example: "I need a little more time.",
    exampleCn: "我需要多一点时间。",
    reason: "工作、旅行、求助场景高频。"
  },
  {
    word: "help",
    meaning: "帮助。让新手更敢开口求助。",
    rank: 4,
    usage: "91%",
    example: "Could you help me with this?",
    exampleCn: "你可以帮我看一下这个吗？",
    reason: "解决开口恐惧的关键动词。"
  },
  {
    word: "clarify",
    meaning: "解释清楚、澄清。工作英语非常有用。",
    rank: 5,
    usage: "78%",
    example: "Could you clarify the timeline?",
    exampleCn: "你能说明一下时间线吗？",
    reason: "会议、面试、协作里的礼貌追问。"
  },
  {
    word: "depend",
    meaning: "取决于。能让回答更自然，不只会说 yes/no。",
    rank: 6,
    usage: "74%",
    example: "It depends on the deadline.",
    exampleCn: "这取决于截止时间。",
    reason: "表达条件和原因时很高频。"
  },
  {
    word: "make",
    meaning: "制作、让某事发生。很多短句都离不开它。",
    rank: 7,
    usage: "90%",
    example: "Can we make it tomorrow?",
    exampleCn: "我们可以改到明天吗？",
    reason: "约时间、改计划、解释结果都常用。"
  },
  {
    word: "take",
    meaning: "拿、花费、乘坐。旅行和工作都高频。",
    rank: 8,
    usage: "88%",
    example: "It takes about thirty minutes.",
    exampleCn: "大约需要三十分钟。",
    reason: "问路、时间、任务安排都能用。"
  },
  {
    word: "available",
    meaning: "有空、可用。比 convenient 更自然。",
    rank: 9,
    usage: "72%",
    example: "I'm available this afternoon.",
    exampleCn: "我今天下午有空。",
    reason: "约时间、会议、面试都很实用。"
  },
  {
    word: "issue",
    meaning: "问题、事项。工作英语里比 problem 更常见。",
    rank: 10,
    usage: "76%",
    example: "The main issue is the timeline.",
    exampleCn: "主要问题是时间线。",
    reason: "汇报风险和卡点时很好用。"
  },
  {
    word: "repeat",
    meaning: "重复。听不懂时可以礼貌请对方再说一次。",
    rank: 11,
    usage: "70%",
    example: "Could you repeat that?",
    exampleCn: "你可以再说一遍吗？",
    reason: "降低听力压力，让新手更敢交流。"
  },
  {
    word: "sure",
    meaning: "确定、当然。日常回应非常常见。",
    rank: 12,
    usage: "86%",
    example: "I'm not sure yet.",
    exampleCn: "我还不太确定。",
    reason: "表达不确定、确认和回应都能用。"
  },
  {
    word: "recommend",
    meaning: "推荐。餐厅、旅行、购物都常用。",
    rank: 13,
    usage: "68%",
    example: "What do you recommend?",
    exampleCn: "你推荐什么？",
    reason: "不会点餐或选择时，可以主动开口。"
  },
  {
    word: "reservation",
    meaning: "预订。酒店、餐厅、机票都常见。",
    rank: 14,
    usage: "64%",
    example: "I have a reservation.",
    exampleCn: "我有预订。",
    reason: "旅行和外出场景的核心名词。"
  },
  {
    word: "price",
    meaning: "价格。购物、打车、服务咨询都能用。",
    rank: 15,
    usage: "82%",
    example: "What is the price?",
    exampleCn: "价格是多少？",
    reason: "询价时比复杂句更稳定。"
  },
  {
    word: "address",
    meaning: "地址。打车、酒店、外卖都高频。",
    rank: 16,
    usage: "80%",
    example: "Could you take me to this address?",
    exampleCn: "你可以带我去这个地址吗？",
    reason: "出行沟通的基础词。"
  },
  {
    word: "symptom",
    meaning: "症状。看医生时可以用来描述身体情况。",
    rank: 17,
    usage: "58%",
    example: "How long have you had this symptom?",
    exampleCn: "这个症状持续多久了？",
    reason: "医疗场景里帮助你听懂医生问题。"
  },
  {
    word: "allergy",
    meaning: "过敏。看医生和点餐都可能用到。",
    rank: 18,
    usage: "52%",
    example: "I have a peanut allergy.",
    exampleCn: "我对花生过敏。",
    reason: "安全相关表达，必须优先掌握。"
  },
  {
    word: "receipt",
    meaning: "小票、收据。购物退换货时常用。",
    rank: 19,
    usage: "62%",
    example: "Can I get a receipt?",
    exampleCn: "可以给我一张小票吗？",
    reason: "购物和报销场景都实用。"
  },
  {
    word: "included",
    meaning: "包含在内。酒店、餐厅、套餐常用。",
    rank: 20,
    usage: "66%",
    example: "Is breakfast included?",
    exampleCn: "包含早餐吗？",
    reason: "确认服务内容时非常好用。"
  },
  {
    word: "deposit",
    meaning: "押金。租房、酒店、租车都常见。",
    rank: 21,
    usage: "57%",
    example: "How much is the deposit?",
    exampleCn: "押金是多少？",
    reason: "租房和预订场景很实用。"
  },
  {
    word: "account",
    meaning: "账户。银行、网站、手机服务都会用到。",
    rank: 22,
    usage: "84%",
    example: "I would like to open an account.",
    exampleCn: "我想开一个账户。",
    reason: "办理服务时的核心名词。"
  },
  {
    word: "refund",
    meaning: "退款。购物和售后高频。",
    rank: 23,
    usage: "63%",
    example: "Can I get a refund?",
    exampleCn: "可以退款吗？",
    reason: "退货、订单问题、服务取消都能用。"
  },
  {
    word: "appointment",
    meaning: "预约。看医生、理发、办事都常用。",
    rank: 24,
    usage: "69%",
    example: "I would like to make an appointment.",
    exampleCn: "我想预约。",
    reason: "电话沟通里非常高频。"
  },
  {
    word: "emergency",
    meaning: "紧急情况。需要求助时必须会。",
    rank: 25,
    usage: "55%",
    example: "This is an emergency.",
    exampleCn: "这是紧急情况。",
    reason: "安全相关表达优先级很高。"
  }
];

const iconPaths = {
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h11.5a1.5 1.5 0 0 1 0 3H6"/><path d="M6 3v18"/><path d="M8 7h8"/>',
  audio: '<path d="M12 3v18"/><path d="M8 7v10"/><path d="M4 10v4"/><path d="M16 7v10"/><path d="M20 10v4"/>',
  chat: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  test: '<path d="M9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8h1a4 4 0 0 1 0 8h-1"/><path d="M4 8h12v6a6 6 0 0 1-12 0Z"/><path d="M6 20h10"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M4 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>',
  map: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
  utensils: '<path d="M4 3v8"/><path d="M8 3v8"/><path d="M4 7h4"/><path d="M6 11v10"/><path d="M14 3v18"/><path d="M14 3c4 2 5 6 2 9h-2"/>',
  hotel: '<path d="M3 21V7a2 2 0 0 1 2-2h6v16"/><path d="M21 21V11a2 2 0 0 0-2-2h-8"/><path d="M7 9h.01"/><path d="M7 13h.01"/><path d="M15 13h2"/><path d="M15 17h2"/><path d="M2 21h20"/>',
  shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  car: '<path d="M5 17h14"/><path d="M6 17l1-6a3 3 0 0 1 3-2h4a3 3 0 0 1 3 2l1 6"/><path d="M7 17v2"/><path d="M17 17v2"/><path d="M8 13h.01"/><path d="M16 13h.01"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  wallet: '<path d="M3 7h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2Z"/><path d="M3 7V5a2 2 0 0 1 2-2h12v4"/><path d="M17 13h.01"/>',
  package: '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>'
};

const els = {
  app: document.getElementById("app"),
  headerSub: document.getElementById("headerSub"),
  aiStatus: document.getElementById("aiStatus"),
  profileChip: document.getElementById("profileChip"),
  installButton: document.getElementById("installButton"),
  brandButton: document.getElementById("brandButton"),
  loginForm: document.getElementById("loginForm"),
  emailInput: document.getElementById("emailInput"),
  guestButton: document.getElementById("guestButton"),
  goalNextButton: document.getElementById("goalNextButton"),
  questionCounter: document.getElementById("questionCounter"),
  questionSkill: document.getElementById("questionSkill"),
  testMeter: document.getElementById("testMeter"),
  questionText: document.getElementById("questionText"),
  optionList: document.getElementById("optionList"),
  levelResult: document.getElementById("levelResult"),
  startLearningButton: document.getElementById("startLearningButton"),
  todayTitle: document.getElementById("todayTitle"),
  todayCopy: document.getElementById("todayCopy"),
  refreshLessonButton: document.getElementById("refreshLessonButton"),
  streakValue: document.getElementById("streakValue"),
  minutesLeft: document.getElementById("minutesLeft"),
  todayProgress: document.getElementById("todayProgress"),
  taskList: document.getElementById("taskList"),
  courseCount: document.getElementById("courseCount"),
  courseLibraryList: document.getElementById("courseLibraryList"),
  openSummaryButton: document.getElementById("openSummaryButton"),
  dailyTestScore: document.getElementById("dailyTestScore"),
  dailyTestMeter: document.getElementById("dailyTestMeter"),
  dailyTestList: document.getElementById("dailyTestList"),
  dailyTestWriting: document.getElementById("dailyTestWriting"),
  submitDailyTestButton: document.getElementById("submitDailyTestButton"),
  resetDailyTestButton: document.getElementById("resetDailyTestButton"),
  dailyTestResult: document.getElementById("dailyTestResult"),
  conversationLevel: document.getElementById("conversationLevel"),
  translationToggle: document.getElementById("translationToggle"),
  scenarioRow: document.getElementById("scenarioRow"),
  personaName: document.getElementById("personaName"),
  personaHint: document.getElementById("personaHint"),
  messages: document.getElementById("messages"),
  suggestions: document.getElementById("suggestions"),
  chatInput: document.getElementById("chatInput"),
  sendButton: document.getElementById("sendButton"),
  voiceButton: document.getElementById("voiceButton"),
  voiceStatus: document.getElementById("voiceStatus"),
  voiceStatusText: document.getElementById("voiceStatusText"),
  feedbackCard: document.getElementById("feedbackCard"),
  feedbackCorrection: document.getElementById("feedbackCorrection"),
  finishConversationButton: document.getElementById("finishConversationButton"),
  cardCounter: document.getElementById("cardCounter"),
  cardTag: document.getElementById("cardTag"),
  cardPhrase: document.getElementById("cardPhrase"),
  cardMeaning: document.getElementById("cardMeaning"),
  cardExample: document.getElementById("cardExample"),
  cardExampleCn: document.getElementById("cardExampleCn"),
  wordBankList: document.getElementById("wordBankList"),
  methodRecommendation: document.getElementById("methodRecommendation"),
  abilityTestButton: document.getElementById("abilityTestButton"),
  learningDataStats: document.getElementById("learningDataStats"),
  learningDataTimeline: document.getElementById("learningDataTimeline"),
  exportDataButton: document.getElementById("exportDataButton"),
  summaryMinutes: document.getElementById("summaryMinutes"),
  summaryTestScore: document.getElementById("summaryTestScore"),
  shareSummaryButton: document.getElementById("shareSummaryButton")
};

let state = loadState();
let questionIndex = 0;
let questionLocked = false;
let replyIndex = 0;
let deferredInstallPrompt = null;
let voiceTimer = null;
let recognition = null;
let dailyLesson = null;
let dailyWordItems = [];
let dailyTestItems = [];

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultState, ...JSON.parse(stored) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function icon(name, size = 18) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hashSeed(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = hashSeed(seed);
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(items, seed) {
  const random = seededRandom(seed);
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function pickItem(items, seed) {
  return shuffled(items, seed)[0];
}

function pickItems(items, count, seed) {
  return shuffled(items, seed).slice(0, count);
}

function cloneQuestion(question, seed) {
  return {
    ...question,
    options: shuffled(question.options, `${seed}|${question.text}`).map((option) => ({ ...option }))
  };
}

function buildDailyLesson() {
  const todayKey = localDateKey();
  if (state.todayKey !== todayKey) {
    state.todayKey = todayKey;
    state.lessonSalt = 0;
    state.completedTaskIds = [];
    state.cardIndex = 0;
  }

  const profile = dailyProfiles[state.goal] || dailyProfiles["daily-speaking"];
  const seed = `${state.todayKey}|${state.goal}|${state.level}|${state.minutes}|${state.lessonSalt || 0}`;
  if (state.practiceTest?.seed && state.practiceTest.seed !== seed) {
    state.practiceTest = null;
    state.completedTaskIds = state.completedTaskIds.filter((id) => id !== "test");
  }
  const scenarioKeys = shuffled(profile.scenarios, `${seed}|scenarios`);
  if (!scenarioKeys.includes(state.activeScenario)) {
    state.activeScenario = scenarioKeys[0];
  }

  const taskTypes = ["review", "listening", "conversation", "writing", "test"];
  const nextTasks = taskTypes.map((type) => {
    const pool = taskPools[type];
    const picked = pickItem(pool, `${seed}|task|${type}`);
    return { id: type, ...picked };
  });
  const conversationTask = nextTasks.find((task) => task.id === "conversation");
  if (conversationTask?.scenario && scenarioKeys.includes(conversationTask.scenario)) {
    state.activeScenario = conversationTask.scenario;
  }

  taskTemplates.splice(0, taskTemplates.length, ...nextTasks);
  questions.splice(
    0,
    questions.length,
    ...pickItems(questionBank, 5, `${seed}|questions`).map((question) => cloneQuestion(question, seed))
  );
  dailyWordItems = pickItems(highFrequencyWords, 6, `${seed}|words`).sort((a, b) => a.rank - b.rank);
  dailyTestItems = pickItems(practiceTestBank, 3, `${seed}|practice-test`);
  dailyLesson = {
    seed,
    scenarioKeys,
    title: pickItem(profile.titles, `${seed}|title`),
    copy: pickItem(profile.copies, `${seed}|copy`),
    replyOffset: hashSeed(`${seed}|reply`) % 7
  };
  els.todayTitle.textContent = dailyLesson.title;
  els.todayCopy.textContent = dailyLesson.copy;
  saveState();
}

function setView(view) {
  document.querySelectorAll("[data-screen]").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === view);
  });
  document.querySelectorAll("[data-nav]").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === view);
  });
  els.app.dataset.view = view;
  if (view === "progress") renderLearningData();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateHeader() {
  const name = (state.email || "learner").split("@")[0];
  els.headerSub.textContent = `${name} · ${goalLabel(state.goal)} · ${state.minutes}m/day`;
  els.profileChip.textContent = state.level;
  els.conversationLevel.textContent = state.level;
}

function goalLabel(goal) {
  const labels = {
    "daily-speaking": "日常口语",
    "work-english": "工作英语",
    travel: "旅行沟通",
    exam: "考试基础"
  };
  return labels[goal] || "日常口语";
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function translationFor(text) {
  const exact = {
    "Could I get an iced latte?": "我可以要一杯冰拿铁吗？",
    "Can I have it with oat milk?": "可以换成燕麦奶吗？",
    "Could I get it with oat milk?": "我可以把它换成燕麦奶吗？",
    "For here, please.": "在这里喝，谢谢。",
    "I have three years of experience in...": "我有三年……经验。",
    "My strength is...": "我的优势是……",
    "Could you clarify the role?": "可以解释一下这个职位吗？",
    "I am currently working on...": "我现在正在做……",
    "The blocker is...": "目前的阻碍是……",
    "I can follow up tomorrow.": "我明天可以继续跟进。",
    "How do I get to the airport?": "我怎么去机场？",
    "Which platform should I use?": "我应该去哪个站台？",
    "How long does it take?": "大概要多久？"
  };

  return exact[text] || "";
}

function scenarioContextFor(key) {
  const scenario = scenarios[key] || scenarios.coffee;
  return {
    id: key,
    label: scenario.label,
    role: scenario.name,
    learnerTask: scenario.hint,
    openingLine: scenario.start,
    suggestedPhrases: scenario.suggestions,
    forbiddenTopics: forbiddenTopicsFor(key)
  };
}

function forbiddenTopicsFor(key) {
  const topics = {
    coffee: ["airport", "station", "train", "platform", "blue line", "hotel", "driver", "interview", "recruiter", "meeting", "blocker", "doctor", "sore throat"],
    travel: ["latte", "oat milk", "barista", "interview", "recruiter", "meeting blocker", "sore throat"],
    interview: ["latte", "oat milk", "platform", "blue line", "train station", "menu", "bill", "sore throat"],
    meeting: ["latte", "oat milk", "airport platform", "barista", "menu", "reservation", "sore throat"],
    restaurant: ["platform", "blue line", "driver", "interview", "meeting blocker", "hotel room", "sore throat"],
    hotel: ["latte", "barista", "platform", "blue line", "meeting blocker", "sore throat"],
    shopping: ["barista", "platform", "blue line", "meeting blocker", "hotel room", "sore throat"],
    taxi: ["latte", "barista", "interview", "meeting blocker", "menu", "bill", "sore throat"],
    doctor: ["latte", "barista", "platform", "blue line", "meeting blocker", "hotel room", "shopping bag"],
    apartment: ["latte", "barista", "platform", "blue line", "sore throat", "bill", "police"],
    bank: ["latte", "barista", "platform", "hotel room", "sore throat", "spicy", "lease"],
    delivery: ["latte", "barista", "meeting blocker", "platform", "passport", "sore throat"],
    appointment: ["latte", "barista", "platform", "blue line", "deposit", "refund"],
    emergency: ["latte", "barista", "menu", "bill", "meeting blocker", "reservation"],
    social: ["bill", "deposit", "refund", "police", "sore throat", "platform"]
  };
  return topics[key] || [];
}

function isOffScenarioReply(reply, key) {
  const text = String(reply || "").toLowerCase();
  return forbiddenTopicsFor(key).some((topic) => text.includes(topic.toLowerCase()));
}

function isUnclearEnglishInput(text) {
  const clean = String(text || "").toLowerCase().replace(/[^a-z'\s]/g, " ").trim();
  if (!clean) return true;
  const words = clean.split(/\s+/).filter(Boolean);
  const usefulWords = new Set([
    "i", "you", "we", "can", "could", "would", "get", "have", "want", "need", "like", "please",
    "coffee", "latte", "milk", "oat", "iced", "hot", "small", "medium", "large", "here", "go",
    "time", "platform", "airport", "ticket", "help", "clarify", "repeat", "role", "work",
    "meeting", "blocker", "timeline", "experience", "strength", "available", "sure", "thanks",
    "menu", "order", "recommend", "bill", "water", "spicy", "mild", "allergy", "reservation",
    "check", "room", "breakfast", "included", "passport", "id", "key", "card", "price",
    "cash", "receipt", "bag", "size", "address", "driver", "traffic", "entrance", "taxi",
    "doctor", "fever", "cough", "throat", "sore", "medicine", "symptom", "pain", "rest",
    "rent", "deposit", "utilities", "viewing", "lease", "laundry", "account", "transfer",
    "fee", "statement", "bank", "return", "refund", "package", "delivery", "order",
    "appointment", "schedule", "reschedule", "available", "emergency", "lost", "police",
    "safe", "location", "meet", "friend", "weekend"
  ]);
  const knownCount = words.filter((word) => usefulWords.has(word)).length;
  const hasSentenceShape = /\b(i|you|we|can|could|would|what|where|how|do|does|is|are|please)\b/.test(clean);
  const hasVowels = words.every((word) => /[aeiou]/.test(word));

  if (words.length === 1 && knownCount === 0 && clean.length >= 4) return true;
  if (words.length <= 2 && knownCount === 0 && !hasSentenceShape) return true;
  if (!hasVowels && knownCount === 0) return true;
  return false;
}

function latestAiMessageText() {
  const aiMessages = Array.from(els.messages.querySelectorAll(".bubble.ai"));
  return aiMessages.at(-1)?.innerText || "";
}

function fallbackCoachReply({ text, scenario, scenarioKey, fallbackIndex, lastAiMessage }) {
  const lower = String(text || "").toLowerCase();
  const unclear = isUnclearEnglishInput(text);

  if (unclear) {
    const repair = {
      coffee: {
        reply: "No worries. Try saying: Could I get a medium iced latte?",
        replyCn: "没关系。你可以试着说：我可以要一杯中杯冰拿铁吗？",
        correction: "刚才的输入不像完整英文。可以先用：Could I get a medium iced latte?"
      },
      travel: {
        reply: "No worries. Try saying: How do I get to the airport?",
        replyCn: "没关系。你可以试着说：我怎么去机场？",
        correction: "刚才的输入不像完整英文。可以先用：How do I get to the airport?"
      },
      interview: {
        reply: "No worries. Try saying: Could you clarify the role?",
        replyCn: "没关系。你可以试着说：可以解释一下这个职位吗？",
        correction: "刚才的输入不像完整英文。可以先用：Could you clarify the role?"
      },
      meeting: {
        reply: "No worries. Try saying: I can follow up tomorrow.",
        replyCn: "没关系。你可以试着说：我明天可以继续跟进。",
        correction: "刚才的输入不像完整英文。可以先用：I can follow up tomorrow."
      },
      restaurant: {
        reply: "No worries. Try saying: What do you recommend?",
        replyCn: "没关系。你可以试着说：你推荐什么？",
        correction: "刚才的输入不像完整英文。可以先用：What do you recommend?"
      },
      hotel: {
        reply: "No worries. Try saying: I have a reservation.",
        replyCn: "没关系。你可以试着说：我有预订。",
        correction: "刚才的输入不像完整英文。可以先用：I have a reservation."
      },
      shopping: {
        reply: "No worries. Try saying: How much is this?",
        replyCn: "没关系。你可以试着说：这个多少钱？",
        correction: "刚才的输入不像完整英文。可以先用：How much is this?"
      },
      taxi: {
        reply: "No worries. Try saying: Could you take me to this address?",
        replyCn: "没关系。你可以试着说：你可以带我去这个地址吗？",
        correction: "刚才的输入不像完整英文。可以先用：Could you take me to this address?"
      },
      doctor: {
        reply: "No worries. Try saying: I have a sore throat.",
        replyCn: "没关系。你可以试着说：我喉咙痛。",
        correction: "刚才的输入不像完整英文。可以先用：I have a sore throat."
      },
      apartment: {
        reply: "No worries. Try saying: Are utilities included?",
        replyCn: "没关系。你可以试着说：水电包含在内吗？",
        correction: "刚才的输入不像完整英文。可以先用：Are utilities included?"
      },
      bank: {
        reply: "No worries. Try saying: I would like to open an account.",
        replyCn: "没关系。你可以试着说：我想开一个账户。",
        correction: "刚才的输入不像完整英文。可以先用：I would like to open an account."
      },
      delivery: {
        reply: "No worries. Try saying: Can I get a refund?",
        replyCn: "没关系。你可以试着说：可以退款吗？",
        correction: "刚才的输入不像完整英文。可以先用：Can I get a refund?"
      },
      appointment: {
        reply: "No worries. Try saying: Can I reschedule?",
        replyCn: "没关系。你可以试着说：我可以改时间吗？",
        correction: "刚才的输入不像完整英文。可以先用：Can I reschedule?"
      },
      emergency: {
        reply: "No worries. Try saying: I need help.",
        replyCn: "没关系。你可以试着说：我需要帮助。",
        correction: "刚才的输入不像完整英文。可以先用：I need help."
      },
      social: {
        reply: "No worries. Try saying: Nice to meet you.",
        replyCn: "没关系。你可以试着说：很高兴认识你。",
        correction: "刚才的输入不像完整英文。可以先用：Nice to meet you."
      }
    };
    return repair[scenarioKey] || repair.coffee;
  }

  if (scenarioKey === "coffee") {
    if (/\b(oat|milk)\b/.test(lower)) {
      return {
        reply: "Sure. Oat milk is fine. What size would you like?",
        replyCn: "当然，燕麦奶可以。你想要什么杯型？",
        correction: "这句能表达需求。更自然可以说：Could I have it with oat milk?"
      };
    }
    if (/\b(small|medium|large)\b/.test(lower) || /size/.test(lastAiMessage.toLowerCase())) {
      return {
        reply: "Great. Would you like that for here or to go?",
        replyCn: "好的。你是在这里喝还是带走？",
        correction: "回答杯型时可以说：Medium, please."
      };
    }
  }

  return {
    reply: scenario.replies[fallbackIndex],
    replyCn: scenario.repliesCn?.[fallbackIndex] || "",
    correction: ""
  };
}

function applyChineseMode() {
  els.app.classList.toggle("show-cn", state.showChinese);
  els.translationToggle.classList.toggle("active", state.showChinese);
  els.translationToggle.textContent = state.showChinese ? "中文辅助 开" : "中文辅助 关";
}

function learningMethodFor(level) {
  if (level === "A2") {
    return "先保留中文辅助，优先学 get / go / need / help 这类高频词；每天只练 1 个生活场景，目标是敢说完整句。";
  }
  if (level === "B2") {
    return "减少中文依赖，重点练追问、解释原因和更自然的替换表达；每天用 1 个高频词造 3 个自己的句子。";
  }
  return "中文辅助默认开启，但每轮对话后尝试关掉中文复述一遍；每天练 1 个场景 + 5 个高频表达。";
}

function updateLearningMethod() {
  state.lastMethod = learningMethodFor(state.level);
  els.methodRecommendation.textContent = `当前建议：${state.lastMethod}`;
}

function renderWordBank() {
  els.wordBankList.innerHTML = "";
  const source = dailyWordItems.length ? dailyWordItems : highFrequencyWords;
  source
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .forEach((item) => {
      const article = document.createElement("article");
      article.className = "word-item";
      article.innerHTML = `
        <div class="word-top">
          <div>
            <strong>${escapeHtml(item.word)}</strong>
            <em>${escapeHtml(item.meaning)}</em>
          </div>
          <span class="priority-badge">#${item.rank} · ${item.usage}</span>
        </div>
        <span>${escapeHtml(item.reason)}</span>
        <div class="word-example">
          ${escapeHtml(item.example)}
          <span class="translation">${escapeHtml(item.exampleCn)}</span>
        </div>
      `;
      els.wordBankList.appendChild(article);
    });
}

async function requestAiCoach(payload) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch("/.netlify/functions/ai-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

function updateAiStatus(connected, model = "") {
  els.aiStatus.classList.toggle("connected", connected);
  els.aiStatus.textContent = connected ? `AI 已连接${model ? ` · ${model}` : ""}` : "离线自适应";
}

async function checkAiStatus() {
  const ai = await requestAiCoach({ action: "health" });
  updateAiStatus(ai?.mode === "ai", ai?.model || "");
}

async function personalizeWordBank() {
  const ai = await requestAiCoach({
    action: "word_bank",
    level: state.level,
    goal: state.goal,
    dailyMinutes: state.minutes,
    weakPoints: ["prepositions", "follow-up questions", "connected speech"]
  });

  if (!ai?.words?.length) return;
  dailyWordItems = ai.words.slice(0, 9);
  renderWordBank();
}

function levelFromScore(score) {
  if (score >= questions.length) return "B2";
  if (score >= Math.ceil(questions.length * 0.6)) return "B1";
  return "A2";
}

function renderQuestion() {
  const question = questions[questionIndex];
  questionLocked = false;
  els.questionCounter.textContent = `${questionIndex + 1} / ${questions.length}`;
  els.questionSkill.textContent = question.skill;
  els.questionText.textContent = question.text;
  els.testMeter.style.setProperty("--value", `${((questionIndex + 1) / questions.length) * 100}%`);
  els.optionList.innerHTML = "";
  els.levelResult.hidden = true;
  els.levelResult.className = "result-box";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-card";
    button.innerHTML = `<strong>${option.text}</strong><span>选择后查看对错</span>`;
    button.addEventListener("click", () => chooseAnswer(button, option));
    els.optionList.appendChild(button);
  });
}

function chooseAnswer(button, option) {
  if (questionLocked) return;
  questionLocked = true;
  const question = questions[questionIndex];
  const correctOption = question.options.find((item) => item.correct);
  const isCorrect = Boolean(option.correct);

  button.classList.add("selected");
  button.classList.add(isCorrect ? "correct" : "wrong");
  state.testScore += isCorrect ? 1 : 0;

  Array.from(els.optionList.children).forEach((optionButton, index) => {
    const hint = optionButton.querySelector("span");
    const item = question.options[index];
    optionButton.classList.add("is-locked");
    optionButton.setAttribute("aria-disabled", "true");
    if (item.correct) {
      optionButton.classList.add("correct");
      if (hint) hint.textContent = optionButton === button ? "回答正确" : "正确答案";
    } else if (optionButton === button) {
      optionButton.classList.add("wrong");
      if (hint) hint.textContent = "你的选择";
    } else if (hint) {
      hint.textContent = "未选择";
    }
  });

  els.levelResult.hidden = false;
  els.levelResult.className = `result-box answer-feedback ${isCorrect ? "correct" : "wrong"}`;
  els.levelResult.innerHTML = `
    <strong>${isCorrect ? "回答正确" : "回答错误"}</strong>
    <p>正确答案：${escapeHtml(correctOption?.text || "")}</p>
    <p>${escapeHtml(question.explanation)}</p>
    <button class="secondary full" type="button" id="nextQuestionButton">${questionIndex + 1 >= questions.length ? "查看结果" : "下一题"}</button>
  `;
  document.getElementById("nextQuestionButton").addEventListener("click", advanceQuestion);
}

function advanceQuestion() {
  questionIndex += 1;
  if (questionIndex < questions.length) {
    renderQuestion();
    return;
  }

  state.level = levelFromScore(state.testScore);
  state.hasOnboarded = true;
  state.lastMethod = learningMethodFor(state.level);
  recordLearningEvent("ability", { score: state.testScore, total: questions.length, level: state.level });
  buildDailyLesson();
  saveState();
  updateHeader();
  updateLearningMethod();
  renderTasks();
  renderCourseLibrary();
  renderScenarios();
  renderWordBank();
  renderDailyTest();
  els.optionList.innerHTML = "";
  els.questionText.textContent = "测试完成。";
  els.questionCounter.textContent = `${questions.length} / ${questions.length}`;
  els.testMeter.style.setProperty("--value", "100%");
  els.levelResult.hidden = false;
  els.levelResult.className = "result-box";
  els.levelResult.innerHTML = `<strong>测试结果：${state.level}</strong><br>答对 ${state.testScore} / ${questions.length} 题。${escapeHtml(state.lastMethod)}<br>词库会优先安排 get / go / need / help 这类高频词，再结合你的薄弱点调整。`;
  els.startLearningButton.hidden = false;
  requestAiCoach({
    action: "ability_method",
    level: state.level,
    goal: state.goal,
    dailyMinutes: state.minutes,
    testScore: state.testScore,
    correctAnswers: state.testScore,
    totalQuestions: questions.length
  }).then((ai) => {
    if (!ai?.method) return;
    state.lastMethod = ai.method;
    saveState();
    updateLearningMethod();
    els.levelResult.innerHTML = `<strong>测试结果：${state.level}</strong><br>答对 ${state.testScore} / ${questions.length} 题。${escapeHtml(ai.method)}<br>重点词：${escapeHtml((ai.focus_words || []).join(" / ") || "get / go / need / help")}`;
  });
}

function renderTasks() {
  els.taskList.innerHTML = "";
  taskTemplates.forEach((task) => {
    const done = state.completedTaskIds.includes(task.id);
    const article = document.createElement("article");
    article.className = `task${done ? " done" : ""}`;
    article.innerHTML = `
      <span class="task-icon">${icon(done ? "check" : task.icon)}</span>
      <span>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      </span>
      <button aria-label="${done ? "已完成" : "完成 " + task.title}" data-task-id="${task.id}">
        ${icon(done ? "check" : task.id === "conversation" ? "arrow" : "check")}
      </button>
    `;
    article.querySelector("button").addEventListener("click", () => {
      if (task.id === "test") {
        renderDailyTest();
        setView("test");
        return;
      }
      if (task.id === "conversation" && !done) {
        if (task.scenario && scenarios[task.scenario]) {
          state.activeScenario = task.scenario;
          saveState();
          renderScenarios();
          resetChat();
        }
        setView("talk");
        return;
      }
      completeTask(task.id);
    });
    els.taskList.appendChild(article);
  });
  updateProgress();
}

function completeTask(taskId) {
  if (!state.completedTaskIds.includes(taskId)) {
    state.completedTaskIds.push(taskId);
    const task = taskTemplates.find((item) => item.id === taskId);
    recordLearningEvent("task", { taskId, taskTitle: task?.title || taskId });
    saveState();
  }
  renderTasks();
}

function updateProgress() {
  const completed = state.completedTaskIds.length;
  els.todayProgress.textContent = `${completed} / ${taskTemplates.length} 完成`;
  const left = Math.max(0, state.minutes - completed * Math.ceil(state.minutes / 5));
  els.minutesLeft.textContent = `${left}m`;
  els.streakValue.textContent = `${state.streak} 天`;
  els.openSummaryButton.hidden = completed < taskTemplates.length;
  els.summaryMinutes.textContent = `${state.minutes}m`;
  if (els.summaryTestScore) {
    const total = practiceTestTotal();
    els.summaryTestScore.textContent = state.practiceTest?.submitted ? `${state.practiceTest.score}/${total}` : "未测";
  }
}

function ensureLearningData() {
  if (!state.learningData || !Array.isArray(state.learningData.events)) {
    state.learningData = { events: [] };
  }
}

function recordLearningEvent(type, detail = {}) {
  ensureLearningData();
  state.learningData.events.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    date: localDateKey(),
    time: new Date().toISOString(),
    level: state.level,
    goal: state.goal,
    ...detail
  });
  state.learningData.events = state.learningData.events.slice(0, 160);
  saveState();
  renderLearningData();
}

function eventLabel(event) {
  const labels = {
    task: "完成任务",
    chat: "对话练习",
    test: "今日小测",
    review: "复习卡片",
    ability: "能力测试",
    course: "打开课程"
  };
  return labels[event.type] || "学习记录";
}

function eventDetail(event) {
  if (event.type === "test") return `得分 ${event.score}/${event.total}`;
  if (event.type === "chat") return scenarios[event.scenario]?.label || "场景对话";
  if (event.type === "review") return event.phrase || "复习表达";
  if (event.type === "course") return event.title || scenarios[event.scenario]?.label || "生活课程";
  if (event.taskTitle) return event.taskTitle;
  return goalLabel(event.goal || state.goal);
}

function learningStats() {
  ensureLearningData();
  const events = state.learningData.events;
  const days = new Set(events.map((event) => event.date)).size;
  return {
    days,
    tasks: events.filter((event) => event.type === "task").length,
    chats: events.filter((event) => event.type === "chat").length,
    tests: events.filter((event) => event.type === "test").length,
    reviews: events.filter((event) => event.type === "review").length
  };
}

function renderLearningData() {
  if (!els.learningDataStats || !els.learningDataTimeline) return;
  ensureLearningData();
  const stats = learningStats();
  const items = [
    ["学习天数", stats.days],
    ["完成任务", stats.tasks],
    ["对话次数", stats.chats],
    ["小测次数", stats.tests],
    ["复习次数", stats.reviews],
    ["本地记录", state.learningData.events.length]
  ];
  els.learningDataStats.innerHTML = items
    .map(([label, value]) => `<article class="data-stat"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  const recent = state.learningData.events.slice(0, 8);
  els.learningDataTimeline.innerHTML = recent.length
    ? recent.map((event) => {
        const date = new Date(event.time);
        const time = Number.isNaN(date.getTime()) ? event.date : date.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        return `<article class="log-item"><time>${escapeHtml(time)}</time><strong>${escapeHtml(eventLabel(event))}</strong><span>${escapeHtml(eventDetail(event))}</span></article>`;
      }).join("")
    : `<article class="log-item"><time>Local DB</time><strong>还没有学习记录</strong><span>完成任务、小测、对话或复习后会自动记录。</span></article>`;
}

function exportLearningData() {
  ensureLearningData();
  const payload = {
    exportedAt: new Date().toISOString(),
    user: state.email,
    level: state.level,
    goal: state.goal,
    learningData: state.learningData
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fluent-loop-learning-data-${localDateKey()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderCourseLibrary() {
  if (!els.courseLibraryList) return;
  const recommended = new Set((dailyLesson?.scenarioKeys || []).slice(0, 5));
  els.courseCount.textContent = `${lifeCourses.length} 个场景`;
  els.courseLibraryList.innerHTML = "";
  lifeCourses.forEach((course) => {
    const scenario = scenarios[course.scenario];
    if (!scenario) return;
    const button = document.createElement("button");
    button.className = "course-card";
    button.type = "button";
    button.innerHTML = `
      <header>
        <span class="task-icon">${icon(scenario.icon)}</span>
        <div>
          <h3>${escapeHtml(course.title)}</h3>
          <p>${escapeHtml(course.description)}</p>
        </div>
      </header>
      <div class="phrase-row">
        ${course.phrases.slice(0, 2).map((phrase) => `<span>${escapeHtml(phrase)}</span>`).join("")}
        ${recommended.has(course.scenario) ? "<span>今日推荐</span>" : ""}
      </div>
    `;
    button.addEventListener("click", () => {
      state.activeScenario = course.scenario;
      saveState();
      recordLearningEvent("course", { scenario: course.scenario, title: course.title });
      renderScenarios();
      resetChat();
      setView("talk");
    });
    els.courseLibraryList.appendChild(button);
  });
}

function ensurePracticeTestState() {
  const seed = dailyLesson?.seed || localDateKey();
  if (!state.practiceTest || state.practiceTest.seed !== seed) {
    if (state.practiceTest?.seed && state.practiceTest.seed !== seed) {
      state.completedTaskIds = state.completedTaskIds.filter((id) => id !== "test");
    }
    state.practiceTest = {
      seed,
      answers: {},
      writing: "",
      submitted: false,
      score: 0,
      writingPassed: false,
      writingTip: ""
    };
  }
  if (!state.practiceTest.answers) state.practiceTest.answers = {};
}

function practiceTestTotal() {
  return dailyTestItems.length + 1;
}

function scoreWritingAnswer(text) {
  const clean = text.trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const hasUsefulPattern = /\b(could|can|may|would|please|need|have|recommend|reservation|address|card|help|throat|price|rent|deposit|utilities|account|refund|appointment|reschedule|emergency|lost)\b/i.test(clean);
  const passed = words.length >= 4 && hasUsefulPattern && !isUnclearEnglishInput(clean);
  return {
    passed,
    tip: passed
      ? "造句通过：这句已经能表达清楚真实需求。"
      : "造句还不够清楚。可以先写：Could you help me with this?"
  };
}

function renderDailyTest() {
  if (!els.dailyTestList) return;
  ensurePracticeTestState();
  const test = state.practiceTest;
  const total = practiceTestTotal();
  const answeredCount = dailyTestItems.filter((item) => test.answers[item.id]).length + (test.writing.trim() ? 1 : 0);
  const progressValue = test.submitted ? (test.score / total) * 100 : (answeredCount / total) * 100;

  els.dailyTestScore.textContent = test.submitted ? `${test.score} / ${total}` : `${answeredCount} / ${total}`;
  els.dailyTestMeter.style.setProperty("--value", `${Math.round(progressValue)}%`);
  els.dailyTestWriting.value = test.writing;
  els.dailyTestWriting.disabled = test.submitted;
  els.submitDailyTestButton.disabled = test.submitted;
  els.submitDailyTestButton.textContent = test.submitted ? "已提交" : "提交小测";
  els.dailyTestList.innerHTML = "";

  dailyTestItems.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "daily-test-item";
    const selected = test.answers[item.id] || "";
    const options = shuffled(item.options, `${dailyLesson?.seed || ""}|${item.id}`);
    article.innerHTML = `
      <header>
        <span>${index + 1}. ${escapeHtml(item.skill)}</span>
        <span>${escapeHtml(scenarios[item.scenario]?.label || "场景")}</span>
      </header>
      <h3>${escapeHtml(item.prompt)}</h3>
      <div class="daily-test-options"></div>
      ${test.submitted ? `<div class="result-box answer-feedback ${selected === item.correct ? "correct" : "wrong"}"><strong>${selected === item.correct ? "回答正确" : "需要复习"}</strong><p>正确答案：${escapeHtml(item.correct)}</p><p>${escapeHtml(item.explanation)}</p></div>` : ""}
    `;
    const optionWrap = article.querySelector(".daily-test-options");
    options.forEach((optionText) => {
      const button = document.createElement("button");
      const isSelected = selected === optionText;
      const isCorrect = optionText === item.correct;
      button.className = `option-card${isSelected ? " selected" : ""}${test.submitted && isCorrect ? " correct" : ""}${test.submitted && isSelected && !isCorrect ? " wrong" : ""}`;
      button.innerHTML = `<strong>${escapeHtml(optionText)}</strong><span>${test.submitted ? (isCorrect ? "正确答案" : isSelected ? "你的选择" : "未选择") : "点击选择"}</span>`;
      button.disabled = test.submitted;
      button.addEventListener("click", () => {
        test.answers[item.id] = optionText;
        saveState();
        renderDailyTest();
      });
      optionWrap.appendChild(button);
    });
    els.dailyTestList.appendChild(article);
  });

  if (test.submitted) {
    const missed = dailyTestItems.filter((item) => test.answers[item.id] !== item.correct).map((item) => item.skill);
    const nextStep = missed.length ? `建议回到 Talk 里重点练：${missed.slice(0, 2).join(" / ")}。` : "选择题很稳，下一步多练开口造句。";
    els.dailyTestResult.hidden = false;
    els.dailyTestResult.className = `result-box answer-feedback ${test.score >= total - 1 ? "correct" : "wrong"}`;
    els.dailyTestResult.innerHTML = `<strong>小测得分：${test.score} / ${total}</strong><p>${escapeHtml(nextStep)}</p><p>${escapeHtml(test.writingTip)}</p>`;
  } else {
    els.dailyTestResult.hidden = true;
  }
}

function submitDailyTest() {
  ensurePracticeTestState();
  const test = state.practiceTest;
  test.writing = els.dailyTestWriting.value.trim();
  let score = dailyTestItems.filter((item) => test.answers[item.id] === item.correct).length;
  const writingResult = scoreWritingAnswer(test.writing);
  if (writingResult.passed) score += 1;
  test.submitted = true;
  test.score = score;
  test.writingPassed = writingResult.passed;
  test.writingTip = writingResult.tip;
  recordLearningEvent("test", { score, total: practiceTestTotal(), writingPassed: writingResult.passed });
  saveState();
  completeTask("test");
  renderDailyTest();
}

function resetDailyTest() {
  ensurePracticeTestState();
  state.practiceTest = {
    seed: dailyLesson?.seed || localDateKey(),
    answers: {},
    writing: "",
    submitted: false,
    score: 0,
    writingPassed: false,
    writingTip: ""
  };
  state.completedTaskIds = state.completedTaskIds.filter((id) => id !== "test");
  saveState();
  renderDailyTest();
  renderTasks();
}

function refreshLesson() {
  state.lessonSalt = (state.lessonSalt || 0) + 1;
  state.completedTaskIds = [];
  state.cardIndex = 0;
  questionIndex = 0;
  questionLocked = false;
  buildDailyLesson();
  renderQuestion();
  renderTasks();
  renderCourseLibrary();
  renderScenarios();
  resetChat();
  renderCard();
  renderWordBank();
  renderDailyTest();
  updateHeader();
  updateProgress();
}

function renderScenarios() {
  els.scenarioRow.innerHTML = "";
  const scenarioKeys = dailyLesson?.scenarioKeys?.length ? dailyLesson.scenarioKeys : Object.keys(scenarios);
  scenarioKeys.forEach((key) => {
    const scenario = scenarios[key];
    if (!scenario) return;
    const button = document.createElement("button");
    button.className = `scenario-chip${state.activeScenario === key ? " active" : ""}`;
    button.innerHTML = `${icon(scenario.icon, 15)}${scenario.label}`;
    button.addEventListener("click", () => {
      state.activeScenario = key;
      saveState();
      renderScenarios();
      resetChat();
    });
    els.scenarioRow.appendChild(button);
  });
}

function addMessage(role, text, translation = "") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  const translationText = translation || translationFor(text);
  bubble.innerHTML = `
    <span class="message-en">${escapeHtml(text)}</span>
    ${translationText ? `<span class="translation">${escapeHtml(translationText)}</span>` : ""}
  `;
  els.messages.appendChild(bubble);
  els.messages.scrollTop = els.messages.scrollHeight;
}

function resetChat() {
  const scenario = scenarios[state.activeScenario];
  els.personaName.textContent = scenario.name;
  els.personaHint.textContent = scenario.hint;
  els.messages.innerHTML = "";
  replyIndex = 0;
  els.feedbackCard.hidden = true;
  addMessage("ai", scenario.start, scenario.startCn);
  renderSuggestions();
  setVoiceState("idle", "点击麦克风开始说英语。测试版会在不支持录音时模拟识别结果。");
}

function renderSuggestions() {
  const scenario = scenarios[state.activeScenario];
  els.suggestions.innerHTML = "";
  scenario.suggestions.forEach((text, index) => {
    const button = document.createElement("button");
    button.className = "suggestion";
    const cn = scenario.suggestionsCn?.[index] || translationFor(text);
    button.innerHTML = `<span class="en">${escapeHtml(text)}</span>${cn ? `<span class="cn">${escapeHtml(cn)}</span>` : ""}`;
    button.addEventListener("click", () => {
      els.chatInput.value = text;
      els.chatInput.focus();
    });
    els.suggestions.appendChild(button);
  });
}

async function sendMessage() {
  const text = els.chatInput.value.trim();
  if (!text) return;
  const lastAiMessage = latestAiMessageText();
  addMessage("user", text);
  recordLearningEvent("chat", { scenario: state.activeScenario, messageLength: text.length });
  els.chatInput.value = "";
  const scenario = scenarios[state.activeScenario];
  const scenarioContext = scenarioContextFor(state.activeScenario);
  const fallbackIndex = (replyIndex + (dailyLesson?.replyOffset || 0)) % scenario.replies.length;
  const fallback = fallbackCoachReply({
    text,
    scenario,
    scenarioKey: state.activeScenario,
    fallbackIndex,
    lastAiMessage
  });
  replyIndex += 1;

  setVoiceState("processing", "AI 正在根据你的句子给反馈...");
  const ai = await requestAiCoach({
    action: "chat",
    level: state.level,
    goal: state.goal,
    scenario: state.activeScenario,
    scenarioContext,
    userMessage: text,
    showChinese: state.showChinese,
    replyIndex,
    recentMessages: Array.from(els.messages.querySelectorAll(".bubble")).slice(-6).map((node) => ({
      role: node.classList.contains("user") ? "learner" : "coach",
      text: node.innerText
    }))
  });
  setVoiceState("idle", "点击麦克风开始说英语。测试版会在不支持录音时模拟识别结果。");

  const aiReplyIsUsable =
    ai?.reply &&
    !isOffScenarioReply(ai.reply, state.activeScenario) &&
    !(isUnclearEnglishInput(text) && !/try saying|could i|no worries|repeat|clarify/i.test(ai.reply));
  const finalReply = aiReplyIsUsable ? ai.reply : fallback.reply;
  const finalReplyCn = aiReplyIsUsable ? ai.replyCn : fallback.replyCn;
  const finalCorrection = aiReplyIsUsable ? ai.correction : fallback.correction;
  addMessage("ai", finalReply, finalReplyCn);

  if (finalCorrection) {
    els.feedbackCorrection.textContent = finalCorrection;
  }

  if (replyIndex >= 2 || finalCorrection) {
    els.feedbackCard.hidden = false;
    completeTask("conversation");
  }
}

function setVoiceState(stateName, text) {
  els.voiceButton.classList.toggle("listening", stateName === "listening");
  els.voiceButton.classList.toggle("processing", stateName === "processing");
  els.voiceStatus.classList.toggle("active", stateName === "listening");
  els.voiceStatusText.textContent = text;
}

function appendTranscript(text) {
  els.chatInput.value = els.chatInput.value ? `${els.chatInput.value} ${text}` : text;
  els.chatInput.focus();
  setVoiceState("idle", "已识别到文本，可以编辑后发送。");
}

function simulateVoice() {
  setVoiceState("listening", "正在听你说话...");
  clearTimeout(voiceTimer);
  voiceTimer = window.setTimeout(() => {
    setVoiceState("processing", "正在整理成英文文本...");
    voiceTimer = window.setTimeout(() => appendTranscript("Could I get it with oat milk?"), 650);
  }, 1500);
}

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    simulateVoice();
    return;
  }

  try {
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setVoiceState("listening", "正在听你说话...");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      appendTranscript(transcript);
    };
    recognition.onerror = () => simulateVoice();
    recognition.onend = () => {
      if (!els.chatInput.value.trim()) setVoiceState("idle", "没有识别到内容，可以再试一次。");
    };
    recognition.start();
  } catch {
    simulateVoice();
  }
}

function renderCard() {
  const card = cards[state.cardIndex];
  els.cardCounter.textContent = `${state.cardIndex + 1} / ${cards.length}`;
  els.cardTag.textContent = card.tag;
  els.cardPhrase.textContent = card.phrase;
  els.cardMeaning.textContent = card.meaning;
  els.cardExample.textContent = card.example;
  els.cardExampleCn.textContent = card.exampleCn;
}

function rateCard() {
  const card = cards[state.cardIndex];
  recordLearningEvent("review", { phrase: card?.phrase || "review card" });
  state.cardIndex = (state.cardIndex + 1) % cards.length;
  saveState();
  renderCard();
}

async function shareSummary() {
  const text = `我今天在 FluentLoop 完成了 ${state.minutes} 分钟英语练习，新增 5 个表达。`;
  if (navigator.share) {
    await navigator.share({ title: "FluentLoop 学习摘要", text }).catch(() => {});
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(text).catch(() => {});
  }
  els.shareSummaryButton.textContent = "摘要已准备好";
}

function bindEvents() {
  els.brandButton.addEventListener("click", () => setView(state.hasOnboarded ? "today" : "welcome"));
  els.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.email = els.emailInput.value.trim() || "me@example.com";
    saveState();
    updateHeader();
    setView("goals");
  });
  els.guestButton.addEventListener("click", () => {
    state.email = "demo@fluentloop.app";
    els.emailInput.value = state.email;
    saveState();
    updateHeader();
    setView("goals");
  });

  document.querySelectorAll("[data-goal]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-goal]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.goal = button.dataset.goal;
      buildDailyLesson();
      saveState();
      updateHeader();
      renderTasks();
      renderCourseLibrary();
      renderScenarios();
      renderWordBank();
      renderDailyTest();
    });
  });

  document.querySelectorAll("[data-minutes]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-minutes]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.minutes = Number(button.dataset.minutes);
      buildDailyLesson();
      saveState();
      updateHeader();
      renderTasks();
      renderCourseLibrary();
      renderDailyTest();
      updateProgress();
    });
  });

  els.goalNextButton.addEventListener("click", () => {
    questionIndex = 0;
    state.testScore = 0;
    els.levelResult.hidden = true;
    els.startLearningButton.hidden = true;
    renderQuestion();
    setView("level");
  });

  els.abilityTestButton.addEventListener("click", () => {
    questionIndex = 0;
    state.testScore = 0;
    els.levelResult.hidden = true;
    els.startLearningButton.hidden = true;
    renderQuestion();
    setView("level");
  });

  els.startLearningButton.addEventListener("click", () => {
    setView("today");
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.go));
  });

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.nav));
  });

  els.openSummaryButton.addEventListener("click", () => setView("summary"));
  els.refreshLessonButton.addEventListener("click", refreshLesson);
  els.sendButton.addEventListener("click", sendMessage);
  els.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
  });
  els.voiceButton.addEventListener("click", startVoice);
  els.translationToggle.addEventListener("click", () => {
    state.showChinese = !state.showChinese;
    saveState();
    applyChineseMode();
  });
  els.finishConversationButton.addEventListener("click", () => {
    completeTask("conversation");
    setView("today");
  });
  document.querySelectorAll("[data-rate]").forEach((button) => {
    button.addEventListener("click", rateCard);
  });
  els.dailyTestWriting.addEventListener("input", () => {
    ensurePracticeTestState();
    state.practiceTest.writing = els.dailyTestWriting.value;
    saveState();
    const total = practiceTestTotal();
    const answeredCount = dailyTestItems.filter((item) => state.practiceTest.answers[item.id]).length + (state.practiceTest.writing.trim() ? 1 : 0);
    els.dailyTestScore.textContent = `${answeredCount} / ${total}`;
    els.dailyTestMeter.style.setProperty("--value", `${Math.round((answeredCount / total) * 100)}%`);
  });
  els.submitDailyTestButton.addEventListener("click", submitDailyTest);
  els.resetDailyTestButton.addEventListener("click", resetDailyTest);
  els.exportDataButton.addEventListener("click", exportLearningData);
  els.shareSummaryButton.addEventListener("click", shareSummary);
  els.installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice.catch(() => {});
    deferredInstallPrompt = null;
    els.installButton.hidden = true;
  });
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    els.installButton.hidden = false;
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

function init() {
  els.emailInput.value = state.email;
  document.querySelectorAll("[data-goal]").forEach((button) => {
    button.classList.toggle("active", button.dataset.goal === state.goal);
  });
  document.querySelectorAll("[data-minutes]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.minutes) === state.minutes);
  });

  bindEvents();
  setupInstallPrompt();
  registerServiceWorker();
  buildDailyLesson();
  renderQuestion();
  renderTasks();
  renderCourseLibrary();
  renderScenarios();
  resetChat();
  renderCard();
  renderWordBank();
  renderDailyTest();
  checkAiStatus();
  personalizeWordBank();
  updateHeader();
  updateProgress();
  updateLearningMethod();
  applyChineseMode();
  setView(state.hasOnboarded ? "today" : "welcome");
}

init();
