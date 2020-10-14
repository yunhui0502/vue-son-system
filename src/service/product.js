/* eslint-disable require-jsdoc */
import product from '@/api/product.js';

async function addCategory(params, handleResult) {
    product.addCategory(params).then(res => handleResult(res));
}
async function category(params, handleResult) {
    product.category(params).then(res => handleResult(res));
}
async function categoryList(params, handleResult) {
    product.categoryList(params).then(res => handleResult(res));
}
async function deleteCategory(params, handleResult) {
    product.deleteCategory(params).then(res => handleResult(res));
}

async function updateCategory(params, handleResult) {
    product.updateCategory(params).then(res => handleResult(res));
}
async function addProduct(params, handleResult) {
    product.addProduct(params).then(res => handleResult(res));
}
async function selectProduct(params, handleResult) {
    product.selectProduct(params).then(res => handleResult(res));
}
async function deleteProduct(params, handleResult) {
    product.deleteProduct(params).then(res => handleResult(res));
}
async function updateProduct(params, handleResult) {
    product.updateProduct(params).then(res => handleResult(res));
}
async function addIntegralProduct(params, handleResult) {
    product.addIntegralProduct(params).then(res => handleResult(res));
}
async function selectIntegralProduct(params, handleResult) {
    product.selectIntegralProduct(params).then(res => handleResult(res));
}
async function deleteIntegralProduct(params, handleResult) {
    product.deleteIntegralProduct(params).then(res => handleResult(res));
}
async function updateIntegralProduct(params, handleResult) {
    product.updateIntegralProduct(params).then(res => handleResult(res));
}
async function selectIntegralRecord(params, handleResult) {
    product.selectIntegralRecord(params).then(res => handleResult(res));
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
