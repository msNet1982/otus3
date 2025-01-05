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
        <div class="row wrap justify-end q-mb-lg">
            <Header 
                v-model:searchTitle="searchTitle"
                v-model:searchMaxPrice="searchMaxPrice"
            />
        </div>
        <div class="q-pa-md row justify-around items-stretch q-gutter-sm" v-if="productsFiltred.length">
            <div v-for="product in productsFiltred" :key="product.id" class="q-mb-md">
                <Product :product_info="product" />
            </div>
        </div>
        <div class="text-h6 text-center" v-else>
            Ничего не найдено. Попробуйте изменить условия поиска.
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, provide, onMounted } from 'vue'
    import Product from './Product.vue'
    import Header from './Header.vue'
    import { getProducts, productList } from '../composables'

    const productsFiltred = ref()
    const searchTitle = ref("")
    const searchMaxPrice = ref()
    const categories = ref()
    const isPending = ref(true)

    provide("categories", categories)

    onMounted(async () => {
        if (!productList.value.length) productList.value = await getProducts()
        isPending.value = false
    })


    watch(isPending, () => {
        productsFiltred.value = [...productList.value]
        categories.value = [...new Set(productList.value.map(item => item.category))]
    })

    const search = () => {
        productsFiltred.value = [...productList.value]
        productsFiltred.value = productsFiltred.value.filter(product => product.title.toLowerCase().includes(searchTitle.value.toLowerCase()) && (searchMaxPrice.value ? (product.price <= searchMaxPrice.value) : true))
    }

    watch([searchTitle, searchMaxPrice], () => search())
</script>

<style scoped>
    .cat {
        width: 100%;
    }
</style>