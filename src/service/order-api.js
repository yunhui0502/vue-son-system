/* eslint-disable require-jsdoc */
import order from '@/api/order.js';

async function selectOrder(param,handleResult) {
    order.selectOrder(param).then(res => handleResult(res));
}
async function backendData(sonId,handleResult) {
    order.backendData(sonId).then(res => handleResult(res));
}
async function orderStatistics(sonId,handleResult) {
    order.orderStatistics(sonId).then(res => handleResult(res));
}
async function userStatistics(sonId,handleResult) {
    order.userStatistics(sonId).then(res => handleResult(res));
}

export default {
    selectOrder: selectOrder,
    backendData:backendData,
    orderStatistics:orderStatistics,
    userStatistics:userStatistics,

};
