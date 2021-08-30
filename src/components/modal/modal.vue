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
        <div class="video-box">
          <communication @closeModel="modalVisible = false"></communication>
          <!-- 按钮行 -->
          <!-- <div class="btn-line">
            <span class="btn-item">
              <a-button type="danger">
                <img src="../../assets/img/icon-6.png" alt="" />
              </a-button>
              <p>挂断</p>
            </span>
            <span class="btn-item">
              <a-button type="primary">
                <img src="../../assets/img/icon-7.png" alt="" />
              </a-button>
              <p>静音</p>
            </span>
            <span class="btn-item">
              <a-button style="backgroundColor:#87d068">
                <img src="../../assets/img/icon-8.png" alt="" />
              </a-button>
              <p>接听</p>
            </span>
          </div> -->
        </div>
        <!-- 招援情况 -->
        <div class="condition" style="display:none;">
          <a-row :gutter="[10, 10]">
            <a-col :sm="24" :md="12" :xl="5">
              <div class="modal-item-title">
                招援等级<span class="icon-3"></span>
              </div>
              <div class="modal-item-body center-box">
                <img src="../../assets/img/icon-4.png" alt="" />
                <span>一级</span>
              </div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="5">
              <div class="modal-item-title">
                招援类型<span class="icon-3"></span>
              </div>
              <div class="modal-item-body">
                <img class="icon-5" src="../../assets/img/icon-5.png" alt="" />
                <span class="icon-5-text">点击</span>
              </div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="14">
              <div class="modal-item-title">
                处置预案<span class="icon-3"></span>
              </div>
              <div class="modal-item-body">
                请站务同事赶赴招援位置，处理招援请求。
              </div>
            </a-col>
          </a-row>
        </div>
        <!-- 招援标签 -->
        <div class="tag-line" style="display:none;">
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
import io from 'socket.io-client';
import communication from '../../components/communication';
export default {
  components: { communication },
  data() {
    return {
      modalVisible: false,
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
  mounted() {
    let socket = io.connect('https://172.51.215.158:443/', {
      transports: ['websocket'],
    });
    socket.on('roomid', (roomid) => {
      this.modalVisible = true;
    });
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
  background: #f1f3f9;
  margin-bottom: 10px;
  min-height: 500px;
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
    .icon-3 {
      display: inline-block;
      width: 30px;
      height: 14px;
      margin-left: 10px;
      background: url('../../assets/img/icon-3.png') no-repeat 0px 0px;
      background-size: 28px;
      vertical-align: middle;
    }
  }

  .modal-item-body {
    height: 110px;
    background: #fff;
    padding: 10px 20px;
    position: relative;
    .icon-5 {
      width: 98px;
      height: 98px;
      display: block;
      margin: 0 auto;
    }
    .icon-5-text {
      width: 98px;
      height: 98px;
      line-height: 98px;
      position: absolute;
      display: block;
      left: calc(50% - 49px);
      top: calc(50% - 49px);
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
  }
  .center-box {
    text-align: center;
    padding-top: 16px;
    span {
      color: #3a3f63;
      font-size: 18px;
      margin-left: 6px;
    }
  }
}
.tag-line {
  padding-top: 10px;
}
.btn-line {
  padding-top: 300px;
  text-align: center;
  .btn-item {
    width: 200px;
    display: inline-block;
    text-align: center;
    p {
      margin-top: 10px;
    }
  }
  .ant-btn {
    border-radius: 30px;
    padding-left: 30px;
    padding-right: 30px;
    img {
      width: 24px;
    }
  }
}
.icon-9 {
  display: block;
  width: 100%;
}
</style>
