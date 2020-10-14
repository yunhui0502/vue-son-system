import Axios from 'axios';

let user = 'https://www.tjsichuang.cn:1443/second/user';
// =============================================商品模块
//入驻商家列表
function enterStoreList() {
    return Axios.get(user + '/StoreLogin/enterStoreList');
}

function authenticationList(sonId) {
    return Axios.get(user + '/MiniLoginController/authenticationList?sonId='+sonId );
}
function authenticationDispose(params) {
    let fd = new FormData();
    fd.append('AuthenticationId', params.AuthenticationId);
    fd.append('EndAuthenticationState', params.EndAuthenticationState);
    fd.append('StartAuthenticationState', params.StartAuthenticationState );
    fd.append('sonId', params.sonId);
    return Axios.post(user + '/MiniLoginController/authenticationDispose', fd);
}
function UserList(sonId) {
    return Axios.get(user + '/MiniLoginController/UserList?IsAuthentication='+sonId );
}
function Login(params) {
    let fd = new FormData();
    fd.append('password', params.password);
    fd.append('username', params.username);
    return Axios.post(user + '/SonLogin/Login', fd);
}
export default {
    enterStoreList: enterStoreList,
    authenticationList: authenticationList,
    authenticationDispose: authenticationDispose,
    UserList: UserList,
    Login: Login
};
