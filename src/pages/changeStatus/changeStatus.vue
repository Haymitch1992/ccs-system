<template>
  <div class="new-page">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <div class="status-item">
          <a-input
            placeholder="欢迎词第一行"
            v-model="welcomeTextline1"
            class="inp-line"
          />
          <a-input
            placeholder="欢迎词第二行"
            v-model="welcomeTextline2"
            class="inp-line"
          />
          <a-button type="primary" block @click="welcomeBtn()" class="inp-line">
            欢迎场景
          </a-button>
          <a-button type="primary" block @click="clickScrene('service_scene')">
            业务场景
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { changeScene, sendWelcomeScene } from '@/services/user';
import { mapState } from 'vuex';
export default {
  name: 'Demo',
  i18n: require('./i18n'),
  data() {
    return {
      welcomeTextline1: '热烈欢迎峰会各位领导',
      welcomeTextline2: '莅临深圳全自动试验中心参观指导',
    };
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    desc() {
      return this.$t('description');
    },
  },
  methods: {
    welcomeBtn() {
      let text = '';
      text = this.welcomeTextline1 + '<br>' + this.welcomeTextline2;
      sendWelcomeScene(text).then((res) => {
        console.log(res.data);
        if (res.data.message === '发送成功') {
          this.$message.info('发送成功');
        }
      });
    },
    clickScrene(type) {
      changeScene(type).then((res) => {
        if (res.data.message === '发送成功') {
          this.$message.info('发送成功');
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.new-page {
  padding: 20px;
  background: #fff;
}
.status-item {
  border: 1px solid #eee;
  padding: 20px;
}
.inp-line {
  margin-bottom: 20px;
}
</style>
