<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商家分类</el-breadcrumb-item>
                </el-breadcrumb>
                <el-button @click="dialogFormVisible = true" style="float: right; padding: 3px 0" class="text-black" type="text"
                    >+ 新建资质商品</el-button
                >
            </div>

            <div class="text item">
                <el-table :data="tableData" style="width: 100%;" stripe>
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="integralName" label="商品名称 "> </el-table-column>
                    <el-table-column prop="exemptCommission" label="免手续费提现额度"> </el-table-column>
                    <el-table-column prop="integralNeed" label="兑换积分"> </el-table-column>
                    <el-table-column prop="integralQuantity" label="库存"> </el-table-column>
                    <el-table-column prop="createTime" label="上架时间"> </el-table-column>
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

        <el-dialog title="商品" :visible.sync="dialogFormVisible">
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
                <el-form-item label="提现额度" :label-width="formLabelWidth">
                    <el-input v-model="formData.limit" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换积分" :label-width="formLabelWidth">
                    <el-input v-model="formData.sellPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存" :label-width="formLabelWidth">
                    <el-input v-model="formData.quantity" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntegralProduct">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',
    data() {
        return {
            options: [],
            // 所属目录
            onecatalogues: [],
            // 判断一级目录选择的东西控制2 3 目录显示隐藏
            controlCatalogue: '0',
            formData: {
                file1: '',
                productName: '',
                limit: '',
                quantity: '',
                sellPrice: '',
                storeId: '',
                type: 'withdraw',
                productId:''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            tableData: [],
            dialogFormVisible: false,
            currentPage3: 5,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.selectIntegralProduct();
        this.enterStoreList();
    },
    methods: {
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
            this.formData.sellPrice = row.integralNeed;
            this.formData.limit = row.exemptCommission;
            // this.formData.storeId = row.storeId;
            this.dialogFormVisible = true;
        },
        deletes(id) {
            console.log(id);
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
        // 获取提现资质商品
        selectIntegralProduct() {
            let params = {
                IntegralType: 'withdraw'
            };
            api.selectIntegralProduct(params, res => {
                this.tableData = res.data.data;
                console.log('提现资质', res);
            });
        },

        // 添加分类
        addIntegralProduct() {
            console.log(this.formData.integralId);
            if (this.formData.integralId == undefined) {
                console.log('添加');
                api.addIntegralProduct(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                    this.selectIntegralProduct();

                });
            } else {
              console.log('修改');
                api.updateIntegralProduct(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                    this.selectIntegralProduct();

                });
            }
        },

        indexMethod(index) {
            return index * 2;
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
