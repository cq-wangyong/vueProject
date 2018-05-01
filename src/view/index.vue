<template>
  <div class="index">
  	<headers></headers>
    <router-view></router-view>
  </div>
</template>

<script>
import headers from '../components/header'
import prolist from './prolist'
export default {
  data () {
    return {
      msg:''
    }
  },
  components:{headers,prolist}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	
</style>
