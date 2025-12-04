// Creative console start
// ===============================
// � HACKLER TERMINAL SIMULATION
// ===============================

console.clear();

const hackState = {
  level: 1,
  xp: 0,
  reputation: 0,
  bitcoins: 0,
  systemsHacked: 0,
  firewallsBypassed: 0,
  currentMission: null,
  unlockedTools: ['ping', 'scan'],
  hackerName: 'Anonymous'
};

const skullArt = `
        ██████████████████████████████
        █░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
        █░░▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄░░█
        █░░█  ▄▀▀▀▀▄    ▄▀▀▀▀▄  █░░█
        █░░█  █ ▀▀ █    █ ▀▀ █  █░░█
        █░░█  ▀▄▄▄▄▀    ▀▄▄▄▄▀  █░░█
        █░░█        ▄▄▄▄        █░░█
        █░░█      ▄█▀▀▀▀█▄      █░░█
        █░░█     █▀  ▀▀  ▀█     █░░█
        █░░▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀░░█
        █░░░░░░░░░░░░░░░░░░░░░░░░░░█
        ██████████████████████████████
`;

const targetSystems = [
  {
    name: "CORP_MAINFRAME",
    ip: "192.168.1.100",
    difficulty: 1,
    firewall: 30,
    reward: { xp: 100, bitcoins: 50, reputation: 10 },
    files: [
      { name: "employee_data.db", corrupted: false, content: "ID,NAME,SALARY\\n001,J.Smith,$85,000\\n002,A.Johnson,$92,000\\n..." },
      { name: "financial_q4.xlsx", corrupted: true, content: "ERR0R: F1L3 C0RRUPT3D... 0x4E554C4C... DATA_LOST..." },
      { name: "passwords.txt", corrupted: false, content: "admin:admin123\\nroot:toor\\nguest:guest" }
    ],
    password: "admin123"
  },
  {
    name: "BANK_SECURE_NET",
    ip: "10.0.0.55",
    difficulty: 2,
    firewall: 60,
    reward: { xp: 250, bitcoins: 200, reputation: 25 },
    files: [
      { name: "transactions.log", corrupted: false, content: "2024-01-15: TRANSFER $50,000 -> OFFSHORE_ACC_7721\\n2024-01-16: WIRE $125,000 -> CAYMAN_TRUST..." },
      { name: "vault_codes.enc", corrupted: true, content: "▓▓▓▓░░▓▓░░▓▓▓▓░░ENCRYPTED░░▓▓▓▓░░▓▓░░▓▓▓▓" },
      { name: "security_keys.pem", corrupted: false, content: "-----BEGIN RSA PRIVATE KEY-----\\nMIIEpAIBAAKCAQEA2Z3qX2BTLS4e..." }
    ],
    password: "vault2024"
  },
  {
    name: "GOV_CLASSIFIED",
    ip: "172.16.0.1",
    difficulty: 3,
    firewall: 85,
    reward: { xp: 500, bitcoins: 500, reputation: 50 },
    files: [
      { name: "project_omega.pdf", corrupted: true, content: "█████ REDACTED █████ CLASSIFIED █████ EYES ONLY █████" },
      { name: "agent_list.csv", corrupted: false, content: "CODENAME,LOCATION,STATUS\\nSHADOW,Moscow,ACTIVE\\nGHOST,Beijing,COMPROMISED..." },
      { name: "launch_codes.txt", corrupted: true, content: "WARNI̷N̸G̵:̶ ̸F̵I̶L̷E̸ ̵I̶N̷T̸E̶G̷R̵I̶T̷Y̸ ̵C̶O̷M̸P̶R̷O̵M̶I̷S̸E̶D̵" }
    ],
    password: "classified2024!"
  },
  {
    name: "DARKNET_HUB",
    ip: "onion://x7f3k9...",
    difficulty: 4,
    firewall: 95,
    reward: { xp: 1000, bitcoins: 1000, reputation: 100 },
    files: [
      { name: "bitcoin_wallets.dat", corrupted: false, content: "WALLET_1: 150.5 BTC\\nWALLET_2: 89.2 BTC\\nWALLET_3: 203.7 BTC" },
      { name: "zero_day_exploits.zip", corrupted: true, content: "P̷̢̛A̸̡S̵̨S̶̛W̷̢O̸̡R̵̨D̶̛ ̷̢P̸̡R̵̨Ơ̶T̷̢E̸̡C̵̨T̶̛E̷̢D̸" },
      { name: "hacker_network.db", corrupted: false, content: "ELITE_HACKERS: 47\\nACTIVE_OPS: 12\\nGLOBAL_REACH: 94 countries" }
    ],
    password: "n0_0n3_15_s4f3"
  }
];

