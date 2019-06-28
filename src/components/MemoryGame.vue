<template>
  <div class="memory">
    <div>Score: {{ score }}</div>
    <div v-if="score === 27">Congratulations! You Won</div>
    <button v-on:click="shuffle()">Shuffle Cards</button>
    <div class="cardDeck">
      <div
        class="card"
        v-for="card in cards"
        v-bind:item="card"
        v-bind:key="card.id"
        v-on:click="flip(card)"
        v-bind:class="{
          cardFront: flipCard(card),
          heart: card.suit === 'hearts',
          spades: card.suit === 'spades',
          clubs: card.suit === 'clubs',
          diamonds: card.suit === 'diamonds'
        }"
      >
        <div class="card-value" v-if="flipCard(card)">
          {{ card.value }}
        </div>
      </div>
    </div>
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
  data() {
    return {
      cards: [],
      flippedCards: [],
      matchedCards: [],
      matchedSet: [],
      score: 0,
      cardsShuffled: false
    };
  },
  methods: {
    flip(chosenCard) {
      this.flippedCards.push(chosenCard);
      this.getMatchedSet();

      if (this.flippedCards.length === 2) {
        if (this.cardValueMatch() && this.cardColorMatch(chosenCard)) {
          this.matchedSet = this.flippedCards.slice();
          if (this.matchedCards.length < 2) {
            this.matchedCards = this.flippedCards.slice();
          } else {
            this.matchedCards = this.matchedCards.concat(this.flippedCards);
          }
        }
      } else {
        if (this.flippedCards.length === 3) {
          this.matchedSet = [];
          this.flippedCards = [];
          this.flippedCards.push(chosenCard);
        }
      }

      this.score = this.matchedCards.length / 2;
    },
    flipCard(chosenCard) {
      if (
        this.flippedCards.find(flippedCard => flippedCard.id === chosenCard.id)
      ) {
        return true;
      }
    },
    shuffle() {
      var cardDeck = this.cards;
      this.cardsShuffled = true;
      cardDeck.forEach(function(card, index) {
        let temp = cardDeck[index];
        let randomIndex = Math.floor(Math.random() * index);

        Vue.set(cardDeck, index, cardDeck[randomIndex]);
        Vue.set(cardDeck, randomIndex, temp);
      });
    },
    cardValueMatch() {
      if (this.flippedCards[0].value === this.flippedCards[1].value) {
        return true;
      }
      return false;
    },
    getMatchedSet() {
      var cardIndex;
      if (this.matchedSet) {
        this.matchedSet.forEach(matchedCard => {
          cardIndex = this.cards.findIndex(card => card.id === matchedCard.id);
          this.cards.splice(cardIndex, 1);
        });
      } else {
        this.matchedSet = [];
      }
    },
    getCardColor(card) {
      if (card.suit === "diamonds" || card.suit === "hearts") {
        return "red";
      }
      return "black";
    },
    cardColorMatch() {
      if (
        this.getCardColor(this.flippedCards[0]) ===
        this.getCardColor(this.flippedCards[1])
      ) {
        return true;
      }
      return false;
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
  .card {
    border: solid #fff 2px;
    width: 5em;
    height: 7em;
    cursor: pointer;
    background: #52a8ca;
    border-radius: 15px;
    text-align: center;
    box-shadow: 2px 2px 5px #a5a0a0;
    margin: 0.5em;
    transition: box-shadow 0.5s;
    overflow: auto;

    &.cardFront {
      background: #c7dfe2;

      &:before {
        font-size: 2em;
      }

      .card-value {
        font-size: 1.5em;
      }

      &.heart {
        &:before {
          content: "♥";
          color: red;
        }
      }

      &.spades {
        &:before {
          content: "♠";
          color: black;
        }
      }

      &.clubs {
        &:before {
          content: "♣";
          color: black;
        }
      }

      &.diamonds {
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
