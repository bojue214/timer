import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

const zh = {
    languages:{
        'zh': '简体中文',
        'en': 'English'
    },
    Account: '账户',
    account: '账户',
    Password: '密码',
    password: '密码',
    RepPassword: '确认密码',
    rep_password: '确认密码',
    Login: '登录',
    login: '登录',
    Language: '语言偏好',
    Welcome: '欢迎回来！',
    redirect: '跳转中...',
    Forget: '忘记密码...',
    Reset: '重置',
    Help_Number:'救援码',
    help_number: '救援码',
    Submit: '提交',
    $vali:{
        noHelpNumber: '请输入救援码',
        noAccount: '请输入账户名',
        noPassword: '请输入密码',
        phone: '手机号码格式不对',
        noReptPassword: '请输入确认密码',
        helpNumber: '救援码为六位字符或数字组成',
        twoPass: '两次输入的密码不一致',
    },
    message: { 
        ACCOUNT_NULL: '账户名不存在',
        PASSWORD_ERROR:'密码错误',
    },
    ...zhLocale
};

export default zh;