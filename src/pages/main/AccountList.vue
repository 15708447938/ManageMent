<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <div class="text item">
        <!-- ref="multipleTable" tooltip-effect="dark"  -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;min-height:200px;"
          v-loading="isloading"
          element-loading-text="拼命加载中"
          @selection-change="selectionChange"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <el-table-column prop="id" type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="账号" width="200"></el-table-column>
          <el-table-column prop="userGroup" label="用户组" width="200"></el-table-column>
          <el-table-column prop="ctime" label="创建时间" width="200">
            <template slot-scope="scope">{{ scope.row.ctime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" class="edit_div">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <el-dialog title="账号编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" style="width:217px;"></el-input>
                  </el-form-item>
                  <el-form-item label="用户组" :label-width="formLabelWidth">
                    <!-- <el-select v-model="form.region" placeholder="请选择用户组">
                      <el-option label="超级管理员" value="超级管理员"></el-option>
                      <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>-->

                    <el-select v-model="form.region" placeholder="请选择用户组">
                      <el-option
                        v-for="(item,index) in list"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="clickedit(scope.$index, scope.row)">确 定</el-button>
                </div>
              </el-dialog>

              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row) "
              >删除</el-button>
              <!-- -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange"-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total,prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <div style="margin-top: 20px">
        <el-button @click="clickalldel" type="danger">批量删除</el-button>
        <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { accountlistdel, accountlist, edit, alldel } from "@/apis/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      list: [
        { label: "超级管理员", value: "超级管理员" },
        { label: "普通管理员", value: "普通管理员" },
        { label: "普通店员", value: "普通店员" },
      ],
      index: 0,
      pageSize: 3,
      total: 0,
      id: "",
      tableData: [{ id: "", account: "", userGroup: "", ctime: "" }],
      currentPage: 1,

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
      },
      formLabelWidth: "120px",
      //加载
      isloading: false,
    };
  },
  methods: {
    //将获取列表封装成函数,以便后期调用
    acclist() {
      this.isloading=true;
      setTimeout(() => {
        accountlist(this.currentPage, this.pageSize).then((res) => {
          // console.log(res.data);
          let newdata = res.data.data;
          //先将时间转换成带时区的
          for (let obj of newdata) {
            obj.ctime = getChinatime(obj.ctime);
          }
          this.tableData = newdata;
          this.total = res.data.total;
          this.isloading=false;
        });
      }, 2000);
    },
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "福居来餐饮提示", {
        confirmButtonText: "绝不手软",
        cancelButtonText: "回头是岸",
        type: "warning",
      })
        .then(() => {
          accountlistdel(row.id).then((res) => {
            if (res.data.code == 0) this.acclist();
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
      console.log(index);
      console.log(row);
      this.dialogFormVisible = true;
      this.form.name = row.account;
      this.form.region = row.userGroup;
      this.id = row.id;

      console.log(row.userGroup);
    },
    clickedit() {
      edit(this.id, this.form.name, this.form.region).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "更改成功!",
            type: "success",
          });
          this.acclist();
        } else {
          this.errmsg = res.data.msg;
        }
      });
    },

    //复选框发生变化
    selectionChange(arr) {
      this.ids = arr.map((item) => item.id); //获取选中行的id,并以数组的形式返回
      // console.log(this.ids);
    },
    // //批量删除
    clickalldel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "福居来餐饮提示", {
        confirmButtonText: "绝不手软",
        cancelButtonText: "回头是岸",
        type: "warning",
      })
        .then(() => {
          alldel(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) this.acclist();
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

    //分页器按钮
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.acclist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.acclist();
    },
  },
  created() {
    //进入页面就调用函数加载账号列表
    this.acclist();
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
</style>