<template>
    <div class="wrapper">
        <h3>Редактирование продукта</h3>
        <form @submit="$event.preventDefault()">
            <label>Измените название:</label>
            <input type="text" :class="classValid.classValidName" class="form-control" 
            placeholder="Введите название продукта" v-model="product.name">
            <label>Измените цену:</label>
            <input type="text" :class="classValid.classValidPrice" class="form-control"
            placeholder="Введите цену продукта" v-model="product.price">
            <select v-model="product.type">
                <option :value="type" v-for="(type,i) in typesProduct" :key="i">{{type}}</option>
            </select>
            <textarea class="form-control" cols="45" rows="10" v-model="product.description"></textarea>
            <button class="btn btn-success"
                    :disabled="toggleButton"
                    @click="onUpdateProduct">Принять</button>
            <button class="btn btn-primary" @click="$emit('backToList')">Вернуться к списку</button>
        </form>
    </div>
</template>

<script>
export default {
    props:['product','id','typesProduct'],
    data(){
        return{
            classValid:{
                classValidName:'',
                classValidPrice:''
            }
        }
    },
    computed: {
        toggleButton(){
            let flag;
            if(this.validateInputs){
                flag = true;
            }
            else{
                flag = false;
            }
            return flag;
        },
        validateName(){
            if(this.product.name.trim() == ''){
                this.classValid.classValidName = 'is-invalid';
                return true;
            }
            else{
                this.classValid.classValidName = 'is-valid';
                return false;
            }
        },
        validatePrice(){
            if(this.product.price <= 0 || isNaN(this.product.price)){
                this.classValid.classValidPrice = 'is-invalid';
                return true;
            }
            else{
                this.classValid.classValidPrice = 'is-valid';
                return false;
            }
        },
        validateInputs(){
            
            if(this.validateName || this.validatePrice || this.product.type == ''){
                return true;
            }
            else{
                return false;
            }
        },
    },
    methods: {
        onUpdateProduct(){
            this.$emit('updateProduct');
        }
    }
}
</script>

<style scoped>
input{
    margin: 10px 0;
}
button{
    margin: 10px 0;
}
select{
    margin: 10px 0;
}

.form-control{
    max-width: 40%;
}

</style>
