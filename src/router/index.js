import { createRouter, createWebHistory } from "vue-router";

import Index from "../components/Index.vue";
import ProductDetails from "../components/ProductDetails.vue";
import PageNotFound from "../components/PageNotFound.vue";
import Cart from "../components/Cart.vue";
import Login from "../components/Login.vue";
import AddProduct from "../components/AddProduct.vue";
import Checkout from "../components/Checkout.vue";

const routes = [
    {
        name: "Index",
        path: "/",
        component: Index
    },
    {
        name: "ProductDetails",
        path: "/product/:id",
        component: ProductDetails
    },
    {
        name: "Cart",
        path: "/cart/",
        component: Cart
    },
    {
        name: "Login",
        path: "/login/",
        component: Login
    },
    {
        name: "AddProduct",
        path: "/add/",
        component: AddProduct
    },
    {
        name: "Checkout",
        path: "/checkout/",
        component: Checkout
    },
    {
        name: "PageNotFound",
        path: "/:pathMatch(.*)*",
        component: PageNotFound
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

router.beforeEach( (to, from) => {
    if ((to.name === "AddProduct") && localStorage.getItem('login') === "false") {
        return ({ name: 'Login' })
    }
});