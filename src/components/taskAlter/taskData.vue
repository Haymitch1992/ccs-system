<template>
  <div>
    <a-form-model layout="horizontal" :model="nodeData">
      <a-form-model-item label="设备名称">
        <a-input v-model="formData.text" />
      </a-form-model-item>
      <a-form-model-item label="设备ID">
        <a-select v-model="formData.deviceList" mode="multiple">
          <a-select-option
            :value="item.value"
            v-for="item in selectOption"
            :key="item"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="超时等待时间">
        <a-input v-model="formData.executionTime" />
      </a-form-model-item>
      <a-form-model-item label="设备状态">
        <a-select v-model="formData.region" placeholder="请选择设备状态">
          <a-select-option :value="1">
            仿真
          </a-select-option>
          <a-select-option :value="2">
            正常
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="formData.desc" type="textarea" />
      </a-form-model-item>
      <a-button type="primary" @click="handleSubmit">
        保存
      </a-button>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      selectOption: [
        {
          label: 'pc_26',
          value: 'pc_26',
        },
        {
          label: 'pc_180',
          value: 'pc_180',
        },
        {
          label: 'wzj_34',
          value: 'wzj_34',
        },
        {
          label: 'wzj_75',
          value: 'wzj_75',
        },
        {
          label: 'wzj_79',
          value: 'wzj_79',
        },
        {
          label: 'wzj_80',
          value: 'wzj_80',
        },
        {
          label: 'light_all',
          value: 'light_all',
        },
      ],
      formData: {
        deviceList: [],
        executionTime: '',
        region: '',
        desc: '',
      },
    };
  },
  mounted() {
    const { properties, text } = this.$props.nodeData;
    console.log(properties);
    if (properties) {
      this.$data.formData = properties;
    }
    if (text && text.value) {
      this.$data.formData.text = text.value;
    }
    if (text && text.value) {
      this.$data.text = text.value;
    }
  },
  props: {
    nodeData: Object,
    lf: Object || String,
  },
  methods: {
    handleSubmit() {
      console.log(this.formData, this.$data.formData);
      const { id } = this.$props.nodeData;
      this.$props.lf.updateText(id, this.$data.formData.text);
      // const { id } = this.$props.nodeData
      // // this.$props.lf.setProperties(id, this.$data.form);
      // const nodeData = this.$props.nodeData;
      // this.$props.lf.setNodeData(nodeData);
      this.$props.lf.setProperties(id, {
        ...this.$data.formData,
      });
      this.$emit('onClose');
    },
  },
};
</script>
