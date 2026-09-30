<template>
  <el-container>
    <el-header style="height: 6vh;margin-top: 50px;">
      <Headerzixi></Headerzixi>
      <div class="online-users" style="margin-top: 50px">{{ onlineUsers }} 人在线</div>
    </el-header>
    <div class="el-form-item__content" style="margin-top: 5px">
      <div class="solve" style="width: 250px; height: 200px; border-radius: 15px; background-color: white;
      opacity: 0.9; padding: 10px">
        <div>
          <span style="color: #dea681; font-weight: bold; font-size: 20px">今日待办列表</span>
        </div>
        <div>
          <div>
            <span style="font-size: 18px; font-weight: bold">英语：</span>
            <!--            <span style="font-size: 14px; margin-top: 0;">35分钟——习惯</span>-->
            <!--            <span style="font-size: 14px; margin-left: 5px">今日0/1次</span>-->
            <span style="font-size: 18px; margin-left: 120px; font-weight: bold">未完成</span>
          </div>
          <div style="color: #9ea2b2">
            <span style="font-size: 14px; margin-top: 0;">35分钟——习惯</span>
            <span style="font-size: 14px; margin-left: 10px">今日0/1次</span>
          </div>
          <div>
            <span style="font-size: 18px; font-weight: bold">数学：</span>
            <!--            <span style="font-size: 14px; margin-top: 0;">今日0/35</span>-->
            <!--            <span style="margin-left: 3px">分钟</span>-->
            <span style="font-size: 18px; margin-left: 120px; font-weight: bold">未完成</span>
          </div>
          <div style="color:#9ea2b2;">
            <span style="font-size: 14px; margin-top: 0;">35分钟——习惯</span>
            <span style="font-size: 14px; margin-top: 0; margin-left: 10px">今日0/35</span>
            <span style="margin-left: 3px">分钟</span>
          </div>
        </div>
      </div>
      <iframe  src="https://www.720yun.com/t/03vkzy2hr1m?scene_id=79459071" frameborder="0" width="100%" height="850px"></iframe>
    </div>
  </el-container>
</template>

<script>
import Headerzixi from "@/components/Headerzixi.vue";


export default {
  name: "zixi.vue",
  components: {Headerzixi},
  data() {
    return {
      onlineUsers: 1
    };
  },

};

</script>

<style>
.el-header{
  height: 30px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  padding: 0;
  text-align: center
}
.el-main{
  padding: 0;
}

.el-carousel__item {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.el-carousel__item:nth-child(3n) {
  width: 100%;
  height: 100%;
  background-image: url("../assets/zixi-1.png");
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
}

.online-users{
  position: absolute;
  top: 5px; /* Adjust top position */
  right: 10px; /* Adjust right position */
  background-color: transparent;
  border:transparent;
  padding: 1px 5px;
  border-radius: 50%; /* Make it round */
  font-size: 15px;
  font-weight: bold;
  color: #3b3b3b;

}

.el-carousel__item:nth-child(3n+1) {

  background-image: url("../assets/zixi-2.png") ;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
}

.solve{
  position:absolute;
}

.el-carousel__item:nth-child(3n+2) {

  background-image: url("../assets/zixi-3.png") ;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;


}

</style>
