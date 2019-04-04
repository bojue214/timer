<template>
    <div class="x-cascader" 
        :style="{left:((level === 0 ? 0 : 1)*(width+3)) + 'px'}">
        <ul class="x-cascader-list" 
            :style="{width: width + 'px', height: height * num +'px'}">
            <li class="x-cascader-item"
                :style="{width: width + 'px', height: height+'px', 'line-height': height+'px'}"
                :class="(item.____selected || item.____intermediated) ? 'select':''"
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
                    v-on:on-cascader-selected-update="onCascaderSelectedUpdate"

                    v-on:on-cascader-single-parent-intermediated="onSingleParentIntermediate"
                    v-on:on-cascader-single-parent-selected="onSingleParentSelect"

                    :data="item.children"
                    :primary="item.id"
                    :width="width"
                    :height="height"
                    :num="num"
                    :level="level+1"
                    :type="type">
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
                    return [];
                }
            },
            // 选中方式
            // single       父节点和子节点都能选中，相互之间没关系
            // recursive    选中父节点时会选中子节点，子节点填满也会选中父节点
            // down         选中父节点会选中子节点，选中子节点不会选中父节点
            // up           选中子节点会选中父节点，但是选中父节点不会选中子节点
            type:{
                type: String,
                default:'single',
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
                default:7,
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
            // selected 和intermediate互斥
            onItemClick(item){
                // 选中 or 不选中
                item.____selected = !item.____selected;
                // 取消半选中
                item.____intermediated = false;
                // 根据选中策略进行子节点或者父节点的选中
                this[this.type](item);
                // 触发父节点选中事件
                this.$emit('on-cascader-selected-update', {
                    primary: this.primary,
                    data: this.data
                });
            },

            // 设置活动的元素（会显示子元素）
            onItemMouseenter(item){
                item.____actived = true;
            },

            // 取消活动的元素（会显示子元素）
            onItemMouseleave(item){
                item.____actived = false;
            },

            // 根据子节点的数据更新自己的数据
            onCascaderSelectedUpdate( o ){

                let i = 0, len = this.data.length;
                for(; i < len; i++ ){
                    if( this.data[i].id === o.primary ){
                        this.data[i].children = o.data;
                    }
                }
                // 继续执行
                this.$emit('on-cascader-selected-update', {
                    primary: this.primary,
                    data: this.data
                });
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

            // 独立策略 父子节点无关系，随意选中
            single(item){ },
            // 独立策略 处理同级节点
            singleSiblings(item){ },
            // 独立策略 处理父节点
            singleParents(item){ 
                item.____selected && this.$emit('on-cascader-single-parent-selected', { 
                    selected: false, 
                    primary: this.primary 
                });
            },
            // 独立策略 处理子节点
            singleChildren(item){
                if( item.children && item.children.length ){
                    for( let i =0, len = item.children.length; i< len; i++ ){
                        item.children[i].____selected = false;
                        this.singleChildren(item.children[i]);
                    }
                }
            },

            // 自定义事件
            // 独立策略 设置半选中状态事件
            onSingleParentIntermediate($event){
                for(let i =0, len = this.data.length; i < len; i++){
                    if( this.data[i].id === $event.primary ){
                        // 检测父节点的子节点
                        if( this.data[i].children && this.data[i].children.length ){
                            let allI = 0, allS = 0, j = 0, leng = this.data[i].children.length;
                            for( ; j < leng; j++ ){
                                // 只要有一个为半选中状态，则父节点也未半选中状态 计数器加1
                                if( this.data[i].children[j].____intermediated ){
                                    allI++;
                                    break;
                                } 
                                // 只要子节点为选中状态 计数器加1
                                if( this.data[i].children[j].____selected ){
                                    allS++;
                                }
                            }

                            if( ( allS !== leng && allS !== 0 ) ||  allI !== 0 ){
                                this.data[i].____intermediated = true;
                            }
                        }
                        // 如果为半选中， 则选中状态取消
                        if($event.intermediate){ this.data[i].____selected = false; }
                    }
                }
            },

            // 自定义事件
            // 独立策略 处理父节点事件
            onSingleParentSelect($event){
                for(let i =0, len = this.data.length; i < len; i++){
                    if( this.data[i].id === $event.primary ){
                        this.data[i].____selected = $event.selected;
                        this.$emit('on-cascader-single-parent-selected', { 
                            selected: false, 
                            primary: this.primary 
                        });
                    }
                }
            },
            
            // 选中父节点会选中子节点，选中子节点不会选中父节点
            down(item){
                this.downParents(item);
                this.downSiblings(item);
                this.downChildren(item);
            },
            // 向下策略处理同级节点
            downSiblings(item){ },
            // 向下策略处理父节点
            downParents(item){ },
            // 向下策略处理子节点
            downChildren(item){
                if( item.children && item.children.length ){
                    for( let i =0, len = item.children.length; i< len; i++ ){
                        item.children[i].____intermediated = false;
                        item.children[i].____selected = item.____selected;
                        this.downChildren(item.children[i]);
                    }
                }
            },

            // 向上
            up(){},

            // 递归
            recursive(){}
        },
    };
</script>
<style lang="scss">
    .x-cascader{
        position: absolute;
        top: 0;
        .x-cascader-list{
            background-color:#fff;
            overflow:hidden;
            overflow-y:auto;
            border-right:1px solid #E4E7ED;
            padding: 8px 1px;
            .x-cascader-item{
                cursor:pointer;
                &.select{
                    display: list-item;
                    >.x-cascader-item-ele{
                        color:#1989FA;
                        font-weight: bold;
                        &.x-cascader-text{
                            color:#1989FA;
                        }
                    }
                }
                &:hover{
                    background-color: #F2F5FA;
                }
                .x-cascader-item-ele{
                    display: inline-block;
                    &.x-cascader-operate{
                        width: 14px;
                        font-size:14px;
                        margin:0 12px 0 17px;
                    }
                    &.x-cascader-text{
                        color: #3E3E3E;
                        font-size:14px;
                        width:130px;
                    }
                    &.x-cascader-children-state{
                        width: 10px;
                        font-size:10px;
                        margin: 0 19px 0 10px;
                    }
                } 
            }
        }
    }
</style>