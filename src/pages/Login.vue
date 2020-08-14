<template>
  <el-form status-icon class="demo-ruleForm">
    <div id="form_div">
      <span class="title_sp">福居来餐饮系统登录</span>
      <el-form-item prop="user">
        <el-input placeholder="请输入账号" v-model="user" clearable style="width
        :340px;"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input placeholder="请输入密码" v-model="pass" show-password style="width
        :340px;"></el-input>
      </el-form-item>
      <p class="err_p">{{errmsg}}</p>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="width
        :340px;">登录</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { login } from "@/apis/apis";
export default {
  data() {
    return {
      user: "",
      pass: "",
      errmsg: "",
    };
  },

  methods: {
    submitForm() {
      login(this.user, this.pass).then(res => {
        
        if (res.data.code == 0) {
          localStorage.token=res.data.token;
          localStorage.role=res.data.role;
          localStorage.id=res.data.id;
          localStorage.user=this.user;
          this.$router.push("/main/Index"); //改变hash地址
          this.$message({
            message: "登录成功!",
            type: "success",
          });
        } else {
          this.errmsg = res.data.msg;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  height: 100%;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title_sp {
  display: inline-block;
  width: 340px;
  text-align: center;
  line-height: 100px;
  color: #eeeeee;
  font-size: 24px;
}
.err_p{
  color: red;
  font-size: 14px;
  padding-bottom: 10px;
}
</style>