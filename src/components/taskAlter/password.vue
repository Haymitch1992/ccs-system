<template>
  <div>
    <a-modal
      v-model="visible"
      title="请输入密码"
      @ok="handleOk"
      @cancel="cancelOk"
    >
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
        <a-form-model-item has-feedback label="密码" prop="checkPass">
          <a-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      ruleForm: {
        checkPass: '',
      },
      rules: {
        checkPass: [
          {
            required: true,
            message: '密码核验失败请重新输入',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleOk() {
      this.submitForm('ruleForm');
      // this.$emit('closeModal');
    },
    cancelOk() {
      this.$emit('closeModal');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('startTask');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.success-status {
  color: #12ba60;
}
</style>
