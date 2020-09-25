<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="商家名称">
              <a-input v-model="queryParam" placeholder="输入要搜索的订单的商家名称" />
            </a-form-item>
          </a-col>
          <a-col offset="12" :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="queryTitle">查询</a-button>
              <a-button style="margin-left: 8px" @click="clearQuery">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      :columns="columns"
      :row-key="record=>record.id"
      :data-source="data"
      :loading="loading"
    >
    <span slot="action" slot-scope="text, record">
        <template>
          <a-popconfirm
            title="是否确认删除订单?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDelete(record.id)"
          >
            <a>删除</a>
        </a-popconfirm>
        </template>
    </span>
      <span slot="content" slot-scope="text, record">
         <a-tag v-for="(item) in text" color="cyan">
         {{ item }}
      </a-tag>
    </span>
    </a-table>
  </a-card>
</template>

<script>
import { delOrder, getAllOrder, searchOrder } from '@/api/elm/order'

export default {
  name: 'ReadingGroup',
  data() {
    return {
      description: '您可以在此页面对平台订单进行操作',
      // 查询参数
      queryParam: '',
      // 表头
      columns: [
        {
          title: '订单ID',
          dataIndex: 'id',
          align: 'left'
        },
        {
          title: '菜品',
          dataIndex: 'content',
          align: 'center',
          scopedSlots: { customRender: 'content' }
        },
        {
          title: '价格',
          dataIndex: 'price',
          align: 'center'
        },
        {
          title: '商家姓名',
          dataIndex: 'storeName',
          align: 'center'
        },
        {
          title: '是否完结',
          dataIndex: 'status',
          align: 'center',
          customRender: (text) => text ? '完结' : '未完结'
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
      loading: false
    }
  },
  mounted() {
    this.reFlush()
  },
  methods: {
    reFlush() {
      this.loading = true
      // 获取组
      getAllOrder({
        count: 0
      }).then(res => {
        const { data } = res
        this.data = data
        for (let i = 0; i < data.length; i++) {
          this.data[i].content = Object.keys(this.data[i].content)
        }
        this.loading = false
      })
    },
    //跳转到该练习
    goToContent(id) {
      this.$router.push({
          path: '/reading/reading_groups/reading',
          query: {
            id: id
          }
        }
      )
    },
    // 删除该练习组
    confirmDelete(id) {
      delOrder({
        id
      }).then(res => {
        this.$message.success('删除成功！')
        this.reFlush()
      })
    },
    //模糊搜索题目组
    queryTitle() {
      if (this.queryParam) {
        this.loading = true
        searchOrder({ name: this.queryParam }).then(res => {
          const { data } = res
          this.data = data
          for (let i = 0; i < data.length; i++) {
            this.data[i].content = Object.keys(this.data[i].content)
          }
          this.loading = false
        })
      } else {
        this.$message.warning('请输入要搜索的商家名')
      }
    },
    // 重置查询
    clearQuery() {
      this.queryParam = ''
      this.reFlush()
    }
  }
}
</script>
