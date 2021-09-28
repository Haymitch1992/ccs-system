<template>
  <div>
    <div class="btn-group">
      <a-button type="plain" size="small" @click="$_zoomIn"
        ><a-icon type="plus" />放大</a-button
      >
      <a-button type="plain" size="small" @click="$_zoomOut"
        ><a-icon type="minus" />缩小</a-button
      >
      <a-button type="plain" size="small" @click="$_reset"
        ><a-icon type="fullscreen" />还原</a-button
      >
      <a-button type="plain" size="small" @click="$_catData">
        <a-icon type="html5" />
        查看数据</a-button
      >
      <!-- <el-button type="plain" size="small" @click="$_zoomReset">大小适应</el-button>
      <el-button type="plain" size="small" @click="$_translateRest">定位还原</el-button>
      
      <el-button type="plain" size="small" @click="$_undo" :disabled="undoDisable">上一步(ctrl+z)</el-button>
      <el-button type="plain" size="small" @click="$_redo" :disabled="redoDisable">下一步(ctrl+y)</el-button>
      <el-button type="plain" size="small" @click="$_download">下载图片</el-button>
      <el-button type="plain" size="small" @click="$_catData">查看数据</el-button>
       -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean,
  },
  data() {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    };
  },
  mounted() {
    // this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
    //   this.$data.undoDisable = !undoAble;
    //   this.$data.redoDisable = !redoAble;
    // });
  },
  methods: {
    $_zoomIn() {
      this.$props.lf.zoom(true);
    },
    $_zoomOut() {
      this.$props.lf.zoom(false);
    },
    $_zoomReset() {
      this.$props.lf.resetZoom();
    },
    $_translateRest() {
      this.$props.lf.resetTranslate();
    },
    $_reset() {
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo() {
      this.$props.lf.undo();
    },
    $_redo() {
      this.$props.lf.redo();
    },
    $_download() {
      this.$props.lf.getSnapshot();
    },
    $_catData() {
      this.$emit('catData');
    },
    $_catTurboData() {
      this.$emit('catTurboData');
    },
  },
};
</script>
<style scoped lang="less">
.btn-group {
  button {
    margin: 0 4px;
    color: #1890ff;
  }
}
</style>
