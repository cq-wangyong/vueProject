// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import basecss from '@/assets/base.css'
import jquery from '@/assets/jquery-1.10.1.min.js'
import iconfont from '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    carArr:[],
    checkArr:[]
  },
  mutations: {
  	//添加购物车
    addCar(state,id){
  		//查找是否有这个id
  		var numbers=state.carArr.findIndex((item,index,arr)=>{
  			return item.id==id;
  		})
  		if(numbers!=-1){
  			//如果已经有了这个商品
  			state.carArr[numbers].num+=1;
  		}else{
  			//如果没有这个商品
  			state.carArr.push({id:id,num:1})
  		};
  		//添加时购物车时默认选中
  		if(state.checkArr.indexOf(id)==-1){
  			state.checkArr.push(id);
  		}
  	},
  	//删除商品
  	removeCarArr(state,index){
  		state.carArr.splice(index,1);
  		state.checkArr.splice(state.checkArr.indexOf(id),1);
  	},
  	//结算时清空购物车
  	clearCar(state){
  		state.carArr.splice(0);
  	},
  	//添加商品数量
  	addProductNum(state,ids){
  		state.carArr.forEach((item)=>{
  			if(item.id==ids){
  				item.num+=1;
  			}
  		});
  	},
  	//减少商品数量
  	jianProductNum(state,ids){
  		state.carArr.forEach((item)=>{
  			if(item.id==ids&&item.num!=1){
  				item.num-=1;
  			}
  		});
  	},
  	//移除选中状态
  	removeCheckArr(state,id){
  		state.checkArr.splice(state.checkArr.indexOf(id),1);
  	},
  	//添加选中状态
  	addCheckArr(state,id){
  		state.checkArr.push(id);
  	},
  	//检测购物车商品是否全部选中
  	isCheckAll(state){
  		let that=this;
  		let flag=true;
			$('.car dd input').each(function(){
				if(!this.checked){
					flag=false;
				}
			});
			if(flag){
				document.querySelector('.checkall').checked=true;
			}
  	}
  },
  getters:{
  	
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
