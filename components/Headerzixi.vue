
<template>
  <div style="display: flex; align-items: center;justify-content: center;font-size: 20px;">
    <h2 style="font-size: 20px;color: #1c1717;margin: 0 20px 0 0;">{{ time }}</h2>
    <el-button type="primary" style="margin-right: 20px;font-size: 15px;" @click="start">开始</el-button>
    <el-button type="danger" style="margin-right: 20px;font-size: 15px;" @click="stop">停止</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "00:00:00",
      timer: null,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.seconds++;
        if (this.seconds === 60) {
          this.seconds = 0;
          this.minutes++;
        }
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
        this.time = `${this.formatTime(this.hours)}:${this.formatTime(
            this.minutes
        )}:${this.formatTime(this.seconds)}`;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
  },
};
</script>

