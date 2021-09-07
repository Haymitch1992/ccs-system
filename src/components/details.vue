<template>
  <div class="left-item">
    <div class="grid-item aa">
      <a-button class="close-text" @click="closeBtn" type="primary">
        返回
      </a-button>
      <!-- 播放器 -->
      <!-- 图片列表 -->
      <videoBigBox :num="num" :modelObject="alarmList[current]"></videoBigBox>
    </div>
    <div class="grid-item bb ">
      <h3 class="alert-title">
        报警等级
        <!-- <img src="../assets/icon-3.png" alt="" /> -->
      </h3>
      <div
        class="alert-container alert-container-item1"
        style="text-align: center;"
      >
        <img class="alert-icon" src="../assets/icon-4.png" alt="" />
        <span class="alert-icon-text">
          1级
          <!-- {{ alarmList[current].class || 1 }}级 -->
        </span>
      </div>
    </div>
    <div class="grid-item cc ">
      <h3 class="alert-title">
        感知类型
        <!-- <img src="../assets/icon-3.png" alt="" /> -->
      </h3>
      <div class="alert-container">
        <div class="type-img">
          {{ alarmList[current].type }}
        </div>
      </div>
    </div>
    <div class="grid-item dd ">
      <h3 class="alert-title">
        处置预案
        <img src="../assets/icon-3.png" alt="" />
      </h3>
      <div class="alert-container">
        <p class="alert-text">
          {{ alarmList[current].plan_msg }}
          <a-button type="primary" @click="dispositionAlarm">
            处置
          </a-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import videoBigBox from '../components/video-big';
import { ProcessPerceptionAlarm } from '../services/user.js';
export default {
  components: {
    videoBigBox,
  },
  props: {
    alarmList: Array,
  },
  data() {
    return {
      current: 0, // 当前接活选项
      timer: '',
      num: 10,
    };
  },
  methods: {
    dispositionAlarm() {
      ProcessPerceptionAlarm(this.alarmList[0].uuid).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          // 处置成功
          this.$message.success('处置成功');
          // 刷新数据
          this.$emit('refreshData');
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    closeBtn() {
      this.$emit('closeDetails');
    },
  },
};
</script>

<style lang="less" scoped>
.close-text {
  position: absolute;
  right: 20px;
  top: 6px;
  z-index: 100;
  // background: #29304d;
  // padding: 4px 10px;
  // color: #fff;
  // font-size: 14px;
  // border-radius: 6px;
}
.grid-item {
  font-size: 20px;
  // background: #121626;
  background: #fff;
}
.left-item {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: 4fr 206px 44px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'aa aa aa '
    'bb cc dd '
    'ee ee ee';
}
.right-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}
.aa {
  grid-area: aa;
  position: relative;
}
.bb {
  grid-area: bb;
}
.cc {
  grid-area: cc;
}
.dd {
  grid-area: dd;
}
.ee {
  grid-area: ee;
  overflow: hidden;
}
.alert-ul {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  padding: 7px 10px 0 7px;
  li {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
  }
}
.alert-title {
  padding: 0 0 0 20px;
  margin: 0;
  line-height: 44px;
  font-size: 16px;
  text-align: left;
  font-weight: normal;
  border-bottom: 1px solid #ddd;
  img {
    margin-left: 10px;
  }
}
.alert-container {
  padding: 0px 20px;
  .alert-text {
    text-align: left;
    font-size: 14px;
    line-height: 32px;
  }
  .alert-icon {
    vertical-align: middle;
    margin-right: 10px;
    margin-top: 10px;
    width: 44px;
  }
  .alert-icon-text {
    position: relative;
    top: 10px;
  }
}
.alert-container-item1 {
  padding-top: 44px;
}

.type-img {
  background: url('../assets/icon-5.png') no-repeat 0px -4px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  margin: 40px auto 0;
  font-size: 14px;
}
.btn {
  background: #121626;
  color: #fff;
}
</style>
