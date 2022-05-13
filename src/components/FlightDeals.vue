<template>
  <v-container>
    <v-layout row>
      <v-flex v-for="(card, index) in cards" :key="card.city" :cols="4">
        <v-card class="mx-auto ma-3" max-width="380">
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="250px"
          >
            <v-row class="px-4 --text mb-16" align="center">
              <p class="price">€ {{ $store.state.resultPrice[index] }}</p>

            <!--
              <v-avatar size="60">
                <v-img
                  :src="resultWeatherIcon[index]"
                  alt="icon"
                  contain
                ></v-img>
              </v-avatar>
              -->


            <!--
              <div>
                <div>C° {{ resultWatherTemp[index] }}</div>
                <div>
                  {{ resultWeatherDescription[index] }}
                </div>
              </div>
            
            -->
            </v-row>


            <v-card-title v-text="card.city"></v-card-title>
         <!--  <v-card-subtitle>
              {{ resultDepartureAt[index].slice(5, 10) }} -
              {{ resultReturnAt[index].slice(5, 10) }} 
            </v-card-subtitle> -->

      
            <v-card-subtitle>
              {{ $store.getters.depDate[index]  }} -
              {{ $store.getters.retDate[index] }} 
            </v-card-subtitle>
            
          </v-img>

          <v-card-subtitle class="pb-0" v-text="card.country"></v-card-subtitle>

          <v-card-text class="text--primary">
            <div v-text="card.descriptionFoto"></div>
            <div v-text="card.descriptionFotoBody"></div>

            <br />

            <div>Flight #: {{ $store.state.resultFlightNumber[index] }}</div>
           
            <div>Airline: {{ $store.state.resultAirline[index] }}</div>
       
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-text>
            <v-chip class="mr-2">
              <v-icon left> mdi-bookmark </v-icon>
              Bookmark
            </v-chip>
            <v-chip class="mr-2">
              <v-icon left> mdi-compass </v-icon>
              Explore
            </v-chip>
            <v-chip>
              <v-icon left> mdi-airplane </v-icon>
              Book
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


export default {
  data: () => ({
  

    cards: [
      {
        city: "Istanbul",
        country: "Turkey",
        descriptionFoto: "Maiden's Tower",
        descriptionFotoBody:
          "Tower on a small islet at the southern entrance of the Bosphorus strait.",
        src: "/thumbnails/istanbul.jpg",
      },

      {
        city: "Barcelona",
        country: "España",
        descriptionFoto: "Park Güell",
        descriptionFotoBody:
          "The park was built from 1900 to 1914 and was officially opened as a public park in 1926",
        src: "/thumbnails/barcelona.jpg",
      },
      {
        city: "Sevilla",
        country: "España",
        descriptionFoto: "Plaza de España",
        descriptionFotoBody:
          'The Plaza de España ("Spain Square", in English) is a plaza in the Parque de María Luisa, in Seville, Spain.',
        src: "/thumbnails/sevilla.jpg",
      },
      {
        city: "Lisboa",
        country: "Portugal",
        descriptionFoto: "Tagus",
        descriptionFotoBody:
          "Lisbon is located at 38° N 9° W, situated at the mouth of the Tagus River and is the westernmost capital of a mainland European country.",
        src: "/thumbnails/lisabon.jpg",
      },
      {
        city: "Palermo",
        country: "Italy",
        descriptionFoto: "San Domenico",
        descriptionFotoBody:
          "Lisbon is located at 38° N 9° W, situated at the mouth of the Tagus River and is the westernmost capital of a mainland European country.",
        src: "/thumbnails/palermo.jpg",
      },
      {
        city: "Berlin",
        country: "Germany",
        descriptionFoto: "Berlin Cathedral",
        descriptionFotoBody:
          "The Berlin Cathedral, also known as, is a monumental German Evangelical church and dynastic tomb on the Museum Island in central Berlin.",
        src: "/thumbnails/berlin.jpg",
      },
      {
        city: "Paris",
        country: "France",
        descriptionFoto: "Pont Alexandre III",
        descriptionFotoBody:
          "The Pont Alexandre III is a deck arch bridge that spans the Seine in Paris. It connects the Champs-Élysées quarter with those of the Invalides and Eiffel Tower.",
        src: "/thumbnails/paris.jpg",
      },
      {
        city: "Dublin",
        country: "Ireland",
        descriptionFoto: "Berlin Cathedral",
        descriptionFotoBody:
          "The nice Georgian Quarter: The area around St Stephens Green, Trinity College, and Merrion Square",
        src: "/thumbnails/dublin.jpg",
      },
    ],
  }),
  methods: {

      
    /*
   

    fetchApiWeatherIstanbul() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=istanbul&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },

    fetchApiWeatherBarcelona() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=barcelona&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },

    fetchApiWeatherSevilla() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=sevilla&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },

    fetchApiWeatherLisboa() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=istanbul&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },

    fetchApiWeatherPalermo() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=barcelona&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },

    fetchApiWeatherBerlin() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=barcelona&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },
    fetchApiWeatherParis() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=sevilla&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },

    fetchApiWeatherDublin() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "12901f2c19msh280823f7aee1b98p185297jsn9706ecd2e4f8",
        },
      };

      fetch(
        "https://community-open-weather-map.p.rapidapi.com/weather?q=sevilla&units=metric",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          this.resultWatherTemp.push(Math.round(response["main"].temp));
          this.resultWeatherDescription.push(
            response["weather"]["0"].description
          );
          this.resultWeatherIcon.push(
            "https://openweathermap.org/img/wn/" +
              response["weather"]["0"].icon +
              "@2x.png"
          );
        })

        .catch((err) => console.error(err));
    },*/
  },
  mounted() {
    this.$store.dispatch('fetchFlightAPIData');

    /*
    this.fetchApiWeatherIstanbul();
    this.fetchApiWeatherBarcelona();
    this.fetchApiWeatherSevilla();
    this.fetchApiWeatherLisboa();
    this.fetchApiWeatherPalermo();
    this.fetchApiWeatherParis();
    this.fetchApiWeatherBerlin();
    this.fetchApiWeatherDublin();
    */
  },
};
</script>

<style>
.price {
  margin-left: 80%;
  position: absolute;
  font-size: 1.5rem;
  color: white;
}
</style>
