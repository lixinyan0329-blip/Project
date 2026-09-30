<template>
  <div class="resume-container">
    <div class="header">
      <img :src="avatar" alt="Avatar" class="avatar" />
      <h1>{{ name }}</h1>
      <p>{{ title }}</p>
    </div>

    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="个人信息" name="personal">
        <div class="personal-info">
          <p><strong>姓名：</strong>{{ name }}</p>
          <p><strong>性别：</strong>{{ gender }}</p>
          <p><strong>年龄：</strong>{{ age }}</p>
          <p><strong>专业：</strong>{{ major }}</p>
          <p><strong>年级：</strong>{{ grade }}</p>
          <p></p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="宿舍信息" name="dormitory">
        <div class="dormitory-info">
          <p><strong>宿舍号：</strong>{{ dormNumber }}</p>
          <p><strong>室友：</strong>{{ roommates }}</p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="联系方式" name="contact">
        <div class="contact-info">
          <p><strong>电话：</strong>{{ phone }}</p>
          <p><strong>邮箱：</strong>{{ email }}</p>
          <p><strong>地址：</strong>{{ address }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar:'', // 确保图片路径正确
      name: '张三',
      title: '' +
          '大数据专业学生',
      activeTab: 'personal',
      gender: '男',
      age: '20岁',
      major: '大数据',
      dormNumber: 'F02E401',
      roommates: '李四、王五、赵六',
      phone: '13800138000',
      email: 'zhangsan@example.com',
      address: '某市某区某路某号',
      grade:'22级',
    };
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}
.resume-container {
  max-width: 1000px;
  height: 650px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 10px;
}
.tabs {
  margin-top: 20px;
}
.personal-info,
.dormitory-info,
.contact-info {
  margin-top: 10px;
  text-align: left;
}
</style>