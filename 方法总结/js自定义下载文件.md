# js自定义下载文件
  
```js
    createAndDownloadFile(fileName, content) {
      var aTag = document.createElement('a');
      var blob = new Blob([content]);
      aTag.download = fileName;
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(blob);
  }
    createAndDownloadFile('token.css','hello world')
```