

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

// ===== GENERATE STYLES (DYNAMIC - NO HARD-CODED LIMITS) =====
function generateStyles() {
    const name = document.getElementById('nameInput')?.value.trim();
    const result = document.getElementById('result');
    const resultMid = document.getElementById('resultMid');
    const resultBottom = document.getElementById('resultBottom');
    
    if (!result) return;

    // ===== STEP 1: अगर Input EMPTY है – Examples दिखाएं =====
    if (!name) {
        const exampleContainer = document.getElementById('exampleContainer');
        if (exampleContainer) {
            const allExamples = exampleContainer.querySelectorAll('.style-card');
            const filtered = Array.from(allExamples).filter(el => 
                el.classList.contains(currentFilter)
            );
            
            if (filtered.length === 0) {
                result.innerHTML = `<p style="color:#888;text-align:center;padding:20px;">No examples found for "${currentFilter}" category.</p>`;
                if (resultMid) resultMid.innerHTML = '';
                if (resultBottom) resultBottom.innerHTML = '';
                return;
            }
            
            // ===== EXAMPLES: DYNAMIC LIMITS =====
            const shuffled = [...filtered].sort(() => Math.random() - 0.5);
            
            // Har section ke liye percentage ya fixed number
            const mainExampleLimit = Math.min(30, shuffled.length);  // 30 ya jitne hain
            const midExampleLimit = Math.min(20, Math.max(0, shuffled.length - mainExampleLimit));  // 20 ya baaki
            const bottomExampleLimit = Math.min(20, Math.max(0, shuffled.length - mainExampleLimit - midExampleLimit));  // 20 ya baaki
            
            // Alag-alag portions (dynamic)
            const mainExamples = shuffled.slice(0, mainExampleLimit);
            const midExamples = shuffled.slice(mainExampleLimit, mainExampleLimit + midExampleLimit);
            const bottomExamples = shuffled.slice(mainExampleLimit + midExampleLimit, mainExampleLimit + midExampleLimit + bottomExampleLimit);
            
            // Main Section
            let html = '';
            mainExamples.forEach(el => {
                html += el.outerHTML;
            });
            result.innerHTML = html;
            
            // Mid Section
            if (resultMid) {
                let midHtml = '';
                midExamples.forEach(el => {
                    midHtml += el.outerHTML;
                });
                resultMid.innerHTML = midHtml;
            }
            
            // Bottom Section
            if (resultBottom) {
                let bottomHtml = '';
                bottomExamples.forEach(el => {
                    bottomHtml += el.outerHTML;
                });
                resultBottom.innerHTML = bottomHtml;
            }
        }
        return;
    }

    // ===== STEP 2: अगर Input भरा है – Actual Styles Generate करें =====
    const styles = stylesByCategory[currentFilter] || [];
    if (styles.length === 0) {
        result.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>No styles for this category yet.</p></div>`;
        if (resultMid) resultMid.innerHTML = '';
        if (resultBottom) resultBottom.innerHTML = '';
        return;
    }

    // ===== GENERATED STYLES: DYNAMIC LIMITS (300+ ke liye ready) =====
    const shuffled = [...styles].sort(() => Math.random() - 0.5);
    const totalStyles = shuffled.length;
    
    // Mid aur Bottom ke liye limits (dynamic)
    const midStyleLimit = Math.min(30, Math.floor(totalStyles * 0.15));     // 70 ya 25%
    const bottomStyleLimit = Math.min(110, Math.floor(totalStyles * 0.35));  // 70 ya 25%
    const mainStyleLimit = totalStyles - midStyleLimit - bottomStyleLimit;   // Baaki sab main mein
    
    // Alag-alag portions (dynamic - koi duplicate nahi)
    const mainStyles = shuffled.slice(0, mainStyleLimit);
    const midStyles = shuffled.slice(mainStyleLimit, mainStyleLimit + midStyleLimit);
    const bottomStyles = shuffled.slice(mainStyleLimit + midStyleLimit);

    // ===== MAIN SECTION =====
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
        
    // Links (sirf main section mein) - LAZY LOAD VERSION
if (index === 61) {  
    const linksDiv = document.createElement('div');  
    linksDiv.className = 'style-card';  
    linksDiv.style.padding = '20px';  
    linksDiv.style.background = '#f5f5f5';  
    linksDiv.style.border = '1px solid #ddd';  
    linksDiv.style.borderRadius = '10px';  
    linksDiv.style.cursor = 'default';  
    linksDiv.style.minHeight = '120px'; // placeholder height
    linksDiv.innerHTML = `<div style="text-align:center;color:#999;padding:20px;">Loading links...</div>`;  
    result.appendChild(linksDiv);  
    
    // 🔥 Lazy load with Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                linksDiv.innerHTML = `  
                    <div style="display: flex; flex-direction: column; gap: 12px;">  
                        <a href="intagram.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">🅾Iɴᴛᴀɢʀᴀᴍ Nᴀᴍᴇ Gᴇɴᴇʀᴀᴛᴏʀ</a>  
                        <a href="love.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">❣ⓁⓄⓋⒺ ⓃⒶⓂⒺ ⒼⒺⓃⒺⓇⒶⓉⒺ</a>  
                        <a href="attitude-names-for-boys.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">⚡ Attitude Names</a>  
                    </div>  
                `;  
                observer.disconnect(); // ek baar load ho gaya toh observe karna band karo
            }
        });
    }, { rootMargin: '200px' }); // 200px pehle hi load karna shuru karo
    
    observer.observe(linksDiv);
}
        
       // Index 159 - Lazy Load
if (index === 159) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'style-card';
    linksDiv.style.padding = '20px';
    linksDiv.style.background = '#f5f5f5';
    linksDiv.style.border = '1px solid #ddd';
    linksDiv.style.borderRadius = '10px';
    linksDiv.style.cursor = 'default';
    linksDiv.style.minHeight = '100px';
    linksDiv.innerHTML = `<div style="text-align:center;color:#999;padding:20px;">Loading links...</div>`;
    result.appendChild(linksDiv);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                linksDiv.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <a href="crazy.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">🤪ⲥгคⲹⲩ ⲛคʍⲉ⳽</a>
                        <a href="attitude.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">👿Aᴛᴛɪᴛᴜᴅᴇ Nᴀᴍᴇ Gᴇɴᴇᴛᴏʀ</a>
                    </div>
                `;
                observer.disconnect();
            }
        });
    }, { rootMargin: '200px' });
    
    observer.observe(linksDiv);
}

