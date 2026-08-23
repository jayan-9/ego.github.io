// ============================================
// ===== script.js – Only Functions =====
// ===== Data has been moved to data.js =====
// ============================================

// ===== GLOBAL VARIABLES =====
let currentFilter = "love";
let isDarkTheme = false;
let currentMiniSuggestions = [];

// ===== CORE FUNCTIONS =====
function convert(name, map) {
return name.split("").map(ch => {
if (map[ch] !== undefined) return map[ch];
if (map[ch.toLowerCase()] !== undefined) return map[ch.toLowerCase()];
if (map[ch.toUpperCase()] !== undefined) return map[ch.toUpperCase()];
return ch;
}).join("");
}

function generateStyles() {
const name = document.getElementById('nameInput')?.value.trim();
const result = document.getElementById('result');
const resultMid = document.getElementById('resultMid');
const resultBottom = document.getElementById('resultBottom');
if (!result) return;

 
// If input is empty – show examples from HTML
if (!name) {
    const exampleContainer = document.getElementById('exampleContainer');
    if (exampleContainer) {
        const allExamples = exampleContainer.querySelectorAll('.style-card');
        const filtered = Array.from(allExamples).filter(el => el.classList.contains(currentFilter));
        if (filtered.length === 0) {
            result.innerHTML = `<p style="color:#888;text-align:center;padding:20px;">No examples found for "${currentFilter}" category.</p>`;
            if (resultMid) resultMid.innerHTML = '';
            if (resultBottom) resultBottom.innerHTML = '';
            return;
        }
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const mainLimit = Math.min(30, shuffled.length);
        const midLimit = Math.min(20, Math.max(0, shuffled.length - mainLimit));
        const bottomLimit = Math.min(20, Math.max(0, shuffled.length - mainLimit - midLimit));
        const mainExamples = shuffled.slice(0, mainLimit);
        const midExamples = shuffled.slice(mainLimit, mainLimit + midLimit);
        const bottomExamples = shuffled.slice(mainLimit + midLimit, mainLimit + midLimit + bottomLimit);
        result.innerHTML = mainExamples.map(el => el.outerHTML).join('');
        if (resultMid) resultMid.innerHTML = midExamples.map(el => el.outerHTML).join('');
        if (resultBottom) resultBottom.innerHTML = bottomExamples.map(el => el.outerHTML).join('');
    }
    return;
}

// Input filled – generate styles from data
const styles = stylesByCategory[currentFilter] || [];
if (styles.length === 0) {
    result.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>No styles for this category yet.</p></div>`;
    if (resultMid) resultMid.innerHTML = '';
    if (resultBottom) resultBottom.innerHTML = '';
    return;
}

const shuffled = [...styles].sort(() => Math.random() - 0.5);
const total = shuffled.length;
const midLimit = Math.min(30, Math.floor(total * 0.15));
const bottomLimit = Math.min(110, Math.floor(total * 0.35));
const mainLimit = total - midLimit - bottomLimit;
const mainStyles = shuffled.slice(0, mainLimit);
const midStyles = shuffled.slice(mainLimit, mainLimit + midLimit);
const bottomStyles = shuffled.slice(mainLimit + midLimit);

result.innerHTML = '';
mainStyles.forEach((style, index) => {
    const styled = style.prefix + convert(name, style.map) + style.suffix;
    const escaped = styled.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const div = document.createElement('div');
    div.className = `style-card ${currentFilter}`;
    div.setAttribute('onclick', `copyText('${escaped}', this)`);
    div.setAttribute('title', 'Click to copy');
    div.innerHTML = `<div class="style-text">${styled}</div>`;
    result.appendChild(div);
    // Inline links (as in original)
    if (index === 61) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'style-card';
        linksDiv.style.padding = '20px';
        linksDiv.style.background = '#f5f5f5';
        linksDiv.style.border = '1px solid #ddd';
        linksDiv.style.borderRadius = '10px';
        linksDiv.style.cursor = 'default';
        linksDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="anime-stylish-names-collection.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">🌀 Anime Names</a>
                <a href="pubg-stylish-names-with-symbols.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">🎯 PUBG Names</a>
                <a href="attitude-names-for-boys.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">⚡ Attitude Names</a>
            </div>
        `;
        result.appendChild(linksDiv);
    }
    if (index === 159) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'style-card';
        linksDiv.style.padding = '20px';
        linksDiv.style.background = '#f5f5f5';
        linksDiv.style.border = '1px solid #ddd';
        linksDiv.style.borderRadius = '10px';
        linksDiv.style.cursor = 'default';
        linksDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="pubg-stylish-names-with-symbols.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">🎯 PUBG Names</a>
                <a href="attitude-names-for-boys.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">⚡ Attitude Names</a>
            </div>
        `;
        result.appendChild(linksDiv);
    }
    if (index === 179) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'style-card';
        linksDiv.style.padding = '20px';
        linksDiv.style.background = '#f5f5f5';
        linksDiv.style.border = '1px solid #ddd';
        linksDiv.style.borderRadius = '10px';
        linksDiv.style.cursor = 'default';
        linksDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="royal-and-vip-names.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">👑 Royal & VIP</a>
                <a href="social-media-bio-ideas-for-whatsapp-instagram.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">💬 Bio Ideas</a>
            </div>
        `;
        result.appendChild(linksDiv);
    }
});

