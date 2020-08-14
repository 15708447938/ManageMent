<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>修改密码</span>
          </div>
          <div class="text item">
            <el-form status-icon label-width="100px">
              <el-form-item label="原密码" prop="pass">
                <el-input type="password" v-model="oldPwd" autocomplete="off" style="width:217px;"></el-input>
                <span class="err_span">{{errmsg}}</span>
              </el-form-item>

              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="newpass" autocomplete="off" style="width:217px;"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="checkPass"
                  autocomplete="off"
                  style="width:217px;"
                ></el-input>
                <span class="err_span">{{errmsga}}</span>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { checkoldpwd, editpwd } from "@/apis/apis";
export default {
  data() {
    return {
      form: {},
      id: "",
      oldPwd: "",
      newpass: "",
      checkPass: "",
      errmsg: "",
      errmsga: "",
    };
  },

  methods: {
    submitForm() {
      checkoldpwd(this.oldPwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          // this.$message({
          //   message: "旧密码正确!",
          //   type: "success",
          // });
          if (this.newpass == this.checkPass) {
            // console.log(this.newpass);
            editpwd(this.newpass, localStorage.id).then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "修改密码成功!",
                  type: "success",
                });
              }
            });
          } else {
            this.$message.error("两次密码不一致");
          }
        } else {
          this.$message.error("原密码不正确");
        }
      });
    },

    resetForm() {
      this.oldPwd = "";
      this.newpass = "";
      this.checkPass = "";
    },
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 40px;
  padding: 0px;
}
.err_span {
  color: brown;
  font-size: 14px;
}
</style>