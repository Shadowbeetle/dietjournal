<template>
  <div id="app">
    <diary></diary>
  </div>
</template>

<script>
import Diary from './components/Diary'

export default {
  name: 'app',
  components: {
    Diary
  }
}
</script>
<style>
  input, textarea {
    font-weight: normal;
  }
</style>
