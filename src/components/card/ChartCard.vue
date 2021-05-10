<template>
  <a-card
    :loading="loading"
    :body-style="{ padding: '20px 24px' }"
    :bordered="false"
  >
    <div class="chart-card-header">
      <span class="card-title">{{ title }}</span>
      <span class="card-total" :class="`active-${status}`">{{ total }}</span>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: ['title', 'total', 'loading', 'status'],
};
</script>

<style scoped lang="less">
.card-title {
  font-size: 14px;
  vertical-align: bottom;
  line-height: 30px;
  color: #6a74a5;
  float: left;
}
.card-total {
  font-size: 28px;
  line-height: 30px;
  float: right;
}
.chart-card-header {
  width: 100%;
}
.active-2 {
  color: #df6073;
}
.active-1 {
  color: #00d0b6;
}
</style>
