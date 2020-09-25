<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="商家名称">
              <a-input v-model="queryParam" placeholder="输入商家名称" />
            </a-form-item>
          </a-col>
          <a-col offset="12" :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="queryTitle(1)">查询</a-button>
              <a-button style="margin-left: 8px" @click="clearQuery">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-modal
      title="商家信息"
      :visible="visible"
      :confirm-loading="isConfirmLoading"
      :ok-text="isChange?'提交':'修改'"
      @ok="changeBusiness"
      @cancel="cancelChangeBusiness"
    >
      <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="商家名称">
          <a-row>
            <a-col :span="10">
              <a-input
                :disabled="!isChange"
                v-decorator="['name', {
                  rules: [{ required: true, message: '请输入商家名称' }],
                  initialValue:this.businessInfo?this.businessInfo.name:''
                }]"
              />
            </a-col>
            <a-col :offset="14">
              <a-avatar style="margin-top: -10px" shape="square" :size="64" :src="this.businessInfo.pic" />
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input
            :disabled="!isChange"
            v-decorator="['phone', {
              rules: [{ required: true, message: '请输入联系电话' }],
               initialValue:this.businessInfo?this.businessInfo.phone:''
            }]"
          />
        </a-form-item>

        <a-form-item label="商家地址">
          <a-input
            :disabled="!isChange"
            v-decorator="['location', {
              rules: [{ required: true, message: '请输入商家地址' }],
               initialValue:this.businessInfo?this.businessInfo.location:''
            }]"
          />
        </a-form-item>
        <a-form-item label="详情介绍">
          <a-textarea
            :rows="4"
            :disabled="!isChange"
            v-decorator="['detail', {
              rules: [{ required: true, message: '请输入详情介绍' }],
               initialValue:this.businessInfo?this.businessInfo.detail:''
            }]"
          />
        </a-form-item>
        <a-form-item label="所属类别">
          <a-input
            v-if="!isChange"
            :disabled="!isChange"
            v-decorator="['type', {
              rules: [{ required: true, message: '所属类别' }],
               initialValue:this.businessInfo?this.businessInfo.categoryDTO.name:''
            }]"
          />
          <a-select
            v-else
            :defaultValue="this.businessInfo?this.businessInfo.categoryDTO.name:''"
            @change="handleTypeChange">
            <a-select-option v-for="(item) in allType" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-button block @click="showDrawer">
        食品管理
      </a-button>
    </a-modal>
    <a-drawer
      :closable="true"
      title="食品管理"
      placement="right"
      :visible="drawVisible"
      @close="onClose"
      width="60%"
    >
      <a-table
        :columns="foodColumns"
        :row-key="record=>record.id"
        :data-source="foodData"
        :loading="foodLoading"
      >
    <span slot="actionFood" slot-scope="text, record">
        <template>
          <a-popconfirm
            title="是否确认删除菜品?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDelete(record.id)"
          >
            <a>删除</a>
        </a-popconfirm>
        </template>
    </span>
        <span slot="type" slot-scope="text,records">
      <a-tag color="cyan">
         {{ text }}
      </a-tag>
    </span>
      </a-table>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button style="marginRight: 8px" @click="addFoodTypeShow">
          分类管理
        </a-button>
        <a-button type="primary" @click="addFoodShow">
          添加食品
        </a-button>
      </div>
      <a-modal
        title="添加分类"
        :visible="addFoodTypeVisible"
        ok-text="添加"
        @ok="addFoodType"
        @cancel="addFoodTypeHide"
      >
        <a-form :form="foodTypeForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="分类名称">
            <a-input
              v-decorator="['name', {
                  rules: [{ required: true, message: '请输入分类名称' }],
                }]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
        title="添加食品"
        :visible="addFoodVisible"
        ok-text="添加"
        @ok="addFood"
        @cancel="addFoodHide"
      >
        <a-form :form="foodForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="菜品名称">
            <a-row>
              <a-col :span="10">
                <a-input
                  v-decorator="['name', {
                  rules: [{ required: true, message: '请输入菜品名称' }],
                }]"
                />
              </a-col>
              <a-col :offset="14" style="margin-top: -20px">
                <a-upload-dragger
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
                    点击或者拖拽
                  </p>
                  <p class="ant-upload-hint">
                    上传图片
                  </p>
                </a-upload-dragger>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="价格">
            <a-input
              v-decorator="['price', {
              rules: [{ required: true, message: '请输入价格' }],
            }]"
            />
          </a-form-item>

          <a-form-item label="详情介绍">
            <a-textarea
              :rows="4"
              v-decorator="['detail', {
              rules: [{ required: true, message: '请输入详情介绍' }],
            }]"
            />
          </a-form-item>
          <a-form-item label="所属类别">
            <a-select
              @change="handleTypeChange"
              v-decorator="['kind', {
              rules: [{ required: true, message: '请选择类别' }],
              }]"
            >
              <a-select-option v-for="(item) in allFoodType" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-drawer>
    <a-table
      :columns="columns"
      :row-key="record=>record.id"
      :data-source="data"
      :loading="loading"
      :pagination="pages"
      @change="changePage"
    >
    <span slot="action" slot-scope="text, record">
        <template>
          <a @click="changeBusinessModal(record.id)">详情</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确认删除商家(包括商家的一切信息)?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDelete(record.id)"
          >
            <a>删除</a>
        </a-popconfirm>
        </template>
    </span>
      <span slot="type" slot-scope="text,records">
      <a-tag color="cyan">
         {{ text }}
      </a-tag>
    </span>
    </a-table>
  </a-card>
