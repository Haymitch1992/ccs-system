<template>
  <div class="new-page">
    <div class="top-line">
      <a-row :gutter="[16, 16]">
        <a-col :xl="12">
          <div class="open-btn" @click="opneStationDialog()">
            一键开站
          </div>
          <div class="setting-box">
            <div class="setting-item">
              开站时间设定
              <a-time-picker size="small" v-model="startTime" />
              <span class="float-btn">
                <a-button size="small">确定</a-button>
              </span>
            </div>
          </div>
        </a-col>
        <a-col :xl="12">
          <div class="close-btn" @click="closeStationDialog()">
            一键关站
          </div>
          <div class="setting-box">
            <div class="setting-item">
              关站时间设定
              <a-time-picker size="small" v-model="endTime" />
              <span class="float-btn">
                <a-button size="small">确定</a-button>
              </span>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="progress-line">
      <span>自检流程</span>
      <span class="progress-status "></span>
      <span>{{ stationStatus | stationZn2 }}运准备流程</span>
      <span class="progress-status "></span>
      <span>{{ stationStatus | stationZn2 }}运执行流程</span>
      <span class="progress-status "></span>
      <span>{{ stationStatus | stationZn }}站完成</span>
      <span class="progress-status "></span>
      <span class="float-text">
        <span class="text-margin-right-10">当前时间 00:00:00</span>
        <span>开站时间统计 00:0000</span>
      </span>
    </div>
    <div class="progress-bar">
      <span class="progress-text"
        >{{ stationStatus | stationZn }}站完成百分比</span
      >
      <span class="progress-item"></span>
      <a-progress :percent="progressVal" :strokeWidth="20" />
    </div>
    <div class="progress-line">
      <a-button size="small">PA 广播系统</a-button>
      <a-button size="small">PIS 乘客资讯系统</a-button>
      <a-button size="small">AFC 自动售检票系统</a-button>
      <a-button size="small">BAS 环境与设备监控系统</a-button>
      <a-button size="small">PSD 屏蔽门系统</a-button>
      <a-button size="small">IES 集约化装备系统</a-button>
      <a-button size="small">AGS 自主引导系统</a-button>
      <a-button size="small">IPS 综合感知系统</a-button>
      <span class="float-right-btn">
        <a-button size="small" class="task-btn-1">故障</a-button>
        <a-button size="small" class="task-btn-2">开启</a-button>
        <a-button size="small" class="task-btn-3">未开启</a-button>
      </span>
    </div>
    <div class="pos-box">
      <!-- 节点面板 -->
      <NodePanel v-if="lf" :lf="lf" :nodeList="nodeList"></NodePanel>
      <!-- 工具栏 -->
      <Control
        class="demo-control"
        v-if="lf"
        :lf="lf"
        @catData="$_catData"
      ></Control>
      <!-- 画布 -->
      <div id="container"></div>
      <!-- 日志 -->
      <log-alter v-if="showLog" @closeModal="showLog = false"></log-alter>
      <!-- 数据 -->
      <data-alter
        :graphData="graphData"
        v-if="dataVisible"
        @closeModal="dataVisible = false"
      ></data-alter>
      <!-- 抽屉组件 -->
      <a-drawer
        title="设置节点数据"
        placement="right"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <task-data v-if="visible" :nodeData="clickNode" :lf="lf"></task-data>
      </a-drawer>
      <pass-word
        v-if="passWordVisible"
        @closeModal="passWordVisible = false"
        @startTask="startTask"
      ></pass-word>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import LogicFlow from '@logicflow/core';
import { Menu } from '@logicflow/extension';
import Control from './LFComponents/Control';
import NodePanel from './LFComponents/NodePanel';
import '@logicflow/core/dist/style/index.css';
import { registerTask } from '../../components/registerNode';
import logAlter from '../../components/taskAlter/logAlter.vue';
import passWord from '../../components/taskAlter/password.vue';
import dataAlter from '../../components/taskAlter/dataAlter.vue';
import taskData from '../../components/taskAlter/taskData.vue';

