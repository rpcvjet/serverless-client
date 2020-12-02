import Home from './components/Home.vue' 
import NotFound from './components/NotFound.vue';

const routes = [
    {path: '/', component: Home},
    {path: '*', component: NotFound}
]

export default routes;