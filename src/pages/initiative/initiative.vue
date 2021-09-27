<template>
  <!-- <div class="new-page" :style="`min-height: ${pageMinHeight}px`">

  </div> -->
  <div class="initiative">
    <top-status></top-status>
    <!-- 设备列表 -->
    <a-form class="form">
      <a-row :gutter="[16, 16]">
        <a-col :sm="24" :md="24" :xl="8">
          <div class="card-box">
            <a-form-item label="可用算法">
              <a-select placeholder="请选择可用算法" v-model="algorithm">
                <a-select-option value="ca">ca</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="危险源选择">
              <a-select placeholder="请选择危险源" v-model="event_type">
                <a-select-option :value="1">火灾</a-select-option>
                <a-select-option :value="2">水灾</a-select-option>
              </a-select>
            </a-form-item>
            <div class="btn-line">
              <a-button type="primary">
                确定
              </a-button>
            </div>
          </div>
        </a-col>
        <a-col :sm="24" :md="24" :xl="16">
          <div class="card-box">
            <a-row :gutter="[24, 24]">
              <a-col :sm="24" :md="12" :xl="6">
                <a-form-item label="X轴">
                  <a-input placeholder="100" v-model="dotX" />
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12" :xl="6">
                <a-form-item label="Y轴">
                  <a-input placeholder="100" v-model="dotY" />
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12" :xl="6">
                <a-form-item label="区域">
                  <a-input disabled v-model="area" />
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12" :xl="6">
                <a-form-item label="灾害半径">
                  <a-input addonAfter="米" v-model.number="radius" />
                </a-form-item>
              </a-col>
            </a-row>
            <div>
              <div class="select-box" @click="handleClick($event)">
                <img src="../../assets/img/station-map-1.png" alt="" />
                <span
                  class="dot"
                  :style="{ left: dotX + 'px', top: dotY + 'px' }"
                ></span>
              </div>
              <div class="station-down">
                <img src="../../assets/img/station-map-2.png" alt="" />
              </div>
            </div>

            <div class="btn-line">
              <!-- <a-button type="primary" @click="postStartSimulat">
                开始
              </a-button> -->
              <a-button
                type="primary"
                v-if="event_type === 1"
                @click="postStartSimulat()"
              >
                开始火灾场景
              </a-button>
              <a-button
                type="primary"
                v-if="event_type === 2"
                @click="postStartSimulat()"
              >
                开始水灾场景
              </a-button>
              <a-button type="primary" @click="postStopSimulat()">
                终止
              </a-button>
            </div>
          </div>
        </a-col>

        <a-col :span="12">
          <div class="status-item"></div>
        </a-col>
        <a-col :span="12">
          <div class="status-item"></div>
        </a-col>
      </a-row>
    </a-form>
    <aid-modal></aid-modal>
    <!-- 算法选择 -->
    <!-- 获取坐标 -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { message } from 'ant-design-vue';
import aidModal from '../../components/modal/modal';
import topStatus from '../../components/topStatus.vue';
import { mapMutations } from 'vuex';
import { startSimulat, statusSimulat, stopSimulat } from '@/services/user';
import { changeScene, sendWelcomeScene } from '@/services/user';

export default {
  name: 'initiative',
  components: { aidModal, topStatus },
  data() {
    return {
      loading: false,
      screenX: 0,
      screenY: 0,
      dotX: 0,
      dotY: 0,
      radius: 0,
      event_type: 1,
      algorithm: 'ca',
      area: 1,
    };
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    // 获取仿真状态
    this.getStatusSimulat();
  },
  methods: {
    ...mapMutations('account', ['setStationStatus']),
    clickScrene(type) {
      changeScene(type).then((res) => {
        if (res.data.message === '发送成功') {
          this.$message.info('发送成功');
        }
      });
    },
    getStatusSimulat() {
      statusSimulat().then((res) => {
        if (res.data.code === 200 && res.data.result.algorithm) {
          let obj = res.data.result;
          this.dotX = obj.pos_x;
          this.dotY = obj.pos_y;
          this.radius = obj.radius;
          this.algorithm = obj.algorithm;
          this.event_type = obj.event_type;
          this.area = obj.area;
          //
          this.setStationStatus(2);
        } else {
          this.setStationStatus(1);
        }
      });
    },
    postStopSimulat() {
      let questID = new Date().getTime();
      let obj = [{}];
      stopSimulat(questID, obj).then(this.afterStopSimulat);
    },
    afterStopSimulat(res) {
      console.log(res);
      if (res.data.code === 200) {
        this.setStationStatus(1);
        setTimeout(() => {
          this.clickScrene('service_scene');
        }, 2000);
        this.clickScrene('service_scene');
        message.success('仿真已停止');
      } else {
        message.error(res.data.message);
      }
    },
    postStartSimulat() {
      let questID = new Date().getTime();
      let obj = [
        {
          event_type: this.event_type, //1表示火灾,2表示打架
          pos_x: this.dotX, //事件位置横坐标
          pos_y: this.dotY, //事件位置纵坐标
          radius: this.radius, //事件半径
          area: this.area, //区域ID
          algorithm: this.algorithm, //算法名称，目前只有一个算法
        },
      ];
      startSimulat(questID, obj).then(this.afterStartSimulat);
    },
    afterStartSimulat(res) {
      if (res.data.code === 200) {
        this.setStationStatus(2);
        message.success('仿真已开始');
        if (this.event_type === 1) {
          setTimeout(() => {
            this.clickScrene('emergency_fire');
          }, 2000);
        } else if (this.event_type === 2) {
          setTimeout(() => {
            this.clickScrene('emergency_flood');
          }, 2000);
        }
      } else {
        message.error(res.data.message);
      }
      console.log(res);
    },
    touchmove(event) {
      this.screenX = event.offsetX;
      this.screenY = event.offsetY;
    },
    handleClick(event) {
      if (event.target.nodeName === 'SPAN') {
        return;
      }
      this.screenX = event.offsetX;
      this.screenY = event.offsetY;
      this.dotX = event.offsetX - 14;
      this.dotY = event.offsetY - 14;
      this.area = this.dotY < 120 ? 1 : 2;
    },
  },
};
</script>

<style scoped lang="less">
.card-box {
  background: #fff;
  padding: 20px;
}
.station-down {
  width: 100%;
  position: relative;
  background: #f4f7ff;
  height: 343px;
  img {
    width: 800px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.select-box {
  width: 100%;
  position: relative;
  background: #f4f7ff;
  height: 269px;
  img {
    width: 800px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
  .dot {
    width: 13px;
    height: 13px;
    background: #e92d46;
    border-radius: 50%;
    position: absolute;
    display: block;
    border: 8px solid #ecb9c0;
    box-sizing: content-box;
  }
}
.btn-line {
  text-align: center;
  padding: 10px 0;
  .ant-btn {
    margin: 0 10px;
    border-radius: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
