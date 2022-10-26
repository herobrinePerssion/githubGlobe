<!--
 * @Author: arron Zhu
 * @Date: 2022-10-26 11:20:51
 * @lastEditor: arron Zhu
 * @LastEditTime: 2022-10-26 11:44:59
 * @Description: 
-->
<template>
  <div id="app">
  </div>
</template>
<script>
import { initRender, destroyCanvas } from '@/views/githubGlobal'
export default {
  mounted() {
      initRender()
    },
  beforeDestroy() {
    destroyCanvas()
  },

}

</script>
<style>
body{
overflow: hidden;
margin: 0;
}
canvas{
  width: 100vw;
  height: 100vh;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
