<script>
import SectionBar from "@/components/resume/SectionBar";
import WorkingBox from "@/components/resume/WorkingBox";

export default {
  name: "App",
  components: {
    SectionBar,
    WorkingBox,
  },
};
</script>

<template>
  <div class="resume" style="margin-top: 50px">
    <SectionBar />
    <WorkingBox />
  </div>

</template>

<style lang="scss">
.resume {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: stretch;
  align-items: stretch;
  min-height: 100vh;
  max-height: 100vh;
}
</style>

