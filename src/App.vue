<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <editor></editor>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import Editor from './components/Editor/Editor.vue'

  export default {
    name: 'app',
    components: {
      Hello,
      Editor
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
</style>
