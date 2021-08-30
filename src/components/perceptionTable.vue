<template>
  <div class="table-model">
    <h3 class="table-title">
      感知报警列表
    </h3>
    <div class="table-box">
      <a-table :columns="columns" :data-source="tableData" bordered>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="status" slot-scope="status">
          <span v-if="status === '未处置'">
            <span class="status-icon status-1"></span>
            <span class="text-1">
              {{ status }}
            </span>
          </span>
          <span v-if="status === '处置中'">
            <span class="status-icon status-2"></span>
            <span class="text-2">
              {{ status }}
            </span>
          </span>
          <span v-if="status === '已处置'">
            <span class="status-icon status-3"></span>
            <span class="text-3">
              {{ status }}
            </span>
          </span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alarmList: Array,
  },
  data() {
    return {
      columns: [
        {
          title: '处置状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '位置',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
        },
      ],
      tableData: [
        {
          level: '1',
          status: '未处置',
          name: '打架',
          location: '候车区',
          time: '10:12:13',
        },
        {
          level: '2',
          status: '已处置',
          name: '招援',
          location: '候车区',
          time: '10:12:13',
        },
        {
          level: '3',
          status: '处置中',
          name: '遗留物',
          location: '候车区',
          time: '10:12:13',
        },
        {
          level: '1',
          status: '未处置',
          name: '打架',
          location: '候车区',
          time: '10:12:13',
        },
        {
          level: '2',
          status: '已处置',
          name: '招援',
          location: '候车区',
          time: '10:12:13',
        },
        {
          level: '3',
          status: '处置中',
          name: '遗留物',
          location: '候车区',
          time: '10:12:13',
        },
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      if (val) {
        this.$emit('clickTr', val);
      }
    },
  },
  filters: {
    statusCn(val) {
      let returnStr = '';
      switch (val) {
        case 1:
          returnStr = '未处置';
          break;
        case 2:
          returnStr = '处置中';
          break;
        case 3:
          returnStr = '已处置';
          break;
      }
      return returnStr;
    },
  },
};
</script>

<style lang="less" scoped>
.table-box {
  padding: 10px;
}
.status-icon {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  background: #fff;
  margin-right: 8px;
}
.status-1 {
  background: linear-gradient(#ec924b, #de6173);
}
.status-2 {
  background: linear-gradient(#94ffce, #61daa2);
}
.status-3 {
  background: linear-gradient(#333fff, #333fff);
}
.text-1 {
  color: #de6173;
}
.text-2 {
  color: #61daa2;
}
.text-3 {
  color: #aaa;
}
.table-title {
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  padding: 0 20px;
  margin: 0;
  line-height: 40px;
  font-weight: normal;
  img {
    margin-right: 6px;
    vertical-align: middle;
  }
}
</style>
