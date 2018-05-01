<template>
  <div class="header">
    	<router-link to="/" class='header-left'>电商网站实例</router-link>
    	<router-link to="/car" class="header-right">购物车<template><span v-if="getCarNumbers!=0">{{getCarNumbers}}</span></template></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg:0
    }
  },
  computed:{
  	//获取购物车商品数量
  	getCarNumbers(){
  		var numbers=0;
			this.$store.state.carArr.forEach((item)=>{
				numbers+=item.num;
			});
			return numbers;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.header{line-height: 48px;padding: 0 30px;background: rgba(0,0,0,.8);color: #fff;
		a{color: #fff;}
		.header-left{float: left;}
		.header-right{float: right;
			span{border-radius: 50%;background: #ff5500;line-height: 20px;display: inline-block;width: 20px;height: 20px;font-size: 12px;margin-left: 3px;text-align: center;}
		}
		&:after{content: '';display: block;clear: both;}
	}
</style>
