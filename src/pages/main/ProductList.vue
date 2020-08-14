<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品列表</span>
        </div>
        <div class="text item">
          <el-table
            :data="tableData"
            style="width: 100% ;min-height:900px;"
            v-loading="isloading"
            element-loading-text="拼命加载中"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>

                  <el-form-item label="商品价格">
                    <span>{{ props.row.price }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ props.row.ctime }}</span>
                  </el-form-item>
                  <el-form-item label="商品评价">
                    <span>{{ props.row.rating }}</span>
                  </el-form-item>
                  <el-form-item label="商品销量">
                    <span>{{ props.row.sellCount }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.goodsDesc }}</span>
                  </el-form-item>
                  <el-form-item label="商品图片" prop="imgUrl">
                    <template>
                      <span>
                        <img :src="`http://127.0.0.1:5000/upload/imgs/goods_img/`+props.row.imgUrl" />
                      </span>
                    </template>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" prop="category"></el-table-column>
            <el-table-column label="商品价格" prop="price"></el-table-column>
            <el-table-column label="商品图片">
              <template slot-scope="props">
                <!-- <img :src='`http://127.0.0.1:5000/upload/imgs/goods_img/${props.row.imgUrl}`' />-->
                <img :src="`http://127.0.0.1:5000/upload/imgs/goods_img/`+props.row.imgUrl" />
              </template>
            </el-table-column>
            <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
            <!-- <el-table-column label="操作" prop="operate"> -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  type="primary"
                >编辑</el-button>

                <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="商品名称" :label-width="formLabelWidth">
                      <el-input v-model="form.name" style="width:217px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" :label-width="formLabelWidth">
                      <el-select v-model="form.category" placeholder="请选择商品分类">
                        <el-option
                          v-for="(item,index) in categorylist"
                          :key="index"
                          :label="item.cateName"
                          :value="item.cateName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品价格" :label-width="formLabelWidth">
                      <el-input-number v-model="form.price" :min="0" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品图片" :label-width="formLabelWidth">
                      <div class="editimg">
                        <el-upload
                          class="avatar-uploader"
                          action="http://127.0.0.1:5000/goods/goods_img_upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                        >
                          <div class="icon_div">
                            <img v-if="form.imgUrl !=''" :src="`http://127.0.0.1:5000/upload/imgs/goods_img/`+form.imgUrl" class="avatar" style="width:140px;height:140px" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </div>
                        </el-upload>
                      </div>
                    </el-form-item>
                    <el-form-item label="商品描述" :label-width="formLabelWidth">
                      <el-input type="textarea" v-model="form.goodsDesc" style="width:400px;"></el-input>
                    </el-form-item>
                  </el-form>

                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="clickedit(scope.$index, scope.row)">确 定</el-button>
                  </div>
                </el-dialog>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
            <!-- </el-table-column> -->
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { list, del, goodsedit, categories } from "@/apis/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [
        {
          name: "",
          category: "",
          price: "",
          imgUrl: "",
          goodsDesc: "",
        },
      ],
      name: "",
      category: "",
      price: "",
      imgUrl: "",
      goodsDesc: "",
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {imgUrl:''},

      //加载
      isloading: false,

      //回填数据
      categorylist: [], //获取分类
      // ebitobj:{}//当前编辑行的数据
    };
  },
  methods: {
    //将获取列表封装成函数,以便后期调用

    prolist() {
      //开启加载
      this.isloading = true;
      setTimeout(() => {
        list(this.currentPage, this.pageSize).then((res) => {
          // console.log(res.data);
          let newdata = res.data.data;
          //先将时间转换成带时区的
          for (let obj of newdata) {
            obj.ctime = getChinatime(obj.ctime);
            // obj.imgUrl = `http://127.0.0.1:5000/upload/imgs/goods_img/${obj.imgUrl}`;
          }
          this.tableData = newdata;
          this.total = res.data.total;
          console.log(this.tableData);
          //关闭加载
          this.isloading = false;
        });
      }, 2000);
    },

    //分页器按钮
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.prolist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.prolist();
    },

    //删除商品

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "福居来餐饮提示", {
        confirmButtonText: "绝不手软",
        cancelButtonText: "回头是岸",
        type: "warning",
      })
        .then(() => {
          del(row.id).then((res) => {
            if (res.data.code == 0) this.prolist();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //编辑
    handleEdit(index, row) {
      //获取分类数据
      categories().then((res) => {
        this.categorylist = res.data.categories;
      });
      // this.ebitobj={...row}
      // console.log(row);

      // console.log(index);
      // console.log(ebitobj);
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.category = row.category;
      this.form.price = row.price;
      this.form.imgUrl = row.imgUrl;
      this.form.goodsDesc = row.goodsDesc;
      this.id = row.id;
      // console.log(this.form);
    },
    //图片上传成功函数
    handleAvatarSuccess(res) {
      console.log(res.imgUrl);

      if (res.code == 0) {
        this.form.imgUrl = res.imgUrl;
      }
     
    },
    //确认修改信息
    clickedit() {
      this.$confirm("此操作将更改商品信息, 是否继续?", "福居来餐饮提示", {
        confirmButtonText: "绝不手软",
        cancelButtonText: "回头是岸",
        type: "warning",
      })
        .then(() => {
          goodsedit(
            this.form.name,
            this.form.category,
            this.form.price,
            this.form.imgUrl,
            this.form.goodsDesc,
            this.id
          ).then((res) => {
            console.log(res.data.code);
            if (res.data.code == 0) this.prolist();
          });
          this.$message({
            type: "success",
            message: "更改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更改",
          });
        });

      this.dialogFormVisible = false;
    },
  },

  created() {
    //进入界面就获取
    this.prolist();
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 40px;
  padding: 0px;
}
.el-pagination {
  padding-top: 30px;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>