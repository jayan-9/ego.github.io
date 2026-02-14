// ===== GLOBAL VARIABLES =====
let currentFilter = "love";
let isDarkTheme = false;
let currentMiniSuggestions = [];

// ===== EXAMPLE NAMES DATA (for empty input) =====
const categoryExamples = {
    love: [
        { text: "●──🅝Ⓐ🅜Ⓔ ꕤ࿐", symbols: ["♡","♥","❥","❣","ღ"] },
        { text: "៚ꕤη𝚊𝚖𝚎ꕤ 🐼᭄", symbols: ["ꫂ❁","𖹭","☂","❣"] },
        { text: "🐼⃞ᴵᵐ•𝑁𝑎𝑚𝑒᭄࿐", symbols: ["❦","💓᪲᪲","ᡣ𐭩"] },
        { text: "🦋⃟𝙉𝕒𝙢𝕖˚࿔⊹❤️s࿐", symbols: ["๛","𓏌","𖠌"] },
        { text: "♡✨N̸▵a̸▵m̸▵e̸▵✨🦋࿐", symbols: ["☔︎︎","亗","♛"] },
        { text: "░✰☺︎ɴ·ᴀ·ᴍ·ᴇ·☺︎✰░ 🫀", symbols: ["♥","❥","❣"] },
        { text: "🦋⃟𝙉𝙖𝙢𝙚⋆˙⟡💗᪲᪲᪲🩹", symbols: ["✿","❀","ꫂ❁"] },
        { text: "ΝΛΜΞ", symbols: ["♡","♥","❥"] },
        { text: "♥️┈━═❥•·˚𝓝𝓪𝓶𝓮•˚·❥·˚═━┈", symbols: ["ᡣ𐭩","ꨄ︎","๛"] },
        { text: "𐙚✨˚N̷̷a̷m̷e̷˚✨𐙚 ツ", symbols: ["𖠌","𓆩ᵛ𓆪","☔︎︎"] }
    ],
    gamer: [
        { text: "ＯＰܔ𝘕𝘈𝘔𝘌Ⓥ࿐", symbols: ["࿐","☯","모","☂"] },
        { text: "★N̶a̶m̶e̶⁰⁰⁷★࿐", symbols: ["么","✓","☫","☬"] },
        { text: "⸙ X-「•❀N̷̷a̷m̷e̷ ❀•」", symbols: ["┆","𖣿","❀","༒"] },
        { text: "모𐍆𐍆_𐌽𐌻𐌼𐌴_모 ♡࿐", symbols: ["メ","乂","✔","×͜×"] },
        { text: "༺☠︎N̵̔A̵̔M̵̔E̵̔ ᵒᵖ☠︎༻", symbols: ["𓆩","♫","╰⁔╯"] },
        { text: "N͢G͢ ☠ N̾A̾M̾E̾ ☯࿐", symbols: ["࿐","☯","모"] }
    ],
    fancy: [
        { text: "ᶜ̸ʳ̸ᴬ̸ᶻ̸ʸ̸·˚✗✗𝑁𝑎𝑚𝑒✗✗˚·❄️", symbols: ["𓆪","⧉","☫","☆"] },
        { text: "♬lııl𐌽𐌻𐌼𐌴lııl♬┈", symbols: ["⨳","⟆","ૐ","ꪶꫂ"] },
        { text: "░🄽✰🄰✰🄼✰🄴░", symbols: ["♛","ᡣ𐭩","๛"] }
    ],
    font: [
        { text: "N̷̷a̷m̷e̷", symbols: ["❶","❷","❸"] },
        { text: "ᑎᗩᗰᗴ", symbols: ["𝟏","𝟐","𝟑"] },
        { text: "🅝🅐🅜🅔", symbols: ["➀","➁","➂"] },
        { text: "𝙉𝙖𝙢𝙚", symbols: ["𝟢","𝟣","𝟤"] }
    ]
};

