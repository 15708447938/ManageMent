<template>
  <div>
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="grid-content bg-purple" shadow="hover">
                <div class="i_div">
                  <i class="el-icon-document"></i>
                </div>
                <div class="span_div">
                  <p class="title_p">总订单</p>
                  <p>{{totalOrder}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="grid-content bg-purple" shadow="hover">
                <div class="i_div">
                  <i class="el-icon-trophy"></i>
                </div>
                <div class="span_div">
                  <p class="title_p">总销售额</p>
                  <p>{{totalAmount}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="grid-content bg-purple" shadow="hover">
                <div class="i_div">
                  <i class="el-icon-shopping-bag-1"></i>
                </div>
                <div class="span_div">
                  <p class="title_p">今日订单数</p>
                  <p>{{todayOrder}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="grid-content bg-purple" shadow="hover">
                <div class="i_div">
                  <i class="el-icon-coin"></i>
                </div>
                <div class="span_div">
                  <p class="title_p">今日销售额</p>
                  <p>{{totayAmount}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div style="width:100%;height:400px" ref="chart" id="echa_div"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { totaldata } from "@/apis/apis";

const echarts = require("echarts");
export default {
  data() {
    return {
      totalOrder: "",
      totalAmount: "",
      todayOrder: "",
      totayAmount: "",
    };
  },
  mounted() {
    let mcharts = echarts.init(document.querySelector("#echa_div"));

    totaldata().then((res) => {
      console.log(res);
      (this.totalOrder = res.data.totalOrder),
        (this.totalAmount = res.data.totalAmount),
        (this.todayOrder = res.data.todayOrder),
        (this.totayAmount = res.data.totayAmount);
      // 2. 创建配置对象
      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["金额数据", "订单数据"], //顶部描述数组
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData, //横轴
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
        ],
      };
      // 3. 使用echarts实例对象， 关联数据配置对象， 创建表格
      mcharts.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.el-main {
  line-height: 40px;
  padding: 10px;
}
.el-card__body {
  padding: 0;
}
.el-icon-document {
  font-size: 76px;
  color: #1296db;
}

.el-icon-shopping-bag-1 {
  font-size: 76px;
  color: #1296db;
}

.el-icon-trophy {
  font-size: 76px;
  color: #e371a9;
}
.el-icon-coin {
  font-size: 76px;
  color: #1afa29;
}

.i_div {
  text-align: center;
  width: 180px;
}
.span_div {
  text-align: center;
  width: 180px;
  font-weight: bold;
  .title_p {
    color: #ccc;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  display: flex;
  justify-content: space-between;
}
#echa_div {
  background: #fff;
  margin-top: 40px;
  padding: 20px 0 20px 20px;
}
</style>