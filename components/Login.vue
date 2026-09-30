<template>
  <div class="loginBody">
    <video autoplay muted loop class="background-video">
      <source src="../assets/666.mp4" type="video/mp4">
    </video>
    <div class="loginDiv">
      <div class="login-content">
        <div>
          <button class="tooltip" @click="navigateTo('/Register')">
            <svg class="tooltip__label" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path id="circlePath" d="M 10 50 A 40 40 0 0 1 90 50"></path>
              <text>
                <textPath href="#circlePath" startOffset="50%">无账号，点击试试</textPath>
              </text>
            </svg>
            <svg
                class="tooltip__content"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
              ></path>
              <!-- 添加的文本 -->
              <text x="280" y="260" font-size="20" fill="#888" text-anchor="middle">点击注册</text>

              <text>
                <textPath href="#circlePath" startOffset="50%">无账号，点击试试</textPath>
              </text>
            </svg>
          </button>
          <h1 class="login-title">智慧教育平台</h1>
        </div>
        <el-form :model="loginForm" label-width="100px" :rules="rules" ref="loginForm">
          <el-form-item class="login-zhanghao" label="账号" prop="no">
            <el-input
                style="width:260px"
                type="text"
                v-model="loginForm.no"
                placeholder="请输入用户名"
                autocomplete="off"
                size="small"
                class="custom-input">
            </el-input>
          </el-form-item>
          <el-form-item class="login-mima" label="密码" prop="password">
            <el-input
                style="width:260px"
                type="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
                show-password
                autocomplete="off"
                size="small"
                @keyup.enter.native="confirm"
                class="custom-input">
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input
                style="width:200px"
                v-model="loginForm.captcha"
                placeholder="请输入验证码"
                autocomplete="off"
                size="small">
            </el-input>
            <img :src="captchaUrl" @click="clickImg" width="130px" height="33px" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="agreedToTerms"style="left: -55px">
              我已阅读并同意
              <router-link to="" class="agreement-link">用户协议</router-link>、
              <router-link to="" class="agreement-link">登录政策</router-link>
            </el-checkbox>
          </el-form-item>
          <div class="login-button-container">
            <button class="button" @click.prevent="confirm"style="font-size: 20px;background-color: rgb(0 107 179);">
              点击登录
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clip-rule="evenodd">
                </path>
              </svg>
            </button>
          </div>
          <div class="options">
            <span class="option-link">找回密码</span>
            <span class="option-link">点我反馈</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login.vue",
  data() {
    return {
      confirm_disabled: false,
      captchaUrl:'',
      loginForm: {
        no: 'li',
        password: '123',
        agreedToTerms: false,
        showQRLogin: false,
        captchaUrl: '', // 验证码图片地址
        key:''
      },
      rules: {
        no: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    this.key = Math.random();
    this.getCaptcha(this.key)
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },

    getCaptcha(key) {
      const apiUrl = 'http://localhost:8081/captcha?key=' + key
      fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('网络请求失败');
            }
            return response.blob();
          })
          .then(blob => {
            const url = URL.createObjectURL(blob);
            this.captchaUrl = url;
          })
          .catch(error => {
            console.error('获取验证码图片失败:', error);
          });
    },
    clickImg() {
      this.key = Math.random();
      this.getCaptcha(this.key);
    },
    async confirm() {
      // 验证是否满足所有要求
      if (!this.agreedToTerms) {
        alert('请先同意协议');
        return;
      }

      if (!this.loginForm.no || !this.loginForm.password || !this.loginForm.captcha) {
        alert('请输入用户名、密码和验证码');
        return;
      }
      try {
        const response = await axios.post('/api/login', {
          userName: this.loginForm.no,
          password: this.loginForm.password,
        },{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        });
        if (response.data.state === 'success') {
          // 登录成功，跳转到主页或其他页面
          console.log(response.data.userInfo.userType)
          console.log(response.data.userInfo.userName)
          this.$store.commit('setUserType', response.data.userInfo.userType);
          localStorage.setItem('account', JSON.stringify(response.data.userInfo))
          this.$store.commit('setUserInfo', response.data.userInfo.userName);
          localStorage.setItem('account', JSON.stringify(response.data.userInfo))

          this.type=response.data.userInfo.userType
          console.log(this.type)
          let targetRoute;
          switch (this.type) {
            case 'student':
              targetRoute = '1';
              break;
            case 'teacher':
              targetRoute = 't1';
              break;
            case 'admin':
              targetRoute = 'a1';
              break;
            default:
              console.error('Unknown user type:', userType);
              alert('未知用户类型，请联系管理员');
              return;
          }

          this.$router.push(targetRoute);
        } else {
          // 登录失败，显示错误信息
          alert('登录失败，请检查用户名和密码');
        }
      } catch (error) {
        console.error(error);
        alert('登录失败，请稍后重试');
      }
    },
  },
};
</script>

