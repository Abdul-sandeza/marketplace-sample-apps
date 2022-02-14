<template>
    <div class="chat-handler">
        <div class="chat-handler-contents">
          <h6>{{ chat_state }} CHAT</h6>
          <h5>{{ chat_name }}</h5>
          <div class="chat-handle-buttons-container">
              <b-button size="sm" pill @click="OnAcceptChat()" class="chat-handle-buttons" variant="success">
                <font-awesome-icon  icon="comment" size="sm"/>   Accept
              </b-button>
              <b-button size="sm" pill @click="OnDeclineChat()" class="chat-handle-buttons" variant="danger">
                <font-awesome-icon  icon="comment-slash" size="sm"/>   Decline
              </b-button>
          </div>
        </div>
    </div>      

</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import {onAcceptChat , onDeclineChat} from "../../lib/ChatActions"

export default {
  name: 'IncomingChat',
  data() {
    return {
    }
  },
  methods: {
    OnAcceptChat() {
      onAcceptChat()
    },
    OnDeclineChat() {
      onDeclineChat()
    }
  },
  computed: {
    ...mapGetters([
      'chat_state',
      'chat_name'
    ])
  }
}
</script>

<style scoped>

.chat-handle-buttons{
  width: 110px;
  margin: 0 5px;
}

.chat-handler {
  display: table;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.chat-handler-contents {
  display: table-cell;
  margin: 0;
}
</style>
