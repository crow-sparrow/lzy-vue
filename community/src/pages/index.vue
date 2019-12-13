<template>
  <div class="index">
    <v-header></v-header>
    <div class="main">
      <v-left></v-left>
      <v-right></v-right>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import vHeader from '../views/header'
import vLeft from '../views/left'
import vRight from '../views/right'
export default {
  components: {
      vHeader,
      vLeft,
      vRight
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style  scoped>
.index {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  background-color: rgb(75, 76, 77);
  display: flex;
}
</style>