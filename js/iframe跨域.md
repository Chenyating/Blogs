页面

```html
<div class="finereport-opt">收到iframe的信息是:{{ backTxt }}</div>
<div>
  发送iframe信息<input v-model="msg" />
  <button @click="sendMessageToIframe(msg)">发送</button>
</div>
<iframe
  id="if1"
  frameborder="no"
  src="http://10.200.0.58:7777/demo.html"
></iframe>
```

```js
  mounted() {
    var that = this
    window.addEventListener('message', receiveMsgFromIframe)
    function receiveMsgFromIframe(event) {
      const message = event.data
      console
      that.backTxt = message
    }
  },
   sendMessageToIframe(
      msg,
      iframeId = 'if1',
      origin = 'http://10.200.0.58:4567'
    ) {
      const iframe = document.getElementById(iframeId).contentWindow
      iframe.postMessage(msg, origin)
    },
```

iframe接收信息并调用方法
```js
(function (win) {
  var ifr = win.parent
  var cb = function (msg) {
    var info = msg.split('---')//页面传递给iframe的信息，分割线为---
    var config = JSON.parse(info[0]);
    var method = info[1];
    console.log(config,"_____")
    sendMessage('执行成功')
    eval(method);
  }
  var sendMessage = function (data) {
    if (win.postMessage) {
      ifr.postMessage(data, 'http://10.200.0.58:7001')
    } 
  }
  var eventListener = win.addEventListener ? 'addEventListener' : 'attachEvent'
  win[eventListener](
    'message',
    function (e) {
      cb.call(win, e.data)
    },
    false
  )
  win.sendMessage = sendMessage
})(window)

```