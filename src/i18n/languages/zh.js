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
    Login: '登录',
    login: '登录',
    select_language: '语言偏好',
    welcome: '欢迎回来！',
    redirect: '跳转中...',
    Forget: '忘记密码...',
    $vali:{ 
        noAccount: '请输入账户名',
        noPassword: '请输入密码',
        phone: '手机号码格式不对',
    },
    message: { 
        ACCOUNT_NULL: '账户名不存在',
        PASSWORD_ERROR:'密码错误',
    },
    ...zhLocale
};

export default zh;