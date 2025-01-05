<template>
    <div class="row justify-between">
        <router-link :to="{name: 'Index'}">
            <q-btn color="primary" label="Вернуться в каталог продукции" no-caps />
        </router-link>

        <q-btn color="negative" label="Очистить корзину" v-if="cart.length" @click="deleteCart" no-caps />
    </div>
    <div class="q-pa-md" v-if="cart.length">
        <div class="q-mt-md text-h6">Текущие товары в корзине:</div>
        <q-markup-table>
            <thead>
                <tr>
                    <th class="text-left">Наименование товара</th>
                    <th class="text-center">Цена за ед.</th>
                    <th class="text-center">Кол-во</th>
                    <th class="text-center">Итоговая цена</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in cart" :key="product.id">
                    <td class="text-left">{{ useInformProduct(product.id)[0].title }}</td>
                    <td class="text-center">{{ useInformProduct(product.id)[0].price }}</td>
                    <td class="text-center">
                        <span @click="useChangeToCart(product.id, 'inc')">
                            <img src="../assets/minus.svg" class="img_count" />
                        </span> 
                        {{ product.count }}
                        <span @click="useChangeToCart(product.id, 'dec')">
                            <img src="../assets/plus.svg" class="img_count" />
                        </span>
                    </td>
                    <td class="text-center">{{ Math.round(useInformProduct(product.id)[0].price * product.count * 100) / 100 }}</td>
                </tr>
            </tbody>
        </q-markup-table>
        <div class="q-mt-sm text-right text-h6">Итого позиций: {{ totalCount }}, на общую сумму: {{ totalPrice }}$</div>
        <div class="row q-mt-lg justify-end">
            <router-link :to="{name: 'Checkout'}">
                <q-btn color="primary" label="Оформить заказ" class="btn" no-caps />
            </router-link>
        </div>
    </div>
    <div v-else>
        <div class="q-mt-xl text-h6 text-center">Ваша корзина пуста</div>
    </div>
</template>

<script setup>
    import { cart, useInformProduct, totalCount, totalPrice, useChangeToCart } from '../composables'

    const deleteCart = () => {
        cart.value = []
    }
</script>

<style scoped>
    .img_count {
        width: 25px;
        position: relative;
        top: 6px;
        margin: 0px 7px;
    }

    .img_count:hover {
        cursor: pointer;
    }
</style>