<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加账号</span>
          </div>
          <div class="text item">
            <el-form
              
              status-icon
              
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="text">
                <el-input type="text" v-model="account" autocomplete="off" style="width:217px;"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="password"
                  autocomplete="off"
                  style="width:217px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户组">
                <el-select v-model="userGroup" placeholder="请选择用户组">
                  <el-option v-for="(item,index) in list" :key="index" :label="item.label" :value="item.value"></el-option>
                  <!-- <el-option label="普通管理员" value="普通管理员"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">添加</el-button>
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
import { accountadd } from "@/apis/apis";
export default {
  data() {
    return {
      list:[{label:"超级管理员",value:"超级管理员"},{label:"普通管理员",value:"普通管理员"},],
      form: {},
      account: "",
      password: "",
      userGroup: "",
    };
  },

  methods: {
    submitForm() {
      accountadd(this.account, this.password, this.userGroup).then(res=>{
        if(res.data.code==0){
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        }else{
          this.$message({
            message: "添加失败!",
          
          });

        }

        // console.log(res.data.code);
      });
    },

    resetForm(){
       this.account= "",
      this.password= "",
      this.userGroup= ""
    }
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 40px;
  padding: 0px;
}
</style>