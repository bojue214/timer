<template>
    <div class="x-multi-cascader">
        <div class="x-cascader-shower el-input__inner"
            tabindex="-1"
            v-on:blur.stop="onMultiCscaderShowerBlur"
            v-on:focus.stop="onMultiCscaderShowerFocus">
            <div class="x-cascader-tips"
                v-for="item in selects"
                :key="item.id"
                :class="item.____active ? 'active' : ''">
                <span class="x-cascader-title">{{item.name}}</span>
                <span class="x-cascader-delete el-icon-close" 
                    v-on:click.stop="onRemoveItem(item)">
                </span>
            </div>
            <input class="x-cascader-input" style="display:none"/>
            <span class="x-cascader-drop-arrow"
                :class="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"    >
            </span>
        </div>
        <div 
            v-show="isShow"
            class="x-multi-cascader-cont"
            tabindex="-1"
            v-on:blur.stop="onMultiCscaderContBlur"
            v-on:focus.stop="onMultiCscaderContFocus">
            <div  class="x-multi-cascader-arrow"></div>
            <div class="x-multi-cascader-dropdown"
                :style="{height: height*num + 'px', 'width': max * width + 'px'}">
                <cascader 
                    v-on:on-cascader-selected-update="onCascaderSelectedUpdate"
                    :data="data"
                    :width="width"
                    :height="height"
                    :num="num"
                    :level="0"
                    :type="type" >
                </cascader>
            </div>
        </div>
    </div>
</template>
<script>
    import cascader from './cascader.vue';

    export default {
        components:{
            cascader
        },

        props:{
            // 选中方式
            // single       父节点和子节点都能选中，相互之间没关系
            // recursive    选中父节点时会选中子节点，子节点填满也会选中父节点
            // down         选中父节点会选中子节点，选中子节点不会选中父节点
            // up           选中子节点会选中父节点，但是选中父节点不会选中子节点
            type:{
                type: String,
                default:'single',
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
                default:7,
            },

            max:{
                type:[String, Number],
                default:5,
            },

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
            }
        },

        data(){
            return {
                isShowerFocus: false,
                isContFocus: false
            };
        },

        computed:{
            selects(){
                return this.select(this.data);
            },

            isShow(){
                return this.isShowerFocus || this.isContFocus;
            }
        },

        methods:{

            onMultiCscaderShowerBlur(){
                this.isShowerFocus = false;
            },

            onMultiCscaderShowerFocus(){
                this.isShowerFocus = true;
            },

            onMultiCscaderContBlur(){
                this.isContFocus = false;
            },
            
            onMultiCscaderContFocus(){
                this.isContFocus = true;
            },

            // 根据子节点的数据更新自己的数据
            onCascaderSelectedUpdate( o ){
                console.log(o);
                this.data = o.data;
            },

            onRemoveItem(item){
                this.unSelect(item, this.data);
            },

            unSelect(item, datas){
                let i = 0, len = datas.length;
                for(; i < len; i++){
                    if(datas[i].children && datas[i].children.length){
                        if(this.unSelect(item, datas[i])){
                            return true;
                        };
                    }
                    if(datas[i].id === item.id){
                       datas[i].____selected = false;
                       return true;
                    }
                }
            },

            select(data){
                let i = 0, len = data.length, ret =  [];
                for(; i < len; i++){
                    if(data[i].____selected){
                        ret.push(data[i]);
                    }
                    if(data[i].children && data[i].children.length){
                        ret = ret.concat(this.select(data[i].children))
                    }
                }
                return ret;
            },
        }
    };
</script>
<style lang="scss">
    .x-multi-cascader{
        position: relative;
        .x-cascader-shower{
            min-height: 35px;
            line-height: 35px;
            height:auto;
            position: relative;
            .x-cascader-drop-arrow{
                position: absolute;
                top: 50%;
                right: 10px;
                margin-top: -7px;
            }
            .x-cascader-tips{
                height:25px;
                line-height: 25px;
                background:rgba(51,126,255,1);
                border-radius:2px;
                border: 1px solid rgba(51,126,255,1);
                display: inline-block;
                margin-right:5px;
                .x-cascader-title{
                    cursor:pointer;
                    color:#ffffff;
                    font-size:12px;
                    margin:6px 0px 6px 8px;
                }
                .x-cascader-delete{
                    color: #fff;
                    cursor:pointer;
                    font-weight: bold;
                    font-size:12px;
                    margin:6px;
                }
                &.active, &:hover{
                    background-color:#fff;
                    .x-cascader-title{
                        color:rgba(51,126,255,1);
                    }
                    .x-cascader-delete{
                        color:rgba(51,126,255,1);
                    }
                }
            }
            .x-cascader-input{
                min-width: 200px;
            }
        }
        .x-multi-cascader-cont{
            outline:none;
            width:100%;
            position: absolute;
            .x-multi-cascader-arrow{
                display: inline-block;
                width: 10px;
                height: 10px;
                border: 1px solid rgba(228,231,237,1);
                background-color:#ffffff;
                transform: rotate(-45deg);
                position: absolute;
                top:15px;
                left:40px;
                z-index: 1;
                border-left-width: 0;
                border-bottom-width: 0;
            }
            .x-multi-cascader-dropdown{
                position: absolute;
                box-shadow:2px 2px 5px 0px rgba(0,0,0,0.3);
                border:1px solid rgba(228,231,237,1);
                border-radius: 5px;
                overflow:hidden;
                top:20px;
            }
        }
    }
</style>