const hackingTools = {
  ping: { name: "PING", desc: "Test connection to target", unlockLevel: 1 },
  scan: { name: "PORT SCAN", desc: "Discover open ports", unlockLevel: 1 },
  bruteforce: { name: "BRUTE FORCE", desc: "Crack passwords", unlockLevel: 2 },
  exploit: { name: "EXPLOIT", desc: "Use vulnerabilities", unlockLevel: 3 },
  rootkit: { name: "ROOTKIT", desc: "Gain root access", unlockLevel: 4 },
  ghost: { name: "GHOST MODE", desc: "Become untraceable", unlockLevel: 5 }
};

const passwordPatterns = [
  { pattern: "****1234", hint: "Ends with 1234" },
  { pattern: "admin***", hint: "Starts with admin" },
  { pattern: "p@$$w0rd", hint: "Common substitutions" },
  { pattern: "qwerty**", hint: "Keyboard pattern" }
];

// Utility functions
function getHackerRank() {
  if (hackState.level >= 10) return { rank: "� LEVGENDARY", color: "#FFD700" };
  if (hackState.level >= 7) return { rank: "� ELITEE", color: "#FF4500" };
  if (hackState.level >= 5) return { rank: "� VETERANU", color: "#9370DB" };
  if (hackState.level >= 3) return { rank: "⚡ SKILLED", color: "#00CED1" };
  return { rank: "🌱 SCRIPT KIDDIE", color: "#90EE90" };
}

function displayStatus() {
  const rank = getHackerRank();
  const xpNeeded = hackState.level * 200;
  const xpBar = Math.floor((hackState.xp / xpNeeded) * 10);
  const bar = "█".repeat(xpBar) + "░".repeat(10 - xpBar);
  
  console.log(`%c
╔══════════════════════════════════════════════════════════════╗
║                    💻 HACKER STATUS 💻                       ║
╠══════════════════════════════════════════════════════════════╣
║  Codename: ${hackState.hackerName.padEnd(20)}                 
║  Rank: ${rank.rank.padEnd(25)}                                
║  Level: ${hackState.level} [${bar}] ${hackState.xp}/${xpNeeded} XP
║  ₿ Bitcoins: ${hackState.bitcoins.toString().padEnd(15)}                      
║  🏆 Reputation: ${hackState.reputation.toString().padEnd(12)}                      
║  🖥️ Systems Hacked: ${hackState.systemsHacked.toString().padEnd(8)}                      
║  🛡️ Firewalls Bypassed: ${hackState.firewallsBypassed.toString().padEnd(5)}                   
╚══════════════════════════════════════════════════════════════╝
  `, `color: ${rank.color}; font-size: 11px;`);
}

function showWelcome() {
  console.log(`%c${skullArt}`, "color: #00FF00; font-size: 10px;");
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                                                               ║
  ║     💻  H A C K E R   T E R M I N A L   v2.0  💻             ║
  ║                                                               ║
  ║          "Access Granted... Welcome to the Matrix"            ║
  ║                                                               ║
  ║     ░▒▓█ · ░▒▓█ · ░▒▓█ · ░▒▓█ · ░▒▓█ · ░▒▓█ · ░▒▓█          ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #00FF00; font-size: 14px; font-weight: bold;");
  
  console.log("%c🎮 Type hack() to initialize your hacking session...", "color: #00FF00; font-size: 16px;");
  console.log("%c📖 Type help() to see available commands", "color: #00CED1; font-size: 14px;");
}

function rules() {
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    � HACEKER'S MANUAL �                       ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  🎯 COMMANDS:                                                 ║
  ║     hack()        - Start hacking session                     ║
  ║     targets()     - View available targets                    ║
  ║     attack(n)     - Attack target number n                    ║
  ║     tools()       - View your hacking tools                   ║
  ║     status()      - View your hacker profile                  ║
  ║     decrypt()     - Start password cracking minigame          ║
  ║     pattern()     - Start code pattern matching               ║
  ║     files()       - Browse stolen files                       ║
  ║                                                               ║
  ║  🏆 RANKS:                                                    ║
  ║     � ScriEpt Kiddie → ⚡ Skilled → 💀 Veteran                ║
  ║     → 🔥 Elite → 👑 Legendary                                 ║
  ║                                                               ║
  ║  💡 TIP: Complete missions to earn XP and level up!           ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #00FF00; font-size: 11px;");
}

