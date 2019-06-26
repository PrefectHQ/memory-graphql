<template>
  <div>
    <div
      v-for="card in cards"
      v-bind:item="card"
      v-bind:key="card.id"
      class="card"
    >
    <div
      v-bind:class="{ 
        heart: card.suit === 'hearts',
        spades: card.suit === 'spades',
        clubs: card.suit === 'clubs',
        queen: card.suit === 'diamonds',
        king: card.suit === 'Q',
        ace: card.suit === 'K',
        jack: card.suit === 'A',
        joker: card.suit === 'joker',
        }"
    >
    </div>
      {{card.value}}
    </div>
  
 <button  v-on:click="shuffle()">Shuffle Cards</button>

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
      cards:[],
		}
  },
  methods: {
    shuffle() {
      var cardDeck = this.cards;
      cardDeck.forEach((card, index) => {
        let temp = cardDeck[index];
        let randomIndex = Math.floor(Math.random() * index);
  
         Vue.set(this.cards, index, this.cards[randomIndex]);
         Vue.set(this.cards, randomIndex, temp);
      });
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.card {
  border: black solid 2px;
  width: 30%;
  display:flex;
  flex-direction: row;
}

.heart:before {
	content: '♥';
  color: red;
}

.spades:before {
  	content: '♠';
    color: black;
}

.clubs:before {
		content: '♣';
    color: black;
}

.diamonds:before {
		content: '♦';
    color: red;
}

.queen:before {
		content: '♠';
}

.king:before {
		content: '♠';
}

.ace:before {
		content: '♠';
}

.jack:before {
		content: '♠';
}

.joker:before {
		content: '♠';
}


button {
  display: block;
  margin: 2em auto;
}

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
