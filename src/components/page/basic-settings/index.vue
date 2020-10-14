<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">基础信息</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">用户端小程序设置</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">商家端小程序设置</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">支付设置</span>
            <span @click="Tab(4)" class="head-item" :class="tabindex == 4 ? 'on' : ''">退款设置</span>
            <span @click="Tab(5)" class="head-item" :class="tabindex == 5 ? 'on' : ''">消息通知</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <span>基础设置 > 基础信息</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="首页轮播图">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="平台客服">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="平台客服">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="新用户学生认证">
                        <el-input v-model="form.name"></el-input>
                        <span>积分</span>
                    </el-form-item>
                    <el-form-item label="站点提现费率">
                        <el-input v-model="form.name"></el-input>
                        <span>%</span>
                    </el-form-item>
                    <el-form-item label="商家提现费率">
                        <el-input v-model="form.name"></el-input>
                        <span>%</span>
                    </el-form-item>
                    <el-form-item label="用户提现费率">
                        <el-input v-model="form.name"></el-input>
                        <span>%</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-card class="box-card " v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <span>基础设置 > 用户端小程序设置</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="平台客服">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="新用户学生认证">
                        <el-input v-model="form.name"></el-input>
                        <span>积分</span>
                    </el-form-item>

                    <el-form-item label="用户提现费率">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            tabindex: 0,
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            form: {
                name: ''
            }
        };
    },
    methods: {
        Tab(e) {
            this.tabindex = e;
        },
        // -----------------第1个上传--------------------
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // -------------------------------------

        // -----------------第2个上传--------------------
        // handleRemove(file, fileList) {
        //     console.log(file, fileList);
        // },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        // eslint-disable-next-line no-unused-vars
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
        // -------------------------------------
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

/deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
.el-input {
    width: 302px;
}
</style>