// ===== STYLES DATA (actual generation) =====
let stylesByCategory = {
    love: [
        { name: "love_heart_1", prefix: "💖 ", suffix: " 💖", map: { a:"𝓪",b:"𝓫",c:"𝓬",d:"𝓭",e:"𝓮",f:"𝓯",g:"𝓰",h:"𝓱",i:"𝓲",j:"𝓳",k:"𝓴",l:"𝓵",m:"𝓶",n:"𝓷",o:"𝓸",p:"𝓹",q:"𝓺",r:"𝓻",s:"𝓼",t:"𝓽",u:"𝓾",v:"𝓿",w:"𝔀",x:"𝔁",y:"𝔂",z:"𝔃",A:"𝓐",B:"𝓑",C:"𝓒",D:"𝓓",E:"𝓔",F:"𝓕",G:"𝓖",H:"𝓗",I:"𝓘",J:"𝓙",K:"𝓚",L:"𝓛",M:"𝓜",N:"𝓝",O:"𝓞",P:"𝓟",Q:"𝓠",R:"𝓡",S:"𝓢",T:"𝓣",U:"𝓤",V:"𝓥",W:"𝓦",X:"𝓧",Y:"𝓨",Z:"𝓩" } },
        { name: "love_heart_2", prefix: "❤️ ", suffix: " ❤️", map: { a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"𝑒",f:"𝒻",g:"𝑔",h:"𝒽",i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",n:"𝓃",o:"𝑜",p:"𝓅",q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",y:"𝓎",z:"𝓏",A:"𝒜",B:"ℬ",C:"𝒞",D:"𝒟",E:"ℰ",F:"ℱ",G:"𝒢",H:"ℋ",I:"ℐ",J:"𝒥",K:"𝒦",L:"ℒ",M:"ℳ",N:"𝒩",O:"𝒪",P:"𝒫",Q:"𝒬",R:"ℛ",S:"𝒮",T:"𝒯",U:"𝒰",V:"𝒱",W:"𝒲",X:"𝒳",Y:"𝒴",Z:"𝒵" } },
        { name: "love_heart_3", prefix: "💕 ", suffix: " 💕", map: { a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫",A:"𝔸",B:"𝔹",C:"ℂ",D:"𝔻",E:"𝔼",F:"𝔽",G:"𝔾",H:"ℍ",I:"𝕀",J:"𝕁",K:"𝕂",L:"𝕃",M:"𝕄",N:"ℕ",O:"𝕆",P:"ℙ",Q:"ℚ",R:"ℝ",S:"𝕊",T:"𝕋",U:"𝕌",V:"𝕍",W:"𝕎",X:"𝕏",Y:"𝕐",Z:"ℤ" } },
        { name: "love_angel_style", prefix: "😇 ", suffix: " 😇", map: { a:"α",b:"ß",c:"¢",d:"Ð",e:"ε",f:"ƒ",g:"g",h:"н",i:"ι",j:"נ",k:"к",l:"ℓ",m:"м",n:"η",o:"σ",p:"ρ",q:"q",r:"я",s:"ѕ",t:"т",u:"υ",v:"ν",w:"ω",x:"χ",y:"у",z:"z",A:"A",B:"B",C:"C",D:"D",E:"E",F:"F",G:"G",H:"H",I:"I",J:"J",K:"K",L:"L",M:"M",N:"N",O:"O",P:"P",Q:"Q",R:"R",S:"S",T:"T",U:"U",V:"V",W:"W",X:"X",Y:"Y",Z:"Z" } },
        { name: "bold_love_style", prefix: "—͟͞͞✰", suffix: "ᯓ✈︎⋆ˎˊ˗", map: { a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",f:"𝗳",g:"𝗴",h:"𝗵",i:"𝗶",j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",n:"𝗻",o:"𝗼",p:"𝗽",q:"𝗾",r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",v:"𝘃",w:"𝘄",x:"𝘅",y:"𝘆",z:"𝘇",A:"𝗔",B:"𝗕",C:"𝗖",D:"𝗗",E:"𝗘",F:"𝗙",G:"𝗚",H:"𝗛",I:"𝗜",J:"𝗝",K:"𝗞",L:"𝗟",M:"𝗠",N:"𝗡",O:"𝗢",P:"𝗣",Q:"𝗤",R:"𝗥",S:"𝗦",T:"𝗧",U:"𝗨",V:"𝗩",W:"𝗪",X:"𝗫",Y:"𝗬",Z:"𝗭" } }
    ],
    gamer: [
        { name: "gamer_bold_style", prefix: "🎮 ", suffix: " 🎮", map: { a:"🅐",b:"🅑",c:"🅒",d:"🅓",e:"🅔",f:"🅕",g:"🅖",h:"🅗",i:"🅘",j:"🅙",k:"🅚",l:"🅛",m:"🅜",n:"🅝",o:"🅞",p:"🅟",q:"🅠",r:"🅡",s:"🅢",t:"🅣",u:"🅤",v:"🅥",w:"🅦",x:"🅧",y:"🅨",z:"🅩",A:"🅐",B:"🅑",C:"🅒",D:"🅓",E:"🅔",F:"🅕",G:"🅖",H:"🅗",I:"🅘",J:"🅙",K:"🅚",L:"🅛",M:"🅜",N:"🅝",O:"🅞",P:"🅟",Q:"🅠",R:"🅡",S:"🅢",T:"🅣",U:"🅤",V:"🅥",W:"🅦",X:"🅧",Y:"🅨",Z:"🅩" } },
        { name: "gamer_monospace_style", prefix: "🔥 ", suffix: " 🔥", map: { a:"𝚊",b:"𝚋",c:"𝚌",d:"𝚍",e:"𝚎",f:"𝚏",g:"𝚐",h:"𝚑",i:"𝚒",j:"𝚓",k:"𝚔",l:"𝚕",m:"𝚖",n:"𝚗",o:"𝚘",p:"𝚙",q:"𝚚",r:"𝚛",s:"𝚜",t:"𝚝",u:"𝚞",v:"𝚟",w:"𝚠",x:"𝚡",y:"𝚢",z:"𝚣",A:"𝙰",B:"𝙱",C:"𝙲",D:"𝙳",E:"𝙴",F:"𝙵",G:"𝙶",H:"𝙷",I:"𝙸",J:"𝙹",K:"𝙺",L:"𝙻",M:"𝙼",N:"𝙽",O:"𝙾",P:"𝙿",Q:"𝚀",R:"𝚁",S:"𝚂",T:"𝚃",U:"𝚄",V:"𝚅",W:"𝚆",X:"𝚇",Y:"𝚈",Z:"𝚉" } },
        { name: "gamer_danger_style", prefix: "💀 ", suffix: " 💀", map: { a:"ค",b:"๖",c:"¢",d:"໓",e:"ē",f:"f",g:"ງ",h:"h",i:"i",j:"ว",k:"k",l:"l",m:"๓",n:"ຖ",o:"໐",p:"p",q:"๑",r:"r",s:"Ş",t:"t",u:"น",v:"ง",w:"ຟ",x:"x",y:"ฯ",z:"ຊ",A:"ค",B:"๖",C:"¢",D:"໓",E:"ē",F:"f",G:"ງ",H:"h",I:"i",J:"ว",K:"k",L:"l",M:"๓",N:"ຖ",O:"໐",P:"p",Q:"๑",R:"r",S:"Ş",T:"t",U:"น",V:"ง",W:"ຟ",X:"x",Y:"ฯ",Z:"ຊ" } },
        { name: "gamer_skull", prefix: "☠️ ", suffix: " ☠️", map: { a:"Ꮧ",b:"Ᏸ",c:"ፈ",d:"Ꮄ",e:"Ꮛ",f:"Ꭶ",g:"Ꮆ",h:"Ꮒ",i:"Ꭵ",j:"Ꮰ",k:"Ꮶ",l:"Ꮭ",m:"Ꮇ",n:"Ꮑ",o:"Ꭷ",p:"Ꭾ",q:"Ꭴ",r:"Ꮢ",s:"Ꮥ",t:"Ꮦ",u:"Ꮼ",v:"Ꮙ",w:"Ꮗ",x:"ጀ",y:"Ꭹ",z:"ፚ",A:"Ꮧ",B:"Ᏸ",C:"ፈ",D:"Ꮄ",E:"Ꮛ",F:"Ꭶ",G:"Ꮆ",H:"Ꮒ",I:"Ꭵ",J:"Ꮰ",K:"Ꮶ",L:"Ꮭ",M:"Ꮇ",N:"Ꮑ",O:"Ꭷ",P:"Ꭾ",Q:"Ꭴ",R:"Ꮢ",S:"Ꮥ",T:"Ꮦ",U:"Ꮼ",V:"Ꮙ",W:"Ꮗ",X:"ጀ",Y:"Ꭹ",Z:"ፚ" } }
    ],
    fancy: [
        { name: "fancy_script", prefix: "👑 ", suffix: " 👑", map: { a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"𝑒",f:"𝒻",g:"𝑔",h:"𝒽",i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",n:"𝓃",o:"𝑜",p:"𝓅",q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",y:"𝓎",z:"𝓏",A:"𝒜",B:"ℬ",C:"𝒞",D:"𝒟",E:"ℰ",F:"ℱ",G:"𝒢",H:"ℋ",I:"ℐ",J:"𝒥",K:"𝒦",L:"ℒ",M:"ℳ",N:"𝒩",O:"𝒪",P:"𝒫",Q:"𝒬",R:"ℛ",S:"𝒮",T:"𝒯",U:"𝒰",V:"𝒱",W:"𝒲",X:"𝒳",Y:"𝒴",Z:"𝒵" } },
        { name: "fancy_outline", prefix: "✨ ", suffix: " ✨", map: { a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫",A:"𝔸",B:"𝔹",C:"ℂ",D:"𝔻",E:"𝔼",F:"𝔽",G:"𝔾",H:"ℍ",I:"𝕀",J:"𝕁",K:"𝕂",L:"𝕃",M:"𝕄",N:"ℕ",O:"𝕆",P:"ℙ",Q:"ℚ",R:"ℝ",S:"𝕊",T:"𝕋",U:"𝕌",V:"𝕍",W:"𝕎",X:"𝕏",Y:"𝕐",Z:"ℤ" } },
        { name: "fancy_cross", prefix: "✧ ", suffix: " ✧", map: { a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫",A:"𝔸",B:"𝔹",C:"ℂ",D:"𝔻",E:"𝔼",F:"𝔽",G:"𝔾",H:"ℍ",I:"𝕀",J:"𝕁",K:"𝕂",L:"𝕃",M:"𝕄",N:"ℕ",O:"𝕆",P:"ℙ",Q:"ℚ",R:"ℝ",S:"𝕊",T:"𝕋",U:"𝕌",V:"𝕍",W:"𝕎",X:"𝕏",Y:"𝕐",Z:"ℤ" } }
    ],
    font: [
        { name: "font_cursive", prefix: "", suffix: "", map: { a:"𝓪",b:"𝓫",c:"𝓬",d:"𝓭",e:"𝓮",f:"𝓯",g:"𝓰",h:"𝓱",i:"𝓲",j:"𝓳",k:"𝓴",l:"𝓵",m:"𝓶",n:"𝓷",o:"𝓸",p:"𝓹",q:"𝓺",r:"𝓻",s:"𝓼",t:"𝓽",u:"𝓾",v:"𝓿",w:"𝔀",x:"𝔁",y:"𝔂",z:"𝔃",A:"𝓐",B:"𝓑",C:"𝓒",D:"𝓓",E:"𝓔",F:"𝓕",G:"𝓖",H:"𝓗",I:"𝓘",J:"𝓙",K:"𝓚",L:"𝓛",M:"𝓜",N:"𝓝",O:"𝓞",P:"𝓟",Q:"𝓠",R:"𝓡",S:"𝓢",T:"𝓣",U:"𝓤",V:"𝓥",W:"𝓦",X:"𝓧",Y:"𝓨",Z:"𝓩" } },
        { name: "font_bubble", prefix: "", suffix: "", map: { a:"ⓐ",b:"ⓑ",c:"ⓒ",d:"ⓓ",e:"ⓔ",f:"ⓕ",g:"ⓖ",h:"ⓗ",i:"ⓘ",j:"ⓙ",k:"ⓚ",l:"ⓛ",m:"ⓜ",n:"ⓝ",o:"ⓞ",p:"ⓟ",q:"ⓠ",r:"ⓡ",s:"ⓢ",t:"ⓣ",u:"ⓤ",v:"ⓥ",w:"ⓦ",x:"ⓧ",y:"ⓨ",z:"ⓩ",A:"Ⓐ",B:"Ⓑ",C:"Ⓒ",D:"Ⓓ",E:"Ⓔ",F:"Ⓕ",G:"Ⓖ",H:"Ⓗ",I:"Ⓘ",J:"Ⓙ",K:"Ⓚ",L:"Ⓛ",M:"Ⓜ",N:"Ⓝ",O:"Ⓞ",P:"Ⓟ",Q:"Ⓠ",R:"Ⓡ",S:"Ⓢ",T:"Ⓣ",U:"Ⓤ",V:"Ⓥ",W:"Ⓦ",X:"Ⓧ",Y:"Ⓨ",Z:"Ⓩ" } },
        { name: "font_smallcaps", prefix: "", suffix: "", map: { a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ғ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ",A:"ᴀ",B:"ʙ",C:"ᴄ",D:"ᴅ",E:"ᴇ",F:"ғ",G:"ɢ",H:"ʜ",I:"ɪ",J:"ᴊ",K:"ᴋ",L:"ʟ",M:"ᴍ",N:"ɴ",O:"ᴏ",P:"ᴘ",Q:"ǫ",R:"ʀ",S:"s",T:"ᴛ",U:"ᴜ",V:"ᴠ",W:"ᴡ",X:"x",Y:"ʏ",Z:"ᴢ" } }
    ]
};

// ===== SUGGESTIONS DATA =====
let suggestionsData = {
    love: [
        "💕 𝓛𝓸𝓿𝓮𝓻 𝓫𝓸𝔂 💕",
        "❤️🔥 ᴛʀᴜᴇ ʟᴏᴠᴇʀ 🔥❤️",
        "𓆩♡𓆪 ʙᴀʙʏɢɪʀʟ 𓆩♡𓆪",
        "💖 𝒮𝓌𝑒𝑒𝓉𝒽𝑒𝒶𝓇𝓉 💖"
    ],
    gamer: [
        "⚔️ 𝕲𝖆𝖒𝖊𝖗 𝕷𝖔𝖗𝖉 ⚔️",
        "🔥 ᴘʀᴏ ᴘʟᴀʏᴇʀ 🔥",
        "🎮 ɢᴀᴍɪɴɢ ʟᴇɢᴇɴᴅ 🎮",
        "👑 ᴄʟᴀɴ ʟᴇᴀᴅᴇʀ 👑"
    ],
    fancy: [
        "👑 𝕱𝖆𝖓𝖈𝖞 𝕶𝖎𝖓𝖌 👑",
        "✨ ꧁༒☬𝓕𝓪𝓷𝓬𝔂☬༒꧂ ✨",
        "💎 ʟᴜxᴜʀʏ ʟɪғᴇ 💎",
        "🌟 𝓢𝓽𝔂𝓵𝓲𝓼𝓱 𝓥𝓲𝓫𝓮 🌟"
    ],
    font: [
        "𝒮𝒸𝓇𝒾𝓅𝓉 𝒮𝓉𝓎𝓁𝑒",
        "𝕆𝕦𝕥𝕝𝕚𝕟𝕖 𝔽𝕠𝕟𝕥",
        "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 𝙻𝚘𝚘𝚔",
        "𝖲𝖺𝗇𝗌 𝖲𝖾𝗋𝗂𝖿 𝖲𝗍𝗒𝗅𝖾"
    ]
};

// ===== SYMBOLS DATA (partial, you can add more later) =====
let symbolsData = {
    faces: [
        { symbol:"☺", name:"Smiling Face" },
        { symbol:"😊", name:"Blushing Face" },
        { symbol:"😎", name:"Cool Face" }
    ],
    gaming: [
        { symbol:"🎮", name:"Game Controller" },
        { symbol:"⚔️", name:"Crossed Swords" },
        { symbol:"🛡️", name:"Shield" },
        { symbol:"☠", name:"Skull" }
    ],
    hearts: [
        { symbol:"❤️", name:"Red Heart" },
        { symbol:"💖", name:"Sparkling Heart" },
        { symbol:"💕", name:"Two Hearts" }
    ],
    stars: [
        { symbol:"⭐", name:"Star" },
        { symbol:"🌟", name:"Glowing Star" },
        { symbol:"✨", name:"Sparkles" }
    ],
    decorative: [
        { symbol:"❄️", name:"Snowflake" },
        { symbol:"🌸", name:"Cherry Blossom" },
        { symbol:"🎀", name:"Ribbon" }
    ]
};

// ===== CORE FUNCTIONS =====
function convert(name, map) {
    return name.split("").map(ch => {
        if (map[ch] !== undefined) return map[ch];
        if (map[ch.toLowerCase()] !== undefined) return map[ch.toLowerCase()];
        if (map[ch.toUpperCase()] !== undefined) return map[ch.toUpperCase()];
        return ch;
    }).join("");
}

// ===== GENERATE STYLES (with examples when input empty) =====
function generateStyles() {
    const name = document.getElementById('nameInput')?.value.trim();
    const result = document.getElementById('result');
    if (!result) return;
    result.innerHTML = "";

    // If name is empty, show examples
    if (!name) {
        const examples = categoryExamples[currentFilter] || categoryExamples.love;
        const shuffled = [...examples].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 12);
        selected.forEach(example => {
            const div = document.createElement('div');
            div.className = 'style-card';
            let html = `<div class="style-text">${example.text}</div>`;
            // show some symbols as chips (optional)
            if (example.symbols && example.symbols.length) {
                html += `<div style="display:flex; flex-wrap:wrap; gap:0.3rem; margin-top:0.5rem;">`;
                example.symbols.slice(0,4).forEach(sym => {
                    html += `<span style="background:var(--gray-light); padding:0.2rem 0.5rem; border-radius:12px; font-size:0.8rem; cursor:pointer;" onclick="copyText('${sym.replace(/'/g,"\\'")}', event)">${sym} <i class="fas fa-copy"></i></span>`;
                });
                html += `</div>`;
            }
            html += `<button class="copy-btn" onclick="copyText('${example.text.replace(/'/g,"\\'").replace(/"/g,'&quot;')}', this)"><i class="fas fa-copy"></i> Copy</button>`;
            div.innerHTML = html;
            result.appendChild(div);
        });
        return;
    }

    // Name exists: generate actual styles
    const styles = stylesByCategory[currentFilter] || [];
    if (styles.length === 0) {
        result.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>No styles for this category yet.</p></div>`;
        return;
    }
    const shuffled = [...styles].sort(() => Math.random() - 0.5);
    shuffled.forEach((style, index) => {
        const styled = style.prefix + convert(name, style.map) + style.suffix;
        const escaped = styled.replace(/'/g,"\\'").replace(/"/g,'&quot;');
        const div = document.createElement('div');
        div.className = 'style-card';
        div.innerHTML = `<div class="style-text">${styled}</div><button class="copy-btn" onclick="copyText('${escaped}', this)"><i class="fas fa-copy"></i> Copy</button>`;
        result.appendChild(div);
        // one ad after 12th style
        if (index === 11 && shuffled.length > 12) {
            const ad = document.createElement('div');
            ad.className = 'ad-single';
            result.appendChild(ad);
        }
    });
}

// ===== SELECT CATEGORY =====
function selectCategory(type) {
    currentFilter = type;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(type)) btn.classList.add('active');
    });
    generateStyles();
    loadMiniSuggestions();
}

// ===== SUGGESTIONS TRAY =====
function loadMiniSuggestions() {
    const miniGrid = document.getElementById('miniSuggestions');
    const categoryName = document.getElementById('currentCategoryName');
    const suggestionCount = document.getElementById('suggestionCount');
    if (!miniGrid || !categoryName || !suggestionCount) return;
    categoryName.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    const categorySuggestions = suggestionsData[currentFilter] || [];
    if (categorySuggestions.length === 0) {
        miniGrid.innerHTML = '<p style="color: var(--gray);">No suggestions yet</p>';
        suggestionCount.textContent = '0';
        return;
    }
    const shuffled = [...categorySuggestions].sort(() => Math.random() - 0.5);
    currentMiniSuggestions = shuffled.slice(0, 3);
    suggestionCount.textContent = categorySuggestions.length;
    let html = '';
    currentMiniSuggestions.forEach(s => {
        const es = s.replace(/'/g,"\\'").replace(/"/g,'&quot;');
        html += `<div class="suggestion-mini-card"><span class="suggestion-mini-text" title="${s}">${s}</span><button class="suggestion-mini-copy" onclick="copyText('${es}')"><i class="fas fa-copy"></i></button></div>`;
    });
    miniGrid.innerHTML = html;
}

function toggleFullSuggestions() {
    const modal = document.getElementById('fullSuggestionsModal');
    const modalCategory = document.getElementById('modalCategoryName');
    if (!modal) return;
    modalCategory.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    const fullGrid = document.getElementById('fullSuggestionsGrid');
    const categorySuggestions = suggestionsData[currentFilter] || [];
    if (categorySuggestions.length === 0) {
        fullGrid.innerHTML = '<p>No suggestions available.</p>';
    } else {
        let html = '';
        categorySuggestions.forEach(s => {
            const es = s.replace(/'/g,"\\'").replace(/"/g,'&quot;');
            html += `<div class="suggestion-card"><div class="suggestion-text">${s}</div><button class="suggestion-copy" onclick="copyText('${es}')"><i class="fas fa-copy"></i> Copy</button></div>`;
        });
        fullGrid.innerHTML = html;
    }
    modal.classList.add('show');
}
function closeFullSuggestions() {
    document.getElementById('fullSuggestionsModal').classList.remove('show');
}

// ===== SYMBOL PICKER =====
function openSymbolModal() {
    const modal = document.getElementById('symbolModal');
    if (modal) {
        modal.classList.add('show');
        loadSymbolCategories();
    }
}
function closeSymbolModal() {
    document.getElementById('symbolModal').classList.remove('show');
}
function loadSymbolCategories() {
    const categoriesDiv = document.getElementById('symbolCategories');
    const symbolsGrid = document.getElementById('symbolsGrid');
    if (!categoriesDiv) return;
    let html = '', first = '';
    Object.keys(symbolsData).forEach((cat, idx) => {
        if (idx === 0) first = cat;
        html += `<button class="symbol-category ${idx===0?'active':''}" onclick="loadSymbols('${cat}')">${cat.charAt(0).toUpperCase()+cat.slice(1)}</button>`;
    });
    categoriesDiv.innerHTML = html;
    if (first) loadSymbols(first);
}
function loadSymbols(category) {
    const grid = document.getElementById('symbolsGrid');
    const symbols = symbolsData[category] || [];
    document.querySelectorAll('.symbol-category').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.symbol-category').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(category.toLowerCase())) btn.classList.add('active');
    });
    if (!grid) return;
    if (symbols.length === 0) {
        grid.innerHTML = '<p>No symbols.</p>';
        return;
    }
    let html = '';
    symbols.forEach(sym => {
        const es = sym.symbol.replace(/'/g,"\\'").replace(/"/g,'&quot;');
        html += `<div class="symbol-item"><div class="symbol-display">${sym.symbol}</div><div class="symbol-name">${sym.name}</div><div class="symbol-actions"><button class="insert-btn" onclick="insertSymbol('${es}')"><i class="fas fa-plus"></i> Insert</button><button class="copy-symbol-btn" onclick="copyText('${es}')"><i class="fas fa-copy"></i> Copy</button></div></div>`;
    });
    grid.innerHTML = html;
}
function insertSymbol(symbol) {
    const input = document.getElementById('nameInput');
    if (!input) return;
    const val = input.value, pos = input.selectionStart;
    input.value = val.substring(0,pos) + symbol + val.substring(pos);
    input.selectionStart = input.selectionEnd = pos + symbol.length;
    input.focus();
    closeSymbolModal();
    showToast('✅ Symbol inserted');
}

// ===== UTILITIES =====
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.classList.add('copied');
            setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1500);
        }
        showToast('📋 Copied!');
    }).catch(() => showToast('❌ Failed'));
}
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.style.display = 'block';
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => t.style.display = 'none', 2000);
}

// ===== THEME =====
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);
    const toggle = document.getElementById('themeToggle');
    const status = document.getElementById('themeStatus');
    if (toggle) toggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    if (status) status.textContent = isDarkTheme ? 'Dark' : 'Light';
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// ===== SIDEBAR =====
function toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
}
function closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
}
function showGuide() {
    document.getElementById('guideModal')?.classList.add('show');
    closeSidebar();
}
function closeGuide() {
    document.getElementById('guideModal')?.classList.remove('show');
}

// ===== NOTES =====
function updateNoteCount() {
    const text = document.getElementById('noteText');
    const count = document.getElementById('noteCount');
    if (!text || !count) return;
    const words = text.value.trim().split(/\s+/).filter(w => w.length > 0);
    count.textContent = words.length + '/100';
    count.style.color = words.length > 100 ? '#ef4444' : '';
}
function saveNote() {
    const text = document.getElementById('noteText');
    if (text) { localStorage.setItem('nicknameNotes', text.value); showToast('💾 Note saved'); }
}
function clearNote() {
    const text = document.getElementById('noteText');
    if (text) { text.value = ''; updateNoteCount(); localStorage.removeItem('nicknameNotes'); showToast('🗑️ Cleared'); }
}
function loadNote() {
    const saved = localStorage.getItem('nicknameNotes');
    const text = document.getElementById('noteText');
    if (saved && text) { text.value = saved; updateNoteCount(); }
}

// ===== SCROLL TOP =====
function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.pageYOffset > 300));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== EASY ADD FUNCTIONS =====
window.addStyle = function(cat, name, pre, suf, map) {
    if (!stylesByCategory[cat]) stylesByCategory[cat] = [];
    if (stylesByCategory[cat].find(s => s.name === name)) { showToast('⚠️ Exists'); return false; }
    stylesByCategory[cat].push({ name, prefix: pre||"", suffix: suf||"", map });
    showToast(`✨ ${name}`);
    if (currentFilter === cat && document.getElementById('nameInput')?.value.trim()) generateStyles();
    return true;
};
window.addSuggestion = function(cat, text) {
    if (!suggestionsData[cat]) suggestionsData[cat] = [];
    suggestionsData[cat].push(text);
    showToast(`💡 Added to ${cat}`);
    return true;
};
window.addSymbols = function(cat, sym, name) {
    if (!symbolsData[cat]) symbolsData[cat] = [];
    symbolsData[cat].push({ symbol: sym, name });
    showToast(`🔣 ${name}`);
    return true;
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkTheme = true;
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        if (document.getElementById('themeStatus')) document.getElementById('themeStatus').textContent = 'Dark';
    }
    loadNote();
    document.getElementById('menuToggle')?.addEventListener('click', toggleSidebar);
    document.getElementById('closeSidebar')?.addEventListener('click', closeSidebar);
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('noteText')?.addEventListener('input', updateNoteCount);
    document.getElementById('nameInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') generateStyles(); });
    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.id === 'symbolModal') closeSymbolModal();
                if (this.id === 'guideModal') closeGuide();
                if (this.id === 'fullSuggestionsModal') closeFullSuggestions();
            }
        });
    });
    initScrollTop();
    generateStyles();
    loadMiniSuggestions();
});
