<template>
  <div>
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      style="height: 400px; margin-bottom: 80px"
    >
    </quill-editor>
    <el-button type="primary" @click="$emit('addgoods', content)"
      >添加商品</el-button
    >
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'Richtext',
  created () { },
  data () {
    return {
      content: '',
      editorOption: {}
    }
  },
  methods: {

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-button {
  margin-top: 20px;
}
</style>
