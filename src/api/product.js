/* eslint-disable no-magic-numbers */
/* eslint-disable require-jsdoc */
// import Axios from './index';
import Axios from 'axios';

let product = 'https://www.tjsichuang.cn:1443/second/product';
// let product = 'http://192.168.1.128:7002/product';'
// =============================================商品模块

function addCategory(params) {
    let fd = new FormData();
    fd.append('categoryName', params.categoryName);
    fd.append('categoryType', params.categoryType);
    fd.append('fileId', params.fileId);
    fd.append('levelId', params.levelId);
    fd.append('parentCategoryId', params.parentCategoryId);
    return Axios.post(product + '/Category/addCategory', fd);
}

function category(param) {
    return Axios.get(product + '/Category/category', { params: param });
}
function categoryList(param) {
    return Axios.get(product + '/Category/categoryList', { params: param });
}
function deleteCategory(params) {
    let fd = new FormData();
    fd.append('categoryId', params.categoryId);
    return Axios.post(product + '/Category/deleteCategory', fd);
}

function updateCategory(params) {
    let fd = new FormData();
    fd.append('categoryId ', params.categoryId);
    fd.append('categoryName ', params.categoryName);
    fd.append('fileId ', params.fileId);
    return Axios.post(product + '/Category/updateCategory', fd);
}

function addProduct(params) {
    let fd = new FormData();
    fd.append('categoryId', params.categoryId);
    fd.append('file1', params.file);
    fd.append('goodsResp', params.goodsResp);
    fd.append('isPutaway', params.isPutaway);
    fd.append('productDesc', params.productDesc);
    fd.append('productName', params.productName);
    fd.append('sellPrice', params.sellPrice);
    fd.append('showType', params.showType);
    fd.append('storeId', params.storeId);
    return Axios.post(product + '/SecondProduct/addProduct', fd);
}

// 获取商品列表
function selectProduct(param) {
    return Axios.get(product + '/SecondProduct/selectProduct', { params: param });
}
// 删除商品
function deleteProduct(params) {
    let fd = new FormData();
    fd.append('productId ', params.productId);
    return Axios.post(product + '/SecondProduct/deleteProduct', fd);
}
// 编辑商品
function updateProduct(params) {
    let fd = new FormData();
    // fd.append('categoryId ', params.categoryId);
    fd.append('isPutaway ', params.isPutaway);
    fd.append('productDesc ', params.productDesc);
    fd.append('productName ', params.productName);
    fd.append('productId ', params.id);
    fd.append('showType ', params.showType);
    fd.append('storeId ', params.storeId);
    return Axios.post(product + '/SecondProduct/updateProduct', fd);
}
// 添加积分商品
function addIntegralProduct(params) {
    let fd = new FormData();
    // fd.append('categoryId ', params.categoryId);
    fd.append('file1 ', params.file1);
    fd.append('limit ', params.limit);
    fd.append('productName ', params.productName);
    fd.append('storeId ', params.storeId);
    fd.append('sellPrice ', params.sellPrice);
    fd.append('quantity ', params.quantity);
    fd.append('type ', params.type);
    return Axios.post(product + '/Integral/addIntegralProduct', fd);
}
// 修改积分商品
function updateIntegralProduct(params) {
    let fd = new FormData();
    // fd.append('categoryId ', params.categoryId);
    fd.append('file1 ', params.file1);
    fd.append('limit ', params.limit);
    fd.append('productName ', params.productName);
    fd.append('storeId ', params.storeId);
    fd.append('sellPrice ', params.sellPrice);
    fd.append('quantity ', params.quantity);
    fd.append('type ', params.type);
    fd.append('integralId ', params.integralId);
    fd.append('productId ', params.productId);
    return Axios.post(product + '/Integral/updateIntegralProduct', fd);
}
// 获取商品列表
function selectIntegralProduct(param) {
    return Axios.get(product + '/Integral/selectIntegralProduct', { params: param });
}
// 删除积分商品
function deleteIntegralProduct(params) {
    let fd = new FormData();
    fd.append('integralId  ', params.integralId);
    return Axios.post(product + '/Integral/deleteIntegralProduct', fd);
}

// 查询积分换购记录
function selectIntegralRecord(param) {
    return Axios.get(product + '/Integral/selectIntegralRecord', { params: param });
}
export default {
    addCategory: addCategory,
    category: category,
    categoryList: categoryList,
    deleteCategory: deleteCategory,
    updateCategory: updateCategory,
    addProduct: addProduct,
    selectProduct: selectProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    addIntegralProduct: addIntegralProduct,
    selectIntegralProduct: selectIntegralProduct,
    deleteIntegralProduct: deleteIntegralProduct,
    updateIntegralProduct: updateIntegralProduct,
    selectIntegralRecord: selectIntegralRecord
};
