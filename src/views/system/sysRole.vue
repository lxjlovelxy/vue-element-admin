<template>
  <el-container >
    <el-header>
      <div id="qryAndAdd">
        <div id="codeDiv">
          <el-input id="roleCode" v-model="input" label="角色编号：" placeholder="请输入"/>
        </div>
        <div id="nameDiv">
          角色名称：<el-input id="roleName" v-model="input" placeholder="请输入" />
        </div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>

      </div>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style rel="stylesheet/css" lang="scss">
  #roleCode,#roleName{
    width:10rem;
  }
  #nameDiv,#codeDiv{
    display: inline-block;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
#qryAndAdd div{
  float:left;
}
  el-container{
    background-color:red;
  }
 .el-table__header-wrapper th{
    background-color: #eef1f6;
    color: #1f2d3d;
  }
</style>