<style scoped>
.loginBody {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
  background-color: #f5f7fa;
}

.loginDiv {
  width: 400px;
  padding: 20px;
  background: white;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* 使内容水平居中 */
}

.login-button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 20px;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.login-content {
  text-align: center;
}

.login-title {
  font-size: 33px;
  margin-bottom: 20px;
  color:   rgb(0 107 179);;
  top: 0px;

}
.agreement-link {
  color: #409EFF;
  text-decoration: none;
  cursor: pointer;
}
.agreement-link:hover {
  text-decoration: underline;
}
.tooltip {
  --color-background: 88, 101, 242;
  --color-text: #fff;
  --size-diameter: 4rem;
  --size-shadow: 4px;
  align-items: center;
  justify-content: center
}

/*************/
/* Container */
/*************/

/* Container - Base */
.tooltip {
  --size: var(--size-diameter);

  align-items: center;
  border: none;
  border-radius: var(--size);
  cursor: pointer;
  display: flex;
  fill: var(--color-text);
  height: var(--size);
  justify-content: center;
  position: relative;
  width: var(--size);
}
.tooltip::before,
.tooltip::after {
  border-radius: inherit;
  height: var(--size);
  position: absolute;
  width: var(--size);
}
/* Container - Darken */
.tooltip::before {
  background: rgba(var(--color-background), 1);
  box-shadow: 0 0 var(--size-shadow) #000;
  content: "";
  z-index: 1;
}
/* Container - Darken */
.tooltip::after {
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
}

/* Container - Interactions */
.tooltip:hover::after {
  content: "";
}
.tooltip:active::before {
  border: 1px solid #000;
  box-shadow: none;
}
.tooltip:active::after {
  background: rgba(0, 0, 0, 0.4);
}

/***********/
/* Content */
/***********/

/* Content - Base */
.tooltip__content {
  --size: calc(0.8 * var(--size-diameter));

  border-radius: var(--size);
  height: var(--size);
  position: relative;
  width: var(--size);
  z-index: 3;
}
/*********/
/* Label */
/*********/

/* Label - Base */
.tooltip__label {
  --size: calc(1 * var(--size-diameter));

  background: radial-gradient(
      circle at center,
      transparent 45%,
      rgb(var(--color-background)) 46%
  );
  border-radius: var(--size);
  font-size: calc(0.2 * var(--size-diameter));
  height: var(--size);
  left: calc(50% - var(--size) / 2);
  pointer-events: none;
  position: absolute;
  top: calc(50% - var(--size) / 2);
  transition: all 0.3s linear;
  width: var(--size);
}
/* Label - Path */
.tooltip__label #circlePath {
  display: none;
}
/* Label - Text */
.tooltip__label text {
  dominant-baseline: middle;
  font-weight: 600;
  text-anchor: middle;
}
/* Label - Interactions */
.tooltip:hover .tooltip__label {
  --size: calc(var(--size-diameter) + 6em);

  box-shadow: 0 0 var(--size-shadow) #000;
}
/* From Uiverse.io by satyamchaudharydev */
.button {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(0 107 179);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
}

.icon {
  width: 100px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button:hover .icon {
  transform: translate(4px);
}

.button:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}
.forgot-password {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  cursor: pointer;
}

.options {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.option-link {
  font-size: 12px;
  color: #888;
  margin: 0 10px;
  cursor: pointer;
}

.option-link:hover {
  text-decoration: underline;
}
</style>