<template>
  <div class="main-container" style="margin-top: 40px;height: 100vh">
    <!-- 左侧容器：课程安排和考试安排 -->
    <div class="container" style="width: 500px">
        <ScheduleTable></ScheduleTable>
      <div class="exam-section">
        <h2>考试安排</h2>
        <ExamTable :exams="examData" />
      </div>
  </div>

    <div class="top-container" style="width: 50vw; height:80vh">
      <div class="task-management">
        <h2>发布任务</h2>
        <div class="task-send" style="margin-bottom: 20px">
        <div>
          <div class="box-container" style="margin-left: 200px;margin-bottom: 8px">
            <div class="header">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                   <path
                    d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                    stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
              </svg>
              <p>Browse File to upload!</p>
            </div>
            <input type="file" style="margin-left: 100px" @change="handleFileChange">
          </div>
          <input type="text" style="margin-left: 250px;margin-right: 20px" v-model="issuerName" placeholder="请输入您的姓名">
          <button class="submit-button"  @click="submitTask">发布</button>
          <p v-if="message">{{ message }}</p>
        </div>
        </div>
        <h2>学生任务管理</h2>
        <div v-for="file in files" :key="file.id">
          <div class="task-content">
            <p><strong>任务名称：</strong>{{ file.fileName }}</p>
            <p style="display: inline-block;"><strong>提交人：</strong>{{ file.issuerName }}</p>
          <button class="submit-button" style="margin-left: 350px; margin-bottom:5px; display: inline-block;" @click="download">下载</button>
          </div>
        </div>

      </div>
    </div>

    <!-- 动态展示课程详细信息 -->
    <div v-if="selectedCourse" class="course-details">
      <h2>今日课表安排</h2>
      <p><strong>课程名称：</strong>{{ selectedCourse.name }}</p>
      <p><strong>授课教师：</strong>{{ selectedCourse.teacher }}</p>
      <p><strong>课程简介：</strong>{{ selectedCourse.description }}</p>
      <button @click="closeCourseDetails">关闭详情</button>
    </div>

    <!-- 按钮容器 -->
    <div class="button-container">
      <button class="button-3d" @click="showCourseDetails('math')">
        <div class="button-top">
          今日课表安排
        </div>
      </button>
      <button class="button-3d" @click="updateSchedule">
        <div class="button-top">
          更新
        </div>
      </button>
      <button class="button-3d" @click="addCustomCourse">
        <div class="button-top">
          自定义添加
        </div>
      </button>
      <button class="button-3d" @click="sendFeedback">
        <div class="button-top">
          反馈
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ScheduleTable from '../../components/ScheduleTable.vue';
import ExamTable from '../../components/ExamTable.vue';
import axios from "axios";
export default {
  components: {
    message: '',
    dialog: null,
    ScheduleTable,
    ExamTable
  },

  data() {
    return {
      files: {
        issuerName: ''
      },
      issuerName: '',
      message: '',
      dialogVisible10: false,
      selectedFile: null,
      currentTask: null,
      scheduleData: [],
      examData: [
        {subject: '数学', date: '2025-05-10', time: '09:00-11:00'},
        {subject: '英语', date: '2025-05-12', time: '14:00-16:00'},
        {subject: '物理', date: '2025-05-15', time: '09:00-11:00'},
        {subject: '化学', date: '2025-05-18', time: '14:00-16:00'}
      ],
      selectedCourse: null,
      courseDetails: {
        math: {
          name: '数学',
          teacher: '张老师',
          description: '数学是研究数量、结构、变化和空间等概念的学科。'
        },
        english: {
          name: '英语',
          teacher: '李老师',
          description: '英语是世界上使用最广泛的语言之一，主要用于国际交流。'
        },
        physics: {
          name: '物理',
          teacher: '王老师',
          description: '物理学是研究物质和能量之间相互作用的自然科学。'
        }
      }
    };
  },
  mounted() {
    this.fetchTasks();
    this.fetchcourses();
    this.dialog = document.getElementById('uploadDialog');
  },
  methods: {
    // 获取任务信息

    fetchcourses() {
      axios.get('/api/schedules/all')
          .then(response => {
            this.scheduleData = response.data;
          })
          .catch(error => {
            console.error('获取任务信息失败:', error);
          });
    },

    fetchTasks() {
      axios.get('/api/files/issuer1')
          .then(response => {
            this.files = response.data;
          })
          .catch(error => {
            console.error('获取任务信息失败:', error);
          });
    },

    download(file) {
      axios.get(`/api/files/download/${file.id}`, {responseType: 'blob'})
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch(error => {
            console.error('下载文件失败:', error);
          });
    },


    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    submitTask() {
      if (!this.file || !this.issuerName) {
        this.message = '请选择文件并输入您的姓名';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('issuerName', this.issuerName);

      fetch('/api/files/upload/0', {
        method: 'POST',
        body: formData
      })
          .then(response => {
            if (response.ok) {
              return response.text();
            } else {
              throw new Error('文件上传失败');
            }
          })
          .then(data => {
            this.message = '文件上传成功';
            // 清空表单
            this.file = null;
            this.issuerName = '';
            document.querySelector('input[type="file"]').value = '';
          })
          .catch(error => {
            this.message = error.message;
          });
    }
  },


    showCourseDetails(courseKey) {
      this.selectedCourse = this.courseDetails[courseKey];
    },
    closeCourseDetails() {
      this.selectedCourse = null;
    },

  };

</script>

<style>


/*课程表*/
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}




