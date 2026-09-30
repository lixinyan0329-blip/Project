<template xmlns="http://www.w3.org/1999/html">
  <div class="container1" style="height: 100vh">
    <!-- 容器 1 -->
    <div class="container" style="margin-top: 60px">
      <h2 class="section-title">相关服务</h2>
      <div class="services">
        <div class="service-block">
          <!-- From Uiverse.io by mobinkakei -->
          <i class="el-icon-s-opportunity"></i>
          <h3>失物招领</h3>
        </div>
        <div class="service-block">
          <button @click="goToExternalLink"  class="el-icon-s-help"></button>
          <h3>宿舍分配</h3>
<!--          <button @click="goToExternalLink" class="loader"></button>-->
        </div>
        <div class="service-block">
          <i class="fa fa-map-marker-alt"></i>
          <h3>附近好玩的</h3>
        </div>
      </div>
    </div>

    <!-- 容器 2 -->
    <div class="container">
      <h2 class="section-title">学生专区</h2>
      <div class="services">
        <div class="service-block">
          <i class="fa fa-chart-bar"></i>
          <h3>查看成绩</h3>
        </div>
        <div class="service-block">
          <i class="fa fa-file-alt"></i>
          <h3>入学须知</h3>
        </div>
        <div class="service-block">
          <i class="fa fa-users"></i>
          <h3>关于社团</h3>
        </div>
      </div>
    </div>

    <!-- 容器 3 -->
    <div class="container">
      <h2 class="section-title">可能感兴趣的</h2>
      <div class="services">
        <div class="service-block">
          <i class="el-icon-s-comment"></i>
          <h3>吃瓜墙</h3>
        </div>
        <div class="service-block">
          <i class="fa fa-graduation-cap"></i>
          <h3>校友群</h3>
        </div>
        <div class="service-block">
          <i class="fa fa-home"></i>
          <h3>窝老乡</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      pageInfo: {},
    };
  },
  mounted() {
    this.fetchPageInfo();
  },
  methods: {
    goToExternalLink() {
      window.location.replace("http://localhost:8080/2222");
    },
    goToExternalLink1() {
      window.location.replace("http://localhost:8080/7-2");
    },
    goToExternalLink2() {
      window.location.replace("http://localhost:8080/7-2");
    },
    async fetchPageInfo() {
      try {
        const response = await axios.get("http://localhost:8080/api/pageInfo");
        this.pageInfo = response.data;
      } catch (error) {
        console.error("Failed to fetch page info:", error);
      }
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}

.container1{
  background-image: url(https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png);
  /*background: linear-gradient(to bottom right, #ffffff, #d0e2f5, #c4dbf6);*/
  background-size: cover;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 20px 0;
  padding: 0 20px;

}

.section-title {
  font-size: 1rem;
  color: #111111;
  margin-bottom: 10px;
  text-align: left;
}

.services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

}

.service-block {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.63);
}

