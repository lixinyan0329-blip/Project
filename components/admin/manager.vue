<template>
  <div style="height: 100vh">
  <el-table :data="users" style="margin-top: 60px;">
    <el-table-column prop="userId" label="id" width="200"></el-table-column>
    <el-table-column prop="userName" label="姓名" width="150"></el-table-column>
    <el-table-column prop="userSex" label="性别" width="150"></el-table-column>
    <el-table-column prop="userType" label="用户类型" width="200"></el-table-column>
    <el-table-column prop="userMail" label="邮箱" width="200"></el-table-column>
    <el-table-column>
      <el-button size="small" type="primary">编辑</el-button>
      <el-button size="small" type="success">删除</el-button>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      users: []  // 初始化一个空数组，用于存放从后端获取的用户数据
    };
  },
  mounted() {
    this.getAllUsers();  // 在组件加载后立即调用获取用户数据的方法
  },
  methods: {
    getAllUsers() {
      axios.get('/api/getAllUser')  // 发起GET请求获取所有用户数据
          .then(response => {
            this.users = response.data;  // 将返回的用户数据赋值给users数组
          })
          .catch(error => {
            console.error('获取用户数据失败', error);
          });
    },
    // editUser(user) {
    //   // 编辑用户的逻辑，可以根据需要进行处理
    //   console.log('编辑用户', user);
    // },
    // deleteUser(userId) {
    //   // 删除用户的逻辑，可以根据需要进行处理
    //   console.log('删除用户', userId);
    // }
  }
};
</script>