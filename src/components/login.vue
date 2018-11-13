<template>
    <div>
        <el-row>
            <el-col :xs="{span:20, offset:2}" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
                <language></language>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="{span:20, offset:2}" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
                <el-form :model="user" status-icon :rules="rules" ref="loginForm">
                
                <el-form-item prop="account">
                    <el-input v-model="user.account" :placeholder="$t('account')">
                    <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('account', 'loginForm')"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" v-if='!hasShow'>
                    <el-input type="password" v-model="user.password" autocomplete="off" :placeholder="$t('password')">
                    <i slot="suffix" class="el-input__icon el-icon-view" v-on:click.stop="toggle"></i>
                    <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'loginForm')"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" v-if='hasShow'>
                    <el-input v-model="user.password" autocomplete="off"  :placeholder="$t('password')">
                        <i slot="suffix" class="el-input__icon el-icon-more" v-on:click.stop="toggle"></i>
                        <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'loginForm')"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="login('loginForm')" v-loading.fullscreen.lock="isLoading">{{$t('Login')}}</el-button>
                </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import language from './language.vue'

export default {
    components:{ language },
    data() {
        return {
            user: {
                account: '',
                password:''
            },
            rules: {
                account: [{ required: true, validator: this.$vali('notEmpty', '$vali.noAccount'), trigger: 'blur' }],
                password: [{ required: true, validator: this.$vali('notEmpty', '$vali.noPassword'), trigger: 'blur' }]
            },
            hasShow: false,
            isLoading: false
        };
    },
    methods: {

        toggle(){ this.hasShow = !this.hasShow; },

        clear(key, formName){
            this.user[key] = '';
            this.$refs[formName].clearValidate([key]);
        },

        login( formName ){
            let that = this;
            that.isLoading = true;
            that.$refs[formName].validate((valid) => {
                valid && that.$store.dispatch('ACTION_USER_LOGIN', that.user).then(function(res){
                    that.$message({ message: h('p', null, [
                        h('span', null, that.$i18.t('welcome')),
                        h('span', null, res.nick),
                        h('span', null, that.$i18.t('redirect'))
                    ]), type: 'success' });
                }).catch(function(error){
                    that.$notify.error({ title: '登录失败', message: '请重试' });
                }).finally(function(){
                    that.isLoading = false;
                });
            });
        }
    }
}
</script>
