/* ===== ANIME PAGE SCRIPT ===== */

// ---------- State ----------
let animeFavorites = [];
let animeLoaded = { 1: false, 2: false, 3: false };
let animeUserGenerated = false;

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    setupSidebar();
    setupNotes();
    setupInput();
    setupModals();
    lazyLoadSections();
});

// ---------- Lazy Load Sections via IntersectionObserver ----------
function lazyLoadSections() {
    if (!('IntersectionObserver' in window)) {
        // Fallback — load all immediately
        [1, 2, 3].forEach(loadSection);
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const n = parseInt(entry.target.dataset.section, 10);
                if (!animeLoaded[n]) {
                    loadSection(n);
                    animeLoaded[n] = true;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px' });

    document.querySelectorAll('.anime-section').forEach(sec => observer.observe(sec));
}

// ---------- Load Section (Render Examples) ----------
function loadSection(n) {
    const grid = document.getElementById('animeGrid' + n);
    if (!grid) return;

    // Split examples into 3 groups of ~equal size
    const total = animeExamples.length;
    const perSection = Math.ceil(total / 3);
    const start = (n - 1) * perSection;
    const end = Math.min(start + perSection, total);
    const slice = animeExamples.slice(start, end);

    // Sort: favorites first
    const sorted = [...slice].sort((a, b) => {
        const aFav = animeFavorites.includes(a);
        const bFav = animeFavorites.includes(b);
        return bFav - aFav;
    });

    // Use DocumentFragment for performance
    const frag = document.createDocumentFragment();
    sorted.forEach(text => frag.appendChild(createCard(text, false)));
    grid.innerHTML = '';
    grid.appendChild(frag);
}

// ---------- Create Card Element ----------
function createCard(text, isGenerated) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.dataset.text = text;

    const isFav = animeFavorites.includes(text);
    if (isFav) card.classList.add('is-fav');

    // Style text (click to copy)
    const textEl = document.createElement('div');
    textEl.className = 'anime-card-text';
    textEl.textContent = text;
    textEl.addEventListener('click', () => copyText(text, textEl));
    card.appendChild(textEl);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'anime-card-actions';

    // Copy
    const copyBtn = document.createElement('button');
    copyBtn.className = 'ac-btn ac-copy';
    copyBtn.title = 'Copy';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyText(text, copyBtn);
    });
    actions.appendChild(copyBtn);

    // Share
    const shareBtn = document.createElement('button');
    shareBtn.className = 'ac-btn ac-share';
    shareBtn.title = 'Share';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shareText(text);
    });
    actions.appendChild(shareBtn);

    // Favorite
    const favBtn = document.createElement('button');
    favBtn.className = 'ac-btn ac-fav' + (isFav ? ' is-fav' : '');
    favBtn.title = 'Favorite';
    favBtn.innerHTML = isFav
        ? '<i class="fas fa-heart"></i>'
        : '<i class="far fa-heart"></i>';
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(text, favBtn, card);
    });
    actions.appendChild(favBtn);

    card.appendChild(actions);
    return card;
}

// ---------- Copy ----------
function copyText(text, btn) {
    const done = () => {
        showToast('📋 Copied!');
        if (btn && btn.innerHTML) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { btn.innerHTML = orig; }, 1200);
        }
    };
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); }
    catch (e) { showToast('❌ Copy failed'); }
    document.body.removeChild(ta);
}

// ---------- Share (Web Share API) ----------
function shareText(text) {
    const shareData = {
        title: 'Anime Stylish Name',
        text: text,
        url: 'https://stylename.in/anime.html'
    };
    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        // Fallback — copy text + URL
        const combined = text + ' — https://stylename.in/anime.html';
        fallbackCopy(combined, () => showToast('🔗 Link copied!'));
    }
}

// ---------- Favorites ----------
function loadFavorites() {
    try {
        const saved = localStorage.getItem('animeFavorites');
        animeFavorites = saved ? JSON.parse(saved) : [];
    } catch (e) {
        animeFavorites = [];
    }
}

function saveFavorites() {
    try { localStorage.setItem('animeFavorites', JSON.stringify(animeFavorites)); }
    catch (e) {}
}

function toggleFavorite(text, btn, card) {
    const idx = animeFavorites.indexOf(text);
    if (idx === -1) {
        animeFavorites.push(text);
        btn.classList.add('is-fav');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        card.classList.add('is-fav');
        showToast('❤️ Added to favorites');
    } else {
        animeFavorites.splice(idx, 1);
        btn.classList.remove('is-fav');
        btn.innerHTML = '<i class="far fa-heart"></i>';
        card.classList.remove('is-fav');
        showToast('💔 Removed');
    }
    saveFavorites();

    // Re-sort: favorites move to top in current section
    const grid = card.parentElement;
    if (grid) {
        const cards = Array.from(grid.children);
        cards.sort((a, b) => {
            const aF = a.classList.contains('is-fav') ? 1 : 0;
            const bF = b.classList.contains('is-fav') ? 1 : 0;
            return bF - aF;
        });
        const frag = document.createDocumentFragment();
        cards.forEach(c => frag.appendChild(c));
        grid.appendChild(frag);
    }
}

