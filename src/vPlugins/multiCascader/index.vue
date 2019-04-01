<template>
    <div class="x-multi-cascader">
        <div></div>
        <div class="x-cascader-cont">
            <cascader></cascader>
        </div>
    </div>
</template>
<script>
    import cascader from './cascader.vue';

    export default {
        components:{
            cascader
        }
    };
</script>
<style lang="scss">
    .x-multi-cascader{
        position: relative;
        .x-cascader-cont{
            position: relative;
        }
    }
</style>
