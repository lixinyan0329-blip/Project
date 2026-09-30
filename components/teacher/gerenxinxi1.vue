<template>
  <div class="dashboard" style="margin-top: 60px;">
    <!-- 头部区域 -->
    <header class="header">
      <div class="user-info">
        <img src="1.png" alt="用户头像" class="avatar">
        <div class="user-details">
          <span class="username">li</span>
          <span class="signature">这位同学很懒，木有签名的说~</span>
        </div>
      </div>
    </header>

    <!-- 侧边栏 -->
<!--    <aside class="sidebar">-->
<!--      <ul class="sidebar-menu">-->
<!--        <el-menu index="/t9">工作台</el-menu>-->
<!--        <el-menu index="/t10">个人中心</el-menu>-->
<!--        <li class="active">-->
<!--          <router-link to="/dashboard">工作台</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link to="/courses">我的课程</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link to="/favorites">我的收藏</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link to="/assessments">我的评测</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link to="/tasks">我的任务</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link to="/warehouse">我的仓库</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--          <router-link to="/t10">个人信息</router-link>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </aside>-->

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 我的学习模块 -->
      <section class="my-learning">
        <h2>我的学习</h2>
        <!-- From Uiverse.io by kamehame-ha -->
        <div class="cards">
          <div class="card red">
            <span class="card-title">本周学习时长</span>
                          <span class="card-value">0h 0min</span>
                          <div class="card-subtext">
                            上周：0h 0min <i class="icon-arrow"></i> 0%
          </div>
          </div>
          <div class="card blue">
            <span class="card-title">加入课程</span>
                          <span class="card-value">1个</span>
                          <div class="card-subtext">
                            累计排名: 14063 超过了 6%
                          </div>
          </div>
          <div class="card green">
            <span class="card-title">岗位学习</span>
                          <span class="card-value">7个</span>
                          <div class="card-subtext">
                            已学: 1个课程 0个专题 0个实战
                          </div>
          </div>
        </div>
      </section>

      <!-- 活跃度模块 -->
      <section class="activity">
        <h2>活跃度</h2>
        <div class="activity-chart">
          <!-- 这里可以使用第三方图表库如Chart.js来绘制图表 -->
          <div class="activity-label">少</div>
          <div class="activity-bar"></div>
          <div class="activity-label">多</div>
          <table class="activity-calendar">
            <thead>
            <tr>
              <th></th>
              <th>3月</th>
              <th>4月</th>
              <th>5月</th>
              <th>6月</th>
              <th>7月</th>
              <th>8月</th>
              <th>9月</th>
              <th>10月</th>
              <th>11月</th>
              <th>12月</th>
              <th>1月</th>
              <th>2月</th>
              <th>3月</th>
            </tr>
            <tr>
              <th>日</th>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>一</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
            </tr>
            <tr>
              <th>二</th>
              <td>😊</td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>三</th>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td>😊</td>
              <td></td>
            </tr>
            <tr>
              <th>四</th>
              <td></td>
              <td></td>
              <td>😊</td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>五</th>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>六</th>
              <td>😊</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>😊</td>
            </tr>
            </thead>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      totalLearningTime: '11.4h',
      thisWeekLearningTime: '0h 0min',
      lastWeekLearningTime: '0h 0min',
      learningTimeGrowth: 0,
      joinedCourses: 1,
      joinedCoursesRank: 14063,
      joinedCoursesPercent: 6,
      positionLearningCourses: 7,
      learnedCourses: 1,
      learnedTopics: 0,
      learnedPractices: 0
    }
  }
}

</script>

<style scoped>
/* 样式代码 */
.dashboard {
  height: 100vh;
}

.header {
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url("1.png");
}

.user-info {
  display: flex;
  align-items: center;
  /*background-image: url("1.png");*/
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.total-learning {
  font-size: 18px;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu li.active a {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.sidebar-menu a {
  display: block;
  color: #333;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.my-learning {
  margin-bottom: 20px;
}

.learning-cards {
  display: flex;
  justify-content: space-between;
}


/* From Uiverse.io by kamehame-ha */
.cards {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.cards .red {
  background-color: #71b2f8;
}

.cards .blue {
  background-color: #80f3e4;
}

.cards .green {
  background-color: #f3e3a2;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100px;
  width: 300px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 400ms;
}

.cards .card p.tip {
  font-size: 1em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: .7em;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}




.activity {
  margin-bottom: 20px;
}

.activity-chart {
  margin-bottom: 10px;
}

.activity-bar {
  height: 10px;
  background-color: #007bff;
  border-radius: 5px;
}

.activity-calendar {
  width: 100%;
  border-collapse: collapse;
}

.activity-calendar th,
.activity-calendar td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}
</style>