<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
        <language></language>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="{span:14, offset:5}" :md="{span:8, offset:8}" :lg="{span:6, offset:9}" :xl="{span:6, offset:9}">
        <el-form :model="loginModel" status-icon :rules="rules" ref="loginForm" label-width="100px">
          
          <el-form-item prop="account">
            <el-input v-model="loginModel.account" :placeholder="$t('account')">
              <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('account', 'loginForm')"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-if='!showPass'>
            <el-input type="password" v-model="loginModel.password" autocomplete="off" :placeholder="$t('password')">
              <i slot="suffix" class="el-input__icon el-icon-view" v-on:click.stop="toggle"></i>
              <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'loginForm')"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-if='showPass'>
            <el-input v-model="loginModel.password" autocomplete="off"  :placeholder="$t('password')">
              <i slot="suffix" class="el-input__icon el-icon-more" v-on:click.stop="toggle"></i>
              <i slot="suffix" class="el-input__icon el-icon-delete" v-on:click.stop="clear('password', 'loginForm')"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="login('loginForm')">{{$t('Login')}}</el-button>
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
      loginModel: {
        account: '',
        password:''
      },
      rules: {
        account: [{ required: true, validator: this.$vali('notEmpty', '$vali.noAccount'), trigger: 'blur' }],
        password: [{ required: true, validator: this.$vali('notEmpty', '$vali.noPassword'), trigger: 'blur' }]
      },
      showPass: false
    };
  },

  methods: {
    toggle(){
      this.showPass = !this.showPass;
    },

    clear(key, formName){
      this.loginModel[key] = '';
      this.$refs[formName].clearValidate([key]);
    },

    login( formName ){
      this.$refs[formName].validate((valid) => {
        if(valid){

        } else{

        }
      });
    }
  }
}
</script>
