<template>
  <div class="container-fluid">
    <table-products v-if="state == 'tableProducts'"
                    :products="products"
                    @toAddProduct="toAddProduct"
                    @toEditProduct="toEditProduct"
                    @showModalProduct="showModalProduct"
                    @showProduct="showProduct"></table-products>
    <add-product v-else-if="state == 'addProduct'"
                :typesProduct="typesProduct"
                 @pushProduct="pushProduct"
                 @backToList="backToList"></add-product>
    <edit-product v-else-if="state == 'editProduct'"
                  @updateProduct="updateProduct"
                  @backToList="backToList"
                  :typesProduct="typesProduct"
                  :product="product"
                  :id="product.id"
                  ></edit-product>
    <show-product :product="product" 
    v-else-if="state == 'showProduct'"
    @backToList="backToList"></show-product>
    <div v-else>Undefined</div>

    <div>
      <button @click="getProducts">Request</button>
    <b-modal size="mt" v-model="showModal"  hide-footer title="Подтверждение действия">
      <div class="d-block text-center">
        <h3>Вы действительно хотите удалить продукт?</h3>
      </div>
      <b-button class="btn-yes" variant="outline-success" block  @click="deleteProduct">Да</b-button>
      <b-button class="btn-no" variant="outline-danger" block  @click="showModal = false">Нет</b-button>
    </b-modal>
    </div>
  </div>
</template>


<script>


export default {
  data () {
    return {
      products: [new Product(1,'s8 Galaxy','4002.21','Планшет','Супер модный планшет'),
                new Product(2,'acer Aspire E 15','25000.47','Ноутбук'),
      ],
      state: 'tableProducts',
      product: {
        id: 0,
        name:'',
        type:'',
        price:0,
        description: ''
      },
      typesProduct:['Планшет','Смартфон','Ноутбук','Маршрутизатор'],
      showModal:false,
      serverData:[],
      indexProduct:0
    }
  },
  methods: {
    backToList(){
      this.state = 'tableProducts'
    },
    toAddProduct(){
      this.state = 'addProduct'
    },
    toEditProduct(nameProduct,typeProduct,priceProduct,description,id,index){
      this.state = 'editProduct'

      this.product.name = nameProduct,
      this.product.type = typeProduct,
      this.product.price = priceProduct,
      this.product.id = id,
      this.product.description = description,
      this.indexProduct = index

    },
    pushProduct(name,price,type){
      let product = new Product(this.products.length + 1,name ,price,type);
      this.products.push(product);
     
     this.axios.post('http://localhost:5000/api/products',JSON.stringify(product),{headers:{'Content-Type': 'application/json'}})
      .then(responce => console.log(responce), responce => console.log(responce));
      this.state = 'tableProducts';
    },
    updateProduct(){
      let product = new Product(this.product.id, this.product.name, this.product.price, this.product.type,this.product.description)
      this.products.splice(this.indexProduct, 1);
      this.products.splice(this.indexProduct, 0, product);
      this.axios.put(`http://localhost:5000/api/products/${product.id}`,JSON.stringify(product),{headers:{'Content-Type': 'application/json'}})
      .then(responce => console.log(responce), responce => console.log(responce));
      this.state = 'tableProducts';
    },
    showModalProduct(index){
      this.showModal = true;
      this.indexProduct = index;
    },
    deleteProduct(){
        this.showModal = false;
        let product = this.products[this.indexProduct];
        this.products.splice(this.indexProduct,1);
        this.axios.delete(`http://localhost:5000/api/products/${product.id}`);
    },
    showProduct(name,price,type,description){
      this.product.name = name;
      this.product.price = price;
      this.product.type = type;
      this.product.description = description;
      this.state = 'showProduct';
    },
    getProducts(){
     //server data?
     this.axios.get('http://localhost:5000/api/products')
     .then((response) =>{
       console.log(response);
       this.serverData = response.data;
       for (const iterator of this.serverData) {
          this.products.push(new Product(iterator.id,iterator.name,iterator.price,iterator.type));
       }
      
     }, (response) => console.log(reponse))
    }
  },
}

class Product{
  constructor(id,name,price,type,description){
    this.id = id,
    this.name = name,
    this.price = price,
    this.type = type,
    this.description = description
  }
}
</script>

<style scoped>
.container-fluid{
  width: 100%;
}
.btn-yes{
  

}
.btn-no{
  
}
</style>
