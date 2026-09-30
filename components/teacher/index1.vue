<template>
  <el-container style="height:100vh; border: 1px solid #fafafb;">

    <el-aside width="200px" style="background-color: #fafafb;height:100%;top: 100px;">
      <Aside></Aside>
    </el-aside>

    <el-container>
      <el-main style="height:100%;">
        <router-view/>
      </el-main>
    </el-container>
    <div class="chat">
      <!--      <img src="../assets/robots.gif" alt="">-->
      <!-- From Uiverse.io by Creatlydev -->
      <button1 class="button1">
        <p class="button__text">
          <span style="--index: 0;">X</span>
          <span style="--index: 1;">I</span>
          <span style="--index: 2;">A</span>
          <span style="--index: 3;">O</span>
          <span style="--index: 4;">F</span>
          <span style="--index: 5;">E</span>
          <span style="--index: 6;">I</span>
          <span style="--index: 7;"> </span>
          <span style="--index: 8;">F</span>
          <span style="--index: 9;">L</span>
          <span style="--index: 10;">Y</span>
          <span style="--index: 11;"> </span>
          <span style="--index: 12;">S</span>
          <span style="--index: 13;">T</span>
          <span style="--index: 14;">U</span>
          <span style="--index: 15;">D</span>
          <span style="--index: 16;">E</span>
          <span style="--index: 17;">N</span>
        </p>

        <div class="button__circle">
          <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="button__icon"
              width="14"
          >
            <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
            ></path>
          </svg>

          <svg
              viewBox="0 0 14 15"
              fill="none"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
              class="button__icon button__icon--copy"
          >
            <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
            ></path>
          </svg>
        </div>
      </button1>

      <xinghuo class="xinghuo"/>
    </div>
  </el-container>
</template>
<style>

.el-container{
  background-color: #F8F7F4;
  height: 100%;
  weight: 100%;
}

.el-header {
  background-color: #F8F7F4;
  color: #92c1e8;
  line-height: 60px;
}
.el-main{
  padding:1%;
  height: 100%;
  weight: 100%;
  background-color: #F8F7F4;
}
.el-aside {
  color: #030303;
}
img{
  width:150px;
  position:fixed;
  bottom:20px;
  right:20px;
//background-color: orange;
}

.chat:hover .xinghuo{
  display:block
}
.xinghuo{
  background-image: linear-gradient(to bottom, #ffffff, #f3eedf);
  position:fixed;
  bottom:150px;
  right:20px;
  display:none;
  z-index:100
}
.chat{
  background-color: rgba(0, 0, 0, 0.03);
}

/* From Uiverse.io by Creatlydev */
.button1 {
  cursor: pointer;
  border: none;
  background: #eeab54;
  color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 30%;
  overflow: hidden;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: grid;
  place-content: center;
  transition:
      background 300ms,
      transform 200ms;
  font-weight: 600;
  z-index: 9999;
}

.button__text {
  position: absolute;
  inset: 0;
  animation: text-rotation 8s linear infinite;

  span {
  position: absolute;
  transform: rotate(calc(19deg * var(--index)));
  inset: 7px;
}
}

.button__circle {
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background: #fff;
  color: #eeab54;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button__icon--copy {
  position: absolute;
  transform: translate(-150%, 150%);
}

.button1:hover {
  background: #000;
  transform: scale(1.05);
}

.button1:hover .button__icon {
  color: #000;
}

.button1:hover .button__icon:first-child {
  transition: transform 0.3s ease-in-out;
  transform: translate(150%, -150%);
}

.button1:hover .button__icon--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
}

@keyframes text-rotation {
  to {
    rotate: 360deg;
  }
}




</style>

<script>
import Aside from "./Aside.vue";
import xinghuo from "@/components/xinghuo.vue";




export default {
  name:"Index",
  components:{xinghuo, Aside}
};
</script>