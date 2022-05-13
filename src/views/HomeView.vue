<template>
<div>

  <search-for-flights />

    

    <flight-deals />


</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import FlightDeals from '../components/FlightDeals.vue'
  import SearchForFlights from '../components/SearchForFlights.vue'
  

  export default Vue.extend({
    name: 'Home',

    components: {
      FlightDeals,
        SearchForFlights,
    },
  })
</script>

