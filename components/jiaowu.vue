<template>
  <div class="container" style="margin-top: 60px;height: 100vh">
    <h1 class="title" style="text-align: center;">教务系统功能介绍</h1>
    <div class="function-container">
      <div v-for="(functionItem, index) in functions" :key="index" class="function-item">
        <div class="function-icon">
          <i :class="functionItem.icon"></i>
        </div>
        <div class="function-content">
          <h2 class="function-title">{{ functionItem.title }}</h2>
          <p class="function-description">{{ functionItem.description }}</p>
          <a v-if="functionItem.link" :href="functionItem.link" target="_blank" class="news-link">查看详情</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jiaowu",
  data() {
    return {
      functions: [
        {
          title: "课程管理",
          description: "查看课程安排，选课、退课操作，课程信息查询。",
          icon: "fa fa-book",
          link:"http://localhost:8080/2-4"
        },
        {
          title: "成绩查询",
          description: "查询各学期成绩，查看绩点统计，成绩排名等。",
          icon: "fa fa-graduation-cap"
        },
        {
          title: "考试安排",
          description: "查看考试时间表，考场信息，打印准考证。",
          icon: "fa fa-calendar-alt",
          link:"http://localhost:8080/2-4"
        },
        {
          title: "教学评价",
          description: "对教师教学质量进行评价，反馈学习体验。",
          icon: "fa fa-star"
        },
        {
          title: "选课系统",
          description: "根据专业要求和个人兴趣选择课程，查看课程容量。",
          icon: "fa fa-list-alt",
          link:"http://localhost:8080/2-1"
        },
        {
          title: "学籍管理",
          description: "查看个人学籍信息，办理休学、复学手续。",
          icon: "fa fa-id-card"
        },
        {
          title: "毕业设计",
          description: "提交毕业设计选题，上传论文，查看指导教师意见。",
          icon: "fa fa-file-alt"
        },
        {
          title: "通知公告",
          description: "查看学校和教务处发布的最新通知、公告。",
          icon: "fa fa-bullhorn"
        }
      ]
    };
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.title {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 20px;
}

.function-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.function-item {
  width: 45%;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.function-icon {
  margin-right: 20px;
}

.function-icon i {
  font-size: 2rem;
  /* 使用渐变作为背景 */
  background: linear-gradient(to bottom right, #fa6834, #FE966C, #FFB392);
  /* 将背景裁剪为文本形状 */
  -webkit-background-clip: text;
  background-clip: text;
  /* 将文本颜色设置为透明，以便显示背景渐变 */
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}

.function-content {
  flex: 1;
}

.function-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.function-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}
</style>