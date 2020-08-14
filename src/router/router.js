import Vue from "vue"
import VueRouter from "vue-router"
import Login from '../pages/Login'

//引入token验证
import { checktoken } from "@/apis/apis";
// import { Main } from "element-ui"
Vue.use(VueRouter)

const router=new VueRouter({
    base: process.env.BASE_URL,
    routes: [{

            // 登录
            path: "/",
            name: "Login",
            component: Login
        },
        {
            // 首页
            path: "/main",
            name: "Main",
            component: () => import('../pages/Main'),

            //二级路由     二级路由都有meta自定义数据
            children: [

                //商品添加
                {
                    path: "/main/productadd",
                    name: "/main/productadd",
                    component: () => import('../pages/main/ProductAdd'),
                    meta:{breadli:["商品管理","商品添加"]}
                },

                //账户添加
                {
                    path: "/main/accountadd",
                    name: "/main/accountadd",
                    component: () => import('../pages/main/AccountAdd'),
                    meta:{breadli:["账号管理","添加账号"]}
                },
                //店铺管理
                {
                    path: "/main/management",
                    name: "/main/management",
                    component: () => import('../pages/main/ManageMent'),
                    meta:{breadli:["店铺管理"]}
                }
                //修改密码
                ,
                {
                    path: "/main/changepwd",
                    name: "/main/changepwd",
                    component: () => import('../pages/main/ChangePwd'),
                    meta:{breadli:["账号管理","修改密码"]}
                },
                //账号列表
                {
                    path: "/main/accountlist",
                    name: "/main/accountlist",
                    component: () => import('../pages/main/AccountList'),
                    meta:{breadli:["账号管理","账号列表"]}
                },
                //订单管理
                {
                    path: "/main/orderman",
                    name: "/main/orderman",
                    component: () => import('../pages/main/OrderMan'),
                    meta:{breadli:["订单管理"]}
                },
                //首页
                {
                    path: "/main/index",
                    name: "/main/index",
                    component: () => import('../pages/main/Index'),
                    meta:{breadli:["首页"]}
                },
                //商品列表
                {
                    path: "/main/productlist",
                    name: "/main/productlist",
                    component: () => import('../pages/main/ProductList'),
                    meta:{breadli:["商品管理","商品列表"]}
                }
                //商品分类
                ,{
                    path: "/main/classification",
                    name: "/main/classification",
                    component: () => import('../pages/main/ClassIfication'),
                    meta:{breadli:["商品管理","商品分类"]}
                }
                ,
                //个人中心
                {
                    path: "/main/personalcenter",
                    name: "/main/personalcenter",
                    component: () => import('../pages/main/PersonalCenter'),
                    meta:{breadli:["首页","个人中心"]}
                },
                //订单统计
                {
                    path: "/main/statistical",
                    name: "/main/statistical",
                    component: () => import('../pages/main/Statistical'),
                    meta:{breadli:["销售统计","订单统计"]}
                }
                ,
                //商品统计
                {
                    path: "/main/comstatistics",
                    name: "/main/comstatistics",
                    component: () => import('../pages/main/ComStatistics'),
                    meta:{breadli:["销售统计","商品统计"]}
                }
               
            ]
        }
    ]
})
//路由拦截
router.beforeEach((to,from,next)=>{
    //to:表示要跳转到的地方
    // console.log(to);
    //from:表示从什么地方跳转(我来自哪里)
    // console.log(from);
    //next:是一个函数
    //只要不是默认登录界面,就都进行路由验证
    if(to.path !="/"){
        //通过token的时效判定用户是否在登录状态
        checktoken(localStorage.token).then(res=>{
            //在登录状态
            if(res.data.code==0)
            next()
            else
            next("/")
        })
    }else
    next()
})
export default router  //暴露出去