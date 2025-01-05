<template>
    <div class="text-center" v-if="isPending">
        <q-spinner
            color="primary"
            size="3em"
        />
        <br />
        Loading...
    </div>
    <div v-else>
        <div class="row justify-between">
            <router-link :to="{name: 'Index'}">
                <q-btn class="btn-more" color="secondary" label="Вернуться в каталог продукции" no-caps />
            </router-link>

            <q-btn class="btn-more" color="positive" label="Добавить в корзину" @click="addToCart(route.params.id, 'dec')" no-caps />
        </div>
        <div class="text-h6 q-mt-lg">Карточка описания товара:</div>
        
        <q-card class="my-card">
            <q-card-section>
                <div class="text-subtitle2 text-weight-bold text-center">{{ productDetails[0].title }}</div>
            </q-card-section>

            <q-card-section>
                <div class="q-pa-md text-center">
                    <img :src="productDetails[0].image" class="image" />
                </div> 
            </q-card-section>

            <q-card-section class="q-pt-none">
                <span class="text-weight-bold">Description:</span> {{ productDetails[0].description }}
            </q-card-section>

            <q-card-section class="q-pt-none">
                <span class="text-weight-bold">Category:</span> {{ productDetails[0].category }}
            </q-card-section>

            <q-card-section class="q-pt-none">
                <span class="text-weight-bold">Price:</span> {{ productDetails[0].price }}
            </q-card-section>

            <q-card-section class="q-pt-none">
                <span class="text-weight-bold">Rating:</span> {{ productDetails[0].rating.rate }}
            </q-card-section>

            <q-card-section class="q-pt-none">
                <span class="text-weight-bold">Count:</span> {{ productDetails[0].rating.count }}
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { productList, getProducts, useChangeToCart } from '../composables'

    const productDetails = ref([])
    const isPending = ref(true)

    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
        //здесь анализируем прямой ли заход на карточку с продукцией или перешли на неё с главной страницы.
        //если заход прямой, то наполняем заново массив с продукцией, если нет, то пользуемся тем, что было на главной
        //это позволяет нам просматривать товар, которого нет в API, но мы его добавили вручную
        if (!productList.value.length) productList.value = await getProducts()
        productDetails.value = [...productList.value]
        productDetails.value = productDetails.value.filter(product => product.id == route.params.id)
        if (productDetails.value.length == 0) router.push({name: 'PageNotFound'})
        else isPending.value = false
    })

    const addToCart = (id, type) => useChangeToCart(id, type)
</script>

<style scoped>
    .image {
        width: 250px;
    }
</style>