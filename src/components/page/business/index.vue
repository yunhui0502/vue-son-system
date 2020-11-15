<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">学生认证</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">认证审核</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>学生认证</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- <el-button @click="add" style="float: right; padding: 3px 0" class="text-black" type="text">+ 添加商品</el-button> -->
            </div>

            <div class="text item">
                <el-table :data="options" stripe style="width: 100%">
                    <el-table-column prop="userId" label="用户ID"> </el-table-column>
                    <el-table-column prop="productName" label="头像">
                        <template slot-scope="scope">
                            <img class="fileurl"  :src="scope.row.userFIle" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickName" label="用户昵称"> </el-table-column>
                    <el-table-column prop="college" label="认证学校"> </el-table-column>
                    <el-table-column prop="productNum" label="发布商品数量"> </el-table-column>
                    <el-table-column prop="buyProductNum" label="购买商品数量"> </el-table-column>
                    <el-table-column prop="phone" label="联系方式"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间"> </el-table-column>
                    <el-table-column prop="income" label="收入流水"> </el-table-column>
                    <el-table-column prop="expend" label="支出流水"> </el-table-column>
                </el-table>
                <!-- <div class="block">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000"
                    >
                    </el-pagination>
                </div> -->
            </div>
        </el-card>

        <div v-if="tabindex == 1">
            <authentication></authentication>
        </div>
    </div>
</template>

<script>
import store from '@/store';

import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

import authentication from './authentication.vue';

export default {
    name: '',
    components: {
        authentication,
    },
    data() {
        return {
            options: [],
            tableData: [],

            formData: {
                categoryId: '0', //类目
                file: [],
                goodsResp: '', //库存
                isPutaway: '0', //是否上架
                // linePrice: '200', //划线价格
                productDesc: '', //富文本
                productName: '', //商品名字
                sellPrice: '100', //售卖价格
                showType: 'coupon', //商品类型
                storeType: 'store',
                storeId: '' // 店铺id
            },
            tabindex: 0,
            dialogImageUrl: '',
            dialogVisible: false,

            dialogFormVisible: false,
            currentPage3: 5,
            formLabelWidth: '120px',
            title: '添加商品'
        };
    },
    created() {
        this.authenticationList();
        this.selectProduct();
    },
    methods: {

        // 同意
        handleClick(row) {
            console.log(row);
            let params = {
                AuthenticationId: row.id,
                EndAuthenticationState: '0',
                StartAuthenticationState: '1',
                sonId: store.getUser().sonId
            };
            userApi.authenticationDispose(params, (res) => {
                console.log(res);
                this.$message({
                    message: '已同意',
                    type: 'success'
                });
            });
        },
                // 拒绝
        deleteProduct(row) {
            let params = {
                AuthenticationId: row.id,
                EndAuthenticationState: '2',
                StartAuthenticationState: '1',
                sonId: store.getUser().sonId
            };
            userApi.authenticationDispose(params, (res) => {
                console.log(res);
                this.$message({
                    message: '已拒绝',
                    type: 'success'
                });
            });
        },

        // 学生认证列表
        authenticationList() {
            userApi.authenticationList(store.getUser().sonId, (res) => {
                this.tableData = res.data.data;
                console.log(res);
            });
        },
        // 学生认证 
        selectProduct() {
            userApi.UserList({IsAuthentication:0,sonId: store.getUser().sonId}, (res) => {
               let options = res.data.data;
                options.forEach(item=>{
                    item.income = parseFloat(item.income/100).toFixed(2)
                    item.expend = parseFloat(item.expend/100).toFixed(2)
                })
                this.options = options
                console.log(res);
            });
        },
        Tab(e) {
            this.tabindex = e;
        },
        // ----------------------------------------------------------------------

        // ----------------------------------------------------------------------
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style lang="less" scoped>
.fileurl {
    width: 35px;
    height: 35px;
    background: #dcdcdc;
    border-radius: 14px;
}

.head {
    display: flex;
    width: 98%;
    height: 57px;
    background: #ffffff;
    border: 1px solid #ffffff;

    .head-item {
        margin-left: 40px;
        padding: 0px 18px;
        margin-top: 16px;
        height: 29px;
        line-height: 29px;

        font-size: 11px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
    }
    .on {
        border: 1px solid #333333;

        font-size: 11px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
    }
}
.clearfix {
    display: flex;
    justify-content: space-between;
}
/deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
}

.abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
    /deep/.el-dialog {
        margin: 0 auto !important;
        height: 90%;
        overflow: hidden;
        /deep/.el-dialog__body {
            position: absolute;
            left: 0;
            top: 54px;
            bottom: 0;
            right: 0;
            padding: 0;
            z-index: 1;
            overflow: hidden;
            overflow-y: auto;
        }
    }
}
</style>
