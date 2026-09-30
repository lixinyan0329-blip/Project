<template>
  <div class="html-screen" style="margin-top: 60px">
    <iframe v-if="user.userType === 'student'" src="http://localhost:8081/index.html"
            frameborder="0" width="100%" height="900px"></iframe>
    <div v-if="user.userType === 'teacher'">
      <div style="text-align: center">
        <h1 style="font-size: 30px; margin-bottom: 15px">学生学习成果分析</h1>
      </div>
      <el-input placeholder="请输入学生学号进行查询" v-model="id" style="width:300px"></el-input>
      <el-button style="margin-left: 20px" type="info" size="medium" @click="getGrade">查询</el-button>
      <el-button style="margin-left: 20px" type="warning" size="medium" @click="reset">重置</el-button>
      </div>

      <div class="table" style="margin-top: 5px">
        <el-table :data="tableData" strip>
          <el-table-column prop="ranking" label="排名" width="80" align="center" sortable></el-table-column>
          <el-table-column prop="id" label="学号"></el-table-column>
          <el-table-column prop="chinese" label="语文"></el-table-column>
          <el-table-column prop="math" label="数学"></el-table-column>
          <el-table-column prop="english" label="英语"></el-table-column>
          <el-table-column prop="physics" label="物理"></el-table-column>
          <el-table-column prop="chemistry" label="化学"></el-table-column>
          <el-table-column prop="politics" label="政治"></el-table-column>
          <el-table-column prop="history" label="历史"></el-table-column>
          <el-table-column prop="totalpoints" label="总成绩"></el-table-column>
          <el-table-column prop="term" label="学期"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <el-button type="primary" @click="handleWatch">查看可视化详细分析</el-button>
          </el-table-column>
        </el-table>

        <el-dialog title="成绩可视化分析" :visible.sync="analysisVisible"
                   draggable width="95%" :close-on-click-modal="false" destroy-on-close>
          <div style="margin-top: 10px">
            <iframe  src="http://localhost:8081/index.html" frameborder="0" width="100%" height="900px"></iframe>
          </div>
          <div slot="footer">
            <el-button @click="analysisVisible = false" type="warning">取消查看</el-button>
          </div>
        </el-dialog>

        <div class="pagination" style="margin-top: 5px">
          <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5, 10, 20]"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HtmlScreenComponent',
  // 可以在这里加入更多的逻辑和功能
  data(){
    return{
      analysisVisible:false,
      id:null,
      user:JSON.parse(localStorage.getItem('account')),
      grades:[],
      tableData:[],
      pageNum:1,
      pageSize:8,
      total:0
    }
  },
  created(){
    this.load(1)
  },
  methods:{
    load(pageNum){
      if(pageNum) this.pageNum = pageNum
      axios.get('/api/grade/selectPage', {
        params:{
          pageNum: this.pageNum,
          pageSize:this.pageSize,
          id:this.id
        }
      }).then(res => {
        this.tableData = res.data.data?.list
        this.total = res.data.data?.total
      })
    },
    handleCurrentChange(pageNum){
      this.load(pageNum)
    },
    handleWatch(){
      this.analysisVisible = true
    },
    getGrade(){
      axios.get('/api/grade/' + this.id).then(res => {
        this.tableData = res.data
        this.total = res.data.length
      })
    },
    reset(){
      this.id = null
      this.load(1)
    }
  }
}
</script>

<style scoped>

</style>
