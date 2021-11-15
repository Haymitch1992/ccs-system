export const nodeList = [
  {
    type: 'circle',
    text: '开始',
    class: 'node-push',
    nodeIcon:'bulb',
  },
  {
    text: '自检流程',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'apartment',
    properties: {
      customStatus: 'empty',
      deviceList: [],
      executionTime: '1000',
      region: 1,
      desc: '',
    }
  },
  {
    text: '启运准备流程',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'branches',
    properties: {
      customStatus: 'empty',
      deviceList: [''],
      executionTime: '1000',
      region: 1,
      desc: '',
    }
  },
  {
    text: '包柱屏设备',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'book',
    properties: {
      customStatus: 'empty',
      deviceList: ['pc_26'],
      executionTime: '2000',
      region: 1,
      desc: '位于2层展厅中心,用于展示站台信息和车辆信息',
    }
  },
  {
    text: '引导屏设备',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'control',
    properties: {
      customStatus: 'empty',
      deviceList: ['wzj_34','wzj_75','wzj_79','wzj_80'],
      executionTime: '2000',
      region: 1,
      desc: '位于进出站闸机、展厅，起到乘客指引作用',
    }
  },
  {
    text: '识别屏设备',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'container',
    properties: {
      customStatus: 'empty',
      deviceList: ['pc_180'],
      executionTime: '2000',
      region: 1,
      desc: '通过算法识别不同的手势，进行页面内容的切换',
    }
  },
  {
    text: '灯带设备',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'right-circle',
    properties: {
      customStatus: 'empty',
      deviceList: ['light_all'],
      executionTime: '2000',
      region: 1,
      desc: '整个展厅的灯光总开关',
    }
  },
  {
    text: '生成报告',
    type: 'task',
    class: 'node-rect',
    nodeIcon:'calculator',
    properties: {
      customStatus: 'empty',
      deviceList: ['light_all'],
      executionTime: '4000',
      region: 1,
      desc: '整个展厅的灯光总开关',
    }
  },
];


