<template>
<div>
 <p><pre>{{cards}}</pre></p>
   <button v-on:click="shuffle()">Shuffle Cards</button>
</div>
</template>
<script>
import Vue from "vue";
import gql from "graphql-tag";

export default {
  name: "MemoryGame",
    apollo: {
    cards: gql`query{
      cards {
          id
          value 
          suit
      }
    }`,
  },
  data: ()=> {
    return {
      shuffledDeck: [],
      cards:[],
		}
  },
  methods: {
    shuffle() {
      var cardDeck = this.cards;
      cardDeck.forEach((card, index) => {
        let randomIndex = Math.floor(Math.random() * index);
        let temp = cardDeck[index];
        cardDeck[randomIndex] = temp;
        this.cards = cardDeck
      });
    }
  },
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
