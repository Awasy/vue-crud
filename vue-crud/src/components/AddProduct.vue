<template>
<div class="wrapper">
    <h3>Добавление продукта</h3>
    <form class="form-text" @submit="$event.preventDefault()">
        <label>Название продукта:</label>
        <input type="text" :class="classValid.classValidName" class="form-control" 
        placeholder="Введите название продукта" v-model="name">
        <label>Цена продукта:</label>
        <input type="text" :class="classValid.classValidPrice" class="form-control" 
        placeholder="Введите цену продукта" v-model="price">
        <select v-model="type" class="">
            <option :value="type" v-for="(type,i) in typesProduct" :key="i">{{type}}</option>
        </select>
         <textarea class="form-control" cols="45" rows="10" v-model="description"></textarea>
        <button class="btn btn-success"
                :disabled="toggleButton"
                @click="$emit('pushProduct',`${name}`,`${price}`,`${type}`,`${description}`)">Добавить</button>
        <button class="btn btn-primary" @click="$emit('backToList')">Вернуться к списку</button>
    </form>
</div>
</template>

<script>
export default {
    props:['typesProduct'],
    data(){
       return{
        name:'',
        price: 0,
        type:'',
        description: '',
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
            if(this.name.trim() == ''){
                this.classValid.classValidName = 'is-invalid';
                return true;
            }
            else{
                this.classValid.classValidName = 'is-valid';
                return false;
            }
        },
        validatePrice(){
            if(this.price <= 0 || isNaN(this.price)){
                this.classValid.classValidPrice = 'is-invalid';
                return true;
            }
            else{
                this.classValid.classValidPrice = 'is-valid';
                return false;
            }
        },
        validateInputs(){
            
            if(this.validateName || this.validatePrice || this.type == ''){
                return true;
            }
            else{
                return false;
            }
        }
    },
   
}
</script>

<style scoped>
input{
    margin: 10px 0;
}
button{
    margin: 10px 0;
}

.form-control{
    max-width: 40%;
}
select{
    margin: 10px 0;
}

</style>
