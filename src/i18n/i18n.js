import vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';

import messages from './languages';

vue.use(VueI18n);

const i18n = new VueI18n({
    locale: localStorage.getItem('language') ==='undefined' ? 'zh' : localStorage.getItem('language'),
    messages
}); 

locale.i18n((key, value) => i18n.t(key, value));

export default i18n;