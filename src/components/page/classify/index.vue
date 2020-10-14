<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">用户分类</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">商品列表</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">商家分类</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户分类</el-breadcrumb-item>
                </el-breadcrumb>
                <el-button @click="dialogFormVisible = true" style="float: right; padding: 3px 0" class="text-black" type="text"
                    >+ 添加分类</el-button
                >
            </div>

            <div class="text item">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    row-key="id"
                    stripe
                    :tree-props="{ children: 'categories', hasChildren: 'hasChildren' }"
                >
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="name" label="分类名称"> </el-table-column>
                    <el-table-column prop="level" label="级别" align="center">
                        <template slot-scope="scope">{{
                            scope.row.level === 0 ? '一级类目' : scope.row.level === 1 ? '二级类目' : '三级类目'
                        }}</template>
                    </el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.fileId" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
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

        <el-dialog title="分类" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.categoryName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
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
                <!-- <el-form-item label="级别" :label-width="formLabelWidth">
                    <el-input v-model="formData.sellPrice" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="等级" :label-width="formLabelWidth">
                    <el-select @change="categshijan" v-model="formData.levelId" placeholder="请选择" style="margin-left: 38px;">
                        <el-option
                            change="categshijan"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属分类" :label-width="formLabelWidth">
                    <el-select v-model="formData.parentCategoryId" placeholder="请选择一级目录" style="margin-left: 38px;">
                        <el-option v-for="item in onecatalogues" :key="item.id" :label="item.secondName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>

        <el-card class="box-card " v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商家订单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="订单号"> </el-table-column>
                    <el-table-column prop="name" label="商家名称"> </el-table-column>
                    <el-table-column prop="name" label="商家商品"> </el-table-column>
                    <el-table-column prop="name" label="买家"> </el-table-column>
                    <el-table-column prop="name" label="购买数量"> </el-table-column>
                    <el-table-column prop="name" label="价格"> </el-table-column>
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
            <category></category>
        </div>
    </div>
</template>

<script>
import api from '@/service/product.js';
import category from './Item-category.vue';
export default {
    name: '',
    components: {
        category
    },
    data() {
        return {
            options: [
                {
                    value: '0',
                    label: '一级目录'
                },
                {
                    value: '1',
                    label: '二级目录'
                },
                {
                    value: '2',
                    label: '三级目录'
                }
            ],
            // 所属目录
            onecatalogues: [],
            // 判断一级目录选择的东西控制2 3 目录显示隐藏
            controlCatalogue: '0',
            formData: {
                categoryName: '', //类目名称
                categoryType: 'user', //分类类型
                fileId: [], //文件id
                levelId: '0', //级别
                parentCategoryId: '' //上级类目id
            },
            tabindex: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            tableData: [],
            dialogFormVisible: false,
            currentPage3: 5,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.categoryList();
    },
    methods: {
        handlexClick(row) {
            console.log(row);
            this.formData.categoryId = row.id;
            this.formData.categoryName = row.name;

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
                        categoryId: id
                    };
                    api.deleteCategory(params, res => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.categoryList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 获取全部分类
        categoryList() {
            let params = {
                categoryType: 'user'
            };
            api.categoryList(params, res => {
                this.tableData = res.data.data;
                console.log('分类', res);
            });
        },

        // 添加分类
        addCategory() {
            console.log(this.formData.categoryId);
            if (this.formData.categoryId == undefined) {
                console.log('添加');
                api.addCategory(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            } else {
                console.log('修改');
                api.updateCategory(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            }
        },
        // 一级 下拉触发事件
        categshijan(e) {
            e--;
            console.log(e);
            let params = {
                categoryType: 'user',
                levelId: e
            };
            api.category(params, res => {
                this.onecatalogues = res.data.data;
                console.log('二级分类', res);
            });
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
            this.formData.fileId = esponse.data;
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