// Progress bar animation
function animateProgress(label, duration, callback) {
  let progress = 0;
  const interval = duration / 100;
  
  const timer = setInterval(() => {
    progress += Math.random() * 3 + 1;
    if (progress > 100) progress = 100;
    
    const filled = Math.floor(progress / 5);
    const bar = "█".repeat(filled) + "░".repeat(20 - filled);
    
    console.clear();
    console.log(`%c
    ╔════════════════════════════════════════════╗
    ║  ${label.padEnd(38)}  ║
    ║  [${bar}] ${Math.floor(progress)}%  ║
    ╚════════════════════════════════════════════╝
    `, "color: #00FF00; font-size: 12px;");
    
    if (progress >= 100) {
      clearInterval(timer);
      if (callback) setTimeout(callback, 500);
    }
  }, interval);
}

// Matrix rain effect
function matrixRain() {
  const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
  let rain = "";
  for (let i = 0; i < 5; i++) {
    let line = "";
    for (let j = 0; j < 50; j++) {
      line += chars[Math.floor(Math.random() * chars.length)] + " ";
    }
    rain += line + "\\n";
  }
  return rain;
}

// Initialize game
function hack() {
  const name = prompt("Enter your hacker codename:");
  hackState.hackerName = name || "Anonymous";
  hackState.level = 1;
  hackState.xp = 0;
  hackState.bitcoins = 0;
  hackState.reputation = 0;
  hackState.systemsHacked = 0;
  hackState.firewallsBypassed = 0;
  hackState.unlockedTools = ['ping', 'scan'];
  
  console.clear();
  console.log(`%c${matrixRain()}`, "color: #00FF00; font-size: 10px;");
  
  animateProgress("INITIALIZING SECURE CONNECTION", 2000, () => {
    console.clear();
    console.log(`%c
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     🔓 ACCESS GRANTED                                         ║
    ║                                                               ║
    ║     Welcome, ${hackState.hackerName.padEnd(20)}                
    ║                                                               ║
    ║     Your identity is now encrypted.                           ║
    ║     The dark web awaits...                                    ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    `, "color: #00FF00; font-size: 12px;");
    
    displayStatus();
    console.log("%c💡 Type targets() to see available systems to hack", "color: #00CED1; font-size: 14px;");
  });
}

