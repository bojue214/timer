<template>
    <div>
        <el-row>
            <el-col :xs="{span:20, offset:2}" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
                <language></language>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="{span:20, offset:2}" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
            </el-col>
        </el-row>
    </div>
</template>

<script>
import language from './language.vue';

export default {
    components:{ language },
    data() {
        return {};
    },

    methods:{}
};
</script>