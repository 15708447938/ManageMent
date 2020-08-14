<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品分类</span>
          <el-button type="primary" style="float: right;" @click="addCate">添加分类</el-button>
          <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="cateName" autocomplete="off" style="width:217px;"></el-input>
              </el-form-item>
              <el-form-item label="是否启用" :label-width="formLabelWidth">
                <el-switch v-model="state"></el-switch>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="clickaddcate">确 定</el-button>
            </div>
          </el-dialog>

          <!-- <el-button style="float: right; padding: 3px 0" type="text">添加分类</el-button> -->
        </div>

        <!-- 列表区域 -->
        <div class="text item">
          <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%;min-height:600px;"
          v-loading="isloading"
          element-loading-text="拼命加载中">
            <el-table-column prop="id" label="序号" width="150px"></el-table-column>

            <el-table-column label="分类名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px" v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
                <el-input
                  v-model="scope.row.cateName"
                  placeholder="请输入内容"
                  v-show="scope.row.isedit"
                ></el-input>
              </template>
              <!-- <template slot-scope="scope">
                <span v-show="!scope.row.isedit">{{scope.row.account}}</span>
                <el-input v-show="scope.row.isedit" v-model="scope.row.account" />
              </template>-->
            </el-table-column>
            <el-table-column prop="state" label="是否启用">
              <template slot-scope="scope">
                <el-switch
                  :disabled="!scope.row.isedit"
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button size="mini" @click="clickEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { addcate, catelist, delcate, editcate } from "@/apis/apis";
export default {
  data() {
    return {
      pageSize: 10,
      total: 0,
      id: "",
      currentPage: 1,
      state: 1,
      cateName: "热销榜",
      tableData: [{ id: "", cateName: "", state: 1 }],

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        state: "",
      },
      formLabelWidth: "120px",
      isloading:false
    };
  },
  methods: {
    //封装获取列表函数
    addList() {
      this.isloading=true;
      setTimeout(() => {
        catelist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          arr[i].state = arr[i].state == 1;
          arr[i].isedit = false;
        }

        this.tableData = arr;
        this.total = res.data.total;
        // this.cateName = res.data.cateName;
        this.isloading=false
      });
      }, 2000);
      
    },

    clickEdit(scope) {
      if (scope.row.isedit) {
        //改变数据
        scope.row.isedit = false;
        editcate(scope.row.id, scope.row.cateName, scope.row.state).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "商品分类修改成功!",
                type: "success",
              });
            } else {
              this.errmsg = res.data.msg;
            }
          }
        );
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
    //添加分类
    addCate() {
      this.dialogFormVisible = true;
    },
    clickaddcate() {
      addcate(this.cateName, this.state).then((res) => {
        console.log(this.state);
        if (res.data.code == 0) {
          this.$message({
            message: "商品分类添加成功!",
            type: "success",
          });
          this.addList();
        } else {
          this.errmsg = res.data.msg;
        }
      });
    },
    //分页器按钮
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.addList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.addList();
    },

    //删除分类
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "福居来餐饮提示", {
        confirmButtonText: "绝不手软",
        cancelButtonText: "回头是岸",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) this.addList();
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
  },
  //获取列表
  created() {
    this.addList();
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 22px;
  padding: 0px;
}
.el-pagination {
  padding-top: 30px;
}
</style>