// ---------- Input / Generate ----------
function setupInput() {
    const input = document.getElementById('animeInput');
    const btn = document.getElementById('generateBtn');
    if (!input || !btn) return;

    btn.addEventListener('click', doGenerate);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doGenerate();
    });

    // Live: if input cleared → show examples again
    let t;
    input.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
            const val = input.value.trim();
            if (!val && animeUserGenerated) {
                animeUserGenerated = false;
                [1, 2, 3].forEach(loadSection);
            }
        }, 400);
    });
}

function doGenerate() {
    const input = document.getElementById('animeInput');
    if (!input) return;
    const name = input.value.trim();
    if (!name) { showToast('✏️ Enter a name first'); return; }

    const grids = [1, 2, 3].map(i => document.getElementById('animeGrid' + i));
    if (!grids[0]) return;

    // Generate styles
    const generated = generateAnimeStylesFor(name);
    animeUserGenerated = true;

    // Clear all sections
    grids.forEach(g => { if (g) g.innerHTML = ''; });

    // Split into 3 sections (25 each ideal, but distribute evenly)
    const total = generated.length;
    const perSection = Math.ceil(total / 3);

    for (let i = 1; i <= 3; i++) {
        const grid = grids[i - 1];
        if (!grid) continue;
        const start = (i - 1) * perSection;
        const end = Math.min(start + perSection, total);
        const slice = generated.slice(start, end);

        const frag = document.createDocumentFragment();
        slice.forEach(text => frag.appendChild(createCard(text, true)));
        grid.appendChild(frag);
    }

    showToast('✨ ' + total + ' styles generated!');
}

// ---------- Generate Styles Logic ----------
function generateAnimeStylesFor(name) {
    const results = [];
    const styles = (typeof animeStyles !== 'undefined') ? animeStyles : [];

    styles.forEach(style => {
        const styled = style.prefix + convertName(name, style.map) + style.suffix;
        results.push(styled);
    });

    return results;
}

function convertName(name, map) {
    let out = '';
    for (let i = 0; i < name.length; i++) {
        const ch = name[i];
        let mapped;
        if (map[ch] !== undefined) mapped = map[ch];
        else if (map[ch.toLowerCase()] !== undefined) mapped = map[ch.toLowerCase()];
        else mapped = ch;
        out += mapped;
    }
    return out;
}

// ---------- Sidebar ----------
function setupSidebar() {
    const toggle = document.getElementById('menuToggle');
    const close = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    if (toggle && sidebar) toggle.addEventListener('click', () => sidebar.classList.add('open'));
    if (close && sidebar) close.addEventListener('click', () => sidebar.classList.remove('open'));

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

// ---------- Notes ----------
function setupNotes() {
    const noteSection = document.getElementById('noteSection');
    const editor = document.getElementById('noteEditor');
    const text = document.getElementById('noteText');
    if (!noteSection || !editor || !text) return;

    noteSection.addEventListener('click', (e) => {
        // Don't open if clicking badge
        if (e.target.classList.contains('note-badge')) return;
        editor.classList.toggle('show');
        editor.style.display = editor.style.display === 'block' ? 'none' : 'block';
    });

    // Load saved note
    const saved = localStorage.getItem('animeNotes');
    if (saved) { text.value = saved; updateNoteCount(); }

    text.addEventListener('input', updateNoteCount);
}

function updateNoteCount() {
    const text = document.getElementById('noteText');
    const count = document.getElementById('noteCount');
    if (!text || !count) return;
    const words = text.value.trim().split(/\s+/).filter(w => w.length > 0);
    count.textContent = words.length + '/100';
}

function saveNote() {
    const text = document.getElementById('noteText');
    if (!text) return;
    localStorage.setItem('animeNotes', text.value);
    showToast('💾 Note saved');
}

function clearNote() {
    const text = document.getElementById('noteText');
    if (!text) return;
    text.value = '';
    updateNoteCount();
    localStorage.removeItem('animeNotes');
    showToast('🗑️ Cleared');
}

// ---------- Modal ----------
function setupModals() {
    const modal = document.getElementById('howToUseModal');
    if (!modal) return;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeHowToUse();
    });
}

function showHowToUse() {
    const m = document.getElementById('howToUseModal');
    if (m) m.classList.add('show');
    document.getElementById('sidebar')?.classList.remove('open');
}

function closeHowToUse() {
    document.getElementById('howToUseModal')?.classList.remove('show');
}

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}
