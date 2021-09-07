<template>
  <div>
    <div class="model-title">
      <span>{{ modelObject.pos }}{{ modelObject.camera_id }}</span>
      <span class="right-text"></span>
    </div>
    <div class="video-container">
      <!-- 突发洪水 -->
      <img
        v-if="modelObject.type === '水位告警'"
        src="../assets/danger.jpg"
        class="video-img"
        alt=""
      />
      <img v-else :src="modelObject.image_url" class="video-img" alt="" />
      <!-- <span class="close-text">{{ num }}秒后自动关闭</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelObject: Object,
    num: Number,
  },
};
</script>

<style lang="less" scoped>
.model-title {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 18px;
  padding: 0 20px;
  .right-text {
    float: right;
    color: #888a92;
  }
}
.video-container {
  // padding: 20px;
  height: calc(100vh - 395px);
  box-sizing: border-box;
  position: relative;
  padding: 16px;
  .close-text {
    position: absolute;
    right: 40px;
    top: 40px;
    // background: #29304d;
    // padding: 4px 10px;
    // color: #fff;
    // font-size: 14px;
    // border-radius: 6px;
  }
}
.video-img {
  width: 100%;
  height: 100%;
}
</style>
