<template>
  <div class="productlist clearfix">
  		<!--筛选条件-->
  		<ul class="tiaojian">
  			<li class="tiaojian-filter">
  				<span>品牌：</span>
  				<span @click="filterBrand('Apple')">Apple</span>
  				<span @click="filterBrand('Beats')">Beats</span>
  				<span @click="filterBrand('Sonos')">Sonos</span>
  				<span @click="filterBrand('B&O')">B&O</span>
  				<span @click="filterBrand('Bose')">Bose</span></li>
  			<li class="tiaojian-filter"><span>颜色：</span>
  				<span @click="filterColor('白色')">白色</span>
  				<span @click="filterColor('金色')">金色</span>
  				<span @click="filterColor('红色')">红色</span>
  				<span @click="filterColor('蓝色')">蓝色</span>
  			</li>
  			<li class="tiaojian-order"><span>排序：</span>
  				<span @click="filterOrder('moren')">默认</span>
  				<span @click="filterOrder('scale')">销量<i class="iconfont icon-down"></i></span>
  				<span @click="filterPrice('price')">价格<i class="iconfont icon-down"></i></span></li>
  		</ul>
  		<!--商品列表-->
			<div v-if="showloading" class="loading">数据加载中...</div>
  		<template v-else>
				<div v-if="productdata.length==0" class="loading">暂无相关产品...</div>	
  			<template v-else>
		    	<div class="product-item" v-for="(item,index) in productdata" :key="item.id">
		    		<router-link :to="'/productshow/'+item.id">
			    		<img :src="item.image"/>
			    		<h4 class="title nowrap text-center">{{item.name}}</h4>
			    		<span class="color" :style="{backgroundColor:colorObj[item.color]}"></span>
			    		<div class="text-center">已销量：{{item.sales}}件</div>
			    		<div class="price text-center">价格：￥{{item.cost}}</div>
		    		</router-link>
		    		<div class="addcar tran" @click="addcar(item.id)">加入购物车</div>
		    	</div>
  			</template>
  		</template>
  </div>
</template>

<script>
import productdata from '@/product.js'
export default {
  data () {
    return {
      msg:'',
      productdata:null,
      showloading:true,
      filterBrands:'',
      filterColors:'',
      filterOrders:'',
      colorObj:{
      	'白色':'#fff',
      	'金色':'rgb(218, 194, 114)',
      	'红色':'rgb(242, 53, 46)',
      	'蓝色':'rgb(35, 52, 114)',
      }
    }
  },
  computed:{
  	
  },
  methods:{
  	//添加到购物车
		addcar(id){
			this.$store.commit('addCar',id);
		},
		//按品牌搜索
		filterBrand(param){
			$(event.target).toggleClass('active').siblings('span').removeClass('active');
			this.filterBrands=event.target.classList.contains('active')?param:'';
			this.getProducts();
		},
		//按颜色搜索
		filterColor(param){
			$(event.target).toggleClass('active').siblings('span').removeClass('active');
			this.filterColors=event.target.classList.contains('active')?param:'';
			this.getProducts();
		},
		//默认排序
		filterOrder(param){
			$(event.target).addClass('active').siblings('span').removeClass('active');
			this.filterOrders=param;
			this.getProducts();
		},
		//按照价格排序
		filterPrice(param){
			if(!event.target.classList.contains('active')){
				$(event.target).removeClass('reverse');
				this.filterOrders='price';
			}else{
				if(this.filterOrders=='price'){
					this.filterOrders='jiang';
					$(event.target).addClass('reverse');
				}else{
					$(event.target).removeClass('reverse');
					this.filterOrders='price';
				}
			}
			$(event.target).addClass('active').siblings('span').removeClass('active');
			this.getProducts();
		},
		getProducts(){
			setTimeout(()=>{
				var tiaojian='';
				this.productdata=productdata.filter((item)=>{
					var t1=this.filterBrands==''?true:item.brand==this.filterBrands;
					var t2=this.filterColors==''?true:item.color==this.filterColors;
					return t1&t2;
				})
				//排序
				if(this.filterOrders){
					if(this.filterOrders=='scale'){
						this.productdata.sort((a,b)=>{return b.sales - a.sales});
					}else if(this.filterOrders=='price'){
						this.productdata.sort((a,b)=>{return b.cost - a.cost});
					}else if(this.filterOrders=='jiang'){
						this.productdata.sort((a,b)=>{return a.cost - b.cost});
					}
				}
				this.showloading=false;
			},500);
		}
  },
  watch:{
  	
  },
  mounted(){
		this.getProducts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.productlist{
	.product-item{width:calc((100% - 150px) / 5);cursor: pointer;position: relative;margin: 15px;padding: 15px;float: left;border: solid 1px #ccc;border-radius: 8px;padding: 15px;
		img{max-width: 100%;}
		.color{width: 16px;border:solid 1px #ccc;display: block;height: 16px;border-radius: 50%;margin: 5px auto;}
		.price{color: #de4037;}
		.addcar{background: #2d8cf0;z-index:5;padding: 4px 8px;color: #fff;font-size: 12px;position: absolute;right: 5px;top: 5px;border-radius: 5px;opacity: 0;}
		&:hover{
			.addcar{opacity: 1;}
			.title{color: #0070c9;}
		}
	}
}
.tiaojian{margin: 15px;border: solid 1px #ccc;border-radius: 8px;padding: 15px;box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
	li{
		span{display: inline-block;line-height:1;margin: 0 5px;border-radius: 5px;padding:5px;
			i{display:none}
			&:not(:first-child){border: solid 1px #ccc;cursor:pointer;}
			&.active{background: #f2352e;color: #fff;
				i{display: inline-block;}
				&.reverse{
					i{transform: rotateZ(180deg);}
				}
			}
		}
		&:not(:last-child){margin-bottom: 10px;}
	}
}
</style>