</template>

<script>
import {
  getAllBusinessByPage,
  getBusinessById,
  changeBusinessInfo,
  deleteBusiness,
  searchBusinessByName,
  getAllType, addBusinessType, getBusinessFood, getBusinessFoodType, addBusinessFood, addBusinessFoodType
} from '@/api/elm/business'

export default {
  name: 'ReadingGroup',
  data() {
    return {
      form: this.$form.createForm(this),
      foodForm: this.$form.createForm(this),
      foodTypeForm: this.$form.createForm(this),
      description: '您可以在此页面对商家进行操作',
      // 查询参数
      queryParam: '',
      // 表头
      columns: [
        {
          title: '商家ID',
          dataIndex: 'id',
          align: 'left'
        },
        {
          title: '商家类别',
          dataIndex: 'categoryDTO.name',
          align: 'center',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '商家名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '联系手机号',
          dataIndex: 'phone',
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
      foodColumns: [
        {
          title: '食品ID',
          dataIndex: 'id',
          align: 'left'
        },
        {
          title: '价格',
          dataIndex: 'price',
          align: 'center'
        },
        {
          title: '详情',
          dataIndex: 'detail',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          align: 'center',
          scopedSlots: { customRender: 'actionFood' }
        }
      ],
      //数据
      data: [],
      foodData: [],
      //表格loading状态
      loading: false,
      foodLoading: false,
      //  分页数据
      pages: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 10
      },
      isSearch: false,
      visible: false,
      isConfirmLoading: false,
      isChange: false,
      businessInfo: '',
      allType: '',
      drawVisible: false,
      allFoodType: '',
      addFoodVisible: false,
      addFoodTypeVisible: false,
      addType: {
        name: '',
        picture: ''
      },
      fileList: []
    }
  },
  mounted() {
    this.reFlush(1)
    this.getAllType()
  },
  methods: {
    /**
     * 食品相关
     */
    //获得食品分类
    getFoodTypeById() {
      getBusinessFoodType({
        cid: this.businessInfo.id
      }).then(res => {
        this.allFoodType = res.data
      })
    },
    //获得食品
    getFoodById() {
      this.foodLoading = true
      this.getFoodTypeById()
      getBusinessFood({
        id: this.businessInfo.id
      }).then(res => {
        this.foodLoading = false
        this.foodData = res.data
      })
    },
    // 添加食品
    addFoodShow() {
      this.addFoodVisible = true
    },
    // 添加食品
    addFoodTypeShow() {
      this.addFoodTypeVisible = true
    },
    //隐藏食品
    addFoodHide() {
      this.addFoodVisible = false
      this.addType.picture = ''
    },
    //隐藏食品
    addFoodTypeHide() {
      this.addFoodTypeVisible = false
    },
    addFoodType() {
      const {
        foodTypeForm: { validateFields }
      } = this
      validateFields(['name'], { force: true }, (err, values) => {
        //无错误进行请求
        if (!err) {
          addBusinessFoodType({
            'name': values.name,
            'store_id': this.businessInfo.id
          }).then(res => {
            this.$message.success('添加成功！')
            this.addFoodTypeHide()
            this.getFoodById()
            values.name = ''
          })
        } else {
          this.$message.error('添加出错，请稍后重试！')
        }
      })
    },
//添加食品
    addFood() {
      const {
        foodForm: { validateFields, }
      } = this
      validateFields(['name', 'price', 'detail', 'kind'], { force: true }, (err, values) => {
        //无错误进行请求
        if (!err) {
          if (this.addType.picture) {
            addBusinessFood({
              'name': values.name,
              'detail': values.detail,
              'kindId': values.kind,
              'pic': this.addType.picture,
              'price': values.price
            }).then(res => {
              this.$message.success('添加成功！')
              this.addFoodHide()
              this.getFoodById()
                values.name = '',
                values.detail = '',
                values.kind = '',
                this.addType.picture = '',
                values.price = ''
            })
          } else {
            this.$message.warning('请上传图片')
          }
        } else {
          this.$message.error('添加出错，请稍后重试！')
        }

      })
    }
    ,
// 抽屉打开
    showDrawer() {
      this.drawVisible = true
      this.getFoodById()
    }
    ,
//抽屉关闭
    onClose() {
      this.drawVisible = false
    }
    ,
//获取全部的分类
    getAllType() {
      getAllType().then(res => {
        this.allType = res.data
      })
    }
    ,
//点击分页
    changePage(pagination) {
      const { current } = pagination
      if (!this.isSearch)
        this.reFlush(current)
      else
        this.queryTitle(current)
    }
    ,
//获得当前页的刷新数据
    reFlush(pageNum) {
      this.loading = true
      getAllBusinessByPage({
        pageNum: pageNum,
        pageSize: 10
      }).then(res => {
        const { data } = res.data
        const totalPage = data.totalPage
        this.data = data
        this.loading = false
        if (pageNum === 1)
          this.pages.total = totalPage * 10
        this.pages.current = pageNum
      })
    }
    ,
// 删除店铺
    confirmDelete(id) {
      deleteBusiness({
        id
      }).then(res => {
        this.$message.success('删除成功！')
        this.reFlush(1)
      })
    }
    ,
//模糊搜索店铺
    queryTitle(pageNum) {
      if (this.queryParam) {
        this.loading = true
        this.isSearch = true
        searchBusinessByName(
          {
            name: this.queryParam,
            pageNum: pageNum,
            pageSize: 10
          }).then(res => {
          const data = res.data.data
          const totalPage = res.data.totalPage
          this.data = data
          this.loading = false
          if (pageNum === 1)
            this.pages.total = totalPage * 10
          this.pages.current = pageNum
        })
      } else {
        this.$message.warning('请输入要搜索的店铺')
      }
    }
    ,
// 重置查询
    clearQuery() {
      this.queryParam = ''
      this.reFlush(1)
      this.isSearch = false
    }
    ,
//展示店铺信息模态
    changeBusinessModal(id) {
      getBusinessById({
        id
      }).then(res => {
        const { data } = res
        this.businessInfo = data
        this.visible = true
      })
    }
    ,
//准备修改店铺
    goToChangeBusiness() {
      this.isChange = true
    }
    ,
//取消修改用户
    cancelChangeBusiness() {
      this.isChange = false
      this.visible = false
      this.businessInfo = ''
    }
    ,
//  提交修改请求
    changeBusiness() {
      if (this.isChange) {
        const {
          form: { validateFields }
        } = this
        validateFields(['name', 'phone', 'location', 'detail'], { force: true }, (err, values) => {
          //无错误进行请求
          if (!err) {
            changeBusinessInfo({
              'categoryId': this.businessInfo.categoryDTO.id,
              'detail': values.detail,
              'id': this.businessInfo.id,
              'location': values.location,
              'name': values.name,
              'phone': values.phone,
              'pic': this.businessInfo.pic
            }).then(res => {
              this.$message.success('修改成功！')
              this.cancelChangeBusiness()
              this.reFlush(1)
            })
          } else {
            this.$message.error('添加出错，请稍后重试！')
          }
        })
      } else
        this.goToChangeBusiness()
    }
    ,
// 类型改变的方法
    handleTypeChange(value) {
      this.businessInfo.categoryDTO.id = value
    }
    ,
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
    }
    ,
//上传前检验
    beforeUpload() {
      if (this.addType.picture) {
        this.$message.warning('只能上传一张图片！')
        return false
      }
    }
  }
}
</script>
