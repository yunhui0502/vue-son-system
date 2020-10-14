/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
// 负责：用户信息的  存储 获取 删除 三个函数
const KEY = 'lanhu-pc-hui';
export default {
    setUser(user) {
        // 存储用户信息
        // user 数据类型  对象
        const jsonStr = JSON.stringify(user);
        window.sessionStorage.setItem(KEY, jsonStr);
    },
    getUser() {
        // 获取用户信息
        const jsonStr = window.sessionStorage.getItem(KEY) || '{}';
        return JSON.parse(jsonStr);
    },
    delUser() {
        // 删除用户信息
        window.sessionStorage.removeItem(KEY);
    },
    getNowDate() {
        var date = new Date();
        var seperator1 = '-';
        var seperator2 = ':';
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        // 获取分钟
        var minute = date.getMinutes();
        // 获取秒
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        if (hour >= 0 && hour <= 9) {
            hour = '0' + hour;
        }
        if (minute >= 0 && minute <= 9) {
            minute = '0' + minute;
        }
        if (minute >= 0 && minute <= 9) {
            minute = '0' + minute;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minute + seperator2 + second;
        return currentdate;
    }
};
