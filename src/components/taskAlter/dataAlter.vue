<template>
  <div>
    <a-modal v-model="visible" title="数据" @ok="handleOk" @cancel="handleOk">
      <vue-json-pretty :path="'res'" class="json-data-box" :data="graphData">
      </vue-json-pretty>
    </a-modal>
  </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
export default {
  data() {
    return {
      visible: true,
    };
  },
  props: {
    graphData: Object,
  },
  components: {
    VueJsonPretty,
  },
  methods: {
    handleOk() {
      this.$emit('closeModal');
    },
  },
};
</script>
<style lang="less">
.json-data-box {
  height: 500px;
  overflow: auto;
}
</style>
