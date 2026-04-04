// 图册核心配置文件 - 优化版
window.bookConfig = {
  // 测试PDF地址（可替换成你的智能锁图册PDF）
  bookUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  // 图册标题
  title: "鑫质信智能锁图册",
  // PDF渲染模式：text（文字）/canvas（图片，更清晰）
  renderMode: "canvas",
  // 适配手机的缩放比例
  scale: 1.2
};

// 辅助函数：初始化图册显示
window.initBook = function() {
  // 加载PDF.js并渲染
  pdfjsLib.getDocument(window.bookConfig.bookUrl).promise.then(function(pdf) {
    var container = document.getElementById('container');
    // 添加标题
    var title = document.createElement('div');
    title.className = 'title';
    title.innerText = window.bookConfig.title;
    container.appendChild(title);
    
    // 渲染每一页
    for (var i = 1; i <= pdf.numPages; i++) {
      pdf.getPage(i).then(function(page) {
        var pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page';
        container.appendChild(pageDiv);
        
        var viewport = page.getViewport({scale: window.bookConfig.scale});
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        pageDiv.appendChild(canvas);
        
        // 渲染PDF内容到画布（图片模式，更清晰）
        page.render({
          canvasContext: ctx,
          viewport: viewport
        });
      });
    }
    // 隐藏加载动画
    document.getElementById('loading').style.display = 'none';
  });
};

// 页面加载完成后初始化
window.onload = function() {
  window.initBook();
};
