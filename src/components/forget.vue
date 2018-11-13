<template>
    <div>
        <el-row>
            <el-col :xs="{span:20, offset:2}" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
                <language></language>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="{span:20, offset:2}" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
                <el-form :model="helpWay" status-icon :rules="helpRules" ref="helpForm">
                    <el-form-item prop="helpNumber">
                        <el-input v-model="helpWay.helpNumber" autocomplete="off" :placeholder="$t('help_number')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="helpWay.password" autocomplete="off" :placeholder="$t('password')"></el-input>
                    </el-form-item>
                    <el-form-item prop="reptPassword">
                        <el-input type="password" v-model="helpWay.reptPassword" autocomplete="off" :placeholder="$t('rep_password')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">{{$t('Submit')}}</el-button>
                        <el-button @click="reset('helpForm')">{{$t('Reset')}}</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import language from './language.vue';

export default {
    components:{ language },
    data() {
        let that = this;

        let passValidate = function(rule, value, callback){
            if( that.helpWay.reptPassword !== '' ){
                that.$refs.helpForm.validateField('reptPassword');
            }
            callback();
        };

        let reptPassValidate = function(rule, value, callback){
            if( that.helpWay.password !== value ){
                callback(new Error(that.$i18n.t('$vali.twoPass')));
            } else {
                callback();
            }
        };

        return {
            helpWay:{
                helpNumber:'',
                password:'',
                reptPassword: '',
            },
            helpRules: {
                helpNumber:[
                    { required: true, validator: this.$vali('notEmpty', '$vali.noHelpNumber'), trigger: 'blur' },
                    { validator: this.$vali('helpNumber', '$vali.helpNumber'), trigger: 'blur' },
                    { validator: passValidate, trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: this.$vali('notEmpty', '$vali.noPassword'), trigger: 'blur' },
                    {validator: passValidate, trigger: 'blur'}
                ],
                reptPassword: [
                    { required: true, validator: this.$vali('notEmpty', '$vali.noReptPassword'), trigger: 'blur' },
                    { validator: reptPassValidate, trigger: 'blur' }
                ],
            },
        };
    },

    methods:{
        reset( formName ){
            this.$refs[formName].resetFields();
        }
    }
};
</script>