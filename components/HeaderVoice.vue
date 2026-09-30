<template>
  <div style="display: flex;line-height: 60px;font-size: 20px;margin-top: 70px;">
    <div style="width: 100%; margin-left:50px;font-size: 20px">
  <el-col :span="6">

    <button id="bottone1"><strong>Discover features</strong></button>
  </el-col>
  <el-col :span="6">

    <button id="bottone1"><strong>Discover features</strong></button>
  </el-col>
  <el-col :span="6">

    <button id="bottone1"><strong>shining in all directions</strong></button>
  </el-col>
        <el-col :span="6">

          <button id="bottone1"><strong> After a storm comes a calm</strong></button>
        </el-col>
  </div>
  </div>
</template>

<script>
export default {
  name: "HeaderVoice"
}
</script>

<style scoped>
/* From Uiverse.io by TCdesign-dev */
#bottone1 {
  width: 330px;
  height: 100px;
  padding-left: 33px;
  padding-right: 33px;
  padding-bottom: 16px;
  padding-top: 16px;
  border-radius: 9px;
  background: #d5f365;
  border: none;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition: 0.4s;
}

#bottone1:hover {
  box-shadow: 7px 5px 56px -14px #C3D900;
}

#bottone1:active {
  transform: scale(0.97);
  box-shadow: 7px 5px 56px -10px #C3D900;
}

.centered-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>