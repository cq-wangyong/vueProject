<template>
  <div class="productshow clearfix">
			<div v-if="showloading" class="loading">数据加载中...</div>
  		<template v-else>
  			<div class="productshow-messa clearfix">
	  			<div class="float-left"><img :src="productObj.image" /></div>
	  			<div class="float-right">
	  				<h1>{{productObj.name}}</h1>
	  				<div class="title">￥{{productObj.cost}}</div>
	  				<div class="addcar" @click="addcar(productObj.id)">加入购物车</div>
	  			</div>
	  		</div>
	  		<div class="productshow-detail">
	  			<div class="title">商品详情：</div>
	  			<img v-for="n in 10" :src="'http://ordfm6aah.bkt.clouddn.com/shop/'+n+'.jpeg'" />
	  		</div>
  		</template>
  		
  </div>
</template>

<script>
import productdata from '@/product.js'
export default {
  data () {
    return {
      msg:'',
      id:parseInt(this.$route.params.id),
      productObj:'',
      showloading:true
    }
  },
  computed:{
		
  },
  methods:{
		getproduct(){
			//模拟ajax调取产品数据
			setTimeout(()=>{
				productdata.forEach((item)=>{
					if(item.id==this.id){
						this.productObj=item;
						this.showloading=false;
					}
				})
			},500);
  	},
  	addcar(id){
			this.$store.commit('addCar',id);
		}
  },
  watch:{
  	
  },
  created(){
  	
  },
  mounted(){
		this.getproduct();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.productshow-messa{text-align: center;margin: 30px;
		>div{width: 50%;}
		.title{color: #f2352e;margin: 8px 0;}
		.float-left{
			img{max-width: 100%;display: block;border: solid 1px #ccc;border-radius: 8px;}
		}
		.float-right{padding: 50px 15px 0;
			.addcar{background: #2d8cf0;z-index:5;padding: 10px 8px;color: #fff;font-size: 12px;cursor: pointer;display: inline-block;min-width: 200px;border-radius: 5px;}
		}
	}
	.productshow-detail{padding: 0 30px;
		img{display: block;max-width: 100%;margin: 0 auto;}
		.title{border-bottom: solid 1px #ccc;padding-bottom: 5px;font-size: 24px;font-weight: bold;}
	}
</style>
