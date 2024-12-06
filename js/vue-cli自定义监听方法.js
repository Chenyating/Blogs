// custom-build-watch.js  
const fs = require('fs');  
const { exec } = require('child_process');  
  
const srcDir = 'src'; // 监听的文件目录，可以根据需要修改  
  
function buildProject() {  
  console.log('开始监听项目项目...');  
  exec('vue-cli-service build', (error, stdout, stderr) => {  
    if (error) {  
      console.error('构建出错:', error);  
    } else {  
      console.log('构建完成:', stdout);  
    }  
  });  
}  
buildProject(); // 触发构建  

fs.watch(srcDir, { recursive: true }, (eventType, filename) => {  
  if (filename) {  
    console.log(`文件 ${filename} 发生了 ${eventType} 事件`);  
    buildProject(); // 触发构建  
  } else {  
    console.log(`目录 ${srcDir} 发生了 ${eventType} 事件`);  
  }  
});  
  
console.log(`正在监听 ${srcDir} 目录中的文件变化...`);

// 在package那边直接node custom-build-watch.js