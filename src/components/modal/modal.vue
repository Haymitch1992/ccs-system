<template>
  <div>
    <a-modal
      :visible="modalVisible"
      title="候车区 ID:0006"
      :width="1000"
      :footer="null"
      @cancel="handleOk"
    >
      <div>
        <!-- 招援图像 -->
        <div class="video-box"></div>
        <!-- 招援情况 -->
        <div class="condition">
          <a-row :gutter="[10, 10]">
            <a-col :sm="24" :md="12" :xl="5">
              <div class="modal-item-title">
                招援等级
              </div>
              <div class="modal-item-body"></div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="5">
              <div class="modal-item-title">
                招援类型
              </div>
              <div class="modal-item-body"></div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="14">
              <div class="modal-item-title">
                处置预案
              </div>
              <div class="modal-item-body">
                请站务同事赶赴招援位置，处理招援请求。
              </div>
            </a-col>
          </a-row>
        </div>
        <!-- 招援标签 -->
        <div class="tag-line">
          <a-tag
            :color="index === activeLabelNum ? 'blue' : ''"
            v-for="(item, index) in labelList"
            :key="index"
            >{{ item }}</a-tag
          >
          <span>共{{ labelList.length }}</span>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: true,
      labelList: [
        '招援协助_候车区',
        '招援协助_客服区',
        '招援协助_候车区',
        '招援协助_客服区',
        '招援协助_候车区',
      ],
      activeLabelNum: 0,
    };
  },
  methods: {
    handleOk() {
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.video-box {
  height: 400px;
  background: #f1f3f9;
  margin-bottom: 10px;
}
.condition {
  background: #f1f3f9;
  color: #3a3f63;
  padding: 10px 10px;
  .modal-item-title {
    font-size: 16px;
    border-bottom: 1px solid #e6e9f4;
    line-height: 36px;
    padding-left: 20px;
    background: #fff;
  }
  .modal-item-body {
    height: 100px;
    background: #fff;
    padding: 20px;
  }
}
.tag-line {
  padding-top: 10px;
}
</style>
