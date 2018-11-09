<template>
  <div >
    <span v-on:click.stop="onDivClick" > {{a}}1111111111111111111</span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      a:1
    };
  },
  mounted(){
    alert(1);
    this.a = this.$route.query.aaa;
  },
  methods: {
    onDivClick(){
      console.log(this.$route.query.aaa);
    },
  }
}
</script>
