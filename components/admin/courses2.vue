<template>
  <div class="container" style="margin-top: 20px;height: 100vh">
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

        <el-button type="warning" style="margin-left: 10px" @click="searchCourses">查询</el-button>
        <el-button type="warning" style="margin-left: 10px" @click="addCourses">新增</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible1" title="新增课程">
      <el-form :model="newCourse" ref="newCourseForm" label-width="120px">
        <el-form-item label="课程 ID">
          <el-input v-model="newCourse.courseId"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="newCourse.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程作者">
          <el-input v-model="newCourse.courseAuthor"></el-input>
        </el-form-item>
        <el-form-item label="课程链接">
          <el-input v-model="newCourse.courseUrl"></el-input>
        </el-form-item>
        <el-form-item label="课程图片">
          <el-input v-model="newCourse.courseImg"></el-input>
        </el-form-item>
        <el-form-item label="课程类型">
          <el-input v-model="newCourse.category"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="submitAddCourse">确定</el-button>
                </span>
      </template>
    </el-dialog>

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
            <div style="display: flex; align-items: center;">
              <el-button size="medium" type="success" @click="showUpdateDialog(course)">更新</el-button>
              <el-button  style="margin-left: 265px;float: right" size="medium" type="success" @click="deleteCourse(course.courseId)">删除</el-button>
            </div>
          </div>
          <el-dialog :visible.sync="dialogVisible" title="更新课程信息">
            <el-form :model="dialogCourse" ref="dialogCourseForm" label-width="120px">
              <el-form-item label="课程 ID">
                <el-input v-model="dialogCourse.courseId" disabled></el-input>
              </el-form-item>
              <el-form-item label="课程名称">
                <el-input v-model="dialogCourse.courseName"></el-input>
              </el-form-item>
              <el-form-item label="课程作者">
                <el-input v-model="dialogCourse.courseAuthor"></el-input>
              </el-form-item>
              <el-form-item label="课程链接">
                <el-input v-model="dialogCourse.courseUrl"></el-input>
              </el-form-item>
              <el-form-item label="课程图片">
                <el-input v-model="dialogCourse.courseImg"></el-input>
              </el-form-item>
              <el-form-item label="课程类型">
                <el-input v-model="dialogCourse.category"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitUpdate">确定</el-button>
                </span>
            </template>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "courses.vue",
  computed: {
    ...mapGetters(["currentUserType"]),
  },

  data() {
    return {
      activeName: "理学",
      courses: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogCourse: {},
      newCourse: {
        courseId:'',
        courseName: '',
        courseAuthor: '',
        courseUrl: '',
        courseImg: '',
        category: ''
      },
      tableData:[],
      name:null,
      total:0,
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
      axios
          .get(`/api/courses/a/${category}`)
          .then((response) => {
            this.courses = response.data;
          })
          .catch((error) => {
            console.error("获取课程数据出错", error);
          });
    },
    searchCourses() {
      const encodedCourseName = encodeURIComponent(this.name);
      axios.get(`/api/courses/c/${encodeURIComponent}`)
          .then(res => {
            this.tableData = res.data
          })
          .catch((error) => {
            console.error("Error fetching courses", error);
          });
    },
    deleteCourse(courseId) {
      if (confirm('确定要删除该课程吗？')) {
        axios.delete(`/api/courses/d/`,{
          params: {
            courseId: courseId
          }})
            .then((response) => {
              this.courses =response.data;
              alert('课程删除成功！');
            })
            .catch(error => {
              console.error('删除课程时出错:', error);
              alert('删除课程失败，请稍后重试。');
            });
      }},
    showUpdateDialog(course) {
      // 复制课程信息到对话框的表单数据中
      this.dialogCourse = { ...course };
      this.dialogVisible = true;
    },
    submitUpdate() {
      this.$confirm('确定要更新该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送 PUT 请求到后端
        axios.put(`/api/courses/${this.dialogCourse.courseId}`,this.dialogCourse)
            .then(response => {
              this.dialogVisible = false;
              this.$message({
                type: 'success',
                message: '课程更新成功'
              });
              // 更新原课程数据
              this.course = {...this.dialogCourse};
            })
            .catch(error => {
              console.error('请求出错:', error);
              this.$message({
                type: 'error',
                message: '请求出错，请稍后重试'
              });
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更新操作'
        });
      });
    },

    addCourses() {
      // 显示新增课程对话框
      this.dialogVisible1 = true;
    },
    submitAddCourse() {
      this.$confirm('确定要新增该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送 POST 请求到后端
        axios.post('/api/courses/e/', this.newCourse)
            .then(response => {
              this.dialogVisible1 = false;
              this.$message({
                type: 'success',
                message: '课程新增成功'
              });
              console.log(this.newCourse)
            })
            .catch(error => {
              console.error('请求出错:', error);
              this.$message({
                type: 'error',
                message: '请求出错，请稍后重试'
              });
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消新增操作'
        });
      });
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
