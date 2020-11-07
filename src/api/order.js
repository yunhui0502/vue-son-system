import Axios from 'axios';

let order = 'http://swcloud.tjsichuang.cn:1444/second/order';
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
//每月收入图标
function backendData(sonId) {
    return Axios.get(order + '/Statistics/backendData?sonId='+ sonId);
}
//订单统计
function orderStatistics(sonId) {
    return Axios.get(order + '/Statistics/orderStatistics?sonId='+ sonId);
}
//用户统计
function userStatistics(sonId) {
    return Axios.get(order + '/Statistics/userStatistics?sonId='+sonId);
}
export default {
    selectOrder: selectOrder,
    authenticationDispose: authenticationDispose,
    backendData:backendData,
    orderStatistics:orderStatistics,
    userStatistics:userStatistics
};
