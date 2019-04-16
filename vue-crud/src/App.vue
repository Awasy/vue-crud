<template>
 <div class="row">
  <main class="col-lg-9 order-lg-2">
                
  <div class="row page-title">
        <div class="col-md-8">
          <h1 class="page-title__header">Ноутбуки и планшеты</h1>
        </div>
        <div class="col-md-4 actions">
          <select :disabled="disableSortComp"  @change="getSortProducts" v-model="sortElement" id="page-title__filter" class="page-title__filter">
            <option  value="default">Укажите сортировку</option>
            <option value="price">sort by price</option>
            <option value="name">sort by name</option>
            <option value="type">sort by type</option>
          </select>
        </div>
  </div>   
  <div class="table-responsive">
    <div class="row">
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

        <!-- <div>
          <button @click="getProducts">Request</button>
        </div> -->

        <b-modal class="modal-product" size="mt" v-model="showModal"  hide-footer title="Подтверждение действия">
          <div class="d-block text-center">
            <h3>Вы действительно хотите удалить продукт?</h3>
          </div>
          <b-button class="btn-yes" variant="outline-success" block  @click="deleteProduct">Да</b-button>
          <b-button class="btn-no" variant="outline-danger" block  @click="showModal = false">Нет</b-button>
        </b-modal>
      

          </div>
        </div>
      </div>
    </main>
    <sidebar>

    </sidebar>
     
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
      indexProduct:0,
      sortElement:'default',
      disableSortComp:false
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
    pushProduct(name,price,type,description){
      let product = new Product(this.products.length + 1,name ,price,type,description);
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
          this.products.push(new Product(iterator.id,iterator.name,iterator.price,iterator.type,iterator.description));
       }
      
     }, (response) => console.log(reponse))
    },
    getSortProducts(){
      this.disableSortComp = true;
      if(this.sortElement != 'default'){
          this.axios.get(`http://localhost:5000/api/products/getsortproducts/${this.sortElement}`).then(response => {
              this.serverData = response.data;
              this.products = this.serverData.map(obj => new Product(obj.id,obj.name,obj.price,obj.type,obj.description));
              this.disableSortComp = false;
          }, response => this.disableSortComp = false)
      }
      else{
        this.disableSortComp = false;
      }
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
.modal-product{
  color:black;
}


</style>
