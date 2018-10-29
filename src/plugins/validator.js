import i18n from '../i18n/i18n';

/** REGEX
 * regEx defined variables map
 */
const REGEX = {
    phone:/^1[3|4|5|7|8][0-9]\d{8}$/,
    notEmpty: /\r|\n|\\s/g,
};

/** CHECK
 * validate functions list
 */
const CHECK = {
    phone(val){
        return REGEX['phone'].test(val);
    },
    notEmpty(val){
        return val.replace(REGEX.empty, '') !== '';
    }
};

/** validator
 * validate factory
 * @param {string} ruleKey rule regEx key
 * @param {string} messageKey i18n key
 */
const validator = function(ruleKey, messageKey){
    return function( rule, value, callback ){
        if( !CHECK[ruleKey](value) ){ 
            callback( new Error(i18n.t(messageKey)) );
        } else {
            callback();
        }
    };
};

export default { 
    install (Vue, options) {
        Vue.prototype.$vali = validator;
    }
};