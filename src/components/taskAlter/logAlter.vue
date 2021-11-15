<template>
  <div>
    <a-modal
      v-model="visible"
      title="关站报告"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <p>系统自检阶段</p>
      <p class="success-status">正常</p>
      <p>启运准备阶段</p>
      <p class="success-status">正常</p>
      <p>启运准备阶段</p>
      <p class="success-status">正常</p>
      <p>其他</p>
      <p class="success-status">正常</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleOk() {
      this.$emit('closeModal');
    },
  },
};
</script>
<style lang="less" scoped>
.success-status {
  color: #12ba60;
}
</style>
