<template>
  <div class="constructor-aside">
    <ConstructorHeader></ConstructorHeader>
    <ConstructorFields></ConstructorFields>
  </div>
</template>

<script>
  import ConstructorHeader from "./ConstructorHeader"
  import ConstructorFields from "./ConstructorFields"

  export default {
    name: `constructor-aside`,
    components: {
      ConstructorHeader,
      ConstructorFields
    }
  }
</script>
