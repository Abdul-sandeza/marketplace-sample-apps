<template>
  <div class="content-container">
      <incoming-chat v-if="chat_state == 'INCOMING' || chat_state == 'CONNECTING'" > </incoming-chat>
      <!-- <chat-view></chat-view> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import IncomingChat from './IncomingChat.vue';
import ChatView from './ChatView.vue';

export default {
  name: 'Chat',
  components : {
    IncomingChat,
    ChatView
  },
  data() {
    return {

    }
  },
  created() {

  },
  computed: {
    ...mapGetters([
      'chat_state'
    ])
  }
}
</script>

<style scoped>


</style>
