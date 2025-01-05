<template>
    <div class="row justify-end q-gutter-md">
        <router-link :to="{name: 'AddProduct'}" v-if="isAuth">
            <q-btn color="primary" label="Добавить товар" class="btn" no-caps />
        </router-link>
        <Input text="Поиск по названию" customType="text" class="btn" v-model="searchTitle" />
        <Input text="Максимальная цена" customType="number" class="btn" v-model="searchMaxPrice" />
    </div>

    <ModalSendOrder v-if="isShowSendOrder" :isShowSendOrder="isShowSendOrder" @closeModal="isShowSendOrder=false" />
</template>

<script setup>
    import { ref } from 'vue' 
    import { isAuth } from '../composables'
    import Input from './Input.vue'
    import ModalSendOrder from './ModalSendOrder.vue'

    const searchTitle = defineModel('searchTitle')
    const searchMaxPrice = defineModel('searchMaxPrice')
    const isShowSendOrder = ref(false)
</script>

<style lang="css" scoped>
    .btn {
        width: 175px;
        height: 25px;
    }
</style>