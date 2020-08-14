<template>
  <div>
    <el-main>
      <div class="block">
        <span class="demonstration">时间范围</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" class="title_seabtn" @click="clickSearch">查询</el-button>
      </div>
      <div id="echa_div" style="width:100%;">
        <div style="width:70%px;height:500px" ref="chart" class="echa-div" id="salecount"></div>
      </div>
    </el-main>
  </div>
</template>

<script>
import { ordtotal } from "@/apis/apis";
import { getChinatime } from "@/utils/utils";
import echarts from "echarts";
export default {
  data() {
    return {
      date: [new Date("1999-8-13 19:58:35"),new Date()],
    };
  },
  methods: {
    clickSearch() {
      let timestr = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
        // console.log(this.date),
      ]);
      console.log(timestr)
      this.initCharts(timestr);
    },
    initCharts(str) {
      ordtotal(str).then((res) => {
        let arr = res.data.data;
        console.log(arr);
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map(obj => obj.orderTime)
          },

          yAxis: {
            type: "value"
          },

          series: [
            {
              data: arr.map(obj => obj.orderAmount),
              type: "bar"
            },
          ],
        };
        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("salecount"));
  },
};
</script>

<style lang="less" scoped>
.el-button {
  margin-left: 10px;
}
.el-main {
  line-height: 40px;
  padding: 0px;
}
.demonstration {
  padding-right: 10px;
}
#echa_div {
  background: #fff;
  margin-top: 40px;
}
.echa-div {
  padding: 20px 0 20px 20px;
}
</style>