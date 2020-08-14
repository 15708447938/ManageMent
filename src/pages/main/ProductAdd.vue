<template>
  <div>
    <el-container>
      <!-- 主体 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品添加</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="商品名称">
                <el-input v-model="form.name" style="width:400px;" placeholder="商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-select v-model="form.region" placeholder="请选择商品分类">
                  <el-option
                    v-for="(item,index) in list"
                    :key="index"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input-number v-model="price" @change="handleChange" :min="0" label="描述文字"></el-input-number>
              </el-form-item>
              <el-form-item label="商品图片">
                <div class="editimg">
                  <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:5000/goods/goods_img_upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                  >
                    <div class="icon_div">
                      <img
                        v-show="imgUrl !=''"
                        :src="`http://127.0.0.1:5000/upload/imgs/goods_img/`+imgUrl"
                        class="avatar"
                      />
                      <i v-show="imgUrl==''" class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.desc" style="width:400px;"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="clickadd">添加商品</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { categories, add } from "@/apis/apis";
export default {
  data() {
    return {
      list: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      price: 1,
      imgUrl: "",
    };
  },

  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.imgUrl = res.imgUrl; //res.imgUrl获取上传后的图片
    },
    clickadd() {
      add(
        this.form.name,
        this.form.region,
        this.price,
        this.imgUrl,
        this.form.desc
      ).then((res) => {
        console.log(res.data.code);
        if (res.data.code == 0) {
          this.$message({
            message: "商品添加成功!",
            type: "success",
          });
        } else {
          this.errmsg = res.data.msg;
        }
      });
    },
  },

  created() {
    //获取所有商品分类
    categories().then((res) => {
      this.list = res.data.categories;
      // console.log(res.data.categories);
      this.form.region = this.list[0].cateName; //设置商品分类默认选中
    });
  },
};
</script>

<style lang="less" scoped>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-main {
  line-height: 40px;
  padding: 0px;
}
.icon_div {
  border: 1px dashed rgb(36, 143, 185);
  border-radius: 6px;
}
</style>