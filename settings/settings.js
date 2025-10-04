(function () {
const LANG_KEY = 'language';
function getLang()  { return localStorage.getItem(LANG_KEY) || 'zh'; }
function setLang(l) { localStorage.setItem(LANG_KEY, l); }
const t = (key) => {
  const lang = getLang();
  return i18nResources[lang]?.[key] || key;
};
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
}

const defaultItems = {
  dark: true, folder: true, head: true, skipError: true,
  includeHtml: true, replacePath: true, keepQuery: false,
  keepOriginalPath: false,
  language: 'zh'
};
const $ = id => document.getElementById(id);

chrome.storage.sync.get(defaultItems, items => {
  applyI18n();
  const langSel = $('language');
  langSel.value = items.language || 'zh';
  langSel.onchange = () => {
    const l = langSel.value;
    setLang(l); chrome.storage.sync.set({ language: l });
    parent.postMessage('languageChanged','*');
    location.reload();
  };
  Object.keys(defaultItems).forEach(k => {
    const el = $(k);
    if (el) el.checked = items[k];
  });
});

Object.keys(defaultItems).forEach(k => {
  const el = $(k);
  if (el) el.onchange = () => {
    chrome.storage.sync.set({ [k]: el.checked }, () => {
      // 广播：配置已变
      chrome.runtime.sendMessage({ action: 'cfgChanged' });
    });
  };
});

$('close').onclick = $('save').onclick = () => parent.postMessage('closeSet','*');

$('exportCfg').onclick = () => {
  chrome.storage.sync.get(defaultItems, items => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    saveAs(blob, 'res-save-config.json');
  });
};
$('importCfg').onclick = () => {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const cfg = JSON.parse(reader.result);
        const filtered = {};
        Object.keys(defaultItems).forEach(k => { if (typeof cfg[k] === 'boolean') filtered[k] = cfg[k]; });
        chrome.storage.sync.set(filtered, () => {
          Object.keys(filtered).forEach(k => { const el = $(k); if (el) el.checked = filtered[k]; });
          alert(t('import_success'));
          chrome.runtime.sendMessage({ action: 'cfgChanged' }); // 通知
        });
      } catch { alert(t('import_error')); }
    };
    reader.readAsText(file);
  };
  input.click();
};
$('reset').onclick = () => {
  chrome.storage.sync.set(defaultItems, () => {
    Object.keys(defaultItems).forEach(k => { const el = $(k); if (el) el.checked = defaultItems[k]; });
    location.reload();
    chrome.runtime.sendMessage({ action: 'cfgChanged' });
  });
};
})();