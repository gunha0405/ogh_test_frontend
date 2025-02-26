import { createWebHistory, createRouter } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardRead from '../components/BoardRead.vue';

const routes = [
    {path : "/board/list", component : BoardList},
    {path : "/board/read/:boardIdx", component : BoardRead}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;