<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col>
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="addBusinessTypeShow">新增类别</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-modal
      title="添加商家分类"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="addBusinessType"
      @cancel="handleCancel"
    >
      <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入分类名称' }] }]"
          />
        </a-form-item>
        <a-form-item label="图片">
          <a-upload-dragger
            v-decorator="['picture', { rules: [{ required: true, message: '请上传图片' }] }]"
            name="file"
            accept="image/*"
            listType="picture"
            :disabled="addType.picture!==''"
            :fileList="fileList"
            action="http://101.200.160.17:8100/file/upload"
            :beforeUpload="beforeUpload"
            @change="uploadImgChange"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
              点击或者拖拽到此处上传
            </p>
            <p class="ant-upload-hint">
              仅支持上传图片
            </p>
          </a-upload-dragger>
        </a-form-item>

      </a-form>
    </a-modal>
    <a-table
      :columns="columns"
      :row-key="record=>record.id"
      :data-source="data"
      :loading="loading"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a-popconfirm
            title="是否确认删除该分类?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDelete(record.id)"
          >
            <a>删除</a>
        </a-popconfirm>
        </template>
    </span>
      <span slot="pic" slot-scope="text, record">
       <a-avatar style="margin-top: -10px" :size="32" :src="text" />
    </span>
    </a-table>
  </a-card>
</template>

<script>
import { getAllType, addBusinessType, deleteBusinessType } from '@/api/elm/business'

export default {
  name: 'ReadingGroup',
  data() {
    return {
      description: '您可以在此页面对商家分类进行操作',
      // 查询参数
      queryParam: '',
      // 表头
      columns: [
        {
          title: '商家类别ID',
          dataIndex: 'id',
          align: 'left',
          width: '100px'
        },
        {
          title: '图像',
          dataIndex: 'pic',
          align: 'center',
          scopedSlots: { customRender: 'pic' }
        },
        {
          title: '商家类别名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      //数据
      data: [],
      //表格loading状态
      loading: false,
      //  添加modal
      visible: false,
      //  添加确认loading
      confirmLoading: false,
      form: this.$form.createForm(this),
      addType: {
        name: '',
        picture: ''
      },
      fileList: []
    }
  },
  mounted() {
    this.reFlush()
  },
  methods: {
    //获得当前页的刷新数据
    reFlush() {
      this.loading = true
      // 获取组
      getAllType().then(res => {
        const { data } = res
        this.data = data
        this.loading = false
      })
    },
    //展现添加model
    addBusinessTypeShow() {
      this.visible = true
    },
    //上传图片
    uploadImgChange(info) {
      const status = info.file.status
      const { fileList } = info
      this.fileList = fileList
      if (status === 'done') {
        this.$message.success(`${info.file.name} 上传成功.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 上传失败.`)
      }
      let response
      try {
        response = fileList.length > 0 ? fileList[0].response.data : ''
      } catch (e) {
      }
      if (response) {
        this.addType.picture = 'http://101.200.160.17:8100' + response.split('8100')[1]
      }
    },
    //上传前检验
    beforeUpload() {
      if (this.addType.picture) {
        this.$message.warning('只能上传一张图片！')
        return false
      }
    },
    //添加商家分类
    addBusinessType() {
      const {
        form: { validateFields }
      } = this
      validateFields('name', { force: true }, (err, values) => {
        //无错误进行请求
        if (!err) {
          if (this.addType.picture) {
            this.confirmLoading = true
            addBusinessType({
              name: values.name,
              pic: this.addType.picture
            }).then(res => {
              this.$message.success('添加成功')
              this.handleCancel()
            })
          } else {
            this.$message.error('请上传图片！')
          }
        } else {
          this.$message.error('添加出错，请稍后重试！')
          this.confirmLoading = false
        }

      })
    },
    //隐藏添加modal
    handleCancel() {
      this.visible = false
      this.addType = {
        name: '',
        picture: ''
      }
      this.fileList = []
      this.confirmLoading = false
      this.reFlush()
    }
    ,
    // 删除该分组
    confirmDelete(id) {
      deleteBusinessType({
        cid: id
      }).then(res => {
        this.$message.success('删除成功！')
        this.reFlush()
      })
    }
  }
}
</script>
