<template>
  <div class="container" style="margin-top: 60px;height: 100vh">
    <h1 class="title" style="text-align: center;">河南工业大学热点新闻</h1>
    <div class="news-container">
      <div v-for="(news, index) in newsList" :key="index" class="news-item">
        <h2 class="news-title">{{ news.title }}</h2>
        <p class="news-content">{{ news.content }}</p>
        <a v-if="news.link" :href="news.link" target="_blank" class="news-link">了解更多</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lianjie",
  data() {
    return {
      newsList: [
        {
          title: "中粮科工与河南工业大学签约，共建粮油科技新高地",
          content:
              "2月13日，中粮科工与河南工业大学签署共建粮油装备先进制造产业技术研究院合作协议。此次合作将推动高端粮油装备技术发展，加速科研成果转化，助力行业迈向高端化、智能化和绿色化[^1^]。",
          link: "https://www.sohu.com/a/861961480_122066676"
        },
        {
          title: "河南工业大学第四次党代会隆重开幕",
          content:
              "2025年1月22日，河南工业大学第四次党代会开幕，校党委书记刘志军作报告，总结过去五年工作，规划未来发展方向[^2^]。",
          link: "https://www.haut.edu.cn/xwzx/xyyw.htm"
        },
        {
          title: "《河流与文明——黄河文明的世界意义影像作品展》内蒙古站即将开幕",
          content:
              "由国家艺术基金管理中心资助的《河流与文明——黄河文明的世界意义影像作品展》将于2月28日至3月23日在内蒙古美术馆举行，这是继北京798艺术区首展后的全国巡展第二站[^4^]。",
          link: "https://www.haut.edu.cn/xwzx/zhxx/761.htm"
        },
        {
          title: "河南工业大学获评全省高校‘一站式’学生社区建设A级单位",
          content:
              "近日，河南工业大学获评全省高校‘一站式’学生社区综合管理模式建设A级单位，学校党委高度重视学生社区建设，构建了良好的育人生态[^8^]。",
          link: "https://haut.ihwrm.com/"
        }
      ]
    };
  }
};
</script>

<style>
 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}

.title {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 20px;
}

.news-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news-item {
  width: 80%;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-title {
  font-size: 1.5rem;
  color: #e74c3c;
  margin-bottom: 10px;
}

.news-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 10px;
}

.news-link {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.news-link:hover {
  text-decoration: underline;
}
</style>