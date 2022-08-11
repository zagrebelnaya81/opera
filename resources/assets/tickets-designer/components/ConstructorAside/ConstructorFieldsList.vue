<template>
  <ul class="constructor-fields__list">
    <ConstructorField
      v-for="field in fields"
      :key="field.id"
      :field="field"
    ></ConstructorField>
  </ul>
</template>

<script>
  import ConstructorField from "./ConstructorField"

  export default {
    name: `constructor-fields-list`,
    components: {
      ConstructorField
    },
    computed: {
      fields() {
        return this.$store.getters.getTicketFields
      }
    }
  }
</script>