.el-icon-s-help {
  font-size: 33px;
  border: none;
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  background-color: transparent;
  /* 使用线性渐变设置背景颜色 */
  background: linear-gradient(to bottom right, #FF7B4C, #FE966C, #FFB392);
  /* 将背景裁剪为文本形状 */
  -webkit-background-clip: text;
  background-clip: text;
  /* 将文本颜色设置为透明，使渐变透过文本显示 */
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}

.service-block i {
  font-size: 2rem;
  background: linear-gradient(to bottom right, #fa6834, #FE966C, #FFB392);
  /* 将背景裁剪为文本形状 */
  -webkit-background-clip: text;
  background-clip: text;
  /* 将文本颜色设置为透明，以便显示背景渐变 */
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}

.service-block h3 {
  font-size: 1.2rem;
  color: #333;
  margin-top: 10px;
}


/* From Uiverse.io by bociKond */
.loader {
  width: 44.8px;
  height: 44.8px;
  color: #554cb5;
  position: relative;
  background: radial-gradient(11.2px,currentColor 94%,#0000);
}

.loader:before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(10.08px at bottom right,#0000 94%,currentColor) top    left,
  radial-gradient(10.08px at bottom left ,#0000 94%,currentColor) top    right,
  radial-gradient(10.08px at top    right,#0000 94%,currentColor) bottom left,
  radial-gradient(10.08px at top    left ,#0000 94%,currentColor) bottom right;
  background-size: 22.4px 22.4px;
  background-repeat: no-repeat;
  animation: loader 1.5s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes loader {
  33% {
    inset: -11.2px;
    transform: rotate(0deg);
  }

  66% {
    inset: -11.2px;
    transform: rotate(90deg);
  }

  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}
/* From Uiverse.io by Pradeepsaranbishnoi */
.🤚 {
  --skin-color: rebeccapurple;
  --tap-speed: 0.6s;
  --tap-stagger: 0.1s;
  position: relative;
  width: 40px;
  height: 30px;
  margin-left: 80px;
}

.🤚:before {
  content: '';
  display: block;
  width: 180%;
  height: 75%;
  position: absolute;
  top: 70%;
  right: 20%;
  background-color: black;
  border-radius: 40px 10px;
  filter: blur(10px);
  opacity: 0.3;
}

.🌴 {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rebeccapurple;
  border-radius: 10px 40px;
}

.👍 {
  position: absolute;
  width: 120%;
  height: 38px;
  background-color: rebeccapurple;
  bottom: -18%;
  right: 1%;
  transform-origin: calc(100% - 20px) 20px;
  transform: rotate(-20deg);
  border-radius: 30px 20px 20px 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}

.👍:after {
  width: 20%;
  height: 60%;
  content: '';
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: -8%;
  left: 5px;
  border-radius: 60% 10% 10% 30%;
  border-right: 2px solid rgba(0, 0, 0, 0.05);
}

.👉 {
  position: absolute;
  width: 80%;
  height: 35px;
  background-color: rebeccapurple;
  bottom: 32%;
  right: 64%;
  transform-origin: 100% 20px;
  animation-duration: calc(var(--tap-speed) * 2);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transform: rotate(10deg);
}

.👉:before {
  content: '';
  position: absolute;
  width: 140%;
  height: 30px;
  background-color: rebeccapurple;
  bottom: 8%;
  right: 65%;
  transform-origin: calc(100% - 20px) 20px;
  transform: rotate(-60deg);
  border-radius: 20px;
}

.👉:nth-child(1) {
  animation-delay: 0;
  filter: brightness(70%);
  animation-name: tap-upper-1;
}

.👉:nth-child(2) {
  animation-delay: var(--tap-stagger);
  filter: brightness(80%);
  animation-name: tap-upper-2;
}

.👉:nth-child(3) {
  animation-delay: calc(var(--tap-stagger) * 2);
  filter: brightness(90%);
  animation-name: tap-upper-3;
}

.👉:nth-child(4) {
  animation-delay: calc(var(--tap-stagger) * 3);
  filter: brightness(100%);
  animation-name: tap-upper-4;
}

@keyframes tap-upper-1 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.4);
  }

  40% {
    transform: rotate(50deg) scale(0.4);
  }
}

@keyframes tap-upper-2 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.6);
  }

  40% {
    transform: rotate(50deg) scale(0.6);
  }
}

@keyframes tap-upper-3 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.8);
  }

  40% {
    transform: rotate(50deg) scale(0.8);
  }
}

@keyframes tap-upper-4 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(1);
  }

  40% {
    transform: rotate(50deg) scale(1);
  }
}
/* From Uiverse.io by mobinkakei */
.wrapper {
  width: 150px;
  height: 50px;
  position: relative;
  z-index: 1;
}

.circle {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: rebeccapurple;
  left: 15%;
  transform-origin: 50%;
  animation: circle7124 .5s alternate infinite ease;
}

@keyframes circle7124 {
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }

  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0%;
  }
}

.circle:nth-child(2) {
  left: 45%;
  animation-delay: .2s;
}

.circle:nth-child(3) {
  left: auto;
  right: 15%;
  animation-delay: .3s;
}

.shadow {
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.9);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: shadow046 .5s alternate infinite ease;
}

@keyframes shadow046 {
  0% {
    transform: scaleX(1.5);
  }

  40% {
    transform: scaleX(1);
    opacity: .7;
  }

  100% {
    transform: scaleX(.2);
    opacity: .4;
  }
}

.shadow:nth-child(4) {
  left: 45%;
  animation-delay: .2s
}

.shadow:nth-child(5) {
  left: auto;
  right: 15%;
  animation-delay: .3s;
}

</style>