if (resultMid) {
    resultMid.innerHTML = '';
    midStyles.forEach((style) => {
        const styled = style.prefix + convert(name, style.map) + style.suffix;
        const escaped = styled.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const div = document.createElement('div');
        div.className = `style-card ${currentFilter}`;
        div.setAttribute('onclick', `copyText('${escaped}', this)`);
        div.setAttribute('title', 'Click to copy');
        div.innerHTML = `<div class="style-text">${styled}</div>`;
        resultMid.appendChild(div);
    });
}

if (resultBottom) {
    resultBottom.innerHTML = '';
    bottomStyles.forEach((style) => {
        const styled = style.prefix + convert(name, style.map) + style.suffix;
        const escaped = styled.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const div = document.createElement('div');
        div.className = `style-card ${currentFilter}`;
        div.setAttribute('onclick', `copyText('${escaped}', this)`);
        div.setAttribute('title', 'Click to copy');
        div.innerHTML = `<div class="style-text">${styled}</div>`;
        resultBottom.appendChild(div);
    });
}
 

}

function selectCategory(type) {
currentFilter = type;
document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
document.querySelectorAll('.category-btn').forEach(btn => {
if (btn.textContent.toLowerCase().includes(type)) btn.classList.add('active');
});
generateStyles();
loadMiniSuggestions();
if (typeof loadTop3Styles === 'function') {
loadTop3Styles();
}
}

