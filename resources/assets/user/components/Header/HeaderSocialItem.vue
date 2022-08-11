<template>
  <li>
    <span class="visually-hidden">{{ social.social_title }}</span>
    <a :href="social.social_link" v-html="socialSvg"></a>
  </li>
</template>

<script>
  export default {
    props: {
      social: {
        type: Object,
        required: true
      }
    },
    computed: {
      socialSvg() {
        return `
          <svg width="22" height="22" fill="#666">
            <use xlink:href="#icon-${this.social.social_title}"/>
          </svg>
        `
      }
    }
  }
</script>
