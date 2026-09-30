<template>
  <div class="body" style="margin-top: 70px">
    <div class="header-voice">
      <HeaderVoice></HeaderVoice>
    </div>

    <div class="el-container">

<!--#region识别结果框-->

      <div class="result"  >
<!--        <p class="result-header" style="position: relative; font-size: 24px;font-weight: bold;top: 0;left:200px">识别结果：</p>-->
        <p class="result-header">识别结果：</p>
<!--      <div style="margin-bottom: 10px; padding: 200px 300px; border-radius: 5px; width: 30px; word-wrap: break-word; background-color:rgba(255,255,255,0.9) ;float: left; clear: both ;">{{ transResult }}</div>-->
      <div class="card">
        <div class="card-title">
        {{ transResult }}
        </div>
      </div>
    </div>
<!--      #endregion-->


      <div class="container">
        <div class="block ">
          <div class="judge" style="opacity: 0.9;background-color: white;margin-top:30px;border-radius: 1rem;padding: 10px;">
            <span class="demonstration">发音准确性</span>
            <el-rate v-model="value1"  style="background-color: #fff;margin:10px 0px"></el-rate>
            <span class="demonstration">语音连贯性</span>
            <el-rate v-model="value2" style="background-color: #fff;margin:10px 0px"></el-rate>
            <span class="demonstration">语音节奏和语调</span>
            <el-rate v-model="value3" style="background-color: #fff;margin:10px 0px"></el-rate>
          </div>

          <div class="active-box" style="opacity: 0.9;background-color: white;margin-top:30px;border-radius: 1rem;padding: 10px;" >
          <h1>小飞建议:</h1>
            <p id="advice-text" ref="text"></p>
        </div>
      </div>
    </div>
    </div>
    <div class="el-container-bottom" style="display: flex; justify-content: center; align-items: center;margin-top:10px;">
      <div style="position: relative;">


      </div>
<!--     <div @click="translationStart" style="width: 40px; height: auto; margin-left:40px; font-size: 20px; display: inline-block; align-items: center; justify-content: center; background-color: lightblue;">开始</div>-->
      <el-button type="primary" round @click="translationStart" style="width:80px; height: auto; margin-right:10px; font-size: 20px;display: inline-block; align-items: center;  justify-content: center; "><el-icon class="el-icon-microphone"></el-icon></el-button>
      <!--     <div @click="translationEnd" style="width: 40px; height: auto; margin-left:40px; font-size: 20px;display: inline-block; align-items: center;  justify-content: center; background-color: lightblue;">停止</div>-->
      <el-button type="danger" round @click="translationEnd" style="width:80px; height: auto; margin-left:10px; font-size: 20px;display: inline-block; align-items: center;  justify-content: center; "><el-icon class="el-icon-switch-button"></el-icon></el-button>
      <br>
  </div>
  </div>
</template>

<script>
import IatRecorder from './IatRecorder.js'
import Enc from 'enc'
import VConsole from 'vconsole'
import HeaderVoice from "@/components/HeaderVoice.vue";

const iatRecorder = new IatRecorder('en_us', 'mandarin', '5f27b6a9')




export default {
  components: {HeaderVoice},
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      transResult: '',
      index:0,
      textElement:null,
      text: '在“good”这个词中，/ɡ/: 发音类似于“g”音，舌根抬起，接触软腭，发出清晰的音。' +
          '在“Physis”这个词中，出现了两次字母“i”，它们都代表了前元音/i/的音。舌头位置较高，舌尖靠近下齿背面，嘴形微微张开。' +
          '注意“shining”的最后一个音节和“in”之间的连读，以及“all”和“directions”之间辅音和元音的自然衔接。'
    };
  },
  mounted() {
    this.initshow()
  this.showNextCharacter()
  },
  created() { },
  methods: {


    initshow(){
      this.textElement= this.$refs.text;
    },
    translationStart() {
      iatRecorder.start();
    },
    translationEnd() {
      iatRecorder.stop();
      this.transResult = iatRecorder.getFinalResult();
    },

    showNextCharacter() {
      // 逐字显示
      // const textElement = document.getElementById('advice-text');


      if (this.index < this.text.length) {
        // console.log(text.length)
        // console.log(textElement.innerHTML)
        // console.log(111111111111111111111)
        console.log(this.index)
        this.textElement.innerHTML += this.text[this.index++];

        setTimeout(() => this.showNextCharacter(), 200); // 设置逐字显示的时间间隔，单位为毫秒
      } else {
        this.textElement.style.display = 'block'; // 当所有字符都显示后，显示整个文本
      }
    },

  },

};
</script>
<style scoped>
.active-box p{
  //display: none;
}
.el-container-bottom{

}
.header-voice{

}
.el-container{
  border-radius:20px;
  position:relative;
  height:70vh;
  background-image: url("E:\computer1\ifly\src\main\webapp\wms\src\assets\R-C.png");
  width:80vw;
  margin:20px auto 0px auto;
  overflow: auto;
}
.result{
  margin:50px auto;
  text-align:center;
  border: 1px solid#ddd;
  border-radius: 8px; /* 圆角边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  /*background-color: #fff; !* 背景颜色 *!*/
  padding: 10px; /* 内边距 */
  box-sizing: border-box; /* 包含边框和内边距在内 */
}
.result-header{
  font-weight:600;
  font-size:20px;
  margin-top:10px;
}
.result-chat{
  /*width:30vw;*/
  /*height:50vh;*/
  /*//background-color: #8c0e0e;*/
  /*margin:30px 0;*/
  background-color:rgba(255,255,255,0.9);
  border-radius:20px;
  position: relative;
  width: 30vw;
  height: 50vh;
  z-index: 1111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
;
}

/* From Uiverse.io by bhaveshxrawat */
.card {
  width: 30vw;
  height: 50vh;
  background: #ffffff;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
}

.card-title{
  color: #1c1717;
  z-index: 99;
  font-size: 20px
}

.card h2 {
  z-index: 1;
  color: #ffffff;
  font-size: 2em;
}

.card::before {
  content: '';
  position: absolute;
  width: 100px;
  background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
  height: 130%;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card::after {
  content: '';
  position: absolute;
  background: #fafbfd;;
  inset: 5px;
  border-radius: 15px;
}
/* .card:hover:before {
  background-image: linear-gradient(180deg, rgb(81, 255, 0), purple);
  animation: rotBGimg 3.5s linear infinite;
} */



el-rate{
  margin: 20px 0;
}
.judge{
  position: absolute;
  left:20px;
  width:20vw;
  //background-color: #49bcf7;
  margin-top:300px;
}
.active-box{
  //background-color: greenyellow;
  position:absolute;
  right:20px;
  width:20vw;
  margin-top:300px;

}
.active-box h1{
  text-align:center;
  margin-bottom:10px;
}
#advice-text{
  text-indent:40px;
  letter-spacing: 5px;
}
.leftfix{
  float:left;
}
.clearfix{
  clear:both;
}
</style>
