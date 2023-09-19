import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useCounterStore } from '../stores/counter';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: () => import('../views/welcome.vue'),
          meta: {
            arr: [{ title: '首页', nav: true }],
          },
        },
        // {
        //   path: '/department',
        //   name: 'department',
        //   component: () => import('../views/system/department.vue'),
        //   meta: {
        //     arr: [{ title: '首页', nav: true }, { title: '系统管理' }, { title: '机构管理' }],
        //   },
        // },
        // {
        //   path: '/userList',
        //   name: 'userList',
        //   component: () => import('../views/system/UserList.vue'),
        //   meta: {
        //     arr: [{ title: '首页', nav: true }, { title: '系统管理' }, { title: '用户管理' }],
        //   },
        // },
        // {
        //   path: '/menuList',
        //   name: 'menuList',
        //   component: () => import('../views/system/MenuList.vue'),
        //   meta: {
        //     arr: [{ title: '首页', nav: true }, { title: '系统管理' }, { title: '权限管理' }],
        //   },
        // },
        // {
        //   path: '/roleList',
        //   name: 'roleList',
        //   component: () => import('../views/system/RoleList.vue'),
        //   meta: {
        //     arr: [{ title: '首页', nav: true }, { title: '系统管理' }, { title: '角色管理' }],
        //   },
        // },
      ],
    },
    // {
    //   path: '/:cachAll(.*)',
    //   name: '404',
    //   component: () => import('../views/404.vue'),
    //   beforeEnter: (to, from, next) => {
    //     const store = useCounterStore();
    //     console.log(1);

    //     let path = store.pathobj.path || ''
    //     if (path)
    //     {
    //       next(path)
    //     } else
    //     {
    //       next()
    //     }
    //   }
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   // console.log(to);

//   // document.title=to.meta.arr.title
//   let token = localStorage.getItem('token');
//   if (!token && to.path != '/login') {
//     next('/login');
//   } else if (token && to.path == '/login') {
//     next('/');
//   } else {
//     next();
//   }
// });

let flag = true;
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') || '';
  const store = useCounterStore();
  if (!token && to.path != '/login') {
    next('/login');
  } else if (token && to.path == '/login') {
    next('/');
    if (flag && store.menuList.length != 0) {
      store.menuList.forEach((item) => {
        var obj: any = {};
        obj.name = item.name;
        obj.path = item.path;
        obj.meta = item.meta;
        obj.component = getComponent(item.name);
        // console.log(obj);
        router.addRoute('home', obj);
      });
    }
    flag = false;
    next({
      ...to,
      replace: true,
    });
  } else {
    next();
  }
});

function getComponent(name: string) {
  return () => import(`@/views/system/${name}.vue`);
}

export default router;
