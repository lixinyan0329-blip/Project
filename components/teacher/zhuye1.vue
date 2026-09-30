<template>
  <header>
    <el-carousel :interval="4000" type="card" height="350px" style="top:45px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-row >
      <div style="flex:1;margin-top:30px;margin-bottom:10px; text-align: center;font-size: 30px;color: #1c1717">
        <span>热门课程</span>
      </div>
      <el-col :span="1" v-for="(o, index) in 4 " :key="o"  :offset="index > 0 ? 4 : 0" style="width: 9%">
        <el-card :body-style="{ padding: '0px' }" style="width: 300px; height: 400px;margin-left: 10px;position:relative">
          <img :src="getLocalImageUrl(index)"  style="width:100%;left:0;right:0;bottom:0;top:0; position:absolute;display: block">
          <!--          <iframe :src="getLocalImageUrl(index)"  style="width:100%;height:400px;border:none;overflow: hidden"></iframe>-->
          <div style="padding: 10px;font-family: serif;display: block">
            <span v-if="index === 0" >双螺旋</span>
            <span v-else-if="index === 1">生理学</span>
            <span v-else-if="index === 2">批判性思维</span>
            <span v-else-if="index === 3">文学概论</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">去学习</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>


    <div style="flex:1;margin-top:10px;margin-bottom:10px; text-align: center;font-size: 30px;color: #1c1717">
      <span>名师</span>
    </div>
    <div class="card-container">
    <div class="card">
      <img src="https://cdn.pixabay.com/photo/2023/12/15/17/13/woman-8451051_1280.jpg">
      <div class="card__content">
        <p class="card__title">Card Title</p>
        <p class="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </div>
    </div>
    <div class="card">
      <img src="https://cdn.pixabay.com/photo/2019/01/06/15/02/the-teacher-3917155_1280.jpg">
      <div class="card__content">
        <p class="card__title">Card Title</p>
        <p class="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </div>
    </div>
      <div class="card">
        <img src="https://cdn.pixabay.com/photo/2022/08/28/08/47/back-to-school-7416023_1280.jpg">
        <div class="card__content">
          <p class="card__title">Card Title</p>
          <p class="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
      <div class="card">
        <img src="https://cdn.pixabay.com/photo/2022/08/11/08/08/student-7378905_1280.jpg">
        <div class="card__content">
          <p class="card__title">Card Title</p>
          <p class="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    </div>


    <div style="flex:1;margin-top:10px;margin-bottom:10px; text-align: center;font-size: 30px;color: #1c1717">
      <span>实时新闻</span>
    </div>
    <div class="card-container1">
    <div class="card1">
      <div class="image1">
        <img src="https://cdn.pixabay.com/photo/2023/10/21/09/50/hands-8331123_1280.jpg">
      </div>
      <div class="content">
        <a href="#">
      <span class="title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
        </a>
        <p class="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
        </p>
        <a class="action" href="#">
          Find out more
          <span aria-hidden="true">
        →
      </span>
        </a>
      </div>
    </div>

      <div class="card1">
        <div class="image1">
          <img src="https://cdn.pixabay.com/photo/2023/10/21/09/50/hands-8331123_1280.jpg">
        </div>
        <div class="content">
          <a href="#">
      <span class="title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
          </a>
          <p class="desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
          </p>
          <a class="action" href="#">
            Find out more
            <span aria-hidden="true">
        →
      </span>
          </a>
        </div>
      </div>

      <div class="card1">
        <div class="image1">
          <img src="https://cdn.pixabay.com/photo/2023/10/21/09/50/hands-8331123_1280.jpg">
        </div>
        <div class="content">
          <a href="#">
      <span class="title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
          </a>
          <p class="desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
          </p>
          <a class="action" href="#">
            Find out more
            <span aria-hidden="true">
        →
      </span>
          </a>
        </div>
      </div>

      <div class="card1">
        <div class="image1">
          <img src="https://cdn.pixabay.com/photo/2023/10/21/09/50/hands-8331123_1280.jpg">
        </div>
        <div class="content">
          <a href="#">
      <span class="title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
          </a>
          <p class="desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
          </p>
          <a class="action" href="#">
            Find out more
            <span aria-hidden="true">
        →
      </span>
          </a>
        </div>
      </div>

    </div>
  </header>


</template>

<script>
import {left} from "core-js/internals/array-reduce";

export default {
  name: "zhuye.vue",
  data() {
    return {
      imagePaths: [
        require('../../assets/9.png'),
        require('../../assets/4.png'),
        require('../../assets/8.png'),
        require('../../assets/5.png'),
      ],
      currentDate: new Date()
    };
  },
  methods:{
    left,
    getLocalImageUrl(index) {
      console.log(index)
      return this.imagePaths[index % this.imagePaths.length];
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(3n+1) {

  background-image: url("../../assets/6.png");
  background-size: cover;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
}


.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  position: absolute;
  bottom:10px;
  margin-left:10px;
  marign-right:10px;
}

.button {
  padding: 0;
  float: right;
}



.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-carousel__item:nth-child(3n) {
  background-image: url("../../assets/2.png") ;
  background-size: cover;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
}

.el-carousel__item:nth-child(3n+2) {
  background-image: url("../../assets/3.png");
  background-size: cover;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
}

.card-container {
  display: flex;
  gap: 35px; /* 设置卡片之间的间距 */
}


.card {
  position: relative;
  width: 450px;
  height: 270px;
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.card img {
  width: 400px;
  height: 270px;
  bottom: 0px;
  right:0px;
  /*fill: #333;*/
  display: flex;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.card:hover svg {
  scale: 0;
}

.card__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}



.card-container1 {
  display: flex;
  gap: 35px; /* 设置卡片之间的间距 */
}


.card1 {
  max-width: 350px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
}

.card a {
  text-decoration: none
}

.content {
  padding: 1.1rem;
}

.image1{
  object-fit: cover;
  width: 100%;
  height: 150px;}

.image1 img{
  object-fit: cover;
  width: 100%;
  height: 150px;
  bottom: 0px;
  right:0px;
  position: relative;
  /*background-color: rgb(239, 205, 255);*/
}

.title {
  color: #111827;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
}

.desc {
  margin-top: 0.5rem;
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.action {
  display: inline-flex;
  margin-top: 1rem;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  align-items: center;
  gap: 0.25rem;
  background-color: #2563EB;
  padding: 4px 8px;
  border-radius: 4px;
}

.action span {
  transition: .3s ease;
}

.action:hover span {
  transform: translateX(4px);
}



</style>