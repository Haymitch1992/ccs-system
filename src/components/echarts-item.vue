<template>
  <div class="ehcart-container">
    <div ref="mse" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {},
  data() {
    return {
      myChart: '',
    };
  },
  computed: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.initEcahrt();
    }, 1000);
  },
  methods: {
    initEcahrt() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.mse);
      console.log(this.$refs.mse);
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: 'CPU/GPU',
        },
        color: ['#5e7be1', '#5ec9e0'],
        tooltip: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        legend: {
          data: ['CPU使用频率', 'GPU使用频率'],
        },
        xAxis: {
          data: [
            '5:00',
            '6:00',
            '7:00',
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '14:00',
            '17:00',
            '18:00',
            '20:00',
          ],
        },
        yAxis: {},
        series: [
          {
            name: 'CPU使用频率',
            type: 'line',
            data: [234, 290, 230, 220, 220, 232, 234, 290, 230, 220, 224, 222],
            areaStyle: { opacity: 0.2 },
          },
          {
            name: 'GPU使用频率',
            type: 'line',
            data: [820, 932, 901, 934, 420, 530, 1320, 820, 932, 901, 934, 590],
            areaStyle: { opacity: 0.2 },
          },
        ],
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.ehcart-container {
  width: 100%;
  padding: 20px;
}
.chart {
  height: 400px;
  display: block;
  width: 100%;
}
</style>
