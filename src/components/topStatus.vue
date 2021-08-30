<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="设备数量" total="2" :status="2">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="进站客流"
          total="1234"
          :status="1"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="换乘客流" total="100" :status="1">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="出站客流" total="200" :status="1">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="站内状态"
          total="演练"
          :status="2"
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
export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    ChartCard,
  },
};
</script>
