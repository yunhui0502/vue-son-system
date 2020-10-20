<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">全部</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">待发货</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">待收货</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">待评价</span>
            <span @click="Tab(4)" class="head-item" :class="tabindex == 4 ? 'on' : ''">已完成</span>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>{{text}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="text item">
                <el-table :data="tableData" style="width: 100%;" stripe>
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="orderCode" label="订单号"> </el-table-column>
                    <el-table-column prop="storeNickName" label="卖家"> </el-table-column>
                    <el-table-column prop="storeName" label="商家商品">
                        <template slot-scope="scope">
                           <div>{{scope.row.orderProductLists[0].productName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickName" label="买家" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="购买数量" align="center" show-overflow-tooltip>1</el-table-column>
                    <el-table-column prop="sellPrice" label="价格" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderStatusUtf" label="订单状态" align="center" show-overflow-tooltip></el-table-column>
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
import orderApi from '@/service/order-api.js';
import store from '@/store';

// import procss from './procss.vue';
export default {
    name: '',
    components: {
        // procss
    },
    data() {
        return {
            tabindex:'',
            text:'全部',
            tableData: [],
            currentPage3: 5,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.selectOrder('all');
    },
    methods: {
     
         Tab(e) {
            this.tabindex = e;
            if(e == '0'){
                this.selectOrder('all')
                this.text = '全部'
            }else if(e == '1') {
                this.selectOrder('process')
                this.text = '待发货'
            }else if(e == '2') {
                this.selectOrder('pickUp')
                this.text = '待收货'
            } else if(e == '3') {
                this.selectOrder('evaluate')
                this.text = '待评价'
            }else {
                this.selectOrder('complete')
                this.text = '已完成'
            }
        },
        // 获取全部订单
        selectOrder(e) {
            let params = {
                OrderStatus: e,//订单状态
                orderType: 'user',//
                showType: 'product',//商品展示类型
                sonId: store.getUser().sonId, //子站点id
                // sonId: '1'
            };
            orderApi.selectOrder(params, res => {
                this.tableData = res.data.data;
                	this.tableData.forEach(item => {
						console.log('1', item)
						// item.orderStatusUtf = item.orderStatus
						if(item.orderStatus=='payment') {
							item.orderStatusUtf ='待支付'
						} else if (item.orderStatus=='process') {
							item.orderStatusUtf ='待发货'
						} else if (item.orderStatus=='pickUp') {
							item.orderStatusUtf ='待提货'
						} else if (item.orderStatus=='evaluate') {
							item.orderStatusUtf ='待评价'
						} else if (item.orderStatus=='complete') {
							item.orderStatusUtf ='完成'
						} else if (item.orderStatus=='controversial') {
							item.orderStatusUtf ='交易纠纷'
						} else if (item.orderStatus=='cancel') {
							item.orderStatusUtf ='取消'
                        }
                          item.orderProductLists.forEach(ProductItem => {
                            //  value = 
                            item.sellPrice =parseFloat(ProductItem.sellPrice/100).toFixed(2) 
                        })
					})
                console.log('获取全部订单', res);
            });
        },

        indexMethod(index) {
            return index * 2;
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
