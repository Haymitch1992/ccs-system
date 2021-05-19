<template>
  <!-- <div class="new-page" :style="`min-height: ${pageMinHeight}px`">

  </div> -->
  <div class="initiative">
    <a-row :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="设备数量" total="2" :status="2">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="进站客流"
          total="1234"
          :status="1"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="换乘客流" total="100" :status="1">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" title="出站客流" total="200" :status="1">
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="站内状态"
          total="演练"
          :status="2"
        >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card
          :loading="loading"
          title="清客状态"
          total="有人"
          :status="1"
        >
        </chart-card>
      </a-col>
    </a-row>
    <!-- 设备列表 -->
    <a-form class="form">
      <a-row :gutter="[24, 24]">
        <a-col :sm="24" :md="12" :xl="8">
          <div class="card-box">
            <a-form-item label="可用算法">
              <a-select placeholder="请选择可用算法" v-model="algorithm">
                <a-select-option value="ca">ca</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="危险源选择">
              <a-select placeholder="请选择危险源" v-model="event_type">
                <a-select-option :value="1">火灾</a-select-option>
                <a-select-option :value="2">打架</a-select-option>
              </a-select>
            </a-form-item>
            <div class="btn-line">
              <a-button type="primary">
                确定
              </a-button>
            </div>
          </div>
        </a-col>
        <a-col :sm="24" :md="12" :xl="16">
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
              <a-button type="primary" @click="postStartSimulat">
                开始
              </a-button>
              <a-button type="primary" @click="postStopSimulat">
                终止
              </a-button>
            </div>
          </div>
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
import ChartCard from '../../components/card/ChartCard';
import aidModal from '../../components/modal/modal';
import { startSimulat, stopSimulat, statusSimulat } from '@/services/user';

export default {
  name: 'initiative',
  components: { ChartCard, aidModal },
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
      statuts: false,
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
          this.statuts = true;
        } else {
          this.statuts = false;
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
        message.success('仿真已停止');
      } else {
        message.error(res.data.message);
      }
      this.statuts = false;
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
      this.statuts = true;
      if (res.data.code === 200) {
        message.success('仿真已开始');
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
