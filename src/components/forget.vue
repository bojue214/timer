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
                        <el-input v-model="helpWay.helpNumber" autocomplete="off" :placeholder="$t('help_number')">
                            <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('helpNumber', 'helpForm')"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password" v-if='!hasShow'>
                        <el-input type="password" v-model="helpWay.password" autocomplete="off" :placeholder="$t('password')">
                            <i slot="suffix" class="el-input__icon el-icon-view" v-on:click.stop="toggle"></i>
                            <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'helpForm')"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" v-if='hasShow'>
                        <el-input v-model="helpWay.password" autocomplete="off"  :placeholder="$t('password')">
                            <i slot="suffix" class="el-input__icon el-icon-more" v-on:click.stop="toggle"></i>
                            <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'helpForm')"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="reptPassword" v-if='!hasShow'>
                        <el-input type="password" v-model="helpWay.reptPassword" autocomplete="off" :placeholder="$t('rep_password')">
                            <i slot="suffix" class="el-input__icon el-icon-view" v-on:click.stop="toggle"></i>
                            <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('reptPassword', 'helpForm')"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="reptPassword" v-if='hasShow'>
                        <el-input v-model="helpWay.reptPassword" autocomplete="off"  :placeholder="$t('rep_password')">
                            <i slot="suffix" class="el-input__icon el-icon-more" v-on:click.stop="toggle"></i>
                            <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('reptPassword', 'helpForm')"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="submit" type="primary">{{$t('Submit')}}</el-button>
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
        return {
            hasShow: false,
            helpWay:{
                helpNumber:'',
                password:'',
                reptPassword: '',
            },
            helpRules: {    
                helpNumber:[
                    { required: true, validator: this.$vali('notEmpty', '$vali.noHelpNumber'), trigger: 'blur' },
                    { validator: this.$vali('helpNumber', '$vali.helpNumber'), trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: this.$vali('notEmpty', '$vali.noPassword'), trigger: 'blur' },
                    { validator: this.$vali('password', '$vali.password', this, null, function(){
                        this.$refs.helpForm.validateField('reptPassword');
                    }), trigger: 'blur' },
                ],
                reptPassword: [
                    { required: true, validator: this.$vali('notEmpty', '$vali.noReptPassword'), trigger: 'blur' },
                    { validator: this.$vali('equal', '$vali.twoPassword', this, 'helpWay.password'), trigger: 'blur'}
                ],
            },
        };
    },

    methods: {
        toggle(){ this.hasShow = !this.hasShow; },
        reset( formName ){
            this.$refs[formName].resetFields();
        },
        clear(key, formName){
            this.helpWay[key] = '';
            this.$refs[formName].clearValidate([key]);
        },
        submit(){
            
        }
    }
};
</script>