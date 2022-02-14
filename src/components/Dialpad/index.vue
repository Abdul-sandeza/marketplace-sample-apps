<template>
  <div class="dialpad-container"> 
    <div class="button-row">
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('1')">
        <div class="dialpad-number">1</div>
        <span class="dialpad-filler">...</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('2')">
        <div class="dialpad-number">2</div>
        <span class="dialpad-letters">ABC</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('3')">
        <div class="dialpad-number">3</div>
        <span class="dialpad-letters">DEF</span>
      </b-button>
    </div>
    <div class="button-row">
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('4')">
        <div class="dialpad-number">4</div>
        <span class="dialpad-letters">GHI</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('5')">
        <div class="dialpad-number">5</div>
        <span class="dialpad-letters">JKL</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('6')">
        <div class="dialpad-number">6</div>
        <span class="dialpad-letters">MNO</span>
      </b-button>
    </div>
    <div class="button-row">
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('7')">
        <div class="dialpad-number">7</div>
        <span class="dialpad-letters">PQRS</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('8')">
        <div class="dialpad-number">8</div>
        <span class="dialpad-letters">TVU</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('9')">
        <div class="dialpad-number">9</div>
        <span class="dialpad-letters">WXYZ</span>
      </b-button>
    </div>
    <div class="button-row">
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('*')">
        <div class="dialpad-number">*</div>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('0')">
        <div class="dialpad-number">0</div>
        <span class="dialpad-letters">+</span>
      </b-button>
      <b-button variant="outline-secondary" class="dialpad-button" @click="keyDial('#')">
        <div class="dialpad-number">#</div>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"

export default {
  name: 'Dialpad',
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    keyDial(number) {
      if (number => 0 && number <= 9) {
        this.$store.dispatch("call/setDialedNumber" , this.dialedNumber + number )
      }
    }
  },
  computed: {
    ...mapGetters([
        'dialable_countries',
        'dialedNumber'
    ])
  }
}
</script>

<style scoped>

.dialpad-container {
  text-align: center;
  margin-top: 30px;
}

.button-row {
  margin-top: 10px;
}

 .dialpad-button {
    width: 23%;
    height: 65px;
    margin-right: 5px;
    margin-left: 5px;
  }

  .dialpad-number {
    font-size: 19px;
    font-weight: bold;
  }

  .dialpad-letters{
    font-size: 13px;
    color: #ccc;
  }

  .dialpad-filler {
    visibility: hidden;
  }

</style>
