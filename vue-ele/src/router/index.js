import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    
    redirect:'/Home'
  },

  {
    path: "/home",
    name: "Home",
    component: () =>import("../views/Home/index.vue")
  },

  {
    path: "/login",
    name: "Login",
    component: () =>import("../views/Login/index.vue")
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//路由守卫
//登录后才能跳转
router.beforeEach((to,form,next)=>{
    // console.log(to);//从哪里来的
    // console.log(form);//到哪里去
    // console.log(next);
    const isLogin = localStorage.getItem('ele_login') ? true : false
    if(to.path =='/login'){
      next()
    }else{
      //是否登录 没有登录重新定向到登录页面，如果登录了就正常next
      isLogin ? next() : next ('/login')
    }
    
})

export default router;
