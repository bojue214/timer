import i18n from '../i18n/i18n';

/** REGEX
 * regEx defined variables map
 */
const REGEX = {
    phone: /^1[3|4|5|7|8][0-9]\d{8}$/,
    notEmpty: /\r|\n|\\s/g,
    helpNumber: /^[A-Za-z0-9]{6}$/,
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
    },
    helpNumber(val){
        return REGEX['helpNumber'].test(val);
    }
};

/** validator
 * validate factory
 * @param {string} ruleKey rule regEx key
 * @param {string} messageKey i18n key
 */
const validator = function(ruleKey, messageKey){
    return function(rule, value, callback ){
        if( !CHECK[ruleKey](value) ){ 
            callback( new Error(i18n.t(messageKey)) );
        } else {
            callback();
        }
    };
};

/** install
 *  vue install function
 * @param {object} Vue  Vue
 */
validator.install = function(Vue){
    Vue.prototype.$vali = validator;
};

export default validator;