/*上传文件*/
.box-container {
  height: 200px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 5px;
  background-color: rgba(0, 110, 255, 0.041);
}

.header {
  flex: 1;
  width: 100%;
  border: 2px dashed royalblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header svg {
  height: 100px;
}

.header p {
  text-align: center;
  color: black;
}

.footer {
  background-color: rgba(0, 110, 255, 0.075);
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
  border: none;
}

.footer svg {
  height: 130%;
  fill: royalblue;
  background-color: rgba(70, 66, 66, 0.103);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}

.footer p {
  flex: 1;
  text-align: center;
}

#file {
  display: none;
}



.upload-container {
  text-align: center;
  margin-top: 50px;
}

#uploadButton {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#uploadButton:hover {
  background-color: #0056b3;
}

#statusMessage {
  margin-top: 20px;
  color: red;
}








.main-container {
  display: flex;
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(to bottom, #ffffff, rgb(218, 234, 252));
}

.left-container {
  flex: 2;
  margin-right: 20px;
}

.right-container {
  flex: 1;
}

.schedule-section, .exam-section {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 30px;
}
.task-management {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 30px;
  height: 80vh;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-content {
  flex: 1;
  margin-bottom: 20px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button-container {
  display: flex;
  /* 设置主轴方向为垂直方向，使按钮竖着排列 */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 600px;
  right: 2px;
}

.button-container button {
  /* 固定按钮的宽度，确保所有按钮宽度一致 */
  width: 100px;
  /* 固定按钮的高度，确保所有按钮高度一致 */
  height: 60px;
  /* 设置按钮之间的间距 */
  margin: 10px 0;
}

.button-3d {
  border-color: white;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  border-width: 1px;
  padding: 0 8px;
  min-width: 4em;
  min-height: 4em;
  box-sizing: border-box;
  background: transparent;
  font: inherit;
  cursor: pointer;
  margin: 10px;
  border-radius: 20px;
}

.button-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 8px 16px;
  transform: translateY(0);
  color: #fff;
  background-image: linear-gradient(145deg, #5ccc38, #d9dfe8);
  text-shadow: white;
  border-radius: 20px;
  transition: transform 0.3s, border-radius 0.3s, background 10s;
}

.button-3d:active .button-top {
  border-radius: 10px 10px 8px 8px / 8px;
  transform: translateY(2px);
  background-image: linear-gradient(145deg, #c1c6ce, #83e369);
  background-color: #3d94cf;
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}
/* From Uiverse.io by kennyotsu */
.notifications-container {
  width: 320px;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flex {
  display: flex;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.success {
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: rgb(240 253 244);
}

.succes-svg {
  color: rgb(74 222 128);
  width: 1.25rem;
  height: 1.25rem;
}

.success-prompt-wrap {
  margin-left: 0.75rem;
}

.success-prompt-heading {
  font-weight: bold;
  color: rgb(22 101 52);
}

.success-prompt-prompt {
  margin-top: 0.5rem;
  color: rgb(21 128 61);
}

.success-button-container {
  display: flex;
  margin-top: 0.875rem;
  margin-bottom: -0.375rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.success-button-main {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #ECFDF5;
  color: rgb(22 101 52);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
  border-radius: 0.375rem;
  border: none
}

.success-button-main:hover {
  background-color: #D1FAE5;
}

.success-button-secondary {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0.75rem;
  background-color: #ECFDF5;
  color: #065F46;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.375rem;
  border: none;
}

</style>

