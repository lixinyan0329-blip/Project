<template>
  <table class="exam-table">
    <thead>
    <tr>
      <th>科目</th>
      <th>日期</th>
      <th>时间</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="exam in exams" :key="exam.subject">
      <td>{{ exam.subject }}</td>
      <td>{{ exam.date }}</td>
      <td>{{ exam.time }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    exams: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.exam-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}
.exam-table th, .exam-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.exam-table th {
  background-color: #f2f2f2;
}
</style>