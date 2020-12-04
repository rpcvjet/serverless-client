import Home from './components/Home.vue' 
import NotFound from './components/NotFound.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/signup', component: Signup},
    {path: '*', component: NotFound}
]

export default routes;