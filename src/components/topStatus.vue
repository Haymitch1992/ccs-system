<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="设备数量" total="4" :status="2">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="进站客流"
          :total="passenger_flow.flow_in"
          :status="1"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="换乘客流"
          :total="passenger_flow.flow_transfer_down"
          :status="1"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="出站客流"
          :total="passenger_flow.flow_out"
          :status="1"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="站内状态"
          :total="
            this.$store.state.account.stationStatus === 1 ? '正常' : '演练'
          "
          :status="this.$store.state.account.stationStatus === 1 ? '1' : '2'"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="清客状态"
          total="有人"
          :status="1"
        >
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ChartCard from '../components/card/ChartCard';
import { customerFlow } from '../services/user.js';
export default {
  data() {
    return {
      loading: false,
      timer: '',
      passenger_flow: {
        flow_in: 0,
        flow_out: 0,
        flow_transfer_down: 0,
      },
    };
  },
  components: {
    ChartCard,
  },
  methods: {
    // 获取进站客流
    // 获取出站客流
    // 获取换乘客流
    // 获取清客状态
    getInfo() {
      var dayjs = require('dayjs');
      let time = dayjs().format('YYYY-MM-DD');
      let startTime = time + ' 06:00:00';
      let endTime = time + ' 23:00:00';
      customerFlow(startTime, endTime, 60 * 17).then((res) => {
        console.log(res);
        this.passenger_flow.flow_in = res.data.result.passenger_flow[0].flow_in;
        this.passenger_flow.flow_out =
          res.data.result.passenger_flow[0].flow_out;
        this.passenger_flow.flow_transfer_down =
          res.data.result.passenger_flow[0].flow_transfer_down;
      });
    },
  },
  mounted() {
    // 定时任务
    this.timer = setInterval(() => {
      this.getInfo();
    }, 1000 * 10);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
