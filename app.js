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
  streak: 6
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
  }
];

const taskPools = {
  review: [
    { title: "复习 3 个表达", description: "supposed to / clarify / depends on", icon: "book" },
    { title: "复习礼貌请求", description: "Could I get / Can I have / Would it be possible", icon: "book" },
    { title: "复习追问句", description: "Could you clarify / What do you mean by / Could you repeat", icon: "book" },
    { title: "复习高频动词", description: "get / need / help / make / take", icon: "book" }
  ],
  listening: [
    { title: "听力 4 分钟", description: "咖啡店里的自然寒暄", icon: "audio" },
    { title: "听力 5 分钟", description: "机场、酒店、车站里的短问答", icon: "audio" },
    { title: "听力 6 分钟", description: "会议开头的 update 和 blocker", icon: "audio" },
    { title: "听力 4 分钟", description: "面试里的 tell me about yourself", icon: "audio" }
  ],
  conversation: [
    { title: "AI 场景对话", description: "点咖啡，要求换成燕麦奶", icon: "chat", scenario: "coffee" },
    { title: "AI 场景对话", description: "旅行问路，确认站台和时间", icon: "chat", scenario: "travel" },
    { title: "AI 场景对话", description: "会议同步，说明进度和卡点", icon: "chat", scenario: "meeting" },
    { title: "AI 场景对话", description: "面试介绍，讲一个具体例子", icon: "chat", scenario: "interview" }
  ],
  writing: [
    { title: "写 3 句话总结", description: "用今天的表达写自己的例句", icon: "pen" },
    { title: "写 1 段小对话", description: "把今天场景改成自己的真实需求", icon: "pen" },
    { title: "写 3 个替换句", description: "把 I want 换成更自然的表达", icon: "pen" },
    { title: "写 1 个复盘", description: "记录今天最想记住的 1 个词", icon: "pen" }
  ]
};

const dailyProfiles = {
  "daily-speaking": {
    scenarios: ["coffee", "travel", "meeting", "interview"],
    titles: ["今天练 1 场真实开口，复习 3 个高频表达", "今天把一句话说自然，再练一个生活场景", "今天用英语完成一个小任务"],
    copies: ["内容会根据你的目标、等级和日期轮换；先敢说，再慢慢说自然。", "系统会优先安排日常最常用的词和句型，降低开口压力。", "今天重点是礼貌请求、确认信息和自然追问。"]
  },
  "work-english": {
    scenarios: ["meeting", "interview", "coffee", "travel"],
    titles: ["今天练工作同步，复习会议高频表达", "今天练清楚表达进度和卡点", "今天把工作英语说得更礼貌"],
    copies: ["重点练 update、blocker、clarify 这类工作场景高频表达。", "内容会向会议、面试和协作沟通倾斜。", "先学能马上用的短句，再练更完整的解释。"]
  },
  travel: {
    scenarios: ["travel", "coffee", "meeting", "interview"],
    titles: ["今天练旅行问路，复习求助表达", "今天练机场/车站/点餐里的常用句", "今天把旅行英语说完整"],
    copies: ["重点练问路、确认时间、求助和点餐。", "先掌握旅行中最常遇到的短问答。", "今天的内容更偏向出门就能用的表达。"]
  },
  exam: {
    scenarios: ["interview", "meeting", "coffee", "travel"],
    titles: ["今天练基础语法和高频搭配", "今天用短句建立英语反应速度", "今天复习容易错的基础表达"],
    copies: ["重点练搭配、时态和更自然的句子选择。", "先把高频错误改掉，再慢慢提高表达长度。", "每题会给正确答案和中文解释，方便你复盘。"]
  }
};

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
  }
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
  }
];

const iconPaths = {
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h11.5a1.5 1.5 0 0 1 0 3H6"/><path d="M6 3v18"/><path d="M8 7h8"/>',
  audio: '<path d="M12 3v18"/><path d="M8 7v10"/><path d="M4 10v4"/><path d="M16 7v10"/><path d="M20 10v4"/>',
  chat: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8h1a4 4 0 0 1 0 8h-1"/><path d="M4 8h12v6a6 6 0 0 1-12 0Z"/><path d="M6 20h10"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M4 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>',
  map: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>'
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
  openSummaryButton: document.getElementById("openSummaryButton"),
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
  summaryMinutes: document.getElementById("summaryMinutes"),
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
  const scenarioKeys = shuffled(profile.scenarios, `${seed}|scenarios`);
  if (!scenarioKeys.includes(state.activeScenario)) {
    state.activeScenario = scenarioKeys[0];
  }

  const taskTypes = ["review", "listening", "conversation", "writing"];
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
  buildDailyLesson();
  saveState();
  updateHeader();
  updateLearningMethod();
  renderTasks();
  renderScenarios();
  renderWordBank();
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
  renderScenarios();
  resetChat();
  renderCard();
  renderWordBank();
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
  addMessage("user", text);
  els.chatInput.value = "";
  const scenario = scenarios[state.activeScenario];
  const fallbackIndex = (replyIndex + (dailyLesson?.replyOffset || 0)) % scenario.replies.length;
  const reply = scenario.replies[fallbackIndex];
  const replyCn = scenario.repliesCn?.[fallbackIndex] || "";
  replyIndex += 1;

  setVoiceState("processing", "AI 正在根据你的句子给反馈...");
  const ai = await requestAiCoach({
    action: "chat",
    level: state.level,
    goal: state.goal,
    scenario: state.activeScenario,
    userMessage: text,
    showChinese: state.showChinese,
    replyIndex,
    recentMessages: Array.from(els.messages.querySelectorAll(".bubble")).slice(-6).map((node) => node.innerText)
  });
  setVoiceState("idle", "点击麦克风开始说英语。测试版会在不支持录音时模拟识别结果。");

  const finalReply = ai?.reply || reply;
  const finalReplyCn = ai?.replyCn || replyCn;
  addMessage("ai", finalReply, finalReplyCn);

  if (ai?.correction) {
    els.feedbackCorrection.textContent = ai.correction;
  }

  if (replyIndex >= 2 || ai?.correction) {
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
      renderScenarios();
      renderWordBank();
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
  renderScenarios();
  resetChat();
  renderCard();
  renderWordBank();
  checkAiStatus();
  personalizeWordBank();
  updateHeader();
  updateProgress();
  updateLearningMethod();
  applyChineseMode();
  setView(state.hasOnboarded ? "today" : "welcome");
}

init();
