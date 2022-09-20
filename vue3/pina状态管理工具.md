# pina 状态管理工具

创建：demo.js
```js
import { defineStore } from 'pinia';

export const useDemoState = defineStore('demoState', {
  state: ()=> ({
   num:0
    },
    ),

  actions: {
    addNum() {
      this.num=this.num++;
    },
  },
});

```

使用
```js
import { useDemoState } from './demo.js';
const storeDemo = useDemoState();
console.log(storeDemo.num);//0
storeDemo.addNum();//这个时候就成功改变num了。
```