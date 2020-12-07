import Home from './components/Home.vue' 
import NotFound from './components/NotFound.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import NewNote from './components/NewNote.vue';
import NoteDetail from './components/NoteDetail.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/signup', component: Signup},
    {path: '/notes', component: NewNote},
    {path: '/notes/:id', component: NoteDetail },
    {path: '*', component: NotFound}
]

export default routes;