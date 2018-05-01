<template>
  <div class="car">
  	<div class="car-title">购物车</div>
		<dl>
			<dt class="clearfix">
				<input class="checkall" type="checkbox" @click="checkAll" />
				<div class="title">商品信息</div>
				<div class="danjia">单价</div>
				<div class="num">数量</div>
				<div class="price">小计</div>
				<div class="detele">删除</div>
			</dt>
			<dd v-for="(item,index) in carProduct"  class="clearfix" :key='item.id'>
				<input type="checkbox" :value="item.id" v-model="checkArr" @click="toggleCheck(item.id)" />
				<div class="nowrap title"><router-link :to="'/productshow/'+item.id"><img :src="item.image"/>{{item.name}}</router-link></div>
				<div class="danjia">￥{{item.cost}}</div>
				<div class="num"><span class="jian" @click="jianProductNum(item.id)">-</span>{{item.num}}<span class="jia" @click="addProductNum(item.id)">+</span></div>
				<div class="price">￥{{item.cost*item.num}}</div>
				<div class="detele" @click="removeCar(item.id)">删除</div>
			</dd>
			<dd class="clearfix jiesuan">
				<div class="buy" @click="clearCar" v-if='getAllNumber'>现在结算</div>
				<div class="allPrice">应付总额<span>￥ {{getAllPrice}}</span></div>
				<div class="allNumber">共选中 <span>{{getAllNumber}}</span> 件商品</div>
			</dd>
		</dl>
  </div>
</template>

<script>
import productdata from '@/product.js'
export default {
  data () {
    return {
      msg:'',
      carArr:this.$store.state.carArr,
      carProduct:[],
      checkArr:this.$store.state.checkArr
    }
  },
  methods:{
  	getCarProduct(){
			this.carArr.forEach((item2,index2,arr2)=>{
				productdata.forEach((item,index,arr)=>{
					if(item.id==item2.id){
						item['num']=item2.num;
						this.carProduct.push(item);
					}
				})
			})
  	},
  	//删除
  	removeCar(param){
  		var i=this.carProduct.findIndex(function(item,i,arr){
  			return item.id==param
  		})
			this.carProduct.splice(i,1);
  		this.$store.commit('removeCarArr',i,param);
  		this.$store.commit('removeCheckArr',param);
  	},
  	//结算
  	clearCar(){
  		this.carProduct=[];
  		this.$store.commit('clearCar');
  	},
  	//增加商品数量
  	addProductNum(id){
  		this.$store.commit('addProductNum',id);
  		this.carProduct.splice(0);
  		this.getCarProduct();
  	},
  	//减少商品数量
  	jianProductNum(id){
  		this.$store.commit('jianProductNum',id);
  		this.carProduct.splice(0);
  		this.getCarProduct();
  	},
  	//复选框切换选中状态
  	toggleCheck(id){
  		var that=this;
  		if(event.target.checked){
  			that.$store.commit('addCheckArr',id);
  			//检测是否全部选择，如果全部选择，就把全选按钮选中
  			this.$store.commit('isCheckAll');
  		}else{
  			that.$store.commit('removeCheckArr',id);
  			//取消选中状态，则取消全选按钮
  			document.querySelector('.checkall').checked=false;
  		}
  	},
  	//全选按钮
  	checkAll(){
  		if(event.target.checked){
  			this.$store.state.carArr.forEach((item)=>{
  				if(this.$store.state.checkArr.indexOf(item.id)==-1){
  					this.$store.commit('addCheckArr',item.id);
  				}
  			});
  		}else{
  			this.$store.state.carArr.forEach((item)=>{
  				this.$store.commit('removeCheckArr',item.id);
  			})
  		}
  	}
  },
  mounted(){
  	this.getCarProduct();
		//检测是否全部选择，如果全部选择，就把全选按钮选中
		this.$nextTick(function () {
			this.$store.commit('isCheckAll');
	  })
  },
  created(){
  	
  },
  computed:{
  	getAllNumber(){
  		let num=0;
  		this.carArr.forEach((item,i,arr)=>{
  			let indexof=this.checkArr.findIndex((value)=>{
  				return item.id==value;
  			})
  			if(indexof!=-1){
  				num+=item.num;
  			}
  		})
  		return num;
  	}
  	,
  	getAllPrice(){
  		let price=0;
  		this.carProduct.forEach((item,i,arr)=>{
  			let indexof=this.checkArr.findIndex((value)=>{
  				return item.id==value;
  			})
  			if(indexof!=-1){
  				price+=item.cost*item.num;
  			}
  		})
  		return price;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.car{margin: 15px;padding: 10px 0;border: solid 1px #ccc;border-radius: 8px;
		.car-title{padding: 10px 20px;}
		dt,dd{padding:10px 20px;font-size: 14px;line-height: 40px;position: relative;
			input{position: absolute;top: 50%;transform: translateY(-50%);cursor: pointer;}
			div{float: left;text-align: center;
				&.title{width: 60%;text-align: left;padding-left: 20px;}
				&.danjia{width: 10%;}
				&.num{width: 10%;}
				&.price{width: 10%;}
				&.detele{width: 10%;}
				img{max-width: 40px;vertical-align: middle;margin-right: 5px;}
			}
		}
		dt{background: #ddd;padding:10px 20px;}
		dd{
			div.detele{color: #2d8cf0;cursor: pointer;}
			&:nth-child(odd){background: rgba(238, 238, 238,0.5);}
			.jian,.jia{display: inline-block;border: solid 1px #ccc;width: 24px;height: 24px;line-height: 22px;text-align: center;font-size: 20px;vertical-align: middle;margin: 0 5px;cursor: pointer;border-radius: 50%;}
		}
		.jiesuan{font-size: 16px;line-height: 32px;background: #fff !important;border-top: solid 1px #ccc;padding-top: 20px;
			>div{float: right;margin-left: 30px;width: auto !important;}
			.buy{width: auto;padding: 0 32px;background: #2d8cf0;color: #fff;border-radius: 8px;cursor: pointer;}
			.allPrice{
				span{color: #f2352e;font-size: 20px;display: inline-block;}
			}
			.allNumber{
				span{color: #f2352e;font-size: 20px;display: inline-block;}
			}
		}
	}
</style>
