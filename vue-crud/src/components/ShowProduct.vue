<template>
    <div class="wrapper">
        <h2>Информация о товаре</h2>
        <ul>
            <li v-for="(item,i) in productSHow" :key="i">{{item}}</li>
        </ul>
        <div class="product-desc">
            {{product.description}}
        </div>
        <button class="btn btn-primary" @click="$emit('backToList')">Вернуться к списку</button>
    </div>
</template>

<script>
export default {
    props:['product'],
    data(){
        return{
            productSHow: {
                name: this.product.name,
                price: this.product.price,
                type: this.product.type
            }
        }
    }
}
</script>

<style scoped>
.product-desc{
    white-space: pre-wrap;
    height:auto;
    overflow-y: scroll;
}
</style>
