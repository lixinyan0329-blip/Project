
<template>
  <div class="container" style="height: 900px;margin-top: 60px;margin-left: 20px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文学" name="文学"></el-tab-pane>
      <el-tab-pane label="法学" name="法学"></el-tab-pane>
      <el-tab-pane label="理学" name="理学"></el-tab-pane>
      <el-tab-pane label="工学" name="工学"></el-tab-pane>
      <el-tab-pane label="自然科学" name="自然科学"></el-tab-pane>
      <el-tab-pane label="历史学" name="历史学"></el-tab-pane>
      <el-tab-pane label="地理学" name="地理学"></el-tab-pane>
    </el-tabs>

    <el-input v-model="name" placeholder="请输入课程名" style="width: 200px;margin-bottom: 20px"></el-input>
    <el-button type="warning" style="margin-left: 10px"  @click="searchBooks">查询</el-button>
    <span style="margin-left: 10px" v-if="currentUserType === 'student'">小飞为您推荐:</span>
    <el-divider direction="vertical"v-if="currentUserType === 'student'"></el-divider>
    <span style="margin-left: 10px" v-if="currentUserType === 'student'">几何原本</span>
    <el-divider direction="vertical" v-if="currentUserType === 'student'"></el-divider>
    <span v-if="currentUserType === 'student'">力学基础</span>
    <el-divider direction="vertical" v-if="currentUserType === 'student'"></el-divider>
    <span v-if="currentUserType === 'student'">相对论</span>

    <el-row :gutter="20">
      <el-col :span="8" v-for="book in books" :key="book.bookId">
        <el-card class="book-card">
          <div
              class="book-img-wrapper"
              :style="{ backgroundImage: 'url(' + book.picture + ')' }">
          </div>
          <div class="course-info">
            <h3>{{ book.bookName }}</h3>
            <p>{{ book.author }}</p>
            <p>{{ book.digest }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters,mapActions } from 'vuex';

export default {
  name: "tushu",
  computed: {
    ...mapGetters(['currentUserType']),
  },


  data() {
    return {
      user_type:'',
      activeName: '文学', // 默认选中文学标签
      books: [], // 存放书籍数据的数组
      tableData:[],
      name:null,
      total:0,
      id:null
    };
  },
  created() {
    // this.fetchUserType();
    this.fetchBooks('文学');
  },
  methods: {
    ...mapActions(['fetchUserType']),
    handleClick(tab) {
      // 点击标签页时，更新活动标签页并获取对应的书籍数据
      this.activeName = tab.name;
      this.fetchBooks(tab.name);
    },
    fetchBooks(subject) {
      // 根据传入的学科名称获取相应的书籍数据
      axios.get(`/api/books/a/${subject}`)
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.error('获取书籍数据出错', error);
          });
    },
    searchBooks() {
      axios.get('/api/books/c/'+this.name)
          .then(res => {
            this.tableData = res.data
          })
          .catch(error => {
            console.error('Error fetching books', error);
          });
    },
    deleteBooks(id) {
      axios.delete(`/api/books/`+id).then(response => {
        console.log('书本删除成功');// 可以在这里进行一些界面提示或者状态更新操作
      })
          .catch(error => {
            // 删除失败处理
            console.error('书本删除失败', error);
          });
    }
  }
};
</script>

<style scoped>
.container {
  max-height: 100vh; /* 根据需要调整最大高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

.container {
  max-height: 100vh; /* 根据需要调整最大高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

.book-card {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.book-img-wrapper {
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.book-img-wrapper:hover {
  transform: scale(1.05);
}

.book-info {
  padding: 10px;
}
</style>
