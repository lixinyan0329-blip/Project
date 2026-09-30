<template>
  <div style="margin-top: 40px;height: 100vh">
    <h1>学生成绩录入</h1>
    <div class="search">
      <input type="text" v-model="searchTerm" placeholder="输入学生ID搜索">
      <el-button @click="search">搜索</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="addgrade()">新增</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible2" title="新增课程">
      <el-form :model="newgrade" ref="newgradeForm" label-width="120px">
        <el-form-item label="学生ID">
          <el-input v-model="newgrade.id"></el-input>
        </el-form-item>
        <el-form-item label="语文">
          <el-input v-model="newgrade.chinese"></el-input>
        </el-form-item>
        <el-form-item label="数学">
          <el-input v-model="newgrade.math"></el-input>
        </el-form-item>
        <el-form-item label="英语">
          <el-input v-model="newgrade.english"></el-input>
        </el-form-item>
        <el-form-item label="物理">
          <el-input v-model="newgrade.physics"></el-input>
        </el-form-item>
        <el-form-item label="化学">
          <el-input v-model="newgrade.chemistry"></el-input>
        </el-form-item>
        <el-form-item label="政治">
          <el-input v-model="newgrade.politics"></el-input>
        </el-form-item>
        <el-form-item label="历史">
          <el-input v-model="newgrade.history"></el-input>
        </el-form-item>
        <el-form-item label="总分">
          <el-input v-model="newgrade.totalpoints"></el-input>
        </el-form-item>
        <el-form-item label="排名">
          <el-input v-model="newgrade.ranking"></el-input>
        </el-form-item>
        <el-form-item label="学期">
          <el-input v-model="newgrade.term"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="submitAddgrade">确定</el-button>
                </span>
      </template>
    </el-dialog>
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
import { mapGetters, mapActions } from "vuex";
export default {

  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dialogCourse: {},
      grades:[],
      newgrade: {
        id:'',
        chinese: '',
        math: '',
        english: '',
        physics: '',
        chemistry: '',
        politics:'',
        history:'',
        totalpoints:'',
        ranking:'',
        term:''
      },
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
      },
    search:{

    },
      addgrade() {
        // 显示新增课程对话框
        this.dialogVisible2 = true;
      },
      submitAddgrade() {
        this.$confirm('确定要新增该成绩吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送 POST 请求到后端
          axios.post('/api/grade/add/', this.newgrade)
              .then(response => {
                this.dialogVisible2 = false;
                this.$message({
                  type: 'success',
                  message: '新增成绩成功'
                });
                console.log(this.newgrade)
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
  border: 1px solid #a1a7ba;
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
  background-color: white;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ffffff;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #ffffff;
  color: #a1a7ba;
}
</style>