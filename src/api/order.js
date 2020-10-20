import Axios from 'axios';

let order = 'https://www.tjsichuang.cn:1443/second/order';
// =============================================商品模块
//查询订单
function selectOrder(param) {
    return Axios.get(order + '/SecondOrder/selectOrder', { params: param });
}

function authenticationDispose(params) {
    let fd = new FormData();
    fd.append('AuthenticationId', params.AuthenticationId);
    fd.append('EndAuthenticationState', params.EndAuthenticationState);
    fd.append('StartAuthenticationState', params.StartAuthenticationState );
    fd.append('sonId', params.sonId);
    return Axios.post(user + '/MiniLoginController/authenticationDispose', fd);
}

export default {
    selectOrder: selectOrder,
    authenticationDispose: authenticationDispose,
};
