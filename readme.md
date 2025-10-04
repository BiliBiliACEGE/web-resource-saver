# 网页资源下载器

![扩展图标](icons/icon.ico)

网页资源下载器是一款基于 Chrome/Edge 浏览器的扩展工具，支持一键保存整个网页及其所有静态资源为离线 ZIP 包，方便用户在本地进行查看和使用。

## 主要功能

- **自动嗅探**：基于 Performance API 抓取页面加载的所有资源，包括 HTML、CSS、JS、图片、字体、音视频、XHR/Fetch 等。
- **智能补全**：对体积为 0 的文件自动发起 HEAD 请求，补全真实大小。
- **分类与筛选**：
  - 按资源类型（如 img/css/js/font/video/audio/other）自动分组。
  - 支持关键词实时过滤资源。
- **离线可用**：
  - 可选「包含主 HTML」并自动将资源路径替换为相对地址。
  - 解压后双击 `index.html` 即可完整还原页面（适用于游戏、文档、教程等场景）。
- **批量操作**：
  - 全选 / 反选 / 复制链接 / 打包下载。
  - 进度条实时显示下载进度。
- **高级选项**：
  - 保留 URL 查询参数。
  - 跳过 403/404 错误。
  - 深色模式。
  - 多语言（中英）一键切换。
- **配置导入/导出**：
  - 设置可导出为 JSON 文件，换电脑后一键还原。
- **权限说明**：
  - `activeTab`：仅读取当前标签页资源列表。
  - `scripting`：注入 Performance 查询代码。
  - `storage`：保存用户设置与语言偏好。
  - 不收集任何个人数据，不上传任何信息。


## 安装

您可以通过以下方式安装此扩展：

- **Microsoft Edge 扩展商店**：
  访问 [Edge 扩展商店页面](https://microsoftedge.microsoft.com/addons/detail/%E7%BD%91%E9%A1%B5%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD%E5%99%A8/bljhfflkkljmpffnakllnbkoihnbmcfl) 下载并安装扩展。

> 如果您使用的是其他 Chromium 内核浏览器（如 Chrome），也可以通过加载未打包的扩展程序进行安装。

## 常见问题

### Q: 动态渲染的页面能保存吗？
A: 会抓取「最终 DOM 快照」及当时已加载的资源；后续 JS 再拉取的数据需手动二次保存。

### Q: 为什么部分资源下载失败？
A: 跨域或服务器禁止 HEAD 请求时会出现 403 错误，可在设置里开启「跳过错误」自动忽略。

### Q: 是否会支持 Firefox？
A: 不会

## 更新日志

- **1.0.0**：
  - 首次发布，支持 Manifest V3、多语言、离线 ZIP 重构。
-  **1.0.1**:
  - 新增开发人员工具界面入口


## 联系我们

- 邮箱：BiliBiliACEGE-Github@outlook.com
- GitHub：[github.com/BiliBiliACEGE/web-resource-saver](https://github.com/BiliBiliACEGE/web-resource-saver)
