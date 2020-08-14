<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>管理员信息</span>
        </div>
        <div class="text item">管理员ID: {{ info.id }}</div>
        <div class="text item">账号: {{ info.account }}</div>
        <div class="text item">用户组:{{ info.userGroup }}</div>
        <div class="text item">创建时间:{{info.ctime }}</div>

        <div class="text item">
          <div class="img_text">管理员头像:</div>
          <div class="img_div">
            <img :src="info.imgUrl" alt />
          </div>
        </div>
        <div class="text item">
          <div class="img_text">修改头像:</div>
          <div class="editimg">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :data="uploadData"
            >
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { accountinfo } from "@/apis/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      uploadData: {},
      info: [{ id: "", account: "", userGroup: "", ctime: "", imgUrl: "" }],
    };
  },
  methods: {
    //刷新页面
    refinfo() {
      accountinfo(localStorage.id).then((res) => {
        //将utc时间转化成有时区的时间
        let newdata = res.data.accountInfo;
        newdata.ctime = getChinatime(newdata.ctime);
        this.info = newdata;
      });
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$message({
          message: "头像修改成功!",
          type: "success",
        });
        this.refinfo();
        //图片上传成功!
        this.$bus.$emit("imguploadfinish"); //上传成功,发出通知
      } else {
        this.errmsg = res.data.msg;
      }
    },
  },
  created() {
    this.refinfo();

    this.uploadData = { id: localStorage.id };
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 22px;
  padding: 0px;
}
.item {
  width: 100%;
  padding: 0 10px 20px 0;

  display: flex;
}

.item:not(:first-child) {
  padding-top: 20px;
}
.item:not(:last-child) {
  border-bottom: 1px solid #edeff3;
}
.img_text {
  line-height: 100px;
  padding-right: 10px;
}
.img_div {
  width: 100px;
  height: 100px;
  background: #f1f1f1;
  img {
    width: 100px;
    height: 100px;
  }
}

//头像上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.editimg {
  border: 1px dashed #ccc;
  border-radius: 5px;
}
</style>