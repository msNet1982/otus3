<template>
    <div>
        <router-link :to="{name: 'Index'}">
            <q-btn color="primary" label="Вернуться в каталог продукции" no-caps />
        </router-link>
    </div>
    <div class="row justify-center">
        <q-card style="width: 500px;">
            <template v-if="showForm">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Форма добавления товара</div>
                </q-card-section>
            
                <q-card-section class="q-mt-lg q-pt-none">
                    <div class="text-subtitle2">Категория:</div>
                    <q-input outlined v-model.trim="category" v-bind="categoryAttrs" dense />
                    <div class="text-caption errors" v-if="errors.category">{{ errors.category }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Артикул:</div>
                    <q-input outlined v-model.trim="id" v-bind="idAttrs" dense />
                    <div class="text-caption errors" v-if="errors.id">{{ errors.id }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Наименование:</div>
                    <q-input outlined v-model.trim="title" v-bind="titleAttrs" dense />
                    <div class="text-caption errors" v-if="errors.title">{{ errors.title }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Описание:</div>
                    <q-input outlined v-model.trim="description" type="textarea" v-bind="descriptionAttrs" />
                    <div class="text-caption errors" v-if="errors.description">{{ errors.description }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">URL изображения:</div>
                    <q-input outlined v-model.trim="image" v-bind="imageAttrs" dense />
                    <div class="text-caption errors" v-if="errors.image">{{ errors.image }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Текущая цена:</div>
                    <q-input outlined v-model.trim="price" v-bind="priceAttrs" dense />
                    <div class="text-caption errors" v-if="errors.price">{{ errors.price }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Текущие остатки:</div>
                    <q-input outlined v-model.trim="count" v-bind="countAttrs" dense />
                    <div class="text-caption errors" v-if="errors.count">{{ errors.count }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Рейтинг товара:</div>
                    <q-input outlined v-model.trim="rate" v-bind="rateAttrs" dense />
                    <div class="text-caption errors" v-if="errors.rate">{{ errors.rate }}</div>
                </q-card-section>
            </template>

            <template v-if="isPending">
                <div class="text-h6 text-center q-mt-xl q-mb-lg">Добавляем новый товар...</div>
            </template>

            <template v-if="isSuccess">
                <div class="text-h6 text-center q-mt-xl q-mb-lg">Новый товар успешно добавлен!</div>
                <div class="text-center">
                    <router-link :to="{name: 'Index'}">
                        <q-btn color="primary" label="Вернуться в каталог продукции" no-caps />
                    </router-link>
                </div>
            </template>

            <template v-if="isError">
                <div class="text-h6 text-center q-mt-xl q-mb-lg">Что-то пошло не так...</div>
            </template>
            
            <q-card-actions align="right">
                <q-btn label="Добавить товар" color="positive" no-caps class="btn" :disable="!meta.valid" @click="sendForm" v-if="showForm"/>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import * as yup from 'yup'
    import { useForm } from 'vee-validate'
    import { useChangeDataServer, productList } from '../composables'

    const { isPending, isError, isSuccess, mutate } = useChangeDataServer()

    const schema = yup.object({
        category: yup.string().required('Данное поле обязательное к заполнению').min(5, 'Наименование категории товара не может состоять менее чем из 5 символов'),
        title: yup.string().required('Данное поле обязательное к заполнению').min(5, 'Наименование товара не может состоять менее чем из 5 символов'),
        image: yup.string().required('Введите URL изображения').url('Введите корректный URL'),
        id: yup.number().typeError('Введите числовое значение').required('Введите артикул товара').min(0, 'Артикул не может быть отрицательным'),
        price: yup.number().typeError('Введите числовое значение').required('Введите текущую цену').min(0, 'Цена не может быть отрицательной'),
        description: yup.string().required('Введите описание товара').min(5, 'Описание товара не может состоять менее, чем из 5 символов'),
        rating: yup.object({
            count: yup.number().typeError('Введите числовое значение').required('Введите текущие остатки').min(0, 'Остатки не могут быть отрицательными'),
            rate: yup.number().typeError('Введите числовое значение').required('Введите рейтинг товара').min(0, 'Рейтинг не может быть отрицательным').max(5, 'Рейтинг не может быть больше 5')
        })
    });

    const { meta, values, errors, handleSubmit, defineField } = useForm({
        validationSchema: schema,
    });

    const showForm = ref(true)
    const formData = ref()

    const validateFn = (state) =>  {
        return {
            validateOnModelUpdate: state.errors.length > 0,
        };
    }

    const [title, titleAttrs] = defineField("title", state => validateFn(state))
    const [id, idAttrs] = defineField("id", state => validateFn(state))
    const [image, imageAttrs] = defineField("image", state => validateFn(state))
    const [price, priceAttrs] = defineField("price", state => validateFn(state))
    const [category, categoryAttrs] = defineField("category", state => validateFn(state))
    const [description, descriptionAttrs] = defineField("description", state => validateFn(state))
    const [count, countAttrs] = defineField("rating.count", state => validateFn(state))
    const [rate, rateAttrs] = defineField("rating.rate")

    const sendForm = handleSubmit(values => {
        formData.value = values
        showForm.value = false
        mutate(JSON.stringify(values, null, 2))
    });

    const addProduct = (newProduct) => {
        productList.value.push(newProduct)
    }

    watch(isSuccess, () => addProduct(formData.value))
</script>

<style lang="css" scoped>
    .btn {
        width: 150px;
    }

    .errors {
        color: orangered;
    }
</style>