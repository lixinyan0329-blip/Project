<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="messages">

        <!-- 消息将在这里动态添加 -->
        <div class="message me">
          <p>你好我是小飞。请问有什么我可以帮您解决的问题吗？</p>
        </div>

      </div>
    </div>
    <div class="input-container">
      <input type="text" id="messageInput" v-model="questionText"   @keyup.enter="sendMsg()" placeholder="请输入你的问题">
      <button @click="sendMsg()" id="btn">发送</button>
    </div>


  </div>
</template>

<script>
import * as CryptoJs from "crypto-js";//鉴权的引用地址
import { Base64 } from 'js-base64'
export default {
  data() {
    return {
      messageStyle: {
        backgroundColor: '#dcf8c6',
        float: 'left',
        clear: 'both'
      },
      questionText: '',
      resultText: '',
      requestObj: {
        APPID: '0450e282',
        APISecret: 'N2M3OWUxMzRhNzA1Y2JjZmY4OTJmZjY4',
        APIKey: '33d50a9cc0eba1fc808c7f527d614dbf',
        Uid: 'redrun',
        sparkResult: '在线助手：'
      },
      // 假设你有一个方法来获取WebSocket的URL  
      websocketUrl: ''
    };
  },
  methods: {
    async getWebsocketUrl() {
      let url = "wss://spark-api.xf-yun.com/v3.5/chat";
      let host = "spark-api.xf-yun.com";
      let apiKeyName = "api_key";
      let date = new Date().toGMTString();
      let algorithm = "hmac-sha256"
      let headers = "host date request-line";
      let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`;
      let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, this.requestObj.APISecret);
      let signature = CryptoJs.enc.Base64.stringify(signatureSha);

      let authorizationOrigin = `${apiKeyName}="${this.requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

      let authorization = Base64.encode(authorizationOrigin);

      // 将空格编码
      url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

      // 正确解析Promise
      return url
    },
    async sendMsg() {
      try {
        this.websocketUrl = await this.getWebsocketUrl();
        const socket = new WebSocket(this.websocketUrl );
        const inputVal = this.questionText;
        socket.onopen = (event) => {
          console.log('开启连接！！', event);
          // 这里是发送消息到WebSocket服务器的逻辑  
          // 注意：WebSocket的API是onopen而不是addEventListener('open', ...) 
          let params = {
            "header": {
              "app_id": this.requestObj.APPID,
              "uid": "redrun"
            },
            "parameter": {
              "chat": {
                "domain": "generalv3.5",
                "temperature": 0.5,
                "max_tokens": 1024,

              },
            },
            // "system":{
            // "background":"你是幸福家家政服务平台的在线助手，帮助用户解决关于平台的问题"                
            // },
            "payload": {
              "message": {
                // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
                // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
                "text": [
                  { "role": "system", "content": "你现是小飞，接下来请用平台助手的口吻和用户对话，帮助用户解决关于平台的问题" }, //# 用户的历史问题
                  { "role": "user", "content": "你是谁" },
                  { "role": "assistant", "content": "我是小飞" }, //# 用户的历史问题
                  { "role": "user", "content": "你能做什么" },
                  { "role": "assistant", "content": "我是你的学习助手。如果您有任何关于学习的问题或需要协助，请随时告诉我，我会尽力为您提供支持和解决方案。" },
                  { "role": "user", "content": "推荐几个书目" },
                  { "role": "assistant", "content": "小飞根据您的专业为您推荐《几何学》笛卡尔，《什么是数学》理查德·柯朗，《分析教程》柯西" },
                  { "role": "user", "content": "推荐几个课程" },
                  { "role": "assistant", "content": "小飞根据您的专业为您推荐《高等数学》朱士信，《离散数学》王丽杰" },//# 用户的历史问题
                  { "role": "user", "content": inputVal },  //# 最新的一条问题，如无需上下文，可只传最新一条问题
                ]
              }
            }
          };
          socket.send(JSON.stringify(params))
          this.createmeDiv()
          //
          //   // 假设你有一个方法来格式化消息并发送
          //   this.sendMessageToServer(socket, inputVal);
        };

        socket.onmessage = (event) => {
          console.log('接收信息！！', event.data);
          let data = JSON.parse(event.data)
          // console.log('收到消息！！',data);
          console.log("content收到",data.payload.choices.text[0].content)
          this.requestObj.sparkResult += data.payload.choices.text[0].content

          if (data.header.code !== 0) {
            console.log("出错了", data.header.code, ":", data.header.message);
            // 出错了"手动关闭连接"
            socket.close()
          }
          if (data.header.code === 0) {
            console.log('对话完成！！', event);

            // 对话已经完成
            if (data.payload.choices.text && data.header.status === 2) {
              if( !this.requestObj.sparkResult.endsWith(data.payload.choices.text[0].content)){
                console.log("content完成",data.payload.choices.text[0].content)
                this.requestObj.sparkResult += data.payload.choices.text[0].content;
                setTimeout(() => {
                  // "对话完成，手动关闭连接"
                  socket.close()
                }, 1000)
              }

            }
          }
          // addMsgToTextarea(requestObj.sparkResult);
          // 接收服务器响应并处理  

        };

        socket.onerror = (error) => {
          console.error('错误信息 ', error);
        };

        socket.onclose = (event) => {
          console.log('关闭连接！！', event);
          this.createyouDiv()
          // 对话完成后socket会关闭，将聊天记录换行处理

          this.requestObj.sparkResult = this.requestObj.sparkResult +'\n';
          // +"\n";
          // // 清空输入框
          this.questionText = ''
          // console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);

        };
        this.requestObj.sparkResult=""
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    },
    createmeDiv(){

      // 获取输入框的值
      var messageText =this.questionText;
      const newDiv = {
        class:'message me',
        // content: messageText,
        style: {
          color: '#ffffff',
          fontSize: '10px',
          backgroundColor: '#bbbec4',
          // background-color: #dcf8c6;
          float: 'left',
          clear: 'both'
        }
      };
      // 检查是否有内容输入
      if (messageText.trim() !== '') {
        // 创建一个新的消息div元素
        var messageDiv = document.createElement('div');
        messageDiv.classList.add("message","me")
        // 创建一个包含消息的p元素
        var messageP = document.createElement('p');
        messageP.textContent = messageText; // 设置文本内容
        messageP.setAttribute('readonly', 'readonly'); // 虽然p元素默认就是只读的，但这里明确设置一下    
        messageDiv.setAttribute('style',
            '   margin-bottom: 10px;  padding: 5px 10px; border-radius: 5px; max-width: 80%;word-wrap: break-word; background-color: #add8e6;float: right;clear: both; ');

        // 将p元素添加到div元素中
        messageDiv.appendChild(messageP);
        // 将新的消息div元素添加到消息容器中
        var messagesContainer = document.querySelector('.messages');
        messagesContainer.appendChild(messageDiv);

        // 滚动到最新消息（可选）
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    },
    createyouDiv(){

      // 获取输入框的值
      var messageText = this.requestObj.sparkResult;
      if (messageText.trim() !== '') {
        console.log("message",messageText)
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('message','you');
        // 这里我们假设总是添加 'me' 类，你可能需要根据实际情况进行判断
        // messageDiv.classList.add();
        // 创建一个包含消息的p元素
        var messageP = document.createElement('p');
        messageP.textContent = messageText; // 设置文本内容
        messageP.setAttribute('readonly', 'readonly'); // 虽然p元素默认就是只读的，但这里明确设置一下
        messageDiv.setAttribute('style',
            '   margin-bottom: 10px;   padding: 5px 10px; border-radius: 5px; max-width: 80%; word-wrap: break-word;   background-color:#ccc;float: left; clear: both ; ');

        // 将p元素添加到div元素中
        messageDiv.appendChild(messageP);
        // appendChild()
        // 将新的消息div元素添加到消息容器中
        var messagesContainer = document.querySelector('.messages');
        messagesContainer.appendChild(messageDiv);

        // 滚动到最新消息（可选）
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }}
  },

};
</script>


<style scoped>
.chat-container {
  border-radius: 30px;
  width: 40vw;
  height: 800px;
  border: 1px solid #ccc;
  overflow-y: auto;
  margin-bottom: -30px;
  padding: 5px;
  font-family: Arial, sans-serif;
}

.chat-window {
  height: 70vh;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  overflow-y: auto;
}

.messages {
  padding: 10px;
}

.message {
  color: #10111c;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 80%;
  word-wrap: break-word;
}

.message.me {
  background-color:#ccc;
  float: left;
  clear: both;
}

.message.you {
  background-color:#10111c;
  float: right;
  clear: both;
}

.input-container {
  margin-top: 10px;
  left: 15px;
}

#messageInput {
  width: 70%;
  padding: 8px;
  margin-right: 1%;
  margin-left: 10%;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  width: 80px;
  margin-left: 5px;
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  background-color: #9ea2b2;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #10111c;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1 {
  text-align: center;
  color: #10111c;
}

.results {
  width: 100%;
  height: 80%;
  background-color: #E2EEFF;
}
.result {
  width: 100%;
  height: 100%;
  padding: 10%;
  background-color: #E2EEFF;
  white-space: pre-line;
  resize: none; /* 防止用户调整textarea大小 */
}
.send-val {
  display: flex;
  width: 100%;
  height: 20%;
}
.send-val #question {
  width: 70%;
  height: 100%;
  padding: 5%;
  border: 2px dotted blue;
}
.send-val #btn {
  width: 40%;
  height: 100%;
  background-color: #5D7CFF;
  color: white; /* 添加按钮文字颜色 */
  border: none; /* 移除按钮边框 */
  cursor: pointer; /* 添加鼠标悬停效果 */
}
</style>

