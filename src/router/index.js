import Vue from 'vue'
import Router from 'vue-router'
// IAM
import Login from '@/components/iam/login/login' // 登录
import NotFound from '@/components/iam/notfound/notfound' // 404页面
import ForgetPwd from '@/components/iam/login/forgetPwd/forgetPwd' // 忘记密码
// 路由
import Frame from '@/components/frame/frame' // 网页框架
import Personal from '@/components/personal/personal' // 个人中心
import Overview from '@/components/overview/overview' // 概览
import EnterShop from '@/components/shop/shop' // 入驻店铺
import AddShop from '@/components/shop/add/add' // 创建店铺
import EditShop from '@/components/shop/edit/edit' // 编辑店铺
import Goods from '@/components/goods/goods' // 商品列表
import GoodsDetail from '@/components/goods/detail/detail' // 商品详情
import Order from '@/components/order/order' // 订单列表
import OrderDetail from '@/components/order/detail/detail' // 订单详情
import Discount from '@/components/discount/discount' // 打折券
import DiscountDetail from '@/components/discount/detail/detail' // 打折券详情
import Member from '@/components/member/member' // 会员列表
import MemberDetail from '@/components/member/detail/detail' // 会员详情

// 系统管理部分
import User from '@/components/system/user/user' // 用户管理
import UserAddEdit from '@/components/system/user/addEdit/addEdit' // 用户添加或编辑
import Role from '@/components/system/role/role' // 角色列表
import RoleAddEdit from '@/components/system/role/addEdit/addEdit' // 角色添加或编辑
import Task from '@/components/system/task/task' // 定时任务列表
import TaskDetail from '@/components/system/task/detail/detail' // 定时任务详情
import File from '@/components/system/file/file' // 文件管理
// 门户
import ProtalFrame from '@/components/protal/protal' // 门户框架
import ProtalBook from '@/components/protal/book/book' // 协议声明 框架
import UserBook from '@/components/protal/book/userBook/userBook' // 优乐用户协议
import Statement from '@/components/protal/book/statement/statement' // 法律声明
import LinkUs from '@/components/protal/book/linkUs/linkUs' // 联系我们

// 测试页面
import Test from '@/components/test/test' // 测试页面
Vue.use(Router)
// 前端路由
const axios = require('axios')
const router = new Router({
  mode: 'history',
  base: '',
  exact: true,
  linkActiveClass: 'linkActive',
  routes: [
    { // 门户
      path: '/',
      name: 'ProtalFrame',
      component: ProtalFrame,
      children: [
        { // 协议声明 框架
          path: '/book',
          name: 'ProtalBook',
          component: ProtalBook,
          children: [
            { // 优乐用户协议
              path: '/userBook',
              name: 'UserBook',
              component: UserBook
            },
            { // 法律声明
              path: '/statement',
              name: 'Statement',
              component: Statement
            },
            { // 联系我们
              path: '/linkUs',
              name: 'LinkUs',
              component: LinkUs
            }
          ]
        }
      ]
    },
    { // 登录页面
      path: '/login',
      name: 'Login',
      component: Login
    },
    { // 忘记密码
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    },
    { // 网页主体
      path: '/frame',
      name: 'Frame',
      component: Frame,
      children: [
        { // 测试页面
          path: '/test',
          name: 'Test',
          meta: {
            require: true
          },
          component: Test
        },
        { // 个人中心
          path: '/personal',
          name: 'Personal',
          meta: { // 是否需要登录
            require: true
          },
          component: Personal
        },
        { // 概览
          path: '/overview',
          name: 'Overview',
          meta: {
            require: true
          },
          component: Overview
        },
        { // 入驻店铺
          path: '/shop',
          name: 'EnterShop',
          meta: {
            require: true
          },
          component: EnterShop
        },
        { // 新建店铺
          path: '/shop/add',
          name: 'AddShop',
          meta: {
            require: true
          },
          component: AddShop
        },
        { // 编辑店铺
          path: '/shop/edit',
          name: 'EditShop',
          meta: {
            require: true
          },
          component: EditShop
        },
        { // 商品列表
          path: '/goods',
          name: 'Goods',
          meta: {
            require: true
          },
          component: Goods
        },
        { // 商品详情
          path: '/goods/detail',
          name: 'GoodsDetail',
          meta: {
            require: true
          },
          component: GoodsDetail
        },
        { // 订单列表
          path: '/order',
          name: 'Order',
          meta: {
            require: true
          },
          component: Order
        },
        { // 订单详情
          path: '/order/detail',
          name: 'OrderDetail',
          meta: {
            require: true
          },
          component: OrderDetail
        },
        { // 会员列表
          path: '/member',
          name: 'Member',
          meta: {
            require: true
          },
          component: Member
        },
        { // 会员详情
          path: '/member/detail',
          name: 'MemberDetail',
          meta: {
            require: true
          },
          component: MemberDetail
        },
        { // 打折券
          path: '/discount',
          name: 'Discount',
          meta: {
            require: true
          },
          component: Discount
        },
        { // 打折券详情
          path: '/discount/detail',
          name: 'DiscountDetail',
          meta: {
            require: true
          },
          component: DiscountDetail
        },
        /* 系统管理部分 */
        { // 用户管理
          path: '/user',
          name: 'User',
          meta: {
            require: true
          },
          component: User
        },
        { // 新建用户
          path: '/user/add',
          name: 'UserAdd',
          meta: {
            require: true
          },
          component: UserAddEdit
        },
        { // 编辑用户
          path: '/user/edit',
          name: 'UserEdit',
          meta: {
            require: true
          },
          component: UserAddEdit
        },
        { // 角色列表
          path: '/role',
          name: 'Role',
          meta: {
            require: true
          },
          component: Role
        },
        { // 新建角色
          path: '/role/add',
          name: 'RoleAdd',
          meta: {
            require: true
          },
          component: RoleAddEdit
        },
        { // 编辑角色
          path: '/role/edit',
          name: 'RoleEdit',
          meta: {
            require: true
          },
          component: RoleAddEdit
        },
        { // 定时任务列表
          path: '/task',
          name: 'Task',
          meta: {
            require: true
          },
          component: Task
        },
        { // 新建定时任务
          path: '/task/detail',
          name: 'TaskDetail',
          meta: {
            require: true
          },
          component: TaskDetail
        },
        { // 文件管理
          path: '/file',
          name: 'File',
          meta: {
            require: true
          },
          component: File
        }
      ]
    },
    { // 404页面
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
// 路由全局守卫
router.beforeEach((to, from, next) => {
  let rname = to.name
  if (rname !== 'ForgetPwd' && rname !== 'Login') {
    return next()
  }
  // 登录状态下 不允许调到登录页与忘记密码页
  axios.post('/api/iam/getSession').then((res) => {
    // 拥有会话信息说明已经登录
    if (res.code * 1 === 0 && res.data) {
      next({ path: '/overview' })
    } else {
      next()
    }
  })
})
export default router
