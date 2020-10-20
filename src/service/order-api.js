/* eslint-disable require-jsdoc */
import order from '@/api/order.js';

async function selectOrder(param,handleResult) {
    order.selectOrder(param).then(res => handleResult(res));
}

export default {
    selectOrder: selectOrder,

};
