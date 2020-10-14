<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">积分商品</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">积分商品订单</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">提现资质</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">提现资质订单</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>积分商品</el-breadcrumb-item>
                </el-breadcrumb>
                <el-button @click="add" style="float: right; padding: 3px 0" class="text-black" type="text">+ 新建积分商品</el-button>
            </div>

            <div class="text item">
                <el-table :data="tableData" style="width: 100%;" stripe>
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="integralName" label="商品名称 "> </el-table-column>
                    <el-table-column prop="integralNeed" label="兑换积分 "> </el-table-column>
                    <el-table-column prop="integralQuantity" label="库存 "> </el-table-column>
                    <el-table-column prop="createTime" label="上架时间" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="storeName" label="商家" align="center" show-overflow-tooltip></el-table-column>
                    <!-- <el-table-column prop="date" label="自提地址" align="center" show-overflow-tooltip></el-table-column> -->
                    <el-table-column fixed="right" width="120" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handlexClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" @click="deletes(scope.row.id)" class="text-red" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
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
                </div>
            </div>
        </el-card>

        <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品照片" :label-width="formLabelWidth">
                    <el-upload
                        action="http://39.100.237.144:7004/user/File/fileUpLoad"
                        list-type="picture-card"
                        name="file"
                        :limit="1"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品库存" :label-width="formLabelWidth">
                    <el-input v-model="formData.quantity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换积分" :label-width="formLabelWidth">
                    <el-input v-model="formData.sellPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商家" :label-width="formLabelWidth">
                    <el-select v-model="formData.storeId" placeholder="请选择活动区域">
                        <el-option v-for="item in options" :key="item.storeId" :label="item.nickName" :value="item.storeId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntegralProduct">确 定</el-button>
            </div>
        </el-dialog>

        <el-card class="box-card " v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>积分商品</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="integralOrderData" stripe style="width: 100%">
                    <el-table-column prop="integralId" label="订单号"> </el-table-column>
                    <el-table-column prop="integralName" label="积分商品"> </el-table-column>
                    <el-table-column prop="userName" label="兑换用户"> </el-table-column>
                    <el-table-column label="购买数量"> 1 </el-table-column>
                    <el-table-column prop="integralNeed" label="兑换积分"> </el-table-column>
                    <!-- <el-table-column prop="integralNeed" label="兑换积分"> </el-table-column> -->
                    <el-table-column prop="integralType" label="状态"></el-table-column>
                </el-table>
                <div class="block">
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
                </div>
            </div>
        </el-card>

        <div v-if="tabindex == 2">
            <withdraw></withdraw>
        </div>

        <el-card class="box-card " v-if="tabindex == 3">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>积分商品</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="tableDataEmbody" stripe style="width: 100%">
                    <el-table-column prop="date" label="订单号"> </el-table-column>
                    <el-table-column prop="name" label="商家商品"> </el-table-column>
                    <el-table-column prop="name" label="兑换用户"> </el-table-column>
                    <el-table-column prop="name" label="购买数量"> </el-table-column>
                    <el-table-column prop="name" label="兑换积分"> </el-table-column>
                    <el-table-column prop="name" label="状态"> </el-table-column>
                </el-table>
                <div class="block">
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
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

import withdraw from './withdraw.vue';
export default {
    name: '',
    components: {
        withdraw
    },
    data() {
        return {
            options: [],

            formData: {
                file1: '',
                productName: '',
                limit: '',
                quantity: '',
                sellPrice: '',
                storeId: '',
                type: 'product'
            },
            tabindex: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            tableData: [],
            tableDataEmbody: [],
            integralOrderData: [],
            dialogFormVisible: false,
            currentPage3: 5,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.selectIntegralProduct();
        this.enterStoreList();
        this.selectIntegralRecord();
    },
    methods: {
        add() {
            this.dialogFormVisible = true;
            this.formData = {
                file1: '',
                productName: '',
                limit: '',
                quantity: '',
                sellPrice: '',
                storeId: '',
                type: 'product'
            };
        },
        selectIntegralRecord() {
            api.selectIntegralRecord({ IntegralType: 'product' }, res => {
                this.integralOrderData = res.data.data;
                console.log(res);
            });
        },
        // 获取商家
        enterStoreList() {
            userApi.enterStoreList(res => {
                this.options = res.data.data;
                console.log(res);
            });
        },
        handlexClick(row) {
            console.log(row);
            this.formData.integralId = row.id;
            this.formData.productName = row.integralName;
            this.formData.quantity = row.integralQuantity;
            this.formData.productId = row.productId;
            this.formData.storeId = row.storeId;
            this.formData.sellPrice = row.integralNeed;
            this.dialogFormVisible = true;
        },
        deletes(id) {
            console.log(id);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        integralId: id
                    };
                    api.deleteIntegralProduct(params, res => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.selectIntegralProduct();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 获取积分商品
        selectIntegralProduct() {
            let params = {
                IntegralType: 'product'
            };
            api.selectIntegralProduct(params, res => {
                this.tableData = res.data.data;
                console.log('积分商品', res);
            });
        },

        // 添加积分商品
        addIntegralProduct() {
            console.log(this.formData.integralId);
            if (this.formData.integralId == undefined) {
                console.log('添加');
                api.addIntegralProduct(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            } else {
                console.log('修改');
                api.updateIntegralProduct(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            }
        },

        indexMethod(index) {
            return index * 2;
        },
        Tab(e) {
            this.tabindex = e;
        },
        // ----------------------------------------------------------------------
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(esponse, file, fileList) {
            console.log('esponse', esponse), console.log('file', file), console.log('fileList', fileList);
            this.formData.file1 = esponse.data;
        },
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
.fileurl {
    width: 35px;
    height: 35px;
    background: #dcdcdc;
    border-radius: 14px;
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
</style>
