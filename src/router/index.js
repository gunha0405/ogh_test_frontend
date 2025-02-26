import { createWebHistory, createRouter } from 'vue-router';
import BoardList from '../components/BoardList.vue';

const routes = [
    {path : "/board/list", component : BoardList},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;