import { nodeList } from './config';
import {
  powerOff,
  powerOn,
  getEmergent3,
  getRecover,
} from '../../services/user.js';
export default {
  name: 'Demo',
  i18n: require('./i18n'),
  components: { Control, logAlter, NodePanel, dataAlter, taskData, passWord },
  data() {
    return {
      stationStatus: 0,
      // 节点
      visible: false,
      clickNode: null,
      graphData: null,
      showLog: false,
      dataVisible: false,
      passWordVisible: false,
      progressVal: 0,
      deviceList: [
        'pc_26',
        'pc_180',
        'wzj_34',
        'wzj_75',
        'wzj_79',
        'wzj_80',
        'light_all',
      ],
      startTime: '2021-09-28 05:00:00', // 只取时分秒
      endTime: '2021-09-28 21:00:00',
      lf: {},
      taskData: {
        nodes: [
          {
            id: 0,
            type: 'rect',
            baseType: 'node',
            x: 120,
            y: 340,
            text: '开始',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 1,
            type: 'task',
            x: 340,
            y: 40,
            text: 'PA自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 2,
            type: 'task',
            x: 340,
            y: 100,
            text: 'PIS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },

          {
            id: 5,
            type: 'task',
            x: 340,
            y: 280,
            text: 'PSD自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 6,
            type: 'task',
            x: 340,
            y: 340,
            text: 'IES自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 3,
            type: 'task',
            x: 340,
            y: 160,
            text: 'AFC自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 4,
            type: 'task',
            x: 340,
            y: 220,
            text: 'BAS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 7,
            type: 'task',
            x: 340,
            y: 400,
            text: 'AGS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 8,
            type: 'task',
            x: 340,
            y: 460,
            text: 'IPS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 9,
            type: 'task',
            x: 340,
            y: 520,
            text: '直梯扶梯系统自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 10,
            type: 'task',
            x: 340,
            y: 580,
            text: '卷帘门系统自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 11,
            type: 'task',
            x: 600,
            y: 40,
            text: 'PA广播系统自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 12,
            type: 'task',
            x: 600,
            y: 100,
            text: 'PIS提示',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 13,
            type: 'task',
            x: 600,
            y: 160,
            text: 'IPS开启巡站',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 14,
            type: 'task',
            x: 840,
            y: 100,
            text: 'PA广播系统播放',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 15,
            type: 'task',
            x: 1040,
            y: 100,
            text: '直扶梯',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 16,
            type: 'task',
            x: 1040,
            y: 160,
            text: 'AFC',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 17,
            type: 'task',
            x: 1040,
            y: 220,
            text: 'IPS',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 22,
            type: 'task',
            x: 1040,
            y: 280,
            text: '包柱屏',
            properties: {
              customStatus: 'empty',
              deviceList: ['pc_26'],
            },
          },
          {
            id: 23,
            type: 'task',
            x: 1040,
            y: 340,
            text: '引导屏',
            properties: {
              customStatus: 'empty',
              deviceList: ['wzj_34', 'wzj_75', 'wzj_79', 'wzj_80'],
            },
          },
          {
            id: 24,
            type: 'task',
            x: 1040,
            y: 400,
            text: '手势识别屏',
            properties: {
              customStatus: 'empty',
              deviceList: ['pc_180'],
            },
          },
          {
            id: 25,
            type: 'task',
            x: 1040,
            y: 460,
            text: '照明',
            properties: {
              customStatus: 'empty',
              deviceList: ['light_all'],
            },
          },
          {
            id: 18,
            type: 'task',
            x: 1300,
            y: 100,
            text: '卷帘门',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 19,
            type: 'task',
            x: 1300,
            y: 160,
            text: '生成报告',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 20,
            type: 'task',
            x: 1300,
            y: 220,
            text: 'PA通知',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 21,
            type: 'rect',
            x: 1300,
            y: 280,
            text: '完成',
            properties: {
              customStatus: 'empty',
            },
          },
        ],
        // 边
        edges: [
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 1,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 2,
          },
          {
            type: 'polyline',
            sourceNodeId: 1,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 3,
          },
          {
            type: 'polyline',
            sourceNodeId: 2,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 4,
          },
          {
            type: 'polyline',
            sourceNodeId: 3,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 5,
          },
          {
            type: 'polyline',
            sourceNodeId: 4,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 6,
          },
          {
            type: 'polyline',
            sourceNodeId: 5,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 7,
          },
          {
            type: 'polyline',
            sourceNodeId: 6,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 8,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 9,
          },
          {
            type: 'polyline',
            sourceNodeId: 0,
            targetNodeId: 10,
          },
          {
            type: 'polyline',
            sourceNodeId: 7,
            targetNodeId: 11,
          },

          {
            type: 'polyline',
            sourceNodeId: 8,
            targetNodeId: 11,
          },

          {
            type: 'polyline',
            sourceNodeId: 9,
            targetNodeId: 11,
          },

          {
            type: 'polyline',
            sourceNodeId: 10,
            targetNodeId: 11,
          },
          {
            type: 'polyline',
            sourceNodeId: 11,
            targetNodeId: 12,
          },
          {
            type: 'polyline',
            sourceNodeId: 12,
            targetNodeId: 13,
          },
          {
            type: 'polyline',
            sourceNodeId: 12,
            targetNodeId: 14,
          },
          {
            type: 'polyline',
            sourceNodeId: 13,
            targetNodeId: 14,
          },
          {
            type: 'polyline',
            sourceNodeId: 14,
            targetNodeId: 15,
          },
          {
            type: 'polyline',
            sourceNodeId: 15,
            targetNodeId: 16,
          },
          {
            type: 'polyline',
            sourceNodeId: 16,
            targetNodeId: 17,
          },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 17,
          //   targetNodeId: 18,
          // },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 15,
          //   targetNodeId: 18,
          // },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 16,
          //   targetNodeId: 18,
          // },

          {
            type: 'polyline',
            sourceNodeId: 25,
            targetNodeId: 18,
          },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 24,
          //   targetNodeId: 18,
          // },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 23,
          //   targetNodeId: 18,
          // },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 22,
          //   targetNodeId: 18,
          // },
          // {
          //   type: 'polyline',
          //   sourceNodeId: 21,
          //   targetNodeId: 18,
          // },

          {
            type: 'polyline',
            sourceNodeId: 18,
            targetNodeId: 19,
          },
          {
            type: 'polyline',
            sourceNodeId: 19,
            targetNodeId: 20,
          },
          {
            type: 'polyline',
            sourceNodeId: 20,
            targetNodeId: 21,
          },
          {
            type: 'polyline',
            sourceNodeId: 17,
            targetNodeId: 22,
          },
          {
            type: 'polyline',
            sourceNodeId: 22,
            targetNodeId: 23,
          },
          {
            type: 'polyline',
            sourceNodeId: 23,
            targetNodeId: 24,
          },
          {
            type: 'polyline',
            sourceNodeId: 24,
            targetNodeId: 25,
          },
        ],
      },
      nodeList,
      startNode: 0,
      timer: '',
    };
  },
  filters: {
    stationZn(val) {
      switch (val) {
        case 0:
          return '开';
        case 1:
          return '关';
      }
    },
    stationZn2(val) {
      switch (val) {
        case 0:
          return '启';
        case 1:
          return '停';
      }
    },
  },
  computed: {},
  methods: {
    // 开站准备
    opneStationDialog() {
      this.stationStatus = 0;
      this.passWordVisible = true;
    },
    closeStationDialog() {
      this.stationStatus = 1;
      this.passWordVisible = true;
    },
    startTask() {
      this.passWordVisible = false;
      if (this.stationStatus === 1) {
        this.changeStatus('empty');
      } else {
        this.changeStatus('success');
      }
    },
    // 关站准备
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    // catTurboData() {
    //   const data = this.lf.getGraphData();
    //   console.log(data);
    // },
    postPowerOn(deviceList) {
      powerOn(deviceList).then();
    },
    postPowerOff(deviceList) {
      powerOff(deviceList).then();
    },
    $_catData() {
      console.log(123);
      this.$data.graphData = this.$data.lf.getGraphData();
      console.log(this.$data.graphData);
      this.$data.dataVisible = true;
    },
    // startTimeOut(num) {
    //   setTimeout(() => {
    //     // 执行
    //     startNode
    //     if(this.startNode<){
    //       this.startTimeOut(200)
    //     }
    //   }, num);
    // },
    changeStatus(str) {
      // 所有设备进入待机状态

      if (this.startNode === 0) {
        getEmergent3().then();
      } else if (this.startNode === this.taskData.nodes.length - 1) {
        getRecover().then();
      }

      let runNodes = this.taskData.nodes.length - 1;
      let runTime = this.taskData.nodes[this.startNode].properties.deviceList
        ? 2000
        : 40;
      //  改为一次性定是任务
      this.timer = setTimeout(() => {
        this.taskData.nodes[this.startNode].properties.customStatus = 'success';
        this.lf.render(this.taskData);
        this.progressVal += 4;
        console.log(this.taskData.nodes[this.startNode].properties.deviceList);
        if (this.taskData.nodes[this.startNode].properties.deviceList) {
          this.$message.success(
            this.taskData.nodes[this.startNode].text + ' 运行成功！'
          );
          if (str === 'success') {
            this.postPowerOn(
              this.taskData.nodes[this.startNode].properties.deviceList
            );
          } else if (str === 'empty') {
            this.postPowerOff(
              this.taskData.nodes[this.startNode].properties.deviceList
            );
          }
        }
        if (this.startNode < runNodes) {
          console.log('当前是第几项', this.startNode);
          this.startNode++;
          this.changeStatus(str);
        } else {
          this.startNode = 0;
          this.showLog = true;
        }
      }, runTime);
    },
    init() {
      LogicFlow.use(Menu);
      const lf = new LogicFlow({
        container: document.querySelector('#container'),
        stopScrollGraph: true,
        stopZoomGraph: true,
        isSilentMode: false,
        width: '100%',
        height: 800,
        grid: {
          type: 'dot',
          size: 20,
        },
        style: {
          nodeText: {
            // 节点文本样式
            fontSize: 12,
            color: '#ffffff',
          },
        },
      });
      this.lf = lf;
      lf.setTheme({
        rect: {
          width: 160,
          height: 40,
          fill: '#87CEFA',
          stroke: '#1E90FF',
        },
        circle: {
          fill: '#87CEFA',
          stroke: '#1E90FF',
        },
      });
      this.$_registerNode();
    },
    $_getData() {
      const data = this.lf.getGraphData();
      console.log(data);
    },
    $_registerNode() {
      registerTask(this.lf);
      this.$_render();
    },
    $_render() {
      this.lf.render(this.taskData);
      this.$_LfEvent();
    },

    $_LfEvent() {
      this.lf.on('node:click', ({ data }) => {
        console.log('node:click', data);
        this.$data.clickNode = data;
        this.$data.visible = true;
      });
      // this.lf.on('edge:click', ({ data }) => {
      //   console.log('edge:click', data);
      //   this.$data.clickNode = data;
      //   this.$data.dialogVisible = true;
      // });
      // this.lf.on('element:click', () => {
      //   this.hideAddPanel();
      // });
      // this.lf.on('edge:add', ({ data }) => {
      //   console.log('edge:add', data);
      // });
      // this.lf.on('node:mousemove', ({ data }) => {
      //   console.log('node:mousemove');
      //   this.moveData = data;
      // });
      // this.lf.on('blank:click', () => {
      //   this.hideAddPanel();
      // });
      // this.lf.on('connection:not-allowed', (data) => {
      //   this.$message({
      //     type: 'error',
      //     message: data.msg,
      //   });
      // });
      // this.lf.on('node:mousemove', () => {
      //   console.log('on mousemove');
      // });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="less">
.float-right-btn {
  float: right;
}
.pos-box {
  position: relative;
}
.progress-line {
  background: #f0f0f0;
  margin-top: 16px;
  padding: 14px 20px;
  overflow: hidden;
  .progress-status {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: radial-gradient(circle, #6cff52 0%, #1ebe00 100%);
    border-radius: 50%;
    margin: 0 30px 0 6px;
    position: relative;
    top: 4px;
  }
  .float-text {
    float: right;
  }
  .text-margin-right-10 {
    margin-right: 30px;
  }
  button {
    margin: 0 4px 0 0;
  }
}
.demo-control {
  position: absolute;
  top: 20px;
  right: 50px;
  z-index: 2;
  background: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding: 10px;
}
.open-btn {
  background: #1890ff;
  color: #fff;
  width: 200px;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
  vertical-align: top;
  cursor: pointer;
}
.setting-box {
  width: calc(100% - 200px);
  display: inline-block;
  box-sizing: border-box;
  padding: 0 0 0 20px;
  vertical-align: top;
  .setting-item {
    width: 100%;
    height: 50px;
    background: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    line-height: 50px;
    padding: 0 20px;
  }
  .float-btn {
    float: right;
    button {
      margin-left: 10px;
    }
  }
}
.progress-bar {
  background: #0b2021;
  color: #fff;
  display: flex;
  padding: 14px 20px;
  .progress-text {
    width: 200px;
    display: block;
  }
  .progress-item {
    display: block;
  }
  /deep/ .ant-progress-text {
    color: #fff;
  }
}
#container {
  border: 1px solid #ddd;
  margin-top: 20px;
  position: relative;
}
.close-btn {
  background: #f42f00;
  color: #fff;
  width: 200px;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
  vertical-align: top;
  cursor: pointer;
}
.new-page {
  padding: 20px;
  background: #fff;
  /deep/ .lf-menu {
    position: absolute;
    display: none;
    background: #fff;
    padding: 10px 0;
    margin: 0 0 0 10px;
    border-radius: 3px;
    border: 1px solid #efefee;
    width: 140px;
  }
  /deep/ .lf-menu > li {
    cursor: pointer;
    list-style: none;
    padding: 3px 12px;
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;
    transition: all 120ms ease-in-out;
    position: relative;
  }
  /deep/ .lf-menu-item__disabled {
    cursor: default;
    pointer-events: none;
    color: #aaa;
    opacity: 0.88;
  }
  /deep/ .lf-menu-item:hover {
    background: #f3f3f3;
  }
}
.status-item {
  border: 1px solid #eee;
  padding: 20px;
}
.inp-line {
  margin-bottom: 20px;
}
.task-btn-1 {
  background: #f42f00;
  color: #fff;
}
.task-btn-2 {
  background: #00b554;
  color: #fff;
}
.task-btn-3 {
  background: #898989;
  color: #fff;
}
</style>
