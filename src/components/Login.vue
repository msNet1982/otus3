<template>
    <div class="body">
        <div style="width: 375px;">
            <q-card class="my-card q-mt-lg">
                <q-card-section>
                    <div>
                        <span class="text-subtitle1 text-weight-bold q-pl-xs">Логин:</span>
                        <q-input outlined v-model.trim="login" dense />
                    </div>
                    <div class="q-mt-md">
                        <span class="text-subtitle1 text-weight-bold q-pl-xs">Пароль:</span>
                        <q-input outlined type="password" v-model.trim="password" dense />
                    </div>
                    <div class="q-mt-lg">
                        <q-btn color="green-9" label="Войти" @click="auth" no-caps style="width: 100%;" />
                    </div>
                    <div v-if="isError" class="text-center" id="message" style="margin-top: 20px; margin-bottom: 0px; color: red; font-weight: bold;">
                        Введите логин и пароль
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"

    const router = useRouter()

    const login = ref()
    const password = ref()
    const isError = ref(false)

    localStorage.setItem('login', false)

    function auth() {
        if (login.value && password.value) {
            localStorage.setItem('login', true)
            router.push({name: 'Index'})
        }
        else isError.value = true
    }
</script>

<style scoped>
    .body {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        margin: 0;
        display: flex;
        place-items: center;
        justify-content: center;
        min-width: 320px;
        min-height: 80vh;
    }
</style>