<template>
  <div class="container" style="margin-top: 40px;height: 100vh">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="理学" name="理学"></el-tab-pane>
      <el-tab-pane label="工学" name="工学"></el-tab-pane>
      <el-tab-pane label="教育学" name="教育学"></el-tab-pane>
      <el-tab-pane label="医学" name="医学"></el-tab-pane>
      <el-tab-pane label="农学" name="农学"></el-tab-pane>
      <el-tab-pane label="法学" name="法学"></el-tab-pane>
      <el-tab-pane label="文学" name="文学"></el-tab-pane>
      <el-tab-pane label="哲学" name="哲学"></el-tab-pane>
    </el-tabs>

    <div class="search-and-recommend">
      <div class="recommendations">
        <span>小飞为您推荐:</span>
        <el-divider direction="vertical"></el-divider>
        <span>高等数学</span>
        <el-divider direction="vertical"></el-divider>
        <span>离散数学</span>
        <el-divider direction="vertical"></el-divider>
        <span>批判性思维</span>
      </div>

      <div class="search-box">
        <el-input
            v-model="name"
            placeholder="请输入课程名"
            style="width: 200px; margin-bottom: 8px"
        ></el-input>

        <el-button type="warning" style="margin-left: 10px">查询</el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="8" v-for="course in courses" :key="course.courseId">
        <el-card class="course-card">
          <div
              class="course-img-wrapper"
              :style="{ backgroundImage: 'url(' + course.courseImg + ')' }"
              @click="handleImageClick(course.courseUrl)"
          >
          </div>
          <div class="course-info">
            <h3>{{ course.courseName }}</h3>
            <p>{{ course.courseAuthor }}</p>
          </div>
<!--            <el-table-column>-->
<!--                <el-button v-if="currentUserType === 'teacher'" size="medium" type="primary">更新</el-button>-->
<!--              <el-button style="margin-left: 275px;" v-if="currentUserType === 'teacher'" size="medium" type="success" @click="deleteCourse(course.courseId)">删除</el-button>-->
<!--            </el-table-column>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import request from '@/utils/request'

export default {
  name: "courses.vue",
  computed: {
    ...mapGetters(["currentUserType"]),
  },

  data() {
    return {
      activeName: "理学",
      courses: [],
      tableData:[],
      name:null,
      total:0,
      // user:JSON.parse(localStorage.getItem('account')),
      id:null
    };
  },


  created() {
    this.fetchCourses(this.activeName);
  },
  methods: {
    ...mapActions(["fetchUserType"]),
    handleClick(tab) {
      this.activeName = tab.name;
      this.fetchCourses(tab.name);
    },
    fetchCourses(category) {
      request
      ({
        url: `/courses/a/${category}`,
        headers: {
          isToken: false,
          repeatSubmit: false
        },
        method: 'get',
        data: category
      }).then(response=>{
        this.courses = response.data;
      })
          // .get(`/api/courses/a/${category}`)
          // .then((response) => {
          //   this.courses = response.data;
          // })
          // .catch((error) => {
          //   console.error("获取课程数据出错", error);
          // });
    },
    handleImageClick(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.course-card {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.course-img-wrapper {
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.course-img-wrapper:hover {
  transform: scale(1.05);
}

.course-info {
  padding: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.search-and-recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* 使内容与卡片保持一定距离 */
}
.search-box {
  display: flex;
  align-items: center;
}
.recommendations {
  display: flex;
  align-items: center;
}
</style>
