import axios from "axios"

axios.defaults.baseURL = 'http://127.0.0.1:5000'
//验证token
export const checktoken = (token) => axios.get("/users/checktoken", {
    params: {
        token
    }
})

//验证登录
// account  账号
// password  密码

export const login = (account, password) => axios.post("/users/checkLogin", {
    account,
    password
})

//添加账号
// account  账号
// password  密码
//userGroup 用户组
export const accountadd = (account, password, userGroup) => axios.post("/users/add", {
    account,
    password,
    userGroup
})


//获取账号列表
// currentPage 当前页码
// pageSize 每页条数

export const accountlist = (currentPage, pageSize) => axios.get("/users/list", {
    params: {
        currentPage,
        pageSize
    }
})

//删除账号
//id 

export const accountlistdel = (id) => axios.get("/users/del", {
    params: {
        id
    }
})

//批量删除

export const alldel = (ids) => axios.get("/users/batchdel", {
    params: {
        ids
    }
}) //不会

//修改账号
//account  用户名
//userGroup 用户组
export const edit = (id, account, userGroup) => axios.post("/users/edit", {
    id,
    account,
    userGroup
})

//检查旧密码是否正确
//oldPwd  老密码
export const checkoldpwd = (oldPwd, id) => axios.get("/users/checkoldpwd", {
    params: {
        oldPwd,
        id
    }
})

//修改密码
// newPwd 新密码
export const editpwd = (newPwd, id) => axios.post("/users/editpwd", {
    newPwd,
    id
})

//获取个人信息

export const accountinfo = (id) => axios.get("/users/accountinfo", {
    params: {
        id
    }
})
// 10. 头像上传接口
// 请求地址：/users/avatar_upload
// 请求方式：post
// export const avatar_upload=(id)=>axios.post("/users/avatar_upload",{id})

//添加商品分类
// cateName 分类名称
// state 是否启用
export const addcate = (cateName, state) => axios.post("/goods/addcate", {
    cateName,
    state
})


///获取分类列表
// currentPage 当前页码
// pageSize 每页条数

export const catelist = (currentPage, pageSize) => axios.get("/goods/catelist", {
    params: {
        currentPage,
        pageSize
    }
})


//删除分类

export const delcate = (id) => axios.get("/goods/delcate", {
    params: {
        id
    }
})

//编辑
//cateName  分类名称
//state  分类状态
export const editcate = (id, cateName, state) => axios.post("/goods/editcate", {
    id,
    cateName,
    state
})

//查询所有分类

export const categories = () => axios.get("/goods/categories", {
    params: {}
})


//商品图片上传
export const imgupload = () => axios.post("/goods/goods_img_upload", {})

//添加商品
// 请求地址：/goods/add
// 请求方式：POST

// name 商品名称     imgUrl 商品图片地址
// category 商品分类   goodsDesc   商品描述
// price 商品价格

export const add = (name, category, price, imgUrl, goodsDesc) => axios.post("/goods/add", {
    name,
    category,
    price,
    imgUrl,
    goodsDesc
})

// 19. 获取商品列表
// 请求地址：/goods/list
// 请求方式：GET      currentPage当前页码   pageSize每页条数
export const list = (currentPage, pageSize) => axios.get("/goods/list", {
    params: {
        currentPage,
        pageSize
    }
})

// 20. 删除商品
// 请求地址：/goods/del
// 请求方式：GET

export const del = (id) => axios.get("/goods/del", {
    params: {
        id
    }
})

//     21. 修改商品
// 请求地址：/goods/edit
// 请求方式：POST

export const goodsedit=(name,category,price,imgUrl,goodsDesc,id)=>axios.post("/goods/edit",{name,category,price,imgUrl,goodsDesc,id})


// 22. 获取订单列表(带查询功能)
// 请求地址：/order/list
// 请求方式：GET

export const orderlist=(params)=>axios.get("/order/list",{params})

// 23. 查询
// 请求地址：/order/search
// 请求方式：GET

export const search=()=>axios.get("/order/search",{params:{}})

// 24. 获取订单详情
// 请求地址：/order/detail
// 请求方式：GET
export const orddetail=(id)=>axios.get("/order/detail",{params:{id}})

// 25. 修改订单
// 请求地址：/order/edit
// 请求方式：POST
export const editorder=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post("/order/edit",{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

// 26. 获取店铺详情
// 请求地址：/shop/info
// 请求方式：GET
export const getinfo=()=>axios.get("/shop/info")

// 27. 店铺图片上传接口
// 请求地址：/shop/upload
// 请求方式：post

export const upshop=()=>axios.post("/shop/upload",{})

// 28. 店铺内容修改
// 请求地址：/shop/edit
// 请求方式：post
export const editshop=(id,
    name,
    bulletin,
    avatar,
    deliveryPrice,
    deliveryTime,
    description,
    score,
    sellCount,
    supports,
    date,
    pics
    )=>axios.post("/shop/edit",{id,
        name,
        bulletin,
        avatar,
        deliveryPrice,
        deliveryTime,
        description,
        score,
        sellCount,
        supports,
        date,
        pics})
// export const editshop=(params)=>axios.post("/shop/edit",{params})

// 29. 首页报表接口
// 请求地址：/order/totaldata
// 请求方式：GET
export const totaldata=()=>axios.get("/order/totaldata")

// 30. 订单报表接口
// 请求地址：/order/ordertotal
// 请求方式：GET
export const ordtotal=(date)=>axios.get("/order/ordertotal",{params:{date}})