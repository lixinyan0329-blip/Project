<template>
  <div class="basic-info-container" style="margin-bottom: 60px">
    <h2>基本信息</h2>
    <div class="form-item">
      <label>用户名：</label>
      <span>xyli13</span>
    </div>
    <div class="form-item">
      <label>
        <span class="required">*</span>用户昵称：
      </label>
      <input type="text" v-model="nickname" maxlength="5" />
      <span class="char-count">{{ nickname.length }} / 5</span>
    </div>
<!--    <div class="form-item">-->
<!--      <label>头像：</label>-->
<!--      <img :src="avatar" alt="头像" />-->
<!--    </div>-->
    <div class="form-item">
      <label>性别：</label>
      <label>
        <input type="radio" value="男" v-model="gender" /> 男
      </label>
      <label>
        <input type="radio" value="女" v-model="gender" /> 女
      </label>
      <label>
        <input type="radio" value="未知" v-model="gender" /> 未知
      </label>
    </div>
    <div class="form-item">
      <label>城市：</label>
      <select v-model="city">
        <option value="">请选择城市</option>
        <!-- 这里可以动态加载城市数据 -->
      </select>
    </div>
    <div class="form-item">
      <label>
        <span class="required">*</span>手机号：
      </label>
      <input type="text" v-model="phone" />
    </div>
    <div class="form-item">
      <label>
        <span class="required">*</span>邮箱：
      </label>
      <input type="text" v-model="email" />
    </div>
    <div class="form-item">
      <label>个性签名：</label>
      <textarea v-model="signature" maxlength="20"></textarea>
      <span class="char-count">{{ signature.length }} / 20</span>
    </div>
    <button class="save-btn" @click="saveInfo">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '李昕妍',
      gender: '女',
      city: '',
      phone: '18337037696',
      email: 'lixinyan0329@163.com',
      signature: '这位同学很懒，木有签名的说~'
    };
  },
  methods: {
    saveInfo() {
      // 这里可以编写保存表单数据到服务器的逻辑，例如使用axios发送POST请求
      console.log('保存的数据', {
        nickname: this.nickname,
        gender: this.gender,
        city: this.city,
        phone: this.phone,
        email: this.email,
        signature: this.signature
      });
    }
  }
};
</script>

<style scoped>
.basic-info-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-item {
  margin-bottom: 15px;
}

.form-item label {
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}

.required {
  color: red;
}

.char-count {
  float: right;
  color: #999;
}

.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>