<!--suppress ALL -->
<template>
  <el-container style="padding-left:30px;">
    <el-header height="100px">
      <!--
      <div class="demo-input-suffix">-->
      <el-row class="row-search" style="line-height: 40px;">
        <el-col span="2.5" style="padding-left:20px;"> 角色编码：</el-col>
        <el-col span="2.5">
          <el-input v-model="input21" placeholder="请输入" style="width:120px;"/>
        </el-col>
        <el-col span="2.5" style="padding-left: 20px;"> 角色名称：</el-col>
        <el-col span="2.5">
          <el-input v-model="input23" placeholder="请输入" style="width:120px;"/>
        </el-col>
        <el-col span="2.5" style="padding-left: 20px;">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-col span="2.5" style="padding-left: 20px;">
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="新增" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色类型">
            <el-select v-model="form.roleType" placeholder="请选择角色类型">
              <el-option label="系统" value="1"/>
              <el-option label="学校" value="2"/>
              <el-option label="站点" value="3"/>
            </el-select>
          </el-form-item>
          <el-form-item label="角色编码">
            <el-input v-model="form.roleCode"/>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click.native.prevent="handleData">确 定</el-button>
          </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click.native.prevent="handleData">确 定</el-button>
       </span>-->

      </el-dialog>

    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        class="table"
        style="width: 100%">
        <el-table-column prop="roleType" label="角色类型" width="180"/>
        <el-table-column prop="roleCode" label="角色编码" width="180"/>
        <el-table-column prop="roleName" label="角色名称" width="180"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">授权</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger">删除</el-button><!--@click="handleDelete(scope.$index, scope.row)"-->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div class="block">
        <el-pagination
          :current-page="4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          :total="400"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </el-footer>
  </el-container>
</template>

<style>
  .row-search{
    margin-top:50px;
  }

</style>
<script>
import { getRoleList, addRole } from '@/api/role'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted() {
    getRoleList('', '', 1, 5).then(res => {
      console.log(res.data.data.rows)
      this.tableData = res.data.data.rows
    })
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.form.roleType = this.tableData[index].roleType
      this.form.roleCode = this.tableData[index].roleCode
      this.form.roleName = this.tableData[index].roleName
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClose(done) {
      done()
    },
    handleData() {
      addRole(this.form.roleType, this.form.roleCode, this.form.roleName).then(res => {
        console.log(res)
        if (res.data.code === '000') {
          this.dialogVisible = false
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message.error('失败!' + res.data.data.msg)
        }
      })
    }
  }
}
</script>
