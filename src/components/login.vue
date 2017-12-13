<template>
<div id="login" class="app_content">
  	<div class="detaile">
    	<div class="loginChoice">
    	<span class="on">登陆</span>
  	</div>
  	<div class="form">
		<el-input class="m_t_20" v-model="account" placeholder="请输入账号"></el-input>
		<section class="password">
			<el-input v-if="!showPassword1" class="m_t_20" type="password" v-model="password" placeholder="请输入密码"></el-input>
			<el-input v-else class="m_t_20" type="text" v-model="password" placeholder="请输入密码"></el-input>
		  <el-switch class="passwordSwitch"
			v-model="showPassword1">
			</el-switch>
		</section>
  		
		<el-button class="m_t_20" type="primary" @click="login">登录</el-button>
  	</div>

  </div>
</div>
</template>

<style>
.m_t_20 {
  margin-top: 20px;
}
.app_content {
  height: 100vh;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;
}

.app_content .detaile {
  display: flex;
  width: 300px;
  flex: 1 1 auto;
  justify-content: center;
  flex-direction: column;
}
.app_content .detaile .loginChoice {
  display: flex;
  justify-content: space-around;
}
.app_content .detaile .loginChoice span {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 2px 5px;
  cursor: pointer;
}

.app_content .detaile .loginChoice .on {
  color: #2395ff;
  border-bottom: 2px solid #2395ff;
}

.password {
  position: relative;
}

.passwordSwitch {
  position: absolute;
  top: 30px;
  right: 5px;
}

.form button {
  width: 100%;
}
</style>


<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      radio1: "登陆",
      account: "",
      password: "",
      confirmPassword: "",
      loginType: true, //登陆或注册，默认为登陆
      showPassword1: false,
      showConfirmpassword: false
    };
  },
  methods: {
    login() {
      const loading = this.$loading();
      // 获取已有账号密码
      axios
        .get("/api/api/account/getAccount", {
          params: {
            account: this.account,
            password: this.password
          }
        })
        .then(response => {
          loading.close();
          let data = response.data;
          if (data.code == 0) {
            this.$message("登陆成功");
            this.$router.push("home");
          } else {
            this.$message(data.error);
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    register() {
      axios
        .post("/api/api/account/createAccount", {
          account: this.account,
          password: this.password
        })
        .then(response => {
          console.log(response);
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    changeLoginWay() {
      this.loginType = !this.loginType;
    }
  }
};
</script>