<template>
    <div class="row justify-center">
        <q-card style="width: 500px;">
            <template v-if="showForm">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Форма отправки заказа</div>
                </q-card-section>
            
                <q-card-section class="q-mt-lg q-pt-none">
                    <div class="text-subtitle2">ФИО:</div>
                    <q-input outlined v-model.trim="name" v-bind="nameAttrs" dense />
                    <div class="text-caption errors" v-if="errors.name">{{ errors.name }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Адрес электронной почты:</div>
                    <q-input outlined v-model.trim="email" v-bind="emailAttrs" dense />
                    <div class="text-caption errors" v-if="errors.email">{{ errors.email }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Контактный номер телефона:</div>
                    <q-input outlined v-model="phone" mask="+# (###) ###-##-##" v-bind="phoneAttrs" dense />
                    <div class="text-caption errors" v-if="errors.phone">{{ errors.phone }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Выберите страну доставки:</div>
                    <q-select outlined v-model="country" :options="countryList" v-bind="countryAttrs" dense />
                    <div class="text-caption errors" v-if="errors.country">{{ errors.country }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2">Адрес доставки:</div>
                    <q-input outlined v-model.trim="adress" type="textarea" v-bind="adressAttrs" />
                    <div class="text-caption errors" v-if="errors.adress">{{ errors.adress }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-checkbox v-model="garant" label="Гарантирую оплату товара при его поступлении" />
                </q-card-section>
            </template>

            <template v-if="isPending">
                <div class="text-h6 text-center q-mt-xl q-mb-lg">Формируем заявку...</div>
            </template>

            <template v-if="isSuccess">
                <div class="text-h6 text-center q-mt-xl q-mb-lg">Заказ успешно оформлен!</div>
                <div class="row justify-center">
                    <router-link :to="{name: 'Index'}">
                        <q-btn color="primary" label="Вернуться на главную страницу" no-caps />
                    </router-link>
                </div>
            </template>
            
            <q-card-actions align="right">
                <q-btn label="Оформить заказ" color="positive" no-caps class="btn" :disable="!(meta.valid && garant)" @click="sendForm" v-if="showForm"/>
                <router-link :to="{name: 'Cart'}">
                    <q-btn label="Отменить заказ" color="negative" no-caps class="btn q-ml-sm" v-if="showForm" />
                </router-link>
            </q-card-actions>


        </q-card>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import * as yup from 'yup'
    import { useForm } from 'vee-validate'
    import { useChangeDataServer, cart } from '../composables'

    const { isPending, isError, isSuccess, mutate } = useChangeDataServer()

    const schema = yup.object({
        name: yup.string().required('Данное поле обязательное к заполнению').min(5, 'ФИО не может состоять менее чем из 5 символов'),
        email: yup.string().required('Введите адрес электронной почты').email('Введите корректный e-mail'),
        phone: yup.string().required('Введите контактный номер телефона').length(18, 'Введите корректный номер телефона'),
        country: yup.string().required('Выберите страну доставки'),
        adress: yup.string().required('Укажите адрес доставки товара').min(5, 'Адрес доставки не может состоять менее, чем из 5 символов')
    });

    const { meta, values, errors, handleSubmit, defineField } = useForm({
        validationSchema: schema,
    });

    const showForm = ref(true)

    const garant = ref(false)

    const validateFn = (state) =>  {
        return {
            validateOnModelUpdate: state.errors.length > 0,
        };
    }

    const [name, nameAttrs] = defineField("name", state => validateFn(state))
    const [email, emailAttrs] = defineField("email", state => validateFn(state))
    const [phone, phoneAttrs] = defineField("phone", state => validateFn(state))
    const [country, countryAttrs] = defineField("country", state => validateFn(state))
    const [adress, adressAttrs] = defineField("adress", state => validateFn(state))

    const countryList = ["Россия", "Беларусь", "Казахстан", "Армения", "Азербайджан"]

    const sendForm = handleSubmit(values => {
        showForm.value = false
        mutate(JSON.stringify(values, null, 2))
    });

    watch(isSuccess, () => cart.value = [])
</script>

<style lang="css" scoped>
    .btn {
        width: 150px;
    }

    .errors {
        color: orangered;
    }
</style>