<template>
  <b-container class="bv-example-row pre-signin">
        <h6>Logged in as</h6>
        <h5 style="color: #001f42 !important;"> <strong>{{ agent_username}} </strong></h5>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"

export default {
  name: 'Profile',
  data() {
    return {

    }
  },
  mounted() {
    

  },
  methods : {
    
  },
  computed: {
    ...mapGetters([
      'agent_username'
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
