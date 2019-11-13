import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import staffMain from '@/components/staffMain'
import viewStaff from '@/components/viewStaff'
import permissionAssignment from '@/components/permissionAssignment'
import propertyAccount from '@/components/propertyAccount'
import deduct from '@/components/deduct'
import replyAdvise from '@/components/replyAdvise'
import selectApply from '@/components/selectApply'
import selectOperate from '@/components/selectOperate'
import addBoard from '@/components/addBoard'
import addInformation from '@/components/addInformation'
import staffMessage from '@/components/staffMessage'
import searchUser from '@/components/searchUser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:"/staffMain",
      name:"staffMain",
      component:staffMain,
      children:[
        {
          path:'viewStaff',
          name:'viewStaff',
          component:viewStaff
        },
        {
          path:'permissionAssignment',
          name:'permissionAssignment',
          component:permissionAssignment
        },
        {
          path:'propertyAccount',
          name:'propertyAccount',
          component:propertyAccount
        },
        {
          path:'deduct',
          name:'deduct',
          component:deduct
        },
        {
          path:'replyAdvise',
          name:'replyAdvise',
          component:replyAdvise
        },
        {
          path:'selectApply',
          name:'selectApply',
          component:selectApply
        },
        {
          path:'selectOperate',
          name:'selectOperate',
          component:selectOperate
        },
        {
          path:'addBoard',
          name:'addBoard',
          component:addBoard
        },
        {
          path:'addInformation',
          name:'addInformation',
          component:addInformation
        },
        {
          path:'staffMessage',
          name:'staffMessage',
          component:staffMessage
        },
        {
          path:'searchUser/:searchInput',
          name:'searchUser',
          component:searchUser
        },




      ]
    }
  ]
})
