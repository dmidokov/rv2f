import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../components/Login.vue";
import Leftbar from "../components/Leftbar.vue";
import Organizations from "../components/Organizations.vue";
import SideBarBig from "../components/SideBarBig.vue";
import {Auth} from "../js/Auth";
import Users from "../components/Users.vue";
import Settings from "../components/Settings.vue";
import Money from "../components/Money.vue"
import Branches from "../components/Branches.vue";
import Main from '../components/Main.vue'
import Account from '../components/Account.vue'

const routes = [
    {
        path: '/',
        name: 'main',
        components: {
            navigation: Leftbar,
            content: Main
        },
    },
    {
        path: '/login',
        name: 'login',
        components: {
            navigation: SideBarBig,
            content: Login
        }
    },
    {
        path: '/home',
        component: () => import("../views/view1.vue")
    },
    {
        path: '/organizations',
        name: 'organizations',
        components: {
            navigation: Leftbar,
            content: Organizations
        },
    },
    {
        path: '/branches',
        name: 'branches',
        components: {
            navigation: Leftbar,
            content: Login
        },
    },
    {
        path: '/users',
        name: 'users',
        components: {
            navigation: Leftbar,
            content: Users
        },
    },    
    {
        path: '/settings',
        name: 'settings',
        components: {
            navigation: Leftbar,
            content: Settings
        },
    },
    {
        path: '/money',
        name: 'money',
        components: {
            navigation: Leftbar,
            content: Money
        },
    },
    {
        path: '/branches',
        name: 'branches',
        components: {
            navigation: Leftbar,
            content: Branches
        },
    },
    {
        path: '/account',
        name: 'account',
        components: {
            navigation: Leftbar,
            content: Account
        },
    }
]

const router = createRouter({
    history: createWebHashHistory('/'),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.name !== 'login') {
        let response = await new Auth().authCheck()
        if (!response) {
            console.log("true")
            next({name: 'login'})
        } else {
            console.log("false")
            next.call()
        }
    } else {
        next.call()
    }
})

export default router