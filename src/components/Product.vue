<template>
    <q-card class="my-card">
        <q-card-section>
            <div class="text-subtitle2 text-weight-bold text-center">{{ product_info.title }}</div>
        </q-card-section>

        <img :src="product_info.image" class="q-pa-md image">

        <q-card-section class="q-pt-none">
            <span class="text-weight-bold">Category:</span> {{ product_info.category }}
        </q-card-section>

        <q-card-section class="q-pt-none">
            <span class="text-weight-bold">Price:</span> {{ product_info.price }}
        </q-card-section>

        <q-card-section class="q-pt-none">
            <span class="text-weight-bold">Rating:</span> {{ product_info.rating.rate }}
        </q-card-section>

        <q-card-section class="q-pt-none">
            <span class="text-weight-bold">Count:</span> {{ product_info.rating.count }}
        </q-card-section>

        <q-card-section class="q-pt-none">
            <router-link :to="{name: 'ProductDetails', params: {id: product_info.id}}">
                <q-btn class="btn-more" color="secondary" label="Подробнее..." no-caps />
            </router-link>
        </q-card-section>
    </q-card>
</template>


<script setup>
    const props = defineProps(['product_info'])
</script>


<style scoped>
    .my-card {
        width: 100%;
        max-width: 250px;
    }

    .image {
        width: 250px;
        height: 200px;
        object-fit: cover;
        object-position: center;
    }

    .btn-more {
        width: 100%;
    }
</style>