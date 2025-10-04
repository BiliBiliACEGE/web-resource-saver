// 多语言资源文件
window.i18nResources = window.i18nResources ||{
  zh: {
    extension_name: "网页资源下载器",
    items: "条",
    search_placeholder: "搜索文件名…",
    select_all: "全选",
    invert_selection: "反选",
    copy_links: "复制链接",
    download: "打包下载",
    settings: "设置",
    filtered:"已过滤",
    close: "关闭",
    loading:"加载中…",
    no_content:"无内容",
    size_unknown:"未知大小",
    select_resources_first:"请先选择资源",
    copy_success:"复制成功！",
    links_copied:"条链接已复制到剪贴板",
    appearance: "外观",
    dark_mode: "深色模式跟随系统",
    download_options: "下载",
    folder_structure: "按文件结构保存",
    folder_structure_desc: "自动分到 img/ css/ js/ 等文件夹",
    keep_original_path: '保留原始路径',
    keep_original_path_desc: '压缩包内按网页原路径保存，不再强制 img/ css/ 等文件夹',
    head_request: "HEAD 请求补全大小",
    head_request_desc: "对 0 B 资源尝试 HEAD 获取长度",
    skip_error: "跳过 403/404 资源",
    skip_error_desc: "下载时自动忽略已失效链接",
    include_html: "打包时包含主 HTML",
    include_html_desc: "保存当前页面 DOM 快照",
    replace_path: "自动替换资源路径",
    replace_path_desc: "让 index.html 本地可直接打开",
    keep_query: "保留 URL 查询参数",
    keep_query_desc: "文件名附带 ?v=xxx 等标记",
    language: "语言 / Language",
    configuration: "配置",
    fetch_failed: "抓取失败: ",
    export_config: "导出配置",
    import_config: "导入配置",
    reset_defaults: "恢复默认",
    save_and_close: "保存并关闭",
    lang_zh: '中文',
    lang_en: 'English',
    import_success: '配置已导入',
    import_error: '文件格式错误',
    description2:"打开资源下载器",
    description:"网页资源下载器让你一键保存整个网页（含所有静态资源）为离线 ZIP 包，本地双击即可重新打开，无需联网。支持 Chrome / Edge 内核浏览器，Manifest V3，无后台脚本，零隐私收集。主要功能：自动嗅探 - 基于 Performance API 抓取页面加载的全部资源：HTML、CSS、JS、图片、字体、音视频、XHR/Fetch 等。智能补全 - 对体积为 0 的文件自动发起 HEAD 请求，补全真实大小。分类 & 筛选 - 按 img/css/js/font/video/audio/other 自动分组；支持关键词实时过滤。离线可用 - 可选「包含主 HTML」并自动将资源路径替换为相对地址，解压后双击 index.html 即可完整还原页面（游戏、文档、教程一键离线）。批量操作 - 全选 / 反选 / 复制链接 / 打包下载，进度条实时显示。高级选项 - 保留 URL 查询参数、跳过 403/404、深色模式、多语言（中英）一键切换。配置导入/导出 - 设置可导出为 JSON，换电脑一键还原。权限说明 - activeTab：仅读取当前标签页资源列表。scripting：注入 Performance 查询代码。storage：保存用户设置与语言偏好。不收集任何个人数据，不上传任何信息。常见问题：Q: 动态渲染的页面能保存吗？A: 会抓取「最终 DOM 快照」及当时已加载的资源；后续 JS 再拉取的数据需手动二次保存。Q: 为什么部分资源下载失败？A: 跨域或服务器禁止 HEAD 时会出现 403，可在设置里开启「跳过错误」自动忽略。Q: 是否支持 Firefox？A: 不会。更新日志：1.0.0 首次发布，支持 Manifest V3、多语言、离线 ZIP 重构。"
  },
  en: {
    extension_name: "Web Resource Downloader",
    items: "items",
    search_placeholder: "Search filename...",
    select_all: "Select All",
    invert_selection: "Invert",
    copy_links: "Copy Links",
    download: "Download",
    settings: "Settings",
    filtered:"Filtered",
    close: "Close",
    loading:"Loading...",
    no_content:"No Content",
    size_unknown:"Size Unknown",
    select_resources_first:"Please select resources first",
    copy_success:"Copied!",
    links_copied:" links copied to clipboard",
    description2:"Open Web Resource Downloader",
    appearance: "Appearance",
    dark_mode: "Dark mode follows system",
    download_options: "Download",
    folder_structure: "Save with folder structure",
    folder_structure_desc: "Automatically sort into img/ css/ js/ etc. folders",
    keep_original_path: 'Keep original path',
    keep_original_path_desc: 'Save files with original URL path inside ZIP instead of img/ css/ folders',
    head_request: "Use HEAD request for size",
    head_request_desc: "Try HEAD request to get length for 0 B resources",
    skip_error: "Skip 403/404 resources",
    skip_error_desc: "Automatically ignore invalid links during download",
    include_html: "Include main HTML in package",
    include_html_desc: "Save current page DOM snapshot",
    replace_path: "Auto-replace resource paths",
    replace_path_desc: "Make index.html work locally",
    keep_query: "Keep URL query parameters",
    keep_query_desc: "Filename with ?v=xxx and other markers",
    language: "Language / 语言",
    configuration: "Configuration",
    fetch_failed: "Fetch failed: ",
    export_config: "Export Config",
    import_config: "Import Config",
    reset_defaults: "Reset to Defaults",
    save_and_close: "Save and Close",
    lang_zh: '中文',
    lang_en: 'English',
    import_success: 'Config imported',
    import_error: 'Invalid file format',
    description:"The Web Resource Downloader allows you to save an entire webpage (including all static resources) as an offline ZIP package with one click. You can reopen it locally with a double click, without needing an internet connection. It supports Chrome/Edge-based browsers, Manifest V3, no background scripts, and zero privacy collection. Main features: Automatic Detection - Captures all resources loaded on the page (HTML, CSS, JS, images, fonts, audio/video, XHR/Fetch, etc.) based on the Performance API. Smart Completion - Automatically sends HEAD requests for files with a size of 0 to fetch the actual file size. Categorization & Filtering - Automatically groups by img/css/js/font/video/audio/other; supports real-time keyword filtering. Offline Availability - Option to Include main HTML and automatically replace resource paths with relative paths, allowing a complete page restoration by double-clicking index.html after extraction (games, documents, and tutorials offline with one click). Batch Operations - Select all / deselect all / copy links / download as package, with real-time progress display. Advanced Options - Retain URL query parameters, skip 403/404 errors, dark mode, one-click language switch between Chinese and English. Import/Export Configuration - Settings can be exported as JSON and restored on another computer with one click. Permissions Explanation - activeTab: only reads the resource list of the current tab. scripting: injects Performance query code. storage: saves user settings and language preferences. No personal data is collected, no information is uploaded. FAQs: Q: Can dynamically rendered pages be saved? A: It captures the final DOM snapshot and the resources loaded at that time; data fetched later by JS must be saved manually again. Q: Why do some resources fail to download? A: 403 errors may occur due to cross-origin issues or when the server blocks HEAD requests; you can enable skip errorsin the settings to ignore them automatically. Q: Is Firefox supported? A: No. Changelog: 1.0.0 Initial release, supports Manifest V3, multi-language, and offline ZIP restructuring."
  }
};

// 获取当前语言
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'zh';
}

// 设置当前语言
function setCurrentLanguage(lang) {
  localStorage.setItem('language', lang);
}

// 翻译函数
function t(key) {
  const lang = getCurrentLanguage();
  return i18nResources[lang] && i18nResources[lang][key] ? i18nResources[lang][key] : key;
}

// 应用翻译到页面
function applyTranslations() {
  // 翻译带 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });

  // 翻译带 data-i18n-placeholder 属性的元素
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key);
  });

  // 翻译带 data-i18n-title 属性的元素
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    element.title = t(key);
  });

  // ✅ 手动翻译 <title>
  const titleElement = document.querySelector('title');
  if (titleElement && titleElement.hasAttribute('data-i18n')) {
    const key = titleElement.getAttribute('data-i18n');
    document.title = t(key);
  }
}