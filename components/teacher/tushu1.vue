
<template>
  <div class="container" style="height: 900px ;margin-top: 40px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文学" name="文学"></el-tab-pane>
      <el-tab-pane label="法学" name="法学"></el-tab-pane>
      <el-tab-pane label="理学" name="理学"></el-tab-pane>
      <el-tab-pane label="工学" name="工学"></el-tab-pane>
      <el-tab-pane label="自然科学" name="自然科学"></el-tab-pane>
      <el-tab-pane label="历史学" name="历史学"></el-tab-pane>
      <el-tab-pane label="地理学" name="地理学"></el-tab-pane>
    </el-tabs>
<div class="search-box">
    <el-input v-model="name" placeholder="请输入课程名" style="width: 200px;margin-bottom: 8px"></el-input>
    <el-button type="warning" style="margin-left: 10px"  @click="searchBooks">查询</el-button>
    <el-button type="warning" style="margin-left: 10px" @click="addbooks">新增</el-button>
</div>
    <el-dialog :visible.sync="dialogVisible1" title="新增图书信息">
      <el-form :model="newbook" ref="dialogCourseForm" label-width="120px">
        <el-form-item label="图书 ID">
          <el-input v-model="newbook.bookId"></el-input>
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input v-model="newbook.bookName"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="newbook.author"></el-input>
        </el-form-item>
        <el-form-item label="图书封面">
          <el-input v-model="newbook.picture"></el-input>
        </el-form-item>
        <el-form-item label="图书类型">
          <el-input v-model="newbook.subject"></el-input>
        </el-form-item>
        <el-form-item label="图书简介">
          <el-input v-model="newbook.digest"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="submitAddbook">确定</el-button>
                </span>
      </template>
    </el-dialog>


      <el-row :gutter="20">
        <el-col :span="8" v-for="book in books" :key="book.bookId">
          <el-card class="book-card">
            <div
                class="book-img-wrapper"
                :style="{ backgroundImage: 'url(' + book.picture + ')' }">
            </div>
            <div class="book-info">
              <h3>{{ book.bookName }}</h3>
              <p>{{ book.author }}</p>
              <p>{{ book.digest }}</p>
              <div style="display: flex; align-items: center;">
                <el-button size="medium" type="success" @click="showUpdateDialog(book)">更新</el-button>
                <el-button  style="margin-left: 265px;float: right" size="medium" type="success" @click="deletebook(book.bookId)">删除</el-button>
              </div>
            </div>
            <el-dialog :visible.sync="dialogVisible" title="更新课程信息">
              <el-form :model="dialogbook" ref="dialogCourseForm" label-width="120px">
                <el-form-item label="图书 ID">
                  <el-input v-model="dialogbook.bookId" disabled></el-input>
                </el-form-item>
                <el-form-item label="图书名称">
                  <el-input v-model="dialogbook.bookName"></el-input>
                </el-form-item>
                <el-form-item label="图书作者">
                  <el-input v-model="dialogbook.author"></el-input>
                </el-form-item>
                <el-form-item label="图书封面">
                  <el-input v-model="dialogbook.picture"></el-input>
                </el-form-item>
                <el-form-item label="图书类型">
                  <el-input v-model="dialogbook.subject"></el-input>
                </el-form-item>
                <el-form-item label="图书简介">
                  <el-input v-model="dialogbook.digest"></el-input>
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
      dialogVisible: false,
      dialogVisible1: false,
      dialogbook: {},
      newbook: {
        bookId:'',
        bookName: '',
        author: '',
        subject:'',
        picture: '',
        digest: ''
      },
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
    deletebook(bookId) {
      if (confirm('确定要删除该课程吗？')) {
        axios.delete(`/api/books/{bookId}`,{
          params: {
            bookId: bookId
          }})
            .then((response) => {
              this.books =response.data;
              alert('课程删除成功！');
            })
            .catch(error => {
              console.error('删除课程时出错:', error);
              alert('删除课程失败，请稍后重试。');
            });
      }},

    showUpdateDialog(book) {
      // 复制课程信息到对话框的表单数据中
      this.dialogbook = { ...book};
      this.dialogVisible = true;
    },
    submitUpdate() {
      this.$confirm('确定要更新该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送 PUT 请求到后端
        axios.put(`/api/books/b/${this.dialogbook.bookId}`,this.dialogbook)
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

    addbooks() {
      // 显示新增课程对话框
      this.dialogVisible1 = true;
    },
    submitAddbook() {
      this.$confirm('确定要新增该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送 POST 请求到后端
        axios.post('/api/books/a', this.newbook)
            .then(response => {
              this.dialogVisible1 = false;
              this.$message({
                type: 'success',
                message: '课程新增成功'
              });
              console.log(this.newbook)
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
  }
};
</script>

<style scoped>
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
