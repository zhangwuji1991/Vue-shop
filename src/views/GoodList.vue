<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by </a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked == 'all'}" @click="priceChecked=all">All</a></dd>
              <dd v-for="(price,index) in priceFilter" >
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} ~ {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" class="loadings" style="text-algin:center;boreder:1px solid red;" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                  <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay " v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  export default{
      data(){
          return {
            goodsList:[],
            priceFilter:[
              {
                startPrice:'0.00',
                endPrice:'100.00'
              },
              {
                startPrice:'100.00',
                endPrice:'500.00'
              },
              {
                startPrice:'500.00',
                endPrice:'1000.00'
              },
              {
                startPrice:'1000.00',
                endPrice:'2000.00'
              }  
            ],
            page:1,
            pageSize:8,
            srotFlag:true,
            priceChecked:'all',
            filterBy:false,
            overLayFlag:false,
            busy:true,
            loading:false
          }
      },
      components: {
        NavHeader,
        NavFooter,
        NavBread
      },
      mounted (){
        this.getGoodsList();
      },
      methods: {
        getGoodsList (flag){
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.srotFlag?1:-1,
            priceLevel:this.priceChecked
          }
          this.loading=true;
          axios.get("/goods",{
            params:param
          }).then((result)=>{
            let res = result.data;
            this.loading=false;
            if(res.status=="0"){
              if(flag){
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.count == 0){
                  this.busy = true
                }else{
                  this.busy = false
                }
              }else{
                this.goodsList = res.result.list
                this.busy = false
              }
            }else{
              this.goodsList = []
            }        
          })
        },

        sortGoods (){
          this.srotFlag = !this.srotFlag
          this.page = 1
          this.goodsList = []
          this.getGoodsList()
        },
        showFilterPop (){
          this.filterBy = true
          this.overLayFlag = true
        },
        closePop (){
          this.filterBy = false
          this.overLayFlag = false
        },
        setPriceFilter (index){
          console.log(index)
          this.page = 1
          this.priceChecked = index
          this.getGoodsList()
          
          this.closePop()
        },
        loadMore (){
          this.busy = true
          setTimeout(() => {
            this.page++
            this.getGoodsList(true)
          }, 500)
        },
        addCart (productId){
          axios.post("/goods/addCart",{
            productId: productId
          }).then((res)=>{
            console.log(res)
            if (res.data.status==0){
              alert("加入购物车成功")
            }
          })
        }
      } 
  }
</script>
<style scoped>
.loadings{
  height:100px;
  line-height:100px;
  text-align:center;
}
</style>
