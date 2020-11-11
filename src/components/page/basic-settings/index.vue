<template>
    <div style="padding: 46px">
        <div class="sumClass">
            <div class="userClass">
                <h5>用户总数</h5>
                <div class="amount-box">
                    <div class="amount">{{ userData.userAuthentication }}</div>
                    <img src="../../../assets/img/yh.png" alt="" />
                </div>
            </div>
            <!-- <div class="userClass">
               <h5>用户商品总数</h5>
               <div class="amount-box">
                   <div class="amount">6935</div>
                   <img src="../../../assets/img/yh.png" alt="">
               </div>
           </div> -->
            <div class="userClass">
                <h5>订单总数</h5>
                <div class="amount-box">
                    <div class="amount">{{ orderData.orderNumber }}</div>
                    <img src="../../../assets/img/yh.png" alt="" />
                </div>
            </div>
            <div class="userClass">
                <h5>收入总额</h5>
                <div class="amount-box">
                    <div class="amount">{{ sonDetailsData.sumMoney }}</div>
                    <img src="../../../assets/img/yh.png" alt="" />
                </div>
            </div>
        </div>

        <div class="details">
            <div class="details-box">
                <div class="item">
                    <h5>用户详情</h5>
                    <div class="contents">
                        <div class="head">
                            <span>分类</span>
                            <span>数量</span>
                        </div>
                        <!-- <div class="body">
                            <span>普通用户</span>
                            <span class="amount">{{ userData.userGeneral }}</span>
                        </div> -->
                        <div class="body">
                            <span>认证学生</span>
                            <span class="amount">{{ userData.userAuthentication }}</span>
                        </div>
                        <!-- <div class="body">
                            <span>商家用户</span>
                            <span class="amount">{{ userData.userStore }}</span>
                        </div> -->
                    </div>
                </div>

                <div class="item">
                    <h5>订单详情</h5>
                    <div class="contents">
                        <div class="head">
                            <span>状态</span>
                            <span>数量</span>
                        </div>
                        <div class="body">
                            <span>待发货</span>
                            <span class="amount">{{ orderData.process }}</span>
                        </div>
                        <div class="body">
                            <span>待收货</span>
                            <span class="amount">{{ orderData.pickUp }}</span>
                        </div>
                        <div class="body">
                            <span>待评价</span>
                            <span class="amount">{{ orderData.evaluate }}</span>
                        </div>
                        <div class="body">
                            <span>已完成</span>
                            <span class="amount">{{ orderData.complete }}</span>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <h5>子站点分成收益</h5>
                    <div class="Withdraw">
                        <div>{{ sonDetailsData.money }}</div>
                        <div @click="dialogFormVisible = true" class="butt">提现</div>
                    </div>
                </div>
            </div>
            <div class="datum">
                <div id="myChart" style="height: 369px; width: 100%"></div>
            </div>
        </div>

        <el-dialog title="提现" width="30%" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="收款金额" :label-width="formLabelWidth">
                    <el-input v-model="withdrawalMoney" autocomplete="off" placeholder="请输入取款金额"></el-input>
                </el-form-item>
                <el-form-item label="提现到" :label-width="formLabelWidth">
                    <el-select v-model="form.methodId" placeholder="请选择">
                        <el-option label="微信" value="微信"></el-option>
                        <el-option label="支付宝" value="支付宝"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款账号" :label-width="formLabelWidth">
                    <el-input v-model="form.withdrawalAccount" autocomplete="off" placeholder="请输入收款账号"></el-input>
                </el-form-item>
                <el-form-item label="收款姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.withdrawalName" autocomplete="off" placeholder="请输入收款姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="NumSteps">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import store from '@/store';

