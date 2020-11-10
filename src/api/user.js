import Axios from 'axios';

let user = 'https://swcloud.tjsichuang.cn:1444/second/user';
// let user = 'https://swcloud.tjsichuang.cn:1444/second/user';
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
function UserList(params) {

    return Axios.get(user + '/MiniLoginController/UserList?IsAuthentication='+ params.IsAuthentication + '&sonId='+ params.sonId );
}
function Login(params) {
    let fd = new FormData();
    fd.append('password', params.password);
    fd.append('username', params.username);
    return Axios.post(user + '/SonLogin/Login', fd);
}
function sonDetails(storeId,userId) {
    return Axios.get(user + '/SonLogin/sonDetails?storeId='+storeId +'&userId='+userId );
}
export default {
    enterStoreList: enterStoreList,
    authenticationList: authenticationList,
    authenticationDispose: authenticationDispose,
    UserList: UserList,
    Login: Login,
    sonDetails:sonDetails,
};
