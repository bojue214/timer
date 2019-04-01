<template>
    <div class="x-cascader" 
        :style="{left:(level === 0 ? 0 : 1)*width + 'px'}">
        <ul class="x-cascader-list" 
            :style="{width: width + 'px', height: height * num +'px'}">
            <li class="x-cascader-item"
                :style="{width: width + 'px', height: height+'px', 'line-height': height+'px'}"
                v-for="item in data" 
                :key="item.id" 
                v-on:click.stop="onItemClick(item);"
                v-on:mouseenter.stop="onItemMouseenter(item)"
                v-on:mouseleave.stop="onItemMouseleave(item)"> 
                <div class="x-cascader-item-ele x-cascader-operate" :class="setOperateClass(item)"></div>
                <div class="x-cascader-item-ele x-cascader-text">{{item.name}}</div>
                <div class="x-cascader-item-ele x-cascader-children-state"
                    v-show="item.children && item.children.length"
                    :class="item.____actived ? 'el-icon-arrow-left': 'el-icon-arrow-right'">
                </div>
                <cascader
                    v-if="item.children && item.children.length"
                    v-show="item.____actived"
                    v-on:on-cascader-intermediate="onIntermediated"
                    :data="item.children"
                    :primary="item.id"
                    :width="width"
                    :height="height"
                    :num="num"
                    :level="level+1">
                </cascader>
            </li>
        </ul> 
    </div>
</template>
<script>
    export default {
        name:'cascader',
        props:{
            // 数据源
            data:{
                type: Array,
                default(){
                    return [
                        {name: '1', ____selected:false, ____actived:false, ____intermediated: false, children:[
                            {name: '1.1',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 11},
                            {name: '1.2',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 12},
                            {name: '1.3',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 13},
                            {name: '1.4',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 14},
                            {name: '1.5',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 15}
                        ], id: 1},
                        {name: '2',  ____selected:false, ____actived:false, ____intermediated: false, children:[
                            {name: '2.1',  ____selected:false, ____actived:false, ____intermediated: false, children:[
                                {name: '2.1.1',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 211},
                                {name: '2.1.2',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 212},
                                {name: '2.1.3',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 213},
                                {name: '2.1.4',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 214},
                                {name: '2.1.5',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 215}
                            ], id: 21},
                            {name: '2.2',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 22},
                            {name: '2.3',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 23},
                            {name: '2.4',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 24},
                            {name: '2.5',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 25}
                        ], id: 2},
                        {name: '3',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 3},
                        {name: '4',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 4},
                        {name: '5',  ____selected:false, ____actived:false, ____intermediated: false, children:[], id: 5}
                    ];
                }
            },
            // 选中方式
            // single       父节点和子节点都能选中，相互之间没关系
            // recursive    选中父节点时会选中子节点，子节点填满也会选中父节点
            // down         选中父节点会选中子节点，选中子节点不会选中父节点
            // up           选中子节点会选中父节点，但是选中父节点不会选中子节点
            type:{
                type: String,
                default:'down',
            },

            // 父节点的关键key
            primary:{
                type: [String, Number],
                default:'',
            },

            width:{
                type:[String, Number],
                default:220,
            },

            height:{
                type:[String, Number],
                default:34,
            },

            num:{
                type:[String, Number],
                default:4,
            },

            level:{
                type:Number,
                default:0,
            }
        },

        data(){
            return {};
        },

        computed:{
            // 父节点intermediate
            intermediate(){
                let index = 0, len = this.data.length, i = 0;
                for(; i < len ; i++){
                    if( this.data[i].____selected ){
                        index++;
                    }
                }
                return index != len && index !== 0;
            }
        },

        methods:{
            // 选中
            onItemClick(item){
                console.log(11111);
                item.____selected = !item.____selected;
                console.log(item.____selected);
                this[this.type](item);
                console.log(this.type);
                this.$emit('on-cascader-intermediate', { intermediate: this.intermediate, primary: this.primary });
                console.log({ intermediate: this.intermediate, primary: this.primary });
            },

            // 设置活动的元素（会显示子元素）
            onItemMouseenter(item){
                item.____actived = true;
            },

            // 取消活动的元素（会显示子元素）
            onItemMouseleave(item){
                item.____actived = false;
            },
            // 自定义事件
            // 设置半选中状态
            onIntermediated($event){
                console.log('$event', $event);
                for(let i =0, len = this.data.length; i < len; i++){
                    console.log(this.data[i].id, $event.primary);
                    if( this.data[i].id === $event.primary ){
                        this.data[i].____intermediated = $event.intermediate;
                        if($event.intermediate){
                            this.data[i].____selected = false;
                        }
                    }
                }
            },

            // 元素的操作图标样式
            setOperateClass( item ){
                if( item.____intermediated ){
                    return 'el-icon-more';
                } else if( item.____selected ){
                    return 'el-icon-check';
                } else {
                    return '';
                }
            },

            // 选中父节点会选中子节点，选中子节点不会选中父节点
            down(){

            },

            up(){},

            recursive(){},

            // 父子节点无关系
            single(item){ return; },
        },
    };
</script>
<style lang="scss">
    .x-cascader{
        position: absolute;
        top: 0;
        .x-cascader-list{
            background-color:#fff;
            overflow:auto;
            .x-cascader-item{
                cursor:pointer;
                .x-cascader-item-ele{
                    display: inline-block;
                    &.x-cascader-operate{
                        width: 20px;
                        font-size:14px;
                        font-weight: bolder;
                    }
                    &.x-cascader-text{

                    }
                    &.x-cascader-children-state{
                        width: 15px;
                        font-size:10px;
                    }
                } 
            }
        }
    }
</style>