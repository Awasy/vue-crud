<template>
<div class="wrapper">
    <h3>Продукты</h3>
    <b-row class="row">
        <b-col class="column" v-for="(product,i) in products" :key="product.id">
            <span>{{product.name}}</span>
            <span>{{product.price}}</span>
            <span>{{product.type}}</span>
            <span><a @click="$emit('showProduct',`${product.name}`,`${product.type}`,`${product.price}`,`${product.description}`)">Посмотреть описание</a></span>
            <button class="btn btn-success" @click="$emit('toEditProduct',`${product.name}`,`${product.type}`
            ,`${product.price}`,`${product.description}`,`${product.id}`,`${i}`)">Редактировать</button>
            <button class="btn btn-danger" @click="$emit('showModalProduct',`${i}`)">Удалить</button>
        </b-col>
    </b-row>
    <button class="btn btn-secondary" @click="$emit('toAddProduct')">Добавить</button>
</div>
</template>

<script>
export default {
    props:['products'],
   
}
</script>

<style scoped>
    .btn{
        margin: 5px 0px;
    }
    .column{
        display: inline;
        margin: 10px;
        
    }
    span{
        display: block;
        overflow: hidden;
    }
</style>
