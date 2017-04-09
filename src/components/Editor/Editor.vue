<template>
  <div>
    <table>
      <tr>
        <th class="index">&nbsp;</th>
        <th>

          <span v-for="char in chars">{{char}}</span>
        </th>
      </tr>
      <tr v-for="str in strings">
        <td class="index">{{str + 1}}</td>
        <td>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        strings: Array.from(Array(80), (u, i) => i),
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXY'
      }
    }
  }
</script>
<style>
  * {
    font-family: monospace;
  }

  .index {
    text-align: right;
    width: 20px;
  }
</style>
