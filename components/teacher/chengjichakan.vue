<template>
  <div style="margin-top: 40px">
    <h1>学生成绩查看</h1>
    <div class="search">
      <input type="text" v-model="searchTerm" placeholder="输入学生姓名搜索">
      <el-button @click="search">搜索</el-button>
    </div>

    <table>
      <thead>
      <tr>
        <th>学生ID</th>
        <th>语文</th>
        <th>数学</th>
        <th>英语</th>
        <th>物理</th>
        <th>化学</th>
        <th>政治</th>
        <th>历史</th>
        <th>总分</th>
        <th>排名</th>
        <th>学期</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="grade in grades" :key="grade.id">
        <td>{{ grade.id }}</td>
        <td>{{ grade.chinese }}</td>
        <td>{{ grade.math }}</td>
        <td>{{ grade.english }}</td>
        <td>{{ grade.physics }}</td>
        <td>{{ grade.chemistry }}</td>
        <td>{{ grade.politics }}</td>
        <td>{{ grade.history }}</td>
        <td>{{ grade.totalpoints }}</td>
        <td>{{ grade.ranking }}</td>
        <td>{{ grade.term }}</td>
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
      grades:[],
      searchTerm: '',
    };
  },
  mounted() {
    this.filteredScores();
  },
  methods: {
    filteredScores() {
      axios.get(`/api/grade/all`)
          .then((response) => {
            this.grades = response.data;
          })
          .catch((error) => {
            console.error("获取成绩数据出错", error);
          });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

button {
  padding: 8px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
}

th,
td {
  border: 1px solid #ffffff;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #ffffff;
}
</style>