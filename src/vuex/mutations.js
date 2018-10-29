import map from './map';
import i18n from '../i18n/i18n';
const mutations = {
    /** SET_LANGUAGE
     *  mutate current language
     * @param {object} state base state
     * @param {string} lang  language
     */
    [map['SET_LANGUAGE']](state, lang){
        window.localStorage.removeItem('language');
        window.localStorage.setItem('language', lang);
        state.language = lang;
        i18n.locale = state.language;
    },
};

export default mutations;