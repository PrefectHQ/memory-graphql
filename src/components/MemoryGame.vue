<template>
  <div>
    <div class="cardDeck">
      <div
        v-for="card in cards"
        v-bind:item="card"
        v-bind:key="card.id"
        class="card"
          v-on:click="flip(card.id)"
          :class="{
            heart: card.suit === 'hearts',
            spades: card.suit === 'spades',
            clubs: card.suit === 'clubs',
            diamonds: card.suit === 'diamonds',
            joker: card.suit === 'joker',
            cardFront: flippedCard == card.id
          }"
        >
      <div v-if="card.id==flippedCard">{{ card.value }}</div>
    </div>
  </div>
  <button v-on:click="shuffle()">Shuffle Cards</button>
 </div>
</template>
<script>
import Vue from "vue";
import gql from "graphql-tag";

export default {
  name: "MemoryGame",
  apollo: {
    cards: gql`
      query {
        cards {
          id
          value
          suit
        }
      }
    `
  },
  data: () => {
    return {
      cards: [],
      flippedCard: 0,
    };
  },
  methods: {
    flip: function(el) {
      this.flippedCard = el;
    },
    shuffle: function() {
      var cardDeck = this.cards;
      cardDeck.forEach((card, index) => {
        let temp = cardDeck[index];
        let randomIndex = Math.floor(Math.random() * index);

        Vue.set(this.cards, index, this.cards[randomIndex]);
        Vue.set(this.cards, randomIndex, temp);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">

.cardDeck {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .cardFront {
    color: red;
    .card {
      .heart,
      .diamonds,
      .clubs,
      .spades {
        &:before {
          content: none;
        }
      }
    }
  }
  .card {
    border: solid #fff 2px;
    width: 5em;
    height: 7em;
    cursor: pointer;
    background: #52a8ca;
    border-radius: 15px;
    text-align: center;
    box-shadow: 2px 2px 5px #a5a0a0;
    margin: .5em;
    transition: box-shadow 0.5s;
    overflow: auto;

    .cardFront {
      .heart {
      &:before {
        content: "♥";
        color: red;
      }
    }

    .spades {
      &:before {
        content: "♠";
        color: black;
      }
    }

    .clubs {
      &:before {
        content: "♣";
        color: black;
      }
    }

    .diamonds {
      &:before {
        content: "♦";
        color: red;
      }
     }
   }
 }
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
