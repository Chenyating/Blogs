# script标签

立即加载并执行相应的脚本,会阻塞后续文档的加载；

## defer脚本
在执行时不会影响页面的构造，到遇到defer时，会告诉浏览器立即下载，延迟执行；
- 延迟执行，延迟到浏览器遇到</html>标签后在执行；
- 不一定会按顺序执行；
- 适用外部脚本文件；

## async异步脚本；
- 页面不会等待脚本下载和执行，从而停止加载其他页面内容；
- 遇到async时，立即下载，
- 会在页面load事件前执行；
- 不一定按照顺序执行；
- 适用外部脚本文件；

一张图片一目了然；
![在这里插入图片描述](https://github.com/Chenyating/Blogs/blob/master/img/defer%E5%BB%B6%E8%BF%9F%E5%8A%A0%E8%BD%BD-%E8%A7%A3%E6%9E%90%E5%88%B0html%E7%BB%93%E6%9D%9F%E5%90%8E%E5%86%8D%E6%89%A7%E8%A1%8C%E5%92%8Casync%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD-%E4%B8%8B%E8%BD%BD%E5%AE%8C%E5%B0%B1%E6%89%A7%E8%A1%8C.png)