import Vue from "vue";
import Vuex from "vuex";
import axios from "vue-axios";
import moment from 'moment'



Vue.use(Vuex);

export default new Vuex.Store({
  
  modules: {
  
  },


   
  state: {
    resultPrice: [],
    resultAirline: [],
    resultFlightNumber: [],
    resultDepartureAt: [],
    resultReturnAt: [],
    flightDestinations: [
      {
        name: 'Lisboa',
        temperature: 40,
        icon: '01d.png',
        price: 65.99,
        
        
      },
      {
        name: 'Amsterdam',
        temperature: 39,
        icon:'01d.png',
        price: 48.99,
        
      },
      {
        name: 'London',
        temperature: 37,
        icon: '01d.png',
        price: 33.99,
        
      },
      {
        name: 'Milan',
        temperature: 36,
        icon: '01d.png',
        price: 52.99,
        
      },
      {
        name: 'Zagreb',
        temperature: 35,
        icon: '01d.png',
        price: 44.99,
        
      },
      {
        name: 'Stockholm',
        temperature: 33,
        icon: '01d.png',
        price: 36.99,
        
      },
      {
        name: 'Warsaw',
        temperature: 25,
        icon: '01d.png',
        price: 120.99,
        
      },
      {
        name: 'London',
        temperature: 22,
        icon: '01d.png',
        price: 60.99,
        
      },
      {
        name: 'Budapest',
        temperature: 19,
        icon: '01d.png',
        price: 33.99,
        
      },
      {
        name: 'Helsinki',
        temperature: 15,
        icon: '01d.png',
        price: 49.88,
        
      },
    ] 

  },
  getters: {
   depDate(state) { 

    let dates = []
    state.resultDepartureAt.forEach((date) => { 
      dates.push(moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'))
    })

    return dates
   },
   retDate(state) { 

    let dates = []
    state.resultReturnAt.forEach((date) => { 
     
    
      dates.push(moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'))
    })

    return dates
   }

  },
  mutations: {
    SET_FLIGHT_DATA_PRICE(state, resPrice) {
      state.resultPrice = resPrice;
    },

    SET_FLIGHT_DATA_AIRLINE(state, resAirline) {
      state.resultAirline = resAirline;
    },

    SET_FLIGHT_DATA_FNUMBER(state, resFNumber) {
      state.resultFlightNumber = resFNumber;
    },
    SET_FLIGHT_DATA_DEP(state, resDep) {
      state.resultDepartureAt = resDep;
    },
    SET_FLIGHT_DATA_RET(state, resRet) {
      state.resultReturnAt = resRet;
    },
  },
  actions: {
    fetchFlightAPIData(store) {
      

      const options = {
        method: "GET",
        headers: {
          "X-Access-Token": "e84845b76a6180aea5bf581cacff11a1",
          "X-RapidAPI-Host":
            "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "c3d24120c7msh40291fc5700ec27p127908jsn31319499e1c9",
        },
      };
      fetch(
        "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=VIE&page=None&currency=EUR&destination=-",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          
          const destinations = [
            "IST",
            "BCN",
            "MAD",
            "LON",
            "ROM",
            "PAR",
            "MAD",
            "BCN"
          ];

          let resPrice = [];
          let resAirline = [];
          let resFNumber = [];
          let resDep = [];
          let resRet = [];

          destinations.forEach((dest) => {
            let price = response.data[dest]["0"]?.price == undefined ? response.data[dest]["1"].price : response.data[dest]["0"].price;
            let airline = response.data[dest]["0"]?.airline == undefined ? response.data[dest]["1"].airline : response.data[dest]["0"].airline;
            let flightNumber = response.data[dest]["0"]?.flight_number == undefined ? response.data[dest]["1"].flight_number : response.data[dest]["0"].flight_number;;
            let departureAt = response.data[dest]["0"]?.departure_at == undefined ? response.data[dest]["1"].departure_at : response.data[dest]["0"].departure_at;;
            let returnAt = response.data[dest]["0"]?.return_at == undefined ? response.data[dest]["1"].return_at : response.data[dest]["0"].return_at;;

            resPrice.push(price);
            resAirline.push(airline);
            resFNumber.push(flightNumber);
            resDep.push(departureAt);
            resRet.push(returnAt);

          });

          store.commit("SET_FLIGHT_DATA_PRICE", resPrice);
          store.commit("SET_FLIGHT_DATA_AIRLINE", resAirline);
          store.commit("SET_FLIGHT_DATA_FNUMBER", resFNumber);
          store.commit("SET_FLIGHT_DATA_DEP", resDep);
          store.commit("SET_FLIGHT_DATA_RET", resRet);
          
        })

        .catch((err) => console.error(err));
    },
  },
});
