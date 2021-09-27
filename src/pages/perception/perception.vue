<template>
  <div>
    <top-status></top-status>
    <!-- 右侧应急列表 -->
    <div>
      <a-row :gutter="16">
        <!-- 四路视频流 -->
        <div v-show="showDetails">
          <a-col :span="16">
            <video-details
              class="grid-item-left-1"
              @closeDetails="closeDetails"
              :alarmList="abnormal_info_detail"
              @refreshData="refreshData"
              v-if="showDetails"
            ></video-details>
          </a-col>
        </div>
        <div v-show="!showDetails">
          <a-col :span="16">
            <div class="">
              <a-row :gutter="16">
                <a-col
                  :span="12"
                  class="grid-item"
                  v-for="(item, index) in modelObjectList"
                  :key="item.cameraId"
                >
                  <div class="select-line">
                    <a-select
                      :default-value="item.camera_region + item.cameraId"
                      style="width: 220px"
                      @change="handleChange($event, index)"
                    >
                      <a-select-option
                        :value="item.cameraId"
                        v-for="item in urlList"
                        :key="item.cameraId"
                      >
                        {{ item.camera_region }}{{ item.cameraId }}
                      </a-select-option>
                    </a-select>
                    <a-button
                      type="primary"
                      style="margin-left:8px"
                      @click="updatePage"
                      >更新</a-button
                    >
                  </div>

                  <div v-if="canShow">
                    <videoBox
                      :videoIndex="index"
                      :modelObject="item"
                    ></videoBox>
                  </div>
                  <div v-if="!canShow">
                    <div class="vid-box">
                      <div class="vid"></div>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </div>
        <a-col :span="8">
          <div class="container">
            <perception-table
              :alarmList="abnormal_info"
              @clickTr="goDetail"
            ></perception-table>
          </div>
        </a-col>
      </a-row>
    </div>
    <aid-modal></aid-modal>
  </div>
</template>

<script>
// import { message } from 'ant-design-vue';
import { mapState } from 'vuex';
import topStatus from '../../components/topStatus.vue';
import videoBox from '../../components/video.vue';
import perceptionTable from '../../components/perceptionTable.vue';
import aidModal from '../../components/modal/modal';
import videoDetails from '../../components/details.vue';
import { perceptionAlarm, videoUrl } from '../../services/user';
export default {
  name: 'perception',
  i18n: require('./i18n'),
  components: {
    topStatus,
    videoBox,
    perceptionTable,
    aidModal,
    videoDetails,
  },
  data() {
    return {
      showDetails: false,
      canShow: false,
      urlList: [],
      abnormal_info: [],
      abnormal_info_detail: [{}],
      modelObjectList: [
        {
          camera_region: '候车区',
          cameraId: 11002,
          url:
            'https://10.252.187.11:443/live/34020000001320000018@34020000001320000001.flv',
        },
        {
          camera_region: '购票区',
          cameraId: 11003,
          url:
            'https://10.252.187.11:443/live/34020000001320000028@34020000001320000001.flv',
        },
        {
          camera_region: '站台',
          cameraId: 11004,
          url:
            'https://10.252.187.11:443/live/34020000001320000024@34020000001320000001.flv',
        },
        {
          camera_region: '站台',
          cameraId: 11005,
          url:
            'https://10.252.187.11:443/live/34020000001320000025@34020000001320000001.flv',
        },
      ],
    };
  },
  methods: {
    findData(cid, index) {
      this.urlList.forEach((item) => {
        if (item.cameraId === cid) {
          console.log(item);
          this.modelObjectList[index] = item;
          localStorage.setItem('urlList', JSON.stringify(this.modelObjectList));
          this.canShow = false;
        }
      });
    },
    handleChange(value, num) {
      this.findData(value, num);
    },
    goDetail(val) {
      this.showDetails = true;
      this.abnormal_info_detail = [val];
    },
    closeDetails() {
      this.showDetails = false;
      this.abnormal_info_detail = [];
    },
    updatePage() {
      this.$router.go(0);
    },
    refreshData() {
      this.getAlarm();
    },
    getAlarm() {
      perceptionAlarm(15).then((res) => {
        if (res.data.result.abnormal_info) {
          let arr = res.data.result.abnormal_info;
          // this.abnormal_info = res.data.result.abnormal_info;
          arr.forEach((item) => {
            // console.log(item.image_url);
            if (item.image_url.indexOf('https') === -1) {
              item.image_url = item.image_url.replace(
                'http://10.252.187.11:80',
                'https://10.252.187.11:444'
              );
              // console.log('被替换的url', item.image_url);
            }
          });
          this.abnormal_info = arr;
          // 加入洪水感知的仿真数据
        } else {
          this.abnormal_info = [];
        }
      });
    },
  },
  mounted() {
    videoUrl().then((res) => {
      this.urlList = res.data.result;
    });
    this.getAlarm();
    this.timer2 = setInterval(() => {
      this.getAlarm();
    }, 10000);
    // 判断缓存中是否有
    if (localStorage.getItem('urlList')) {
      this.modelObjectList = JSON.parse(localStorage.getItem('urlList'));
    } else {
      localStorage.setItem('urlList', JSON.stringify(this.modelObjectList));
    }
    this.canShow = true;
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    desc() {
      return this.$t('description');
    },
  },
};
</script>

<style scoped lang="less">
@import 'index';
.vid-box {
  background: #fff;
  margin-bottom: 10px;
  padding: 20px;
  .vid {
    background: #000;
    height: 350px;
  }
}
.container {
  background: #fff;
}
.select-line {
  background: #fff;
  padding: 4px 4px;
  border-bottom: 1px solid #ddd;
}
</style>
