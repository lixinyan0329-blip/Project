const APPID = "0450e282";
const API_SECRET = "N2M3OWUxMzRhNzA1Y2JjZmY4OTJmZjY4";
const API_KEY = "33d50a9cc0eba1fc808c7f527d614dbf";
import CryptoJS from 'crypto-js';
import Worker from './transcode.worker.js';
const transWorker = new Worker();
console.log(transWorker);
var startTime = "";
var endTime = "";

function getWebSocketUrl() {
  return new Promise((resolve, reject) => {
    var url = 'wss://iat-api.xfyun.cn/v2/iat';
    var host = 'iat-api.xfyun.cn';
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var date = new Date().toGMTString();
    var algorithm = 'hmac-sha256';
    var headers = 'host date request-line';
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

const IatRecorder = class {
  constructor({ language, accent, appId } = {}) {
    let self = this;
    this.status = 'null';
    this.language = language || 'zh_cn';
    this.accent = accent || 'mandarin';
    this.appId = appId || APPID;
    this.audioData = [];
    this.resultText = '';
    this.resultTextTemp = '';
    transWorker.onmessage = function (event) {
      self.audioData.push(...event.data);
    };
  }

  setStatus(status) {
    this.onWillStatusChange && this.status !== status && this.onWillStatusChange(this.status, status);
    this.status = status;
  }

  setResultText({ resultText, resultTextTemp } = {}) {
    this.onTextChange && this.onTextChange(resultTextTemp || resultText || '');
    resultText !== undefined && (this.resultText = resultText);
    resultTextTemp !== undefined && (this.resultTextTemp = resultTextTemp);
  }

  setParams({ language, accent } = {}) {
    language && (this.language = language);
    accent && (this.accent = accent);
  }

  connectWebSocket() {
    return getWebSocketUrl().then(url => {
      let iatWS;
      if ('WebSocket' in window) {
        iatWS = new WebSocket(url);
      } else if ('MozWebSocket' in window) {
        iatWS = new MozWebSocket(url);
      } else {
        alert('浏览器不支持WebSocket');
        return;
      }
      this.webSocket = iatWS;
      this.setStatus('init');
      iatWS.onopen = e => {
        this.setStatus('ing');
        setTimeout(() => {
          this.webSocketSend();
        }, 500);
      };
      iatWS.onmessage = e => {
        this.result(e.data);
      };
      iatWS.onerror = e => {
        this.recorderStop();
      };
      iatWS.onclose = e => {
        endTime = Date.parse(new Date());
        console.log("持续时间", endTime - startTime);
        this.recorderStop();
      };
    });
  }

  recorderInit() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.audioContext.resume();
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口');
        return;
      }
    } catch (e) {
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口');
        return;
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then(stream => {
          getMediaSuccess(stream);
        })
        .catch(e => {
          getMediaFail(e);
        });
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: true,
          video: false,
        },
        stream => {
          getMediaSuccess(stream);
        },
        function (e) {
          getMediaFail(e);
        }
      );
    } else {
      if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf('https://') < 0) {
        alert('chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限');
      } else {
        alert('无法获取浏览器录音功能，请升级浏览器或使用chrome');
      }
      this.audioContext && this.audioContext.close();
      return;
    }

    let getMediaSuccess = stream => {
      this.scriptProcessor = this.audioContext.createScriptProcessor(0, 1, 1);
      this.scriptProcessor.onaudioprocess = e => {
        if (this.status === 'ing') {
          transWorker.postMessage(e.inputBuffer.getChannelData(0));
        }
      };
      this.mediaSource = this.audioContext.createMediaStreamSource(stream);
      this.mediaSource.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);
      this.connectWebSocket();
    };

    let getMediaFail = e => {
      this.audioContext && this.audioContext.close();
      this.audioContext = undefined;
      if (this.webSocket && this.webSocket.readyState === 1) {
        this.webSocket.close();
      }
    };
  }

  recorderStart() {
    if (!this.audioContext) {
      this.recorderInit();
    } else {
      this.audioContext.resume();
      this.connectWebSocket();
    }
  }

  recorderStop() {
    if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
      this.audioContext && this.audioContext.suspend();
    }
    this.setStatus('end');
  }

  toBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  webSocketSend() {
    if (this.webSocket.readyState !== 1) {
      return;
    }
    let audioData = this.audioData.splice(0, 1280);
    var params = {
      common: {
        app_id: this.appId,
      },
      business: {
        language: this.language,
        domain: 'iat',
        accent: this.accent,
      },
      data: {
        status: 0,
        format: 'audio/L16;rate=16000',
        encoding: 'raw',
        audio: this.toBase64(audioData),
      },
    };
    console.log("参数language：", this.language);
    console.log("参数accent：", this.accent);
    this.webSocket.send(JSON.stringify(params));
    startTime = Date.parse(new Date());
    this.handlerInterval = setInterval(() => {
      if (this.webSocket.readyState !== 1) {
        console.log("websocket未连接");
        this.audioData = [];
        clearInterval(this.handlerInterval);
        return;
      }
      if (this.audioData.length === 0) {
        console.log("自动关闭", this.status);
        if (this.status === 'end') {
          this.webSocket.send(
            JSON.stringify({
              data: {
                status: 2,
                format: 'audio/L16;rate=16000',
                encoding: 'raw',
                audio: '',
              },
            })
          );
          this.audioData = [];
          clearInterval(this.handlerInterval);
        }
        return false;
      }
      audioData = this.audioData.splice(0, 1280);
      this.webSocket.send(
        JSON.stringify({
          data: {
            status: 1,
            format: 'audio/L16;rate=16000',
            encoding: 'raw',
            audio: this.toBase64(audioData),
          },
        })
      );
    }, 40);
  }

  result(resultData) {
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
      let data = jsonData.data.result;
      let str = '';
      let ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str += ws[i].cw[0].w;
      }
      console.log("识别的结果为：", str);
      if (data.pgs) {
        if (data.pgs === 'apd') {
          this.setResultText({
            resultText: this.resultTextTemp,
          });
        }
        this.setResultText({
          resultTextTemp: this.resultText + str,
        });
      } else {
        this.setResultText({
          resultText: this.resultText + str,
        });
      }
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      this.webSocket.close();
    }
    if (jsonData.code !== 0) {
      this.webSocket.close();
      console.log(`${jsonData.code}:${jsonData.message}`);
    }
  }

  start() {
    this.recorderStart();
    this.setResultText({ resultText: '', resultTextTemp: '' });
  }

  stop() {
    this.recorderStop();
  }

  getFinalResult() {
    return this.resultText + this.resultTextTemp;
  }
};

export default IatRecorder;
