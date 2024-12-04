<script setup>
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const searchStr = defineModel()
const route = useRoute()
const store = useCartStore()
const userStore = useUserStore()
</script>


<template>
    <v-app-bar>
        <v-app-bar-title>Супер-пупер магазин {{ userStore.username }}</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-text-field v-if="route.path === '/'" class="mt-4 mr-4" prepend-icon="mdi-magnify" density="compact"
            variant="outlined" max-width="300" v-model="searchStr"></v-text-field>
        <v-btn to="/">Главная</v-btn>
        <v-btn class="ml-2" to="/newproduct">Добавить продукт</v-btn>
        <v-badge v-if="route.path === '/'" :content="store.productAmmount" :dot="store.productAmmount === 0" inline>
            <v-btn color="indigo" icon="mdi-cart-variant" to="/cart"></v-btn>
        </v-badge>
    </v-app-bar>
</template>