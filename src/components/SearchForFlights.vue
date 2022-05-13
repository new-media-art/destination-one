<template>
<div>
  <v-row>
<v-col
 col="8"
 >  
<v-container
fluid
 mt-16
 ml-4

>
  
    <h2 class="pa-5 text-left font-weight-bold">
     Select temperature and a date
    </h2>
<hr>
<br>
  <v-row
  
  > 

<!--Radio button-->
 <v-card 
 class="ml-12"
 flat
 
 >
    <v-card-text>
      <v-flex>
      
        <v-row>
  
    
    
    <v-radio-group
    v-model="ex7"
      row
      
    >
      <v-radio
        label="Hot"
        color="orange darken-3"
        value="orange darken-3"
      ></v-radio>
      <v-radio
        label="warm"
        color="yellow"
        value="yellow"
      ></v-radio>
       <v-radio
        label="cold"
        color="blue"
        value="blue"
      ></v-radio>
    </v-radio-group>
      </v-row>
      </v-flex>
    </v-card-text>
  </v-card>



 
  <!--Calendar-->
 


    <v-row>


     <v-card
     class="ml-12 mt-4 pl-10 pr-10"
     flat
     >

     
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedDatefns"
              clearable
              
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
              
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>

      </v-card>
    
    <div class="text-center mt-7 pl-8">
     <v-btn
      rounded
      color="primary"
      dark
    >
      Search flights
    </v-btn>
    </div>
    
    </v-row>



</v-row>



<br>



<!--Data table-->
  <v-data-table
    :headers="headers"
    :items="$store.state.flightDestinations "
    sort-by="temperature"
    class="elevation-1"
  >


<template v-slot:[`item.temperature`]="{ item }">
      <v-chip
        :color="getColor(item.temperature)"
        dark
      >
        {{ item.temperature }}
      </v-chip>
    </template>


    <template v-slot:top>

 



      <v-toolbar
        flat
      >
        <v-toolbar-title>Destinations</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>


        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

      

          <v-card>
            <v-card-title>
              <span class="text-h5">Selected destination</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>

                  <v-col
                    cols="6"
                  >
                    <div>Destination: {{ selectedItem.name }}</div>
                    
                  </v-col>
                
                  
                  <v-col
                    cols="6"
                    
                  >
                    <div>Temperature: {{ selectedItem.temperature }}  C°</div>
                  </v-col>
                
                 <v-col
                    cols="6"
                    
                  >
                    <div>Price: {{ selectedItem.price }}  €</div>
                  </v-col>

                     <v-col
                    cols="4"
                    
                  >
                 
                    <v-icon
                        large
                        color="green darken-2"
                        >
                        mdi-weather-lightning
                        </v-icon>
                  </v-col>
                 </v-row>
                  
                
                 
                
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="select"
              >
                Select
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      
      </v-toolbar>




    </template>
    <template v-slot:[`item.actions`]="{ item }">

        <v-btn
        @click="selectItem(item)"
        color="white"
        small
        > Select 

            <v-icon
                small
                class="mr-2"
                color="blue"
                >
                mdi-arrow-right-thick
            </v-icon>
        </v-btn>

      


    
    
    </template>
    <!--
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
   -->
  </v-data-table>
</v-container>
 

 </v-col>
 
 <v-col
 cols="4"
 class="airplane d-none d-lg-block"

 >
   <v-img
 gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
  height="98%"
  width="80%"
  max-height="900px"
  src="thumbnails/airplane.jpg"
  
></v-img>
 </v-col>
 

 </v-row>


  
  
  
  
 
   
  

  

 
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'

  export default {
    data: () => ({
      ex7: 'orange darken-3',

      date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      menu1: false,
      menu2: false,
      
      dialog: false,
      dialogDelete: false,
      headers: [
        {
            text: 'Destinations',
            align: 'start',
            sortable: false,
            value: 'name',
        },
         { text: 'Temperature C°', value: 'temperature' },
          { text: 'Weather icon', value: 'icon' },
           {text: 'price €', value: 'price' },
         { text: 'Actions', value: 'actions', sortable: false },
      ],
      flightDestinations: [],
      editedIndex: -1,
      selectedItem: {
        name: '',
        temperature: 0,
        price: 0,
        
      },
      defaultItem: {
        name: '',
        temperature: 0,
        price: 0,
        
      },
    }),
   
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    /*
    created () {
      this.initialize()
     
    }, */
    methods: {
       /* initialize () {
      this.flightDestinations = 
        
         $store.state.flightDestinations 
        [
          
        ]
      },*/
      selectItem (item) {
        this.editedIndex = this.flightDestinations.indexOf(item)
        this.selectedItem = Object.assign({}, item)
        this.dialog = true
        console.log(item)
      },
      
      
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      select () {
        if (this.editedIndex > -1) {
          Object.assign(this.flightDestinations[this.editedIndex], this.selectedItem)
        } else {
          this.flightDestinations.push(this.selectedItem)
        }
        this.close()
      },
      getColor (temperature) {
        if (temperature > 35) return 'orange'
        else if (temperature > 25) return 'yellow'
        else return 'blue'
      },
    }, computed: {
     
      computedDateFormattedDatefns () {
        return this.date ? format(parseISO(this.date), 'EEEE, MMMM do yyyy') : ''
      },
    },

  }
</script>

<style>
.airplane { 
  margin-top: 9%;
}

</style>