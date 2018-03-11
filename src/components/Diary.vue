<template>
  <div class="row"
       @keydown.enter.ctrl="onSubmit"
       @keydown.enter.meta="onSubmit">
    <div class="col-md-3 col-lg-4"></div>
    <div class="diary-main col-sm-12 col-md-6 col-lg-4">
      <label>
        Name
        <input type="text" v-model="data.name" placeholder="eg. Anna" autocomplete="off" class="form-control">
      </label>
      <label>
        Date
        <input type="date" v-model="data.date" class="form-control">
      </label>
      <h1>Feces</h1>
      <feces-list :elements="data.feces"
                  @edit="onUpdateFeces"
                  @remove="onRemoveFeces"
      />

      <h1>Morning</h1>
      <meal-and-symptom-list section="morning"
                             title="breakfast"
                             :elements="data.morning.breakfast"
                             @edit="onUpdateMeal"
                             @remove="onRemoveMeal"
                             :placeholder="mealPlaceholder"
      />
      <meal-and-symptom-list section="morning"
                             title="symptoms"
                             :elements="data.morning.symptoms"
                             @edit="onUpdateMeal"
                             @remove="onRemoveMeal"
                             :placeholder="symptomPlaceholder"
      />

      <h1>Afternoon</h1>
      <meal-and-symptom-list section="afternoon"
                             title="lunch"
                             :elements="data.afternoon.lunch"
                             @edit="onUpdateMeal"
                             @remove="onRemoveMeal"
                             :placeholder="mealPlaceholder"
      />
      <meal-and-symptom-list section="afternoon"
                             title="symptoms"
                             :elements="data.afternoon.symptoms"
                             @edit="onUpdateMeal"
                             @remove="onRemoveMeal"
                             :placeholder="symptomPlaceholder"
      />

      <h1>Evening</h1>
      <meal-and-symptom-list section="evening"
                             title="diner"
                             :elements="data.evening.diner"
                             @edit="onUpdateMeal"
                             @remove="onRemoveMeal"
                             :placeholder="mealPlaceholder"
      />
      <meal-and-symptom-list section="evening"
                             title="symptoms"
                             :elements="data.evening.symptoms"
                             @edit="onUpdateMeal"
                             @remove="onRemoveMeal"
                             :placeholder="symptomPlaceholder"
      />

      <h1>Other remarks</h1>
      <label>
        <textarea v-model="data.remarks" class="diary-remarks" autocomplete="off"
                  maxlength="500" rows="3"
                  placeholder="Anything that was remarkable or helps recalling this day eg. on holiday in Africa etc."></textarea>
      </label>
      <button class="btn btn-primary diary-submit-button"
              @click.prevent="onSubmit" >
        Submit
      </button>
    </div>
    <div class="col-md-3 col-lg-4"></div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MealAndSymptomList from './MealAndSymptomList'
  import FecesList from './FecesList'
  import moment from 'moment'

  export default {
    name: 'diary',
    data () {
      return {
        data: {
          name: '',
          date: moment(Date.now()).format('YYYY-MM-DD'),
          feces: [ '' ],
          morning: {
            breakfast: [ '' ],
            symptoms: [ '' ]
          },
          afternoon: {
            lunch: [ '' ],
            symptoms: [ '' ]
          },
          evening: {
            diner: [ '' ],
            symptoms: [ '' ]
          },
          remarks: ''
        },
        mealPlaceholder: 'food by ingredients eg. chicken; or cinnamon',
        symptomPlaceholder: 'symptoms one by one eg. belly ache on left side'
      }
    },
    methods: {
      onUpdateMeal (payload) {
        const { idx, value, title, section } = payload

        const currentTitle = this.data[ section ][ title ]
        currentTitle[ idx ] = value

        if (_.last(currentTitle)) {
          currentTitle.push('')
        }
      },
      onRemoveMeal (payload) {
        const { idx, title, section } = payload
        const currentSection = this.data[ section ]
        const currentTitle = currentSection[ title ]
        if (currentTitle.length === idx + 1) {
          return
        }
        currentSection[ title ] = currentTitle.filter((value, i) => i != idx) // eslint-disable-line
      },
      onUpdateFeces (payload) {
        const { idx, value } = payload

        const feces = this.data.feces
        feces[ idx ] = value

        if (_.last(feces)) {
          feces.push('')
        }
      },
      onRemoveFeces (payload) {
        const { idx } = payload

        const feces = this.data.feces

        if (feces.length === idx + 1) {
          return
        }
        this.data.feces = feces.filter((value, i) => i != idx) // eslint-disable-line
      },
      onSubmit () {
        // eslint-disable-next-line
        alert(`Submitting ${JSON.stringify(this.data, null, 2)}`)
      }
    },
    components: {
      MealAndSymptomList,
      FecesList
    }
  }
</script>

<style scoped>
  label {
    display: block;
  }

  .diary-main {
    padding-top: 20px;
    padding-bottom: 200px;
  }

  .diary-submit-button {
    width: 100%;
    height: 60px;
    margin-top: 30px;
  }

  .diary-remarks {
    width: 100%;
  }
</style>