function loadMiniSuggestions() {
const miniGrid = document.getElementById('miniSuggestions');
const categoryName = document.getElementById('currentCategoryName');
const suggestionCount = document.getElementById('suggestionCount');
if (!miniGrid || !categoryName || !suggestionCount) return;
categoryName.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
const categorySuggestions = suggestionsData[currentFilter] || [];
if (categorySuggestions.length === 0) {
miniGrid.innerHTML = 'No suggestions yet';
suggestionCount.textContent = '0';
return;
}
const shuffled = [...categorySuggestions].sort(() => Math.random() - 0.5);
const displaySuggestions = shuffled.slice(0, 40);
currentMiniSuggestions = displaySuggestions;
let html = '';
displaySuggestions.forEach((suggestion, index) => {
const escapedSuggestion = suggestion.replace(/'/g, "\'").replace(/"/g, '"');
html +=  <div class="suggestion-mini-card"> <span class="suggestion-mini-text" title="${suggestion}">${suggestion}</span> <button class="suggestion-mini-copy" onclick="copyText('${escapedSuggestion}')" title="Copy"> <i class="fas fa-copy"></i> </button> </div> ;
if (index === 19) {
html +=  <div style="grid-column: 1 / -1; margin: 20px 0; text-align: center;"> <img src="https://jayan-9.github.io/ego.github.io/stylish.jpg"  alt="Stylish Design" style="max-width: 100%; height: auto; border-radius: 16px; box-shadow: var(--shadow-lg); border: 1px solid var(--gray-light);"> </div> ;
}
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
fullGrid.innerHTML = 'No suggestions available.';
} else {
let html = '';
categorySuggestions.forEach(s => {
const es = s.replace(/'/g,"\'").replace(/"/g,'"');
html +=  <div class="suggestion-card"><div class="suggestion-text">${s}</div><button class="suggestion-copy" onclick="copyText('${es}')"><i class="fas fa-copy"></i> Copy</button></div> ;
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
html +=  <button class="symbol-category ${idx===0?'active':''}" onclick="loadSymbols('${cat}')">${cat.charAt(0).toUpperCase()+cat.slice(1)}</button> ;
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
grid.innerHTML = 'No symbols.';
return;
}
let html = '';
symbols.forEach(sym => {
const es = sym.symbol.replace(/'/g,"\'").replace(/"/g,'"');
html +=  <div class="symbol-item"><div class="symbol-display">${sym.symbol}</div><div class="symbol-name">${sym.name}</div><div class="symbol-actions"><button class="insert-btn" onclick="insertSymbol('${es}')"><i class="fas fa-plus"></i> Insert</button><button class="copy-symbol-btn" onclick="copyText('${es}')"><i class="fas fa-copy"></i> Copy</button></div></div> ;
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
btn.innerHTML = ' Copied!';
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

function toggleTheme() {
isDarkTheme = !isDarkTheme;
document.body.classList.toggle('dark-theme', isDarkTheme);
const toggle = document.getElementById('themeToggle');
const status = document.getElementById('themeStatus');
if (toggle) toggle.innerHTML = isDarkTheme ? '' : '';
if (status) status.textContent = isDarkTheme ? 'Dark' : 'Light';
localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

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

function initScrollTop() {
const btn = document.getElementById('scrollTop');
if (!btn) return;
window.addEventListener('scroll', () => btn.classList.toggle('show', window.pageYOffset > 300));
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function refreshTop3Styles() {
loadTop3Styles();
showToast('✨ New styles generated!');
}

function loadTop3Styles() {
const top3Grid = document.getElementById('top3Styles');
if (!top3Grid) return;
const styles = getRandomStyles(3);
let html = '';
styles.forEach(style => {
const escapedStyle = style.replace(/'/g, "\'").replace(/"/g, '"');
html +=  <div class="top3-card" onclick="copyText('${escapedStyle}')" title="Click to copy">${style}</div> ;
});
top3Grid.innerHTML = html;
}

function getRandomStyles(count) {
let allItems = [];
const categorySuggestions = suggestionsData[currentFilter] || [];
if (categorySuggestions.length > 0) {
const shuffled = [...categorySuggestions].sort(() => Math.random() - 0.5);
allItems = allItems.concat(shuffled.slice(0, 3));
}
if (allItems.length < count) {
// fallback to examples if needed (not implemented here, but fine)
}
const shuffled = [...allItems].sort(() => Math.random() - 0.5);
return shuffled.slice(0, count);
}

function toggleDiscover(header) {
const item = header.parentElement;
const allItems = document.querySelectorAll('.discover-item');
allItems.forEach(other => {
if (other !== item && other.classList.contains('active')) {
other.classList.remove('active');
}
});
item.classList.toggle('active');
}

// ===== EASY ADD FUNCTIONS (used by data.js) =====
window.addStyle = function(cat, name, pre, suf, map) {
if (!stylesByCategory[cat]) stylesByCategory[cat] = [];
if (stylesByCategory[cat].find(s => s.name === name)) { showToast('⚠️ Exists'); return false; }
stylesByCategory[cat].push({ name, prefix: pre||"", suffix: suf||"", map });
showToast( ✨ ${name} );
if (currentFilter === cat && document.getElementById('nameInput')?.value.trim()) generateStyles();
return true;
};

window.addSuggestion = function(cat, text) {
if (!suggestionsData[cat]) suggestionsData[cat] = [];
suggestionsData[cat].push(text);
showToast( 💡 Added to ${cat} );
return true;
};

window.addSymbols = function(cat, sym, name) {
if (!symbolsData[cat]) symbolsData[cat] = [];
symbolsData[cat].push({ symbol: sym, name });
showToast( 🔣 ${name} );
return true;
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
isDarkTheme = true;
document.body.classList.add('dark-theme');
document.getElementById('themeToggle').innerHTML = '';
if (document.getElementById('themeStatus')) document.getElementById('themeStatus').textContent = 'Dark';
}
loadNote();
document.getElementById('menuToggle')?.addEventListener('click', toggleSidebar);
document.getElementById('closeSidebar')?.addEventListener('click', closeSidebar);
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('noteText')?.addEventListener('input', updateNoteCount);
document.getElementById('nameInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') generateStyles(); });

 
let autoGenerateTimer;
document.getElementById('nameInput').addEventListener('input', function() {
    clearTimeout(autoGenerateTimer);
    autoGenerateTimer = setTimeout(() => {
        generateStyles();
    }, 500);
});

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

// ===== All addStyle / addSuggestion / addSymbols calls have been moved to data.js =====

// Initial load
generateStyles();
loadMiniSuggestions();
loadTop3Styles();
 

});
