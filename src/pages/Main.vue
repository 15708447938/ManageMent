<template>
  <el-container>
    <!-- //侧栏 -->
    <el-aside width="200px">
      <!-- <el-row class="tac"> 
      <el-col :span="12">-->
      <el-menu
        :default-active="defaulthash"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div v-for="item in powerarr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
      <!-- </el-col> 
      </el-row>-->
    </el-aside>
    <el-container>
      <!-- 页头 -->
      <!-- <el-header>
          
      </el-header>-->

      <el-container>
        <!-- 头部 -->
        <el-header>
          <div>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item,index) in breadli" :key="index">{{item}}</el-breadcrumb-item>
              
            </el-breadcrumb>
          </div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link">
                欢迎你,
                <a href="#/main/PersonalCenter">{{username}}</a>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <!-- <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2877062728,2631833791&fm=26&gp=0.jpg" alt=""> -->

                <el-avatar :src="headerimg"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <img src alt />
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, accountinfo } from "@/apis/apis";
export default {
  data() {
    return {
      headerimg: "",
      username: "",
      defaulthash: "",
      items: [
        {
          url: "/main/Index",
          icon: "el-icon-house",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/OrderMan",
          icon: "el-icon-suitcase-1",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/c",
          icon: "el-icon-box",
          name: "商品管理",
          roles: ["super", "normal"],
          children: [
            {
              url: "/main/ProductList",
              name: "商品列表",
            },
            {
              url: "/main/ProductAdd",
              name: "商品添加",
            },
            {
              url: "/main/ClassIfication",
              name: "商品分类",
            },
          ],
        },
        {
          url: "/main/ManageMent",
          icon: "el-icon-menu",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/a",
          icon: "el-icon-user",
          name: "账号管理",
          roles: ["super"],
          children: [
            {
              url: "/main/AccountList",
              name: "账号列表",
            },
            {
              url: "/main/AccountAdd",
              name: "添加账号",
            },
            {
              url: "/main/ChangePwd",
              name: "修改密码",
            },
          ],
        },
        {
          url: "/b",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            {
              url: "/main/ComStatistics",
              name: "商品统计",
            },
            {
              url: "/main/Statistical",
              name: "订单统计",
            },
          ],
          roles: ["super"],
        },
      ],


      //面包屑导航
      breadli:[],
    };
  },

  computed: {
    //权限数组
    powerarr() {
      // 根据用户权限进行运算，返回运算完毕的数组
      let newarr = this.items.filter((item) => {
        //返回包含此用户权限的数据
        return item.roles.includes(localStorage.role);
      });

      return newarr;

      // es6
      // return this.list.filter(item => item.roles.includes(localStorage.role))
    },
  },

  created() {
    checktoken(localStorage.token).then((res) => {
      console.log(localStorage.token);
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.user;
      } else {
        //无效
        this.username = "请登录";
        // this.$router.push("/"); //改变hash地址
      }
    });
    this.refinfo();
    //默认hash
    this.defaulthash = this.$route.path; //获取当前页面的hash值

    this.$bus.$on("imguploadfinish", ()=>{
      this.refinfo()
    });

    //初始化给二级导航赋值
    this.breadli=this.$route.meta.breadli;
  },

  methods: {
    //右上角头像
    refinfo() {
      accountinfo(localStorage.id).then((res) => {
        this.headerimg = res.data.accountInfo.imgUrl;
      });
    },
  },

  watch:{
    // $route(to,from)
    $route(to){
      console.log(to);
this.breadli=to.meta.breadli;
    }
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: #606266;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #545c64;
  color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;

  line-height: 160px;
}
.el-menu {
  border-right: none;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>