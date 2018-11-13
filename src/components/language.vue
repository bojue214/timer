<template>
  <el-dropdown @command="onDropdownSelect">
    <span class="el-dropdown-link">
      {{$t('Language')}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in languages" :key="item.language" :command="item.language">
        {{ item.message }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

import langs from '../i18n/languages';

export default {

  data() {
    return {
      languages:[],
      lang: ''
    };
  },

  mounted(){
    this.initLang();
  },

  methods:{
    initLang(){
      for( let key in langs ){
        this.languages.push({
          language: key,
          message: this.$i18n.t('languages.'+ key)
        });
      }
    },

    onDropdownSelect(command){
      this.$store.dispatch('ACTION_USER_LANGUAGE', command);
    }
  }
};
</script>

