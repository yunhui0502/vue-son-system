<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item on">商品列表</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="text item">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    stripe
                >
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="nickName" label="所属用户"> </el-table-column>
                    <el-table-column prop="productName" label="用户商品" align="center"></el-table-column>
                    <el-table-column prop="colleges" label="所在学校" align="center"></el-table-column>
                    <el-table-column prop="price" label="价格" align="center"></el-table-column>
                    <el-table-column prop="productCategory" label="分类" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.file" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="120" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deletes(scope.row.id)" class="text-red" size="small">删除</el-button>
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
import api from '@/service/product.js';
import store from '@/store';

export default {
    name: '',
    data() {
        return {
            tabindex: 0,
            tableData: [],
            currentPage3: 5,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.selectProduct();
    },
    methods: {

        deletes(id) {
            console.log(id);

            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        productId: id
                    };
                    api.deleteProduct(params, res => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.selectProduct();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 获取用户商品
        selectProduct() {
            let params = {
                isSon: '0', //是否是子站点查询 0是
                showType: 'product', //商品类型
                sonId: store.getUser().sonId, //子站点id
                // sonId: '2', //子站点id
            };
            api.selectProduct(params, res => {
                this.tableData = res.data.data;
                console.log('获取用户商品', res);
            });
        },
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
