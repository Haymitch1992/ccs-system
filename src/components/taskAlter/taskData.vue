<template>
  <a-form-model layout="horizontal" :model="form">
    <a-form-model-item label="设备ID">
      <a-input v-model="form.deviceID" />
    </a-form-model-item>
    <a-form-model-item label="开启接口">
      <a-input v-model="form.startApi" />
    </a-form-model-item>
    <a-form-model-item label="关闭接口">
      <a-input v-model="form.closeApi" />
    </a-form-model-item>
    <a-form-model-item label="设备状态">
      <a-select v-model="form.region" placeholder="please select your zone">
        <a-select-option :value="1">
          仿真
        </a-select-option>
        <a-select-option :value="2">
          正常
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="描述">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-button type="primary" @click="onSubmit">
      Create
    </a-button>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      form: {
        deviceID: '',
        startApi: '',
        closeApi: '',
        region: 1,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },
  mounted() {
    const { form } = this.$props.nodeData.properties;
    if (form) {
      this.$data.form = Object.assign({}, this.$data.form, form);
    }
  },
  props: {
    nodeData: Object,
    lf: Object || String,
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      // const { id } = this.$props.nodeData
      // this.$props.lf.setProperties(id, this.$data.form);
      const nodeData = this.$props.nodeData;
      nodeData.properties.form = this.$data.form;
      console.log(nodeData);
      this.$props.lf.setNodeData(nodeData);
      this.$emit('onClose');

      // const { id } = this.$props.nodeData;
      // this.lf.setProperties(id, {
      //   ...this.$data.formData,
      // });
      // // console.log(6666, this.$data.formData);
      // // this.$props.lf.updateText(id, this.$data.formData.text);
      // this.$emit('onClose');
      // console.log(id, '执行成功');
    },
  },
};
</script>
