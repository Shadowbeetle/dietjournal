<template>
  <div>
    <div v-for="(element, idx) in elements" class="input-group">
      <input placeholder="eg. diarrhea; or soft, yellowish, small amount" type="text"
             :value="element"
             :data-index="idx"
             ref="idx"
             @keyup="edit"
             @keyup.enter="jumpToNext"
             class="form-control"
      >
      <span @click="remove"
            :data-index="idx"
            class="glyphicon glyphicon-remove input-group-addon">
    </span>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      edit (event) {
        const idx = Number(event.target.dataset.index)
        const value = event.target.value

        if (value === '') {
          this.$emit('remove', { idx })
        } else {
          this.$emit('edit', { idx, value })
        }
      },
      remove (event) {
        const idx = Number(event.target.dataset.index)

        this.$emit('remove', { idx })
      },
      jumpToNext (event) {
        const currentIndex = Number(event.target.dataset.index)
        const nextIndex = currentIndex + 1
        this.$refs.idx[ nextIndex ] && this.$refs.idx[ nextIndex ].focus()
      }
    },
    props: {
      elements: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .form-control {
    margin-top: 1px;
    margin-bottom: -1px;
  }

  .glyphicon-remove {
    cursor: pointer;
  }
</style>