// Index 179 - Lazy Load
if (index === 179) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'style-card';
    linksDiv.style.padding = '20px';
    linksDiv.style.background = '#f5f5f5';
    linksDiv.style.border = '1px solid #ddd';
    linksDiv.style.borderRadius = '10px';
    linksDiv.style.cursor = 'default';
    linksDiv.style.minHeight = '100px';
    linksDiv.innerHTML = `<div style="text-align:center;color:#999;padding:20px;">Loading links...</div>`;
    result.appendChild(linksDiv);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                linksDiv.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <a href="royal-and-vip-names.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">👑 Royal & VIP</a>
                        <a href="social-media-bio-ideas-for-whatsapp-instagram.html" style="color: #333; text-decoration: none; border-bottom: 1px solid #ccc; padding: 8px 0; display: block; font-size: 1.1rem;">💬 Bio Ideas</a>
                    </div>
                `;
                observer.disconnect();
            }
        });
    }, { rootMargin: '200px' });
    
    observer.observe(linksDiv);
}
    });

    // ===== MID SECTION: 70 Random Styles (UNIQUE) =====
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

    // ===== BOTTOM SECTION: 70 Random Styles (UNIQUE) =====
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
        miniGrid.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 1rem;">No suggestions yet</p>';
        suggestionCount.textContent = '0';
        return;
    }
    const shuffled = [...categorySuggestions].sort(() => Math.random() - 0.5);
    const displaySuggestions = shuffled.slice(0, 40);
    currentMiniSuggestions = displaySuggestions;
    let html = '';
    displaySuggestions.forEach((suggestion, index) => {
        const escapedSuggestion = suggestion.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        html += `
            <div class="suggestion-mini-card">
                <span class="suggestion-mini-text" title="${suggestion}">${suggestion}</span>
                <button class="suggestion-mini-copy" onclick="copyText('${escapedSuggestion}')" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `;
      if (index === 19) {
    html += `
        <div style="grid-column: 1 / -1; margin: 15px 0; text-align: center;">
            <img src="https://jayan-9.github.io/ego.github.io/stylish.webp" 
                 alt="Stylish Design"
                 loading="lazy"
                 width="800"
                 height="400"
                 style="max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #e0e0e0;">
        </div>
    `;
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

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);
    const toggle = document.getElementById('themeToggle');
    const status = document.getElementById('themeStatus');
    if (toggle) toggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.pageYOffset > 300), { passive: true });
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
        const escapedStyle = style.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        html += `<div class="top3-card" onclick="copyText('${escapedStyle}')" title="Click to copy">${style}</div>`;
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
    document.getElementById('menuToggle')?.addEventListener('click', function(e) {
    e.preventDefault();
    toggleSidebar();
});
    document.getElementById('closeSidebar')?.addEventListener('click', closeSidebar);
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('noteText')?.addEventListener('input', updateNoteCount);
    document.getElementById('nameInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') generateStyles(); });

    let autoGenerateTimer;
document.getElementById('nameInput').addEventListener('input', function() {
    clearTimeout(autoGenerateTimer);
    autoGenerateTimer = setTimeout(() => {
        requestAnimationFrame(() => {
            generateStyles();
        });
    }, 600);
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
