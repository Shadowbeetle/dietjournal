<template>
  <div>
    <label>
      {{label}}
      <div v-for="(element, idx) in elements" class="input-group">
        <input :placeholder="placeholder"
               type="text"
               :title="title"
               :value="element"
               :data-index="idx"
               ref="idx"
               @keyup="edit"
               @keyup.enter="jumpToNext"
               class="form-control"
        />
        <span @click="remove"
              :data-index="idx"
              class="glyphicon glyphicon-remove input-group-addon">
        </span>
      </div>
    </label>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data () {
      return {
        label: _.capitalize(this.title)
      }
    },
    methods: {
      edit (event) {
        const idx = Number(event.target.dataset.index)
        const value = event.target.value

        if (value === '') {
          this.$emit('remove', { idx, title: this.title, section: this.section })
        } else {
          this.$emit('edit', { idx, value, title: this.title, section: this.section })
        }
      },
      remove (event) {
        const idx = Number(event.target.dataset.index)

        this.$emit('remove', { idx, title: this.title, section: this.section })
      },
      jumpToNext (event) {
        const currentIndex = Number(event.target.dataset.index)
        const nextIndex = currentIndex + 1
        this.$refs.idx[nextIndex] && this.$refs.idx[nextIndex].focus()
      }
    },
    props: {
      section: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      elements: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        required: false
      }
    }
  }
</script>

<style scoped>
  /* to compensate for the form add-on */
  .form-control {
    margin-top: 1px;
    margin-bottom: -1px;
  }
  .glyphicon-remove {
    cursor: pointer;
  }
</style>
