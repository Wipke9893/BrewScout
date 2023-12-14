import { createRouter as createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

// Import components
import HomeView from '../views/HomeView.vue';
import BreweryListView from '../views/BreweryListView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';
import RegisterView from '../views/RegisterView.vue';
import AdminView from '../views/AdminView.vue';
import BreweryInfoView from '../views/BreweryInfoView.vue';
import BrewAdminView from '../views/brewerView.vue';

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: '/brewer',
    name: 'brewer',
    component: BrewAdminView,
    meta: {
      requiresAuth: false
    }

  },

  {
    path: '/breweries',
    name: 'breweries',
    component: BreweryListView,
  },

  {
    path: '/breweryInfo/:brew_Id',
    name: 'breweryInfo',
    component: BreweryInfoView,
    props: true
  },

  {
    path: '/breweries/beers',
    name: 'beers',
    component: BreweryInfoView,
    props: true
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: '/brewAdmin/:brew_Id',
    name: 'brewAdmin',
    component: BrewAdminView,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false
    }
  }
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to) => {

  // Get the Vuex store
  const store = useStore();

  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    return { name: "login" };
  }
  // Otherwise, do nothing and they'll go to their next destination
});

export default router;
