<template>
  <div class="app-container" style="margin-top: 50px">
    <!-- 横向导航栏 -->
    <nav class="navbar">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/3333" class="nav-link">我的宿舍</router-link>
      <router-link to="/about" class="nav-link">关于住宿</router-link>
      <router-link to="/contact" class="nav-link">联系我们</router-link>
    </nav>
    <div class="home">
      <div class="text">
        <h1>欢迎来到宿舍管理系统</h1>
        <p>关于我们的宿舍环境</p>
      </div>
      <div class="video">
        <video controls>
          <source src="../assets/33.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div class="lower-part">
      <div class="info">
        <h2>宿舍介绍</h2>
        <p>轮播美妙宿舍图。</p>
      <div class="carousel">
        <el-carousel :interval="3000" arrow="always" indicator-position="outside">
          <el-carousel-item v-for="(image, index) in imagePaths" :key="index">
            <img :src="image" alt="宿舍图片" style="width: 100%; height: 100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePageApp",
  data() {
    return {
      imagePaths: [
        require('../assets/111.jpg'),
        require('../assets/222.jpg'),
        require('../assets/333.jpg'),
        require('../assets/444.jpg'),
      ],
      currentDate: new Date()
    };
  },
  methods: {
    // 如果需要其他方法，可以在这里添加
  }
};
</script>

<style scoped>
/* 样式：导航栏 */
.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 10px;
  color: white;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #555;
}

/* 页面内容区域 */
.page-content {
  padding: 20px;
}
.home {
  padding: 20px;
}

.upper-part, .lower-part {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text, .video, .info, .carousel {
  flex: 1;
  padding: 20px;
}

/* 视频大小调整 */
.video {
  width: 90%; /* 占据页面的五分之二 */
  height: 40%;
}

video {
  width: 100%;
  height: auto;
}

/* 轮播图大小调整 */
.carousel {
  width: 50%; /* 调整轮播图宽度 */
  height: 300px; /* 调整轮播图高度 */
}

img {
  width: 100%;
  height: auto;
}
</style>