// Show targets
function targets() {
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    🎯 AVAILABLE TARGETS 🎯                    ║
  ╠═══════════════════════════════════════════════════════════════╣`, "color: #00FF00; font-size: 11px;");
  
  targetSystems.forEach((t, i) => {
    const diffStars = "★".repeat(t.difficulty) + "☆".repeat(4 - t.difficulty);
    const locked = hackState.level < t.difficulty ? "🔒" : "🔓";
    console.log(`%c  ║  [${i + 1}] ${locked} ${t.name.padEnd(20)} IP: ${t.ip.padEnd(18)}  ║
  ║      Difficulty: ${diffStars}  Firewall: ${t.firewall}%              ║`, 
      hackState.level >= t.difficulty ? "color: #00FF00; font-size: 11px;" : "color: #666; font-size: 11px;");
  });
  
  console.log(`%c  ╚═══════════════════════════════════════════════════════════════╝
  
  💡 Type attack(n) to hack target n (e.g., attack(1))`, "color: #00FF00; font-size: 11px;");
}

// Attack target
function attack(targetNum) {
  const target = targetSystems[targetNum - 1];
  
  if (!target) {
    console.log("%c❌ Invalid target! Use targets() to see available systems.", "color: red;");
    return;
  }
  
  if (hackState.level < target.difficulty) {
    console.log(`%c🔒 ACCESS DENIED - Requires Level ${target.difficulty}. You are Level ${hackState.level}.`, "color: red; font-size: 14px;");
    return;
  }
  
  hackState.currentMission = target;
  console.clear();
  
  console.log(`%c${matrixRain()}`, "color: #00FF00; font-size: 10px;");
  console.log(`%c🎯 TARGET: ${target.name}`, "color: #FF4500; font-size: 16px; font-weight: bold;");
  console.log(`%c📍 IP: ${target.ip}`, "color: #00CED1; font-size: 14px;");
  
  animateProgress("SCANNING PORTS", 1500, () => {
    console.log("%c✅ Open ports found: 22, 80, 443, 3306", "color: #00FF00;");
    
    animateProgress("BYPASSING FIREWALL", 2000, () => {
      const success = Math.random() * 100 > target.firewall - (hackState.level * 10);
      
      if (success) {
        hackState.firewallsBypassed++;
        console.log("%c✅ FIREWALL BYPASSED!", "color: #00FF00; font-size: 16px;");
        console.log("%c🔐 Password required. Type decrypt() to crack it.", "color: #FFD700; font-size: 14px;");
      } else {
        console.log("%c❌ FIREWALL BLOCKED ACCESS! Try again or level up.", "color: red; font-size: 14px;");
        hackState.currentMission = null;
      }
    });
  });
}

// Password cracking minigame
function decrypt() {
  if (!hackState.currentMission) {
    console.log("%c❌ No active mission! Use attack(n) first.", "color: red;");
    return;
  }
  
  const target = hackState.currentMission;
  const password = target.password;
  const hint = password.substring(0, 3) + "*".repeat(password.length - 3);
  
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                 🔐 PASSWORD CRACKER v2.0 🔐                   ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  Target: ${target.name.padEnd(30)}                            
  ║  Password Length: ${password.length} characters                          
  ║  Hint: ${hint.padEnd(30)}                                     
  ║                                                               ║
  ║  💡 Type crack("password") to attempt                         ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #FFD700; font-size: 11px;");
}

// Crack password attempt
function crack(attempt) {
  if (!hackState.currentMission) {
    console.log("%c❌ No active mission!", "color: red;");
    return;
  }
  
  const target = hackState.currentMission;
  
  if (attempt === target.password) {
    console.clear();
    console.log(`%c
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     ✅ PASSWORD CRACKED: ${target.password.padEnd(20)}        
    ║                                                               ║
    ║     🎉 SYSTEM COMPROMISED!                                    ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    `, "color: #00FF00; font-size: 12px; font-weight: bold;");
    
    // Award rewards
    hackState.xp += target.reward.xp;
    hackState.bitcoins += target.reward.bitcoins;
    hackState.reputation += target.reward.reputation;
    hackState.systemsHacked++;
    
    // Check level up
    const xpNeeded = hackState.level * 200;
    if (hackState.xp >= xpNeeded) {
      hackState.level++;
      hackState.xp -= xpNeeded;
      console.log(`%c🎊 LEVEL UP! You are now Level ${hackState.level}!`, "color: #FFD700; font-size: 16px; font-weight: bold;");
      
      // Unlock new tools
      Object.keys(hackingTools).forEach(tool => {
        if (hackingTools[tool].unlockLevel === hackState.level && !hackState.unlockedTools.includes(tool)) {
          hackState.unlockedTools.push(tool);
          console.log(`%c🔧 NEW TOOL UNLOCKED: ${hackingTools[tool].name}`, "color: #9370DB; font-size: 14px;");
        }
      });
    }
    
    console.log(`%c💰 Rewards: +${target.reward.xp} XP | +${target.reward.bitcoins} ₿ | +${target.reward.reputation} Rep`, "color: #00CED1; font-size: 14px;");
    
    displayStatus();
    console.log("%c📁 Type files() to browse stolen data", "color: #00CED1; font-size: 14px;");
    
    hackState.currentMission = null;
  } else {
    // Show how close they were
    let matches = 0;
    for (let i = 0; i < Math.min(attempt.length, target.password.length); i++) {
      if (attempt[i] === target.password[i]) matches++;
    }
    console.log(`%c❌ WRONG PASSWORD! ${matches}/${target.password.length} characters correct.`, "color: red; font-size: 14px;");
  }
}

// Pattern matching minigame
function pattern() {
  const patterns = [
    { code: "01101001", answer: "01101010", hint: "Binary +1" },
    { code: "2, 4, 8, 16, ?", answer: "32", hint: "Powers of 2" },
    { code: "A1B2C3D?", answer: "4", hint: "Letter-Number pattern" },
    { code: "0xDEAD + 0x1 = ?", answer: "0xDEAE", hint: "Hex addition" }
  ];
  
  const puzzle = patterns[Math.floor(Math.random() * patterns.length)];
  
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                 🧩 CODE PATTERN CHALLENGE 🧩                  ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  Pattern: ${puzzle.code.padEnd(30)}                           
  ║  Hint: ${puzzle.hint.padEnd(33)}                              
  ║                                                               ║
  ║  💡 Type solve("answer") to submit                            ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #9370DB; font-size: 11px;");
  
  window.currentPuzzle = puzzle;
}

function solve(answer) {
  if (!window.currentPuzzle) {
    console.log("%c❌ No active puzzle! Type pattern() to start.", "color: red;");
    return;
  }
  
  if (answer.toString() === window.currentPuzzle.answer) {
    const xpGain = 50;
    hackState.xp += xpGain;
    console.log(`%c✅ CORRECT! +${xpGain} XP`, "color: #00FF00; font-size: 16px;");
    window.currentPuzzle = null;
  } else {
    console.log("%c❌ Wrong answer! Try again.", "color: red;");
  }
}

// View stolen files
function files() {
  if (hackState.systemsHacked === 0) {
    console.log("%c📁 No files yet. Hack a system first!", "color: #666;");
    return;
  }
  
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    📁 STOLEN FILES 📁                         ║
  ╠═══════════════════════════════════════════════════════════════╣`, "color: #00FF00; font-size: 11px;");
  
  targetSystems.slice(0, hackState.systemsHacked).forEach(t => {
    console.log(`%c  ║  📂 ${t.name}                                              ║`, "color: #00FF00; font-size: 11px;");
    t.files.forEach(f => {
      const status = f.corrupted ? "⚠️ CORRUPTED" : "✅ INTACT";
      console.log(`%c  ║    └─ ${f.name.padEnd(25)} ${status}        ║`, 
        f.corrupted ? "color: #FF6347; font-size: 11px;" : "color: #00FF00; font-size: 11px;");
    });
  });
  
  console.log(`%c  ╚═══════════════════════════════════════════════════════════════╝
  
  💡 Type read("filename") to view file contents`, "color: #00FF00; font-size: 11px;");
}

// Read file contents
function read(filename) {
  for (const t of targetSystems) {
    for (const f of t.files) {
      if (f.name === filename) {
        console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║  📄 ${f.name.padEnd(40)}                                      
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║`, "color: #00FF00; font-size: 11px;");
        
        if (f.corrupted) {
          console.log(`%c  ║  ⚠️ FILE CORRUPTED - PARTIAL DATA RECOVERED:                ║
  ║                                                               ║
  ║  ${f.content.substring(0, 50).padEnd(50)}  ║`, "color: #FF6347; font-size: 11px;");
        } else {
          console.log(`%c  ║  ${f.content.replace(/\\n/g, "\\n  ║  ").padEnd(50)}  ║`, "color: #00FF00; font-size: 11px;");
        }
        
        console.log(`%c  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝`, "color: #00FF00; font-size: 11px;");
        return;
      }
    }
  }
  console.log("%c❌ File not found!", "color: red;");
}

// View tools
function tools() {
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    🔧 HACKING TOOLS 🔧                        ║
  ╠═══════════════════════════════════════════════════════════════╣`, "color: #00CED1; font-size: 11px;");
  
  Object.keys(hackingTools).forEach(key => {
    const tool = hackingTools[key];
    const unlocked = hackState.unlockedTools.includes(key);
    const status = unlocked ? "✅" : `🔒 Lvl ${tool.unlockLevel}`;
    console.log(`%c  ║  ${status} ${tool.name.padEnd(15)} - ${tool.desc.padEnd(25)}  ║`, 
      unlocked ? "color: #00FF00; font-size: 11px;" : "color: #666; font-size: 11px;");
  });
  
  console.log(`%c  ╚═══════════════════════════════════════════════════════════════╝`, "color: #00CED1; font-size: 11px;");
}

// Status shortcut
function status() {
  displayStatus();
}

// Help alias
function help() {
  console.log(`%c
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    📖 HACKER'S MANUAL 📖                      ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  🎯 COMMANDS:                                                 ║
  ║     hack()        - Start hacking session                     ║
  ║     targets()     - View available targets                    ║
  ║     attack(n)     - Attack target number n                    ║
  ║     tools()       - View your hacking tools                   ║
  ║     status()      - View your hacker profile                  ║
  ║     decrypt()     - Start password cracking minigame          ║
  ║     pattern()     - Start code pattern matching               ║
  ║     files()       - Browse stolen files                       ║
  ║     read("file")  - Read file contents                        ║
  ║                                                               ║
  ║  🏆 RANKS:                                                    ║
  ║     🌱 Script Kiddie → ⚡ Skilled → 💀 Veteran                ║
  ║     → 🔥 Elite → 👑 Legendary                                 ║
  ║                                                               ║
  ║  💡 TIP: Complete missions to earn XP and level up!           ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `, "color: #00FF00; font-size: 11px;");
}

// Initialize
showWelcome();

// Creative console end
