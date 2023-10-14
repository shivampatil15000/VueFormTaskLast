import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import EmployeeDetails from './components/EmployeeDetails.vue';
import ViewDetails from './components/ViewDetails.vue';
import HeaderComp from './components/HeaderComp.vue';
import store from './store';
import '../src/assets/sass/style.scss';


const routes = [
    {
        path: '/',
        redirect: '/employee-details',
    },
    { path: '/view-details', component: ViewDetails },
    {
        path: '/employee-details', component: EmployeeDetails, name: 'editEmployee', props: route => ({
            editEmployeeId: route.query.editEmployeeId,
        })
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.component('HeaderComp', HeaderComp);
app.mount('#app');
