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
import selectApplied from '@/components/selectApplied'
import selectOperate from '@/components/selectOperate'
import addInformation from '@/components/addInformation'
import staffMessage from '@/components/staffMessage'
import InformationList from '@/components/InformationList'
import insertInformation from '@/components/insertInformation'
import updateInformation from '@/components/updateInformation'
import boardList from '@/components/boardList'
import insertBoard from '@/components/insertBoard'
import updateBoard from '@/components/updateBoard'
import ApplyText from '@/components/ApplyText'

import searchUser from '@/components/searchUser'
import staffInfo from '@/components/staffInfo'
import staffReply from '@/components/staffReply'
import myReply from '@/components/myReply'
import insertStaff from '@/components/insertStaff'
import manageParking from '@/components/manageParking'
import login from '@/components/login'
import getword from '@/components/getword'
import userReister from '@/components/userReister'
import binding from '@/components/binding'
import updateUserMessage from '@/components/updateUserMessage'

import userinfo from '@/components/userinfo'
import pay from '@/components/pay'
import advise from '@/components/advise'
import informations from '@/components/informations'
import apply from '@/components/apply'
import myhouse from '@/components/myhouse'
import userupdate from '@/components/userupdate'
import news from '@/components/news'
import boardinfo from '@/components/boardinfo'
import informationinfo from '@/components/informationinfo'
import parkingSpaces from '@/components/parkingSpaces'
import updateParkingSpaces from '@/components/updateParkingSpaces'
import myadvise from '@/components/myadvise'
import replyinfo from '@/components/replyinfo'


import noPermission from '@/components/noPermission'
import insertUserMessage from '@/components/insertUserMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/userReister',
      name: 'userReister',
      component: userReister
    },
    {
      path: '/binding',
      name: 'binding',
      component: binding
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/getword',
      name: 'getword',
      component: getword
    },
    {
      path:'/ApplyText',
      name:'ApplyText',
      component:ApplyText
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/ApplyText',
      name:'ApplyText',
      component:ApplyText
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
          path:'permissionAssignment/:staffId',
          name:'permissionAssignment',
          component:permissionAssignment
        },
        {
          path:'staffReply/:adviseId',
          name:'staffReply',
          component:staffReply
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
          path:'selectApplied',
          name:'selectApplied',
          component:selectApplied
        },
        {
          path:'selectOperate',
          name:'selectOperate',
          component:selectOperate
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
          path:'staffInfo',
          name:'staffInfo',
          component:staffInfo
        },
        {
          path:'myReply',
          name:'myReply',
          component:myReply
        },
        {
          path:'insertStaff',
          name:'insertStaff',
          component:insertStaff
        },
        {
          path:'manageParking',
          name:'manageParking',
          component:manageParking
        },
        {
          path:'/InformationList',
          name:'InformationList',
          component:InformationList
        },
        {
          path:'/insertInformation',
          name:'insertInformation',
          component:insertInformation
        },
        {
          path:'/updateInformation/:inid',
          name:'updateInformation',
          component:updateInformation
        },
        {
          path:'/boardList',
          name:'boardList',
          component:boardList
        },
        {
          path:'/insertBoard',
          name:'insertBoard',
          component:insertBoard
        },
        {
          path:'/updateBoard/:boardId',
          name:'updateBoard',
          component:updateBoard
        },
        {
          path:'noPermission',
          name:'noPermission',
          component:noPermission
        },
        {
          path:'parkingSpaces',
          name:'parkingSpaces',
          component:parkingSpaces
        },
        {
          path:'/updateParkingSpaces/:up_id',
          name:'updateParkingSpaces',
          component:updateParkingSpaces
        },
        {
          path:'insertUserMessage',
          name:'insertUserMessage',
          component:insertUserMessage
        },
        {
          path:'updateUserMessage/:id',
          name:'updateUserMessage',
          component:updateUserMessage
        }
      ],

    },
    {
      path:'/searchUser/:searchInput',
      name:'searchUser',
      component:searchUser
    },
    {
      path:'/userinfo',
      name:'userinfo',
      component:userinfo,
      children:[
        {path:'/userupdate',
          name:'userupdate',
          component:userupdate},
        {path:'/advise',
          name:'advise',
          component:advise},
        {path:'/apply',
          name:'apply',
          component:apply},
        {path:'/myhouse',
          name:'myhouse',
          component:myhouse},
        {path:'/informations',
          name:'informations',
          component:informations},
        {path:'/pay',
          name:'pay',
          component:pay},
        {path:'/news',
          name:'news',
          component:news},
        {path:'/boardinfo/:boardId',
          name:'boardinfo',
          component:boardinfo},
        {path:'/informationinfo/:inid',
          name:'informationinfo',
          component:informationinfo},
        {path:'/replyinfo/:adviseid',
          name:'replyinfo',
          component:replyinfo},
        {path:'/myadvise',
          name:'myadvise',
          component:myadvise}
      ]
    }
  ]
})

