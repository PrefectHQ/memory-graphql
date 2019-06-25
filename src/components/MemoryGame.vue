<template>
   <p><pre>{{cards}}</pre></p>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    // Simple query that will update the 'hello' vue property
    cards: gql`query {
      cards {
          id
          value 
          suit
      }
    }`,
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
