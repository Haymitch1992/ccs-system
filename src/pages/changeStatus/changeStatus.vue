<template>
  <div class="new-page">
    <div class="top-line">
      <a-row :gutter="[16, 16]">
        <a-col :xl="12">
          <div class="open-btn" @click="changeStatus()">
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
          <div class="close-btn" @click="$_getData">
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
      <span>开站自检流程</span>
      <span class="progress-status "></span>
      <span>开站启运准备流程</span>
      <span class="progress-status "></span>
      <span>开站启运执行流程</span>
      <span class="progress-status "></span>
      <span>开站完成</span>
      <span class="progress-status "></span>
      <span class="float-text">
        <span class="text-margin-right-10">当前时间 00:00:00</span>
        <span>开站时间统计 00:0000</span>
      </span>
    </div>
    <div class="progress-bar">
      <span class="progress-text">开站完成百分比</span>
      <span class="progress-item"></span>
      <a-progress :percent="progressVal" :strokeWidth="20" />
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
        <!-- 开启接口 -->
        <!-- 关闭接口 -->
        <!-- 当前顺序组 -->
        <!--  -->
      </a-drawer>
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
import dataAlter from '../../components/taskAlter/dataAlter.vue';
import taskData from '../../components/taskAlter/taskData.vue';
import { nodeList } from './config';
export default {
  name: 'Demo',
  i18n: require('./i18n'),
  components: { Control, logAlter, NodePanel, dataAlter, taskData },
  data() {
    return {
      // 节点
      visible: false,
      clickNode: null,
      graphData: null,
      showLog: false,
      dataVisible: false,
      progressVal: 0,
      startTime: '2021-09-28 05:00:00', // 只取时分秒
      endTime: '2021-09-28 21:00:00',
      lf: {},
      taskData: {
        nodes: [
          {
            id: 'a0',
            type: 'rect',
            baseType: 'node',
            x: 340,
            y: 40,
            text: '开始',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 'a1',
            type: 'task',
            x: 140,
            y: 40,
            text: 'PA自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 2,
            type: 'task',
            x: 140,
            y: 140,
            text: 'PIS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 3,
            type: 'task',
            x: 140,
            y: 240,
            text: 'AFC自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 4,
            type: 'task',
            x: 140,
            y: 340,
            text: 'BAS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 5,
            type: 'task',
            x: 140,
            y: 440,
            text: 'PSD自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 6,
            type: 'task',
            x: 140,
            y: 540,
            text: 'IES自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 7,
            type: 'task',
            x: 340,
            y: 540,
            text: 'AGS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 8,
            type: 'task',
            x: 340,
            y: 440,
            text: 'IPS自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 9,
            type: 'task',
            x: 340,
            y: 340,
            text: '直梯扶梯系统自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 10,
            type: 'task',
            x: 340,
            y: 240,
            text: '卷帘门系统自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 11,
            type: 'task',
            x: 340,
            y: 140,
            text: 'PA广播系统自检程序',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 12,
            type: 'task',
            x: 540,
            y: 140,
            text: 'PIS(乘客资讯系统)',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 13,
            type: 'task',
            x: 540,
            y: 240,
            text: 'BAS(环境与设备监控系统)',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 14,
            type: 'task',
            x: 540,
            y: 340,
            text: 'PA广播系统包房启运准备',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 15,
            type: 'task',
            x: 740,
            y: 340,
            text: '直扶梯',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 16,
            type: 'task',
            x: 740,
            y: 240,
            text: 'AFC(自动售检票系统)',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 17,
            type: 'task',
            x: 740,
            y: 140,
            text: 'IPS(综合感知系统)',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 18,
            type: 'task',
            x: 940,
            y: 140,
            text: '开启卷帘门',
            properties: {
              customStatus: 'empty',
            },
          },
          {
            id: 19,
            type: 'rect',
            x: 1140,
            y: 140,
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
            sourceNodeId: 'a0',
            targetNodeId: 'a1',
          },
          {
            type: 'polyline',
            sourceNodeId: 'a1',
            targetNodeId: 2,
          },
          {
            type: 'polyline',
            sourceNodeId: 2,
            targetNodeId: 3,
          },
          {
            type: 'polyline',
            sourceNodeId: 3,
            targetNodeId: 4,
          },
          {
            type: 'polyline',
            sourceNodeId: 4,
            targetNodeId: 5,
          },
          {
            type: 'polyline',
            sourceNodeId: 5,
            targetNodeId: 6,
          },
          {
            type: 'polyline',
            sourceNodeId: 6,
            targetNodeId: 7,
          },
          {
            type: 'polyline',
            sourceNodeId: 7,
            targetNodeId: 8,
          },
          {
            type: 'polyline',
            sourceNodeId: 8,
            targetNodeId: 9,
          },
          {
            type: 'polyline',
            sourceNodeId: 9,
            targetNodeId: 10,
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
          {
            type: 'polyline',
            sourceNodeId: 17,
            targetNodeId: 18,
          },
          {
            type: 'polyline',
            sourceNodeId: 18,
            targetNodeId: 19,
          },
        ],
      },
      nodeList,
    };
  },
  computed: {},
  methods: {
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
    $_catData() {
      console.log(123);
      this.$data.graphData = this.$data.lf.getGraphData();
      console.log(this.$data.graphData);
      this.$data.dataVisible = true;
    },
    changeStatus() {
      let startNode = 0;
      let runNodes = this.taskData.nodes.length;
      let timer = setInterval(() => {
        this.taskData.nodes[startNode].properties.customStatus = 'success';
        this.$message.success(
          this.taskData.nodes[startNode].text + ' 运行成功！'
        );
        this.lf.render(this.taskData);
        this.progressVal += 5;
        startNode++;
        if (startNode >= runNodes) {
          this.showLog = true;
          clearInterval(timer);
        }
      }, 1000);
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
.pos-box {
  position: relative;
}
.progress-line {
  background: #f0f0f0;
  margin-top: 16px;
  padding: 14px 20px;
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
}
.new-page {
  padding: 20px;
  background: #fff;
}
.status-item {
  border: 1px solid #eee;
  padding: 20px;
}
.inp-line {
  margin-bottom: 20px;
}
</style>
<style>
.lf-menu {
  position: absolute;
  display: none;
  background: #fff;
  padding: 10px 0;
  margin: 0 0 0 10px;
  border-radius: 3px;
  border: 1px solid #efefee;
  width: 140px;
}
.lf-menu > li {
  cursor: pointer;
  list-style: none;
  padding: 3px 12px;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  transition: all 120ms ease-in-out;
  position: relative;
}
.lf-menu-item__disabled {
  cursor: default;
  pointer-events: none;
  color: #aaa;
  opacity: 0.88;
}
.lf-menu-item:hover {
  background: #f3f3f3;
}
</style>
