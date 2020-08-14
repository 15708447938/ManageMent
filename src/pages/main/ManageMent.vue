<template>
  <div>
    <el-container>
      <!-- 主体 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>店铺管理</span>
            <el-button type="primary" style="float: right;" @click="clicksure">保存</el-button>
          </div>
          <div class="text item">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="店铺名称">
                <el-input v-model="form.name" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="店铺公告">
                <el-input type="textarea" v-model="form.bulletin" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="店铺头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:5000/shop/upload"
                  :show-file-list="false"
                  :on-success="avatarUploadSuccess"
                >
                  <img
                    v-if="form.avatar"
                    :src="`http://127.0.0.1:5000/upload/shop/`+form.avatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="店铺图片">
                <!-- <img
                  width="148px"
                  :src="`http://127.0.0.1:5000/upload/shop/`+form.pics[index]"
                  alt
                />-->
                <el-upload
                  action="http://127.0.0.1:5000/shop/upload"
                  list-type="picture-card"
                  :on-success="shopimgsUploadSuccess"
                  :on-remove="removeImg"
                  :file-list="shopimgs"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="配送费">
                <el-input v-model="form.deliveryPrice" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="配送时间">
                <el-input v-model="form.deliveryTime" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="配送描述">
                <el-input v-model="form.description" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="店铺评分">
                <el-input v-model="form.score" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="销量">
                <el-input v-model="form.sellCount" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="活动">
                <el-checkbox-group v-model="form.supports" style="width:400px;">
                  <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
                  <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
                  <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
                  <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
                  <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="营业时间">
                <el-time-picker
                  is-range
                  v-model="form.date"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                ></el-time-picker>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getinfo, editshop } from "@/apis/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      form: {
        avatar: "", //店铺头像
        bulletin: "", //公告
        date: [], //营业时间
        deliveryPrice: 0, //配送费
        deliveryTime: 0, //送达时间
        description: "", //描述
        id: 0,
        minPrice: 0, //起送费
        name: "",
        pics: [], //店铺图片
        score: 0, //评分
        sellCount: 0, //销量
        supports: [], //活动
      },
      shopimgs: [], //回填店铺图片数组
      pics: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    //获取信息
    getinformation() {
      getinfo().then((res) => {
        this.form = res.data.data;
        // console.log(this.form );
        // this.picsa = res.data.data.pics;
        for (let key in res.data.data) {
          this[key] = res.data.data[key]; //动态用[]
        }

        //店铺图片回填
        this.shopimgs = this.pics.map((imgstr) => {
          return {
            name: imgstr,
            url: `http://127.0.0.1:5000/upload/shop/` + imgstr,
          };
        });
      });
    },
    onSubmit() {
      console.log("submit!");
    },

    
    //头像上传成功
    avatarUploadSuccess(res) {
      console.log(res.code);
      console.log(res);
      if (res.code == 0) {
        this.$message({
          message: "头像上传成功!",
          type: "success",
        });
      }
      this.form.avatar = res.imgUrl;
    },

    //店铺图片上传成功
    shopimgsUploadSuccess(res) {
      if (res.code == 0) this.pics.push(res.imgUrl); //把上传的图片加入到pics中
      console.log(this.pics);
    },

    //删除店铺图片
    removeImg(res) {
      //要删除的图片的名字
      console.log(res.name);
      //移除   找到索引
      this.pics.splice(this.pics.indexOf(res.name), 1);
      console.log(this.pics);
    },

    //内容修改
    clicksure() {
      editshop(
        this.form.id,
        this.form.name,
        this.form.bulletin,
        this.form.avatar,
        this.form.deliveryPrice,
        this.form.deliveryTime,
        this.form.description,
        this.form.score,
        this.form.sellCount,
        JSON.stringify(this.form.supports),
        JSON.stringify([
          getChinatime(this.form.date[0]),
          getChinatime(this.form.date[1]),
        ]),
        JSON.stringify(this.form.pics)
      ).then((res) => {
        // console.log(res.data.code);
        console.log([
          getChinatime(this.form.date[0]),
          getChinatime(this.form.date[1]),
        ]);
        if (res.data.code == 0) {
          this.$message({
            message: "店铺信息修改成功!",
            type: "success",
          });
          // this.getinformation();
        } else {
          this.errmsg = res.data.msg;
        }
      });
    },
  },

  created() {
    this.getinformation();
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
.shopTop_img {
  width: 160px;
  height: 140px;
}
.el-main {
  line-height: 40px;
  padding: 0px;
}
</style>