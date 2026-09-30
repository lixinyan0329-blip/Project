<template>
  <div>
    <div>
      <HeaderVoice></HeaderVoice>
    </div>
    <button @click="startRecording">
      {{ btnText }}
    </button>
    <br />
    实时识别结果：{{ resultText }}
  </div>
</template>

<script>
import CryptoJS from '/src/voice-utils/utilJS/crypto-js.js';
import HeaderVoice from "@/components/HeaderVoice.vue"; //鉴权的引用地址

export default {
  components: {HeaderVoice},
  data() {
    return {
      btnText: "开始录音",
      btnStatus: "UNDEFINED", // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"
      recorder: new RecorderManager('../voice-utils/dist/index.d.ts'),
      APPID: "0450e282", // TODO 你的讯飞模型APPID
      API_SECRET: "N2M3OWUxMzRhNzA1Y2JjZmY4OTJmZjY4", // TODO 你的讯飞模型API_SECRET
      API_KEY: "33d50a9cc0eba1fc808c7f527d614dbf", // TODO 你的讯飞模型API_KEY
      iatWS: null, //监听录音的变量
      resultText: '', // 识别结果
      resultTextTemp: '',
      countdownInterval: null,
    };
  },
  methods: {
    getWebSocketUrl() {
      var url = "wss://iat-api.xfyun.cn/v2/iat";
      var host = "iat-api.xfyun.cn";
      var apiKey = this.API_KEY;
      var apiSecret = this.API_SECRET;
      var date = new Date().toGMTString();
      var algorithm = "hmac-sha256";
      var headers = "host date request-line";
      var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
      var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
      var signature = CryptoJS.enc.Base64.stringify(signatureSha);
      var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
      var authorization = btoa(authorizationOrigin);
      url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
      return url;
    },
    toBase64(buffer) {
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },
    countdown() {
      let seconds = 60;
      this.btnText = `录音中（${seconds}s）`;
      this.countdownInterval = setInterval(() => {
        seconds = seconds - 1;
        if (seconds <= 0) {
          clearInterval(this.countdownInterval);
          this.recorder.stop();
        } else {
          this.btnText = `录音中（${seconds}s）`;
        }
      }, 1000);
    },
    changeStatus(status) {
      this.btnStatus = status;
      if (status === "CONNECTING") {
        this.btnText = "建立连接中";
        this.resultText = '';
        this.resultTextTemp = "";
      } else if (status === "OPEN") {
        this.countdown();
      } else if (status === "CLOSING") {
        this.btnText = "关闭连接中";
      } else if (status === "CLOSED") {
        this.btnText = "开始录音";
      }
    },
    renderResult(resultData) {
      let jsonData = JSON.parse(resultData);
      if (jsonData.data && jsonData.data.result) {
        let data = jsonData.data.result;
        let str = "";
        let ws = data.ws;
        for (let i = 0; i < ws.length; i++) {
          str = str + ws[i].cw[0].w;
        }
        if (data.pgs) {
          if (data.pgs === "apd") {
            this.resultText = this.resultTextTemp;
          }
          this.resultTextTemp = this.resultText + str;
        } else {
          this.resultText = this.resultText + str;
        }
      }
      if (jsonData.code === 0 && jsonData.data.status === 2) {
        this.iatWS.close();
      }
      if (jsonData.code !== 0) {
        this.iatWS.close();
        console.error(jsonData);
      }
    },
    connectWebSocket() {
      const websocketUrl = this.getWebSocketUrl();
      if ("WebSocket" in window) {
        this.iatWS = new WebSocket(websocketUrl);
      } else if ("MozWebSocket" in window) {
        this.iatWS = new MozWebSocket(websocketUrl);
      } else {
        alert("浏览器不支持WebSocket");
        return;
      }
      this.changeStatus("CONNECTING");
      this.iatWS.onopen = (e) => {
        this.recorder.start({
          sampleRate: 16000,
          frameSize: 1280,
        });
        var params = {
          common: {
            app_id: this.APPID,
          },
          business: {
            language: "zh_cn",
            domain: "iat",
            accent: "mandarin",
            vad_eos: 5000,
            dwa: "wpgs",
          },
          data: {
            status: 0,
            format: "audio/L16;rate=16000",
            encoding: "raw",
          },
        };
        this.iatWS.send(JSON.stringify(params));
      };
      this.iatWS.onmessage = (e) => {
        this.renderResult(e.data);
      };
      this.iatWS.onerror = (e) => {
        console.error(e);
        this.recorder.stop();
        this.changeStatus("CLOSED");
      };
      this.iatWS.onclose = (e) => {
        this.recorder.stop();
        this.changeStatus("CLOSED");
      };
    },
    startRecording() {
      if (this.btnStatus === "UNDEFINED" || this.btnStatus === "CLOSED") {
        this.connectWebSocket();
      } else if (this.btnStatus === "CONNECTING" || this.btnStatus === "OPEN") {
        this.recorder.stop();
      }
    },
  },
  created() {
    this.recorder.onStart = () => {
      this.changeStatus("OPEN");
    };
    this.recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
      if (this.iatWS.readyState === this.iatWS.OPEN) {
        this.iatWS.send(
          JSON.stringify({
            data: {
              status: isLastFrame ? 2 : 1,
              format: "audio/L16;rate=16000",
              encoding: "raw",
              audio: this.toBase64(frameBuffer),
            },
          })
        );
        if (isLastFrame) {
          this.changeStatus("CLOSING");
        }
      }
    };
    this.recorder.onStop = () => {
      clearInterval(this.countdownInterval);
    };
  },
};
</script>

<style scoped></style>
