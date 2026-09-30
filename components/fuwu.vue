<template>
  <div id="app" class="container" style="margin-top: 60px;height: 100vh">
    <h1 class="title3" style="text-align: center;">学校缴费服务平台</h1>
    <div class="function-container">
      <div v-for="(item, index) in paymentFunctions" :key="index" class="function-item">
        <div class="function-icon">
          <i :class="item.icon"></i>
        </div>
        <div class="function-content">
          <h2 class="function-title">{{ item.title }}</h2>
          <p class="function-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fuwu",
  data() {
    return {
      paymentFunctions: [
        {
          title: "缴费中心",
          description: "查看缴费列表信息，支持在线支付学费、住宿费、书本费等项目。支持微信、支付宝、银联等多种支付方式[^10^]。",
          icon: "fa fa-wallet"
        },
        {
          title: "缴费历史查询",
          description: "学生可以查看缴费历史记录，包括支付金额、支付时间、支付方式等细节[^9^]。",
          icon: "fa fa-history"
        },
        {
          title: "电子收据下载",
          description: "提供电子收据下载功能，方便学生保存缴费凭证[^9^]。",
          icon: "fa fa-file-download"
        },
        {
          title: "缴费提醒设置",
          description: "学生可以设置缴费提醒，避免错过缴费期限[^9^]。",
          icon: "fa fa-bell"
        },
        {
          title: "缴费逾期警告",
          description: "对于即将逾期的缴费项目，系统会发送提醒警告[^9^]。",
          icon: "fa fa-exclamation-triangle"
        },
        {
          title: "账单查询",
          description: "展示学生所有缴费账单，包括缴费时间、缴费金额、缴费状态等信息[^10^]。",
          icon: "fa fa-receipt"
        },
        {
          title: "学生信息管理",
          description: "辅导员可以查询学生基本信息，查看和导出已缴费或未缴费学生名单[^9^]。",
          icon: "fa fa-user"
        },
        {
          title: "绩效报告",
          description: "提供学生缴费情况的统计报告，帮助辅导员了解整体缴费情况[^9^]。",
          icon: "fa fa-chart-bar"
        }
      ]
    };
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.title3 {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 20px;
}

.function-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.function-item {
  width: 45%;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.function-icon {
  margin-right: 20px;
}

.function-icon i {
  font-size: 2rem;
  color: #e74c3c;
}

.function-content {
  flex: 1;
}

.function-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.function-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}
</style>

