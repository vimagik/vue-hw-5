<script setup>
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { ref, watch, onMounted } from 'vue'

const productStore = useProductStore()
const { productsData, filteredData } = storeToRefs(productStore)

const searchStr = ref(null)
const minPrice = ref(0)
const maxPrice = ref(1000)
const rangePrice = ref([minPrice.value, maxPrice.value])

watch([searchStr, () => rangePrice.value], ([newStr, newRange]) => {
  productStore.activateFilter(newStr, newRange)
})

const dialog = ref(false)
const shopCart = ref({})

function addPurchase(productId) {
  const product = productsData.value.find((el) => el.id === productId)
  if (shopCart.value.hasOwnProperty(productId)) {
    shopCart.value[productId].amount += 1
  } else {
    shopCart.value[productId] = {
      amount: 1,
      title: product.title,
      price: product.price,
    }
  }
  dialog.value = true
}

const getAmountCart = function (productId) {
  return shopCart.value.hasOwnProperty(productId) ? shopCart.value[productId].amount : 0
}

onMounted(() => {
  shopCart.value = JSON.parse(localStorage.getItem('cart'))
  productStore.getProducts()
})
</script>

<template>
  <v-container fluid>
    <AppHeader v-model="searchStr" :cart="shopCart" />
    <v-progress-linear v-if="!filteredData" class="mt-3" color="cyan" indeterminate></v-progress-linear>
    <v-row v-else class="mt-3">
      <v-col cols="2">
        <ProductCardSearch v-model="searchStr" v-model:range-price="rangePrice" :minPrice="minPrice"
          :maxPrice="maxPrice" />
      </v-col>
      <v-col>
        <v-row class="d-flex justify-center">
          <ProductCard class="mt-5" v-for="product in filteredData" :key="product.id" :product-data="product"
            :productAmount="getAmountCart(product.id)" @buy="addPurchase(product.id)" />
        </v-row>
      </v-col>
    </v-row>
    <PurchaseConfirm v-model="dialog" />
  </v-container>
</template>
