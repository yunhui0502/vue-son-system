/* eslint-disable require-jsdoc */
import product from '@/api/user.js';

async function enterStoreList(handleResult) {
    product.enterStoreList().then(res => handleResult(res));
}
async function authenticationList(sonId,handleResult) {
    product.authenticationList(sonId).then(res => handleResult(res));
}
async function authenticationDispose(params,handleResult) {
    product.authenticationDispose(params).then(res => handleResult(res));
}
async function UserList(sonId,handleResult) {
    product.UserList(sonId).then(res => handleResult(res));
}
async function Login(params,handleResult) {
    product.Login(params).then(res => handleResult(res));
}
export default {
    enterStoreList: enterStoreList,
    authenticationList: authenticationList,
    authenticationDispose: authenticationDispose,
    UserList:UserList,
    Login:Login
};
