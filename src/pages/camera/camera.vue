<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div>
      <span>摄像头</span>
      <a-button>添加</a-button>
    </div>
    <div>
      <a-button type="danger">删除</a-button>
      <a-button>启用</a-button>
      <a-button>禁用</a-button>
    </div>
    <div class="camera-table-box">
      <a-table :columns="columns" :data-source="cameraList">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="deviceSwitch" slot-scope="deviceSwitch">
          <a-switch :checked="deviceSwitch" />
        </span>
        <span slot="recognitionList" slot-scope="recognitionList">
          <a-tag :key="item.deviceIp" v-for="item in recognitionList">
            {{ item }}
          </a-tag>
        </span>
        <span slot="editButton">
          <a-button size="small" class="edit-btn">删除</a-button>
          <a-button size="small" class="edit-btn">查看</a-button>
          <a-button size="small" class="edit-btn">编辑</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'camera',
  i18n: require('./i18n'),
  data() {
    return {
      columns: [
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '名称',
          dataIndex: 'deviceName',
          key: 'deviceName',
        },
        {
          title: 'IP地址',
          key: 'deviceIp',
          dataIndex: 'deviceIp',
        },
        {
          title: '协议',
          key: 'agreement',
          dataIndex: 'agreement',
        },
        {
          title: '安装位置',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '启用/禁用',
          dataIndex: 'deviceSwitch',
          key: 'deviceSwitch',
          scopedSlots: { customRender: 'deviceSwitch' },
        },
        {
          title: '识别目标',
          dataIndex: 'recognitionList',
          key: 'recognitionList',
          scopedSlots: { customRender: 'recognitionList' },
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
          scopedSlots: { customRender: 'editButton' },
        },
      ],
      cameraList: [
        {
          status: '离线',
          deviceName: 'XL001',
          deviceIp: '192.123.11.1',
          agreement: 'RTSP',
          address: '交控新大楼2层站台',
          tags: ['nice', 'developer'],
          deviceSwitch: false,
          recognitionList: ['招援', '可疑物'],
        },
        {
          status: '在线',
          deviceName: 'Jim Green',
          deviceIp: '192.123.11.2',
          agreement: 'RTSP',
          address: '交控新大楼2层站台',
          tags: ['loser'],
          deviceSwitch: true,
          recognitionList: ['招援', '可疑物'],
        },
      ],
    };
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    desc() {
      return this.$t('description');
    },
  },
};
</script>

<style scoped lang="less">
@import 'index';
</style>
