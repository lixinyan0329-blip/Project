<template>
  <div class="schedule-table">
  <h2>课程表</h2>
  <table>
    <thead>
    <tr>
      <th>星期</th>
      <th>课程</th>
      <th>时间</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in scheduleData" :key="item.id">
      <td>{{ item.week }}</td>
      <td>{{ item.course }}</td>
      <td>{{ item.classtime }}</td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      scheduleData:[],
      searchTerm: '',
    };
  },
  mounted() {
    this.fetchCourses();
  },
  methods:{
    fetchCourses() {
      axios.get('/api/schedules/all')
          .then(response => {
            this.scheduleData = response.data;
          })
          .catch(error => {
            console.error('获取任务信息失败:', error);
          });
    }
  }
};
</script>

<style scoped>

.schedule-table{
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 30px;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}

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
</style>