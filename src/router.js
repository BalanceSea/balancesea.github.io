import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import PluginView from './views/PluginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: 92, behavior: 'smooth' };
    return { top: 0 };
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/plugins/:slug/', name: 'plugin', component: PluginView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

router.afterEach((to) => {
  const pluginName = to.name === 'plugin' ? to.params.slug : '';
  document.title = pluginName
    ? `${pluginName} | 云插件系列 Cloud`
    : '云插件系列 Cloud | 官方 Wiki';
});

export default router;
