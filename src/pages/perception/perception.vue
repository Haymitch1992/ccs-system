<template>
  <div>
    <top-status></top-status>
    <!-- 四路视频流 -->
    <!-- 右侧应急列表 -->
    <div>
      <a-row :gutter="16">
        <a-col :span="16">
          <div class="">
            <a-row :gutter="16">
              <a-col
                :span="12"
                class="grid-item"
                v-for="(item, index) in modelObjectList"
                :key="item.cameraId"
              >
                <videoBox :videoIndex="index" :modelObject="item"></videoBox>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="container">
            <perception-table></perception-table>
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
export default {
  name: 'perception',
  i18n: require('./i18n'),
  components: {
    topStatus,
    videoBox,
    perceptionTable,
    aidModal,
  },
  data() {
    return {
      modelObjectList: [
        {
          camera_region: '候车区',
          cameraId: 'ID:11002',
          url:
            'https://172.51.215.158:30082/live/34020000001320000025@34020000001320000001.flv',
          src:
            'https://172.51.215.158:30082/live/34020000001320000025@34020000001320000001.flv',
        },
        {
          camera_region: '购票区',
          cameraId: 'ID:11003',
          url:
            'https://172.51.215.158:30082/live/34020000001320000026@34020000001320000001.flv',
          src:
            'https://172.51.215.158:30082/live/34020000001320000026@34020000001320000001.flv',
        },
        {
          camera_region: '站台',
          cameraId: 'ID:11004',
          url:
            'https://172.51.215.158:30082/live/34020000001320000027@34020000001320000001.flv',
          src:
            'https://172.51.215.158:30082/live/34020000001320000027@34020000001320000001.flv',
        },
        {
          camera_region: '站台',
          cameraId: 'ID:11001',
          url:
            'https://172.51.215.158:30082/live/34020000001320000030@34020000001320000001.flv',
          src:
            'https://172.51.215.158:30082/live/34020000001320000030@34020000001320000001.flv',
        },
      ],
    };
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
.container {
  background: #fff;
}
</style>
