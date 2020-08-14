<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="订单号">
              <el-input v-model="orderNo" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="收货人">
              <el-input v-model="consignee" placeholder="收货人"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="orderState" placeholder="订单状态">
                <el-option v-for="(item,index) in reglist" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="block">
            <span class="demonstration">选择时间</span>
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="primary" class="title_seabtn" @click="clickSearch">查询</el-button>
          </div>
        </span>
      </div>
      <div class="text item">
        <!-- 订单号 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%;min-height:300px;"
          v-loading="isloading"
          element-loading-text="拼命加载中"
        >
          <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
          <!-- 下单时间 -->
          <el-table-column prop="orderTime" label="下单时间" width="150"></el-table-column>
          <!-- 手机号 -->
          <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
          <!-- 收货人 -->
          <el-table-column prop="consignee" label="收货人" width="150"></el-table-column>
          <!-- 配送地址 -->
          <el-table-column prop="deliverAddress" label="地址" width="300"></el-table-column>
          <!-- 送达时间 -->
          <el-table-column prop="deliveryTime" label="送达时间" width="150"></el-table-column>
          <!-- 用户备注 -->
          <el-table-column prop="remarks" label="用户备注" width="150"></el-table-column>
          <!-- 订单金额 -->
          <el-table-column prop="orderAmount" label="订单金额" width="150"></el-table-column>
          <!-- 订单状态 -->
          <el-table-column prop="orderState" label="订单状态" width="150"></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="150">
            <!-- 查看 -->
            <template slot-scope="scope">
              <el-button type="text" @click="clickLook(scope.$index, scope.row)">查看</el-button>
              <el-dialog title="订单管理" :visible.sync="dialogFormVisible">
                <el-form>
                  <el-form-item label="订单号">
                    <span>{{form.orderNo}}</span>
                  </el-form-item>
                  <el-form-item label="下单时间">
                    <span>{{form.orderTime}}</span>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <span>{{form.phone}}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{form.consignee}}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{form.deliverAddress}}</span>
                  </el-form-item>
                  <el-form-item label="送达时间">
                    <span>{{form.deliveryTime}}</span>
                  </el-form-item>
                  <el-form-item label="用户备注">
                    <span>{{form.remarks}}</span>
                  </el-form-item>
                  <el-form-item label="订单金额">
                    <span>{{form.orderAmount}}</span>
                  </el-form-item>
                  <el-form-item label="订单状态">
                    <span>{{form.orderState}}</span>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
                </div>
              </el-dialog>

              <!-- 编辑 -->

              <el-button type="text" @click="clickEbit(scope.$index, scope.row)">编辑</el-button>
              <el-dialog title="订单修改" :visible.sync="ebitVisible">
                <el-form>
                  <el-form-item label="订单号">
                    <el-input v-model="form.orderNo"></el-input>
                  </el-form-item>
                  <el-form-item label="下单时间">
                    <el-input v-model="form.orderTime"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <el-input v-model="form.consignee"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.deliverAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="送达时间">
                    <el-input v-model="form.deliveryTime"></el-input>
                  </el-form-item>
                  <el-form-item label="用户备注">
                    <el-input v-model="form.remarks"></el-input>
                  </el-form-item>
                  <el-form-item label="订单金额">
                    <el-input v-model="form.orderAmount"></el-input>
                  </el-form-item>
                  <el-form-item label="订单状态">
                    <el-input v-model="form.orderState"></el-input>
                  </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="ebitVisible = false">取 消</el-button>
                  <el-button type="primary" @click="clickSure">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { orderlist, orddetail, editorder } from "@/apis/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 5,
      //查询数据
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //手机号
      orderState: "", //订单状态
      date: ["2020-4-16 10:44:58", "2020-6-4 17:35:13"],

      tableData: [],
      reglist: ["已完成", "已受理", "派送中", "全部"],
      isloading: false,
      form: {},
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      ebitVisible: false,
    };
  },

  methods: {
    //获取订单列表
    getlist(param) {
      this.isloading = true;
      setTimeout(() => {
        //进入页面加载订单
        orderlist({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ...param,
        }).then((res) => {
          console.log(res.data);
          let newdata = res.data.data;
          for (let obj of newdata) {
            obj.orderTime = getChinatime(obj.orderTime);
            obj.deliveryTime = getChinatime(obj.deliveryTime);
          }
          this.tableData = newdata;
          this.total = res.data.total;
          this.isloading = false;
        });
      }, 2000);
    },
    //查询
    clickSearch() {
      let { orderNo, consignee, phone, orderState } = this;
      //额外参数对象

      let param = {};
      if (orderNo != "") param.orderNo = orderNo;
      if (consignee != "") param.consignee = consignee;
      if (phone != "") param.phone = phone;
      if (orderState != "" && orderState != "全部")
        param.orderState = orderState;
      if (this.date)
        param.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);

      this.param = param;
      this.getlist(this.param);
    },
    //分页器按钮
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getlist(this.param);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlist(this.param);
    },

    //查看
    clickLook(index, row) {
      // console.log(index);
      // console.log(row);
      this.dialogFormVisible = true;

      orddetail(row.id).then((res) => {
        // console.log(row.id);
        this.form = res.data.data;
        // console.log(this.form);
      });
    },

    //编辑
    clickEbit(index, row) {
      console.log(index);
      console.log(row);
      let ebitobj = { ...row };
      console.log(ebitobj.orderNo);
      this.form = ebitobj;
      this.ebitVisible = true;
    },

    clickSure() {
      editorder(
        this.form.id,
        this.form.orderNo,
        this.form.orderTime,
        this.form.phone,
        this.form.consignee,
        this.form.deliverAddress,
        this.form.deliveryTime,
        this.form.remarks,
        this.form.orderAmount,
        this.form.orderState

      ).then((res) => {
        console.log(res.data.code);
        if (res.data.code == 0) {
          this.$message({
            message: "订单修改成功!",
            type: "success",
          });
          this.getlist();
        } else {
          this.errmsg = res.data.msg;
        }
      });

      this.ebitVisible = false;
    },
  },
  created() {
    this.getlist();
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 40px;
  padding: 0px;
}
.demonstration {
  padding-right: 10px;
}
.el-button {
  margin-left: 10px;
}
.el-pagination {
  padding-top: 30px;
}
</style>