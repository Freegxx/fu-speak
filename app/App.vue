<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
    // 初始化本地存储
    this.$store.dispatch('initLocalData')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
@import "static/styles/common.css";
</style>
