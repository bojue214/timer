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
          <el-form-item prop="password" v-if='!showPass'>
            <el-input type="password" v-model="user.password" autocomplete="off" :placeholder="$t('password')">
              <i slot="suffix" class="el-input__icon el-icon-view" v-on:click.stop="toggle"></i>
              <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'loginForm')"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-if='showPass'>
            <el-input v-model="user.password" autocomplete="off"  :placeholder="$t('password')">
              <i slot="suffix" class="el-input__icon el-icon-more" v-on:click.stop="toggle"></i>
              <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'loginForm')"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="login('loginForm')" v-loading.fullscreen.lock="isLoginning">{{$t('Login')}}dsadsadas</el-button>
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
      showPass: false,
      isLoginning: false
    };
  },
  mounted(){
    // register a listener to get the user mutation info.
    //this.$store.subscribe(this.logged);
  },
  methods: {
    // when SET_USER is excued, the user info is got successfully.
    logged(mutation, state){
      mutation.type === 'SET_USER' && this.$router.push('home');
    },

    toggle(){ this.showPass = !this.showPass; },

    clear(key, formName){
      this.user[key] = '';
      this.$refs[formName].clearValidate([key]);
    },

    login( formName ){
      let self = this;
      this.isLoginning = true;
      self.$refs[formName].validate((valid) => {
        valid && self.$store.dispatch('ACTION_USER_LOGIN', self.user).then(function(res){
          self.$notify.success({ title: '登录成功', message: '页面跳转中......' });
        }).catch(function(error){
          self.$notify.error({ title: '登录失败', message: '请重试' });
        }).finally(function(){
          self.isLoginning = false;
        });
      });
    }
  }
}
</script>
