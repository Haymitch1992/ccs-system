<template>
  <div>
    <div class="model-title">
      <span>{{ modelObject.camera_region }}</span>
      <span class="right-text">{{ modelObject.cameraId }}</span>
    </div>
    <div class="video-container">
      <div
        ref="test"
        class="video-box"
        :id="'myvideo' + videoIndex"
        style="width:100%;"
      ></div>
    </div>
  </div>
</template>

<script>
import flv from 'flv.js';
import DPlayer from 'dplayer';
export default {
  props: {
    modelObject: Object,
    videoIndex: Number,
  },
  watch: {
    'modelObject.url'() {},
  },
  mounted() {
    const dp = new DPlayer({
      // container: document.getElementById('myvideo' + this.videoIndex),
      container: this.$refs.test,
      mutex: false,
      autoplay: true, // 自动播放 注意浏览器可能会禁止自动播放 需要客户端设置
      video: {
        url: this.modelObject.url,
        type: 'customFlv',
        customType: {
          customFlv: function(video) {
            const flvPlayer = flv.createPlayer({
              type: 'flv',
              url: video.src,
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
          },
        },
      },
    });
  },
};
</script>

<style lang="less" scoped>
.model-title {
  border-bottom: 1px solid #ddd;
  line-height: 40px;
  padding: 0 20px;
  background: #fff;
}
.video-container {
  padding: 20px;
  height: calc(50vh - 90px);
  box-sizing: border-box;
  position: relative;
  background: #fff;
  margin-bottom: 10px;
}
.video-img {
  width: 100%;
  height: 100%;
}
.video-box {
  height: calc(50vh - 120px);
}
</style>
