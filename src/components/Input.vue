<template>
    <q-input outlined :label="text" :mask="typeInput" dense />
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps(['text', 'customType'])

    const typeInput = ref("")

    if (props.customType === "number") typeInput.value = "######"
</script>