import orderApi from '@/service/order-api.js';
import api from '@/service/product.js';
import userApi from '@/service/user-api.js';
import echarts from 'echarts';
export default {
    name: 'dashboard',
    data() {
        return {
            orderData: '',
            statistics: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3],
            userData: '',
            sonDetailsData: '',
            dialogFormVisible: false,
            withdrawalMoney: '',
            form: {
                methodId: '微信', //取款方式id
                phone: '', //手机号
                sonId: '', //子站点id
                source: 'son', //发起提现来源,user,store,son
                storeId: '', //店铺id
                userId: '', //用户id
                withdrawalAccount: '', //取款账号
                withdrawalMoney: '', //取款金额
                withdrawalName: '' //姓名
            },
            formLabelWidth: '120px'
        };
    },

    mounted() {
        this.userStatistics();
        this.orderStatistics();
        this.backendData();
        this.sonDetails();
    },
    methods: {
        NumSteps() {
            if (this.withdrawalMoney < 1) {
                this.$message({
                    message: '提现金额不能是0或空',
                    type: 'warning'
                });
                return;
            }
            this.form.sonId = store.getUser().sonId
            this.form.userId = store.getUser().userId
            this.form.storeId = store.getUser().storeId
            this.form.withdrawalMoney = this.withdrawalMoney * 100
            api.addWithdrawal(this.form, (res) => {
                console.log(res);
                this.dialogFormVisible = false
                if (res.status == 200) {
                    wx.showToast({
                        title: '提现申请成功',
                        icon: 'none'
                    });
                }
                if (res.status == 403) {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 表格数据
        backendData() {
            orderApi.backendData(store.getUser().sonId, (res) => {
                this.statistics = [];
                let data = res.data.data[0];
                console.log(data);
                this.statistics.push(data.january/100);
                this.statistics.push(data.february/100);
                this.statistics.push(data.march/100);
                this.statistics.push(data.april/100);
                this.statistics.push(data.may/100);
                this.statistics.push(data.june/100);
                this.statistics.push(data.july/100);
                this.statistics.push(data.august/100);
                this.statistics.push(data.september/100);
                this.statistics.push(data.october/100);
                this.statistics.push(data.november/100);
                this.statistics.push(data.december/100);
                this.category();
            });
        },
        //订单统计
        orderStatistics() {
            orderApi.orderStatistics(store.getUser().sonId, (res) => {
                console.log(res);
                this.orderData = res.data.data;
            });
        },
        //用户统计
        userStatistics() {
            orderApi.userStatistics(store.getUser().sonId, (res) => {
                console.log(res);
                this.userData = res.data.data;
            });
        },
        sonDetails() {
            userApi.sonDetails(store.getUser().storeId, store.getUser().userId, (res) => {
                console.log(res);
                this.sonDetailsData = res.data.data;
            });
        },
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // },
        category() {
            var myChart = echarts.init(document.getElementById('myChart'));
            var option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.statistics,
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: '#D3D3D3' //改变区域颜色
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FFFFFF', //改变折线点的颜色
                                lineStyle: {
                                    color: '#818181' //改变折线颜色
                                }
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>


<style scoped lang="less">
.sumClass {
    display: flex;
    justify-content: space-between;
    margin-top: 47px;
    .userClass {
        padding: 16px 23px;
        width: 28%;
        background: #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
        border: 1px solid #ffffff;
        border-radius: 4px;
        .amount-box {
            display: flex;
            justify-content: space-between;
            height: 76px;
            .amount {
                font-size: 40px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #333333;
            }
        }
    }
}
.details {
    width: 100%;
    margin-top: 13px;
    .details-box {
        display: flex;
        justify-content: space-between;
        .item {
            width: 29.5%;
            background: #ffffff;
            padding: 19px 14px;
            border-radius: 4px;

            .contents {
                .head {
                    display: flex;
                    justify-content: space-around;
                    height: 40px;
                    line-height: 40px;
                    background: #f8fbff;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #333333;
                }
                .body {
                    display: flex;
                    justify-content: space-around;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    .amount {
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                    }
                }
            }
            .Withdraw {
                display: flex;
                flex-direction: column;
                padding: 20px;
                text-align: center;

                font-size: 40px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #333333;
                .butt {
                    width: 122px;
                    height: 30px;
                    background: #333333;
                    border-radius: 10px;
                    margin: 0 auto;
                    margin-top: 30px;

                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffffff;
                }
            }
        }
    }
    .datum {
        margin-top: 15px;
        width: 100%;
        height: 369px;
        background: #ffffff;
        border-radius: 4px;
    }
}
</style>
