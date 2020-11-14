<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>认证审核</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="userId" label="用户ID"> </el-table-column>
                    <el-table-column prop="studentNumber" label="学号"></el-table-column>
                    <el-table-column prop="name" label="用户昵称"> </el-table-column>
                    <el-table-column prop="collegesName" label="认证学校"> </el-table-column>
                    <el-table-column prop="studentNumber" label="学生证">
                        <template slot-scope="scope">
                                <img  class="fileurl" :src="scope.row.secondPictures[0]" alt="" />
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="name" label="联系方式"> </el-table-column> -->
                    <el-table-column prop="createDate" label="提交时间"></el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">同意</el-button>
                            <el-button type="text" @click="deleteProduct(scope.row)" class="text-red" size="small">拒绝</el-button>
                        </template>
                    </el-table-column>
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
    </div>
</template>

<script>
import store from '@/store';

import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',
    data() {
        return {
            options: [],
            tableData: [],
            currentPage3: 5,
            formLabelWidth: '120px',
            title: '添加商品'
        };
    },
    created() {
        this.authenticationList();
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
                this.authenticationList()
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
                this.authenticationList()
            });
        },

        // 学生认证列表 undefined
        authenticationList() {
            userApi.authenticationList(store.getUser().sonId, (res) => {
                this.tableData = res.data.data;
                this.tableData.forEach(item=>{
                    
                    // console.log('列表',item.secondPictures)
                    if (item.secondPictures == undefined) {
                        item.secondPictures = ['https://swcloud.tjsichuang.cn:1444/second/user/File/getPicture?id=-1']
                        // console.log('列表2',item.secondPictures)
                    }
                })
                console.log(res);
            });
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
