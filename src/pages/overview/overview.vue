<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <!--  -->
    <div class="item-container">
      <div class="run-status-container">
        <a-row :gutter="16">
          <a-col :span="12">
            <span class="device-icon">
              <a-icon type="compass" />
            </span>
            <span class="device-title">当前系统</span>
            <span class="device-status"
              >运行 <i class="strong-text">10</i>天
              <i class="strong-text">10</i>小时
              <i class="strong-text">10</i>分钟 <i class="strong-text">10</i>秒
            </span>
          </a-col>
          <a-col :span="12">
            <span class="device-icon">
              <a-icon type="cluster" />
            </span>
            <span class="device-title">设备概况</span>
            <span class="device-status"
              >一共 <i class="strong-text">10</i>台设备，其中<i
                class="strong-text"
                >8</i
              >台在线</span
            >
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="item-container">
      <h3>基本信息</h3>
      <div class="base-container">
        <a-row :gutter="16">
          <a-col :span="6">
            <p class="strong-device">ZHIHUI_STATION_SYSTEM</p>
            <p>设备型号</p>
          </a-col>
          <a-col :span="6">
            <p class="strong-device">ZHIHUI_STATION_SYSTEM</p>
            <p>系统版本</p>
          </a-col>
          <a-col :span="6">
            <p class="strong-device">V1.10.1</p>
            <p>固件版本</p>
          </a-col>
          <a-col :span="6">
            <p class="strong-device">FFFBBB0011</p>
            <p>序列号</p>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <div class="echarts-container">
          <echarts-item></echarts-item>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="echarts-container">
          <echarts-item></echarts-item>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="echarts-container">
          <echarts-item></echarts-item>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="echarts-container">
          <echarts-item></echarts-item>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import echartsItem from '../../components/echarts-item.vue';
export default {
  components: { echartsItem },
  name: 'Demo',
  i18n: require('./i18n'),
  data() {
    return {};
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
