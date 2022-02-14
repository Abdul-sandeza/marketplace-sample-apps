<template>
  <b-container class="bv-example-row pre-signin">
        <h6>Sign In to your Amazon Connect Instance</h6>
        <h5 style="color: #001f42 !important;"> <strong>{{ connect_alias}} </strong></h5>
        <!-- <b-button style="margin-bottom:10px" size="sm" @click="openLogin()">Click to signin</b-button> -->
        <h6>Refresh the tab if you face any issues</h6>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"

export default {
  name: 'Login',
  data() {
    return {

    }
  },
  mounted() {
    

  },
  methods : {
    openLogin() {

    }
  },
  computed: {
    ...mapGetters([
      'connect_instance',
      'connect_alias'
    ])
  }
}
</script>

<style scoped>

.pre-signin{
  line-height: 1.5;
  height: 200px;
  margin-top:180px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}


</style>
