<template>
  <div class="header__social" data-header-social>
    <div class="social" data-social>
      <ul class="social__list">
        <HeaderSocialItem v-for="social in socialLinks" :key="social.social_title" :social="social">
        </HeaderSocialItem>
      </ul>
    </div>
  </div>
</template>

<script>
  import HeaderSocialItem from "./HeaderSocialItem"

  export default {
    components: {
      HeaderSocialItem
    },
    computed: {
      socialLinks() {
        const item = this.$store.getters.additionInfo.find(item => item.setting_name == `social`);

        if (item) return item.social_links
        return []
      }
    }
  }
</script>
