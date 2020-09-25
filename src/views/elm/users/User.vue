<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input v-model="queryParam" placeholder="输入用户名称" />
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
            title="是否确认删除该用户?"
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
import { getAllGroup, searchGroupByTitle, deleteGroupById } from '@/api/readingApi'
import moment from 'moment'
import { getAllUser, getUserInfo, deleteUser, changeUser, searchUserByName } from '@/api/elm/user'

export default {
  name: 'ReadingGroup',
  data() {
    return {
      description: '您可以在此页面对平台用户进行操作',
      // 查询参数
      queryParam: '',
      // 表头
      columns: [
        {
          title: '用户ID',
          dataIndex: 'id',
          align: 'left'
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          align: 'center',
          scopedSlots: { customRender: 'pic' }
        },
        {
          title: '账号',
          dataIndex: 'account',
          align: 'center'
        },
        {
          title: '昵称',
          dataIndex: 'nickName',
          align: 'center'
        },
        {
          title: '注册日期',
          dataIndex: 'gmtCreate',
          align: 'center',
          customRender: (text) => text ? moment(text).format('YYYY-MM-DD hh:mm:ss') : '暂无信息'
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
      //获取用户
      getAllUser().then(res => {
        const { data } = res
        this.data = data
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
      deleteUser({
        id
      }).then(res => {
        this.$message.success('删除成功！')
        this.reFlush()
      })
    },
    //模糊搜索用户
    queryTitle() {
      if (this.queryParam) {
        this.loading = true
        searchUserByName({ name: this.queryParam }).then(res => {
          const { data } = res
          this.data = data
          this.loading = false
        })
      } else {
        this.$message.warning('请输入要搜索的用户')
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
