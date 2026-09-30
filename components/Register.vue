<template>
  <div class="RegisterBody">
    <video autoplay muted loop class="background-video">
      <source src="../assets/666.mp4" type="video/mp4">
    </video>
    <!--       style="background-image: url(https://ts1.cn.mm.bing.net/th/id/R-C.0f4dd300d3812b43e10ec213d883d275?rik=7yNXzSjQkKTdwA&riu=http%3a%2f%2fi3.3conline.com%2fimages%2fpiclib%2f201007%2f05%2fbatch%2f1%2f63328%2f1278292174231fu75rd84p2.jpg&ehk=jCHNffcWY9XAKZPwv4WGuIsWBTSmVMeorbq%2fb%2bWD%2f%2bU%3d&risl=&pid=ImgRaw&r=0)">-->
    <div class="registration-form">
      <div>
        <button class="tooltip" @click="navigateTo('/')">
          <svg
              class="tooltip__label"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path id="circlePath" d="M 10 50 A 40 40 0 0 1 90 50"></path>
            <text>
              <textPath href="#circlePath" startOffset="50%">已有账号，点击试试</textPath>
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
          </svg>
        </button>
      </div>
      <h1 class="register-title">学生信息注册</h1>
      <el-form :model="user" :rules="rules" ref="registerForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input style="width:223px" v-model="user.userName" placeholder="请输入用户名" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="width:223px" v-model="user.password" type="password" placeholder="请输入密码" autocomplete="off" size="small"  show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="user.userSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type" prop="userType">
          <el-select v-model="user.userType" placeholder="请选择用户类型" >
            <el-option label="老师" value="Teacher"></el-option>
            <el-option label="学生" value="Student"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Email" prop="userMail">
          <el-input style="width:223px" v-model="user.userMail" placeholder="请填写邮箱号" type="email" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <div class="flex items-center gap-2"style="justify-content: center;
    align-items: center;">
          <el-button style="width: 105px;color: #ffffff;background-color: #007BFF ;margin-left:90px ;display: inline-block" @click="registerUser" :loading="registerLoading">注册</el-button>
          <el-button style="width: 105px; color: #ffffff; background-color: #007BFF ;display: inline-block" @click="gotoLogin" :loading="registerLoading">登录</el-button>
        </div>
      </el-form>

      <p v-if="message">{{ message }}</p>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      user: {
        userName: "",
        password: "",
        userSex: "",
        userType: "",
        userMail: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        userType: [{ required: true, message: "请选择用户类型", trigger: "change" }],
        userMail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入有效的邮箱地址", trigger: ["blur", "change"] }
        ]
      },
      message: "",
      registerLoading: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path); // 使用 Vue Router 的 push 方法进行跳转
    },
    gotoLogin(){
      this.$router.push("/")
    },

    async registerUser() {
      try {
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            this.registerLoading = true;
            const response = await axios.post("/api/addUser", this.user);
            if (response.data.state === "success") {
              this.message = "注册成功!";
            } else {
              this.message = `注册失败: ${response.data.error}`;
            }
          } else {
            console.log("Form validation failed.");
            return false;
          }
        });
      } catch (error) {
        console.error("Error registering user:", error);
        this.message = "注册失败，请稍后重试";
      } finally {
        this.registerLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.RegisterBody {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  /* background-size: cover; */
  /* backdrop-filter: blur(1rem);
  border-radius: 1rem; */
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

.registration-form {
  width: 400px;
  padding: 20px;
  background: white;
  backdrop-filter: blur(1rem);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  font-size: 33px;
  color: darkblue;
  margin-bottom: 20px;
}

.el-form-item__label {
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #a7a7bd;
  line-height: 40px;
  padding: 0 30px 0 0;
  box-sizing: border-box;
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
.flex items-center gap-2{

}
</style>
