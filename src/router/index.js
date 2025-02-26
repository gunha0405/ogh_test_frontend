import { createWebHistory, createRouter } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardRead from '../components/BoardRead.vue';
import BoardRegister from '../components/BoardRegister.vue';

const routes = [
    {path : "/board/list", component : BoardList},
    {path : "/board/read/:boardIdx", component : BoardRead},
    {path : "/board/register", component : BoardRegister}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;