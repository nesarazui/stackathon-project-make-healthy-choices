import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View, Picker, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'

export default class HomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {food: 'French Fries', nutritionalInfo: [], healthyAltInfo: [], allUnhealthy: [], category: ''}
    this.onPress = this.onPress.bind(this)
    this.fetchNutritionalInfo = this.fetchNutritionalInfo.bind(this)
    this.onPressHealthy = this.onPressHealthy.bind(this)
    this.fetchByCategory = this.fetchByCategory.bind(this)
  }

  async fetchByCategory(category) {
    const data = await axios.get(`https://trackapi.nutritionix.com//v2/search/instant?query=${category}`,
        { headers: { 'x-app-id': '05209a10', 'x-app-key': 'ed8f2147c7d313a1a88bc4ca30ec0848', 'x-remote-user-id': 0 } }
    )
    this.setState({ allUnhealthy: data.data.common })
}

  onPress (event) {
    event.preventDefault()
    this.fetchNutritionalInfo(this.state.food, false)
  }

  onPressHealthy (event) {
    event.preventDefault()
    let healthData = {
      'cheese': 'Cottage Cheese',
      'dessert': 'Oatmeal Raisin Cookie',
      'soda': 'Oat Milk',
      'meats': 'baked chicken'
    }
    let healthyAlt = healthData[`${this.state.category}`]
    this.fetchNutritionalInfo(healthyAlt, true)
  }
 
  async fetchNutritionalInfo (food, isHealthy) {
    const { data } = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {'query': food}, {headers: {'x-app-id': '05209a10', 'x-app-key':  'ed8f2147c7d313a1a88bc4ca30ec0848', 'x-remote-user-id': 0}})
    if (!isHealthy) {
      this.setState({ nutritionalInfo: data.foods[0] })
    } else {
      this.setState({ healthyAltInfo: data.foods[0] })
    }
  }

  renderFoodInfo(foodInfo, isUnhealthy) {
    if (foodInfo.nf_calories) {
        return (
            <View style={styles.nutrientContainer}>
            <View style={styles.sectionContainer}>
              <View style={styles.nutrientContainer}>
                    {isUnhealthy ? <View style={styles.headerNutrientText}><Text style={styles.regularText}>you are craving: {foodInfo.food_name} </Text></View> : 
                                    <View style={styles.headerNutrientText}><Text style={styles.regularText}>How about this instead? {foodInfo.food_name}</Text></View>}
            <View style={styles.table}>                        
            <Text> Total Calories: {foodInfo.nf_calories}</Text>
            <Text>Sodium: {foodInfo.nf_sodium}</Text>
            <Text>Sugars: {foodInfo.nf_sugars}</Text>
            <Text>Potassium: {foodInfo.nf_potassium}</Text>
            </View>
              </View>


                {isUnhealthy ? <View style={styles.spacingTwo}><Button
                    title="get me a healthier alternative"
                    onPress={this.onPressHealthy}
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                      fontFamily: 'Avenir-Book',
                    }}
                    buttonStyle={{
                      backgroundColor: '#bac4b9',
                      borderRadius: 20,
                      height: 35,
                      width: 250,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
                      borderWidth: 0.5,
                      borderColor: '#bac4b9'
                    }}
                /></View> : null}
            </View>
            </View>
        )
    }
}


  render() {
  let categoryData = [{ value: 'cheese' }, { value: 'soda' }, { value: 'dessert' }, { value: 'meats' }] 
    return (
      
      <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/180501-OWMK6L-71.jpg')}
              style={styles.image}
      >
      <ScrollView>
              
              <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>MAKE HEALTHIER CHOICES</Text>
              </View>

              <View style={styles.sectionContainer}>
              <Text style={styles.regularText}>what kind of food are you craving?</Text>
              
              {/* 1st DROPDOWN: Maps through the category array, populating first dropdown with categories. Selected option is put into Category state */}
              
              <View style={styles.dropdownsContainer}>
              <Picker
                    itemStyle={styles.dropdowns}
                    onValueChange={(itemValue) => {
                        this.setState({ food: '', nutritionalInfo: [], healthyAltInfo: [], allUnhealthy: [], category: itemValue })
                    }}
                    selectedValue={this.state.category}
                >
                    <Picker.Item label='pick a category' value='' />
                    {categoryData.map((category, index) => {
                        return (<Picker.Item key={index} label={category.value} value={category.value} />)
                    })}
                </Picker>
                </View>
                

                {/* onPress calls fetchByCategory, which makes GET request to retrieve all foods in that category. allUnhealthy state array updated with products retrieved */}
                <View style={styles.spacing}>
                <Button
                    title="find foods in this category"
                    onPress={() => { this.fetchByCategory(this.state.category) }}
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                      fontFamily: 'Avenir-Book',
                      justifyContent: 'center'
                    }}
                    buttonStyle={{
                      backgroundColor: '#bac4b9',
                      borderRadius: 20,
                      height: 35,
                      width: 250,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
                      borderWidth: 0.5,
                      borderColor: '#bac4b9'
                    }}
                    disabled={this.state.category.length < 1}
                />
                </View>
                </View>

                {/* 2nd DROPDOWN: Maps through allUnhealthy (products in category) array and lists them out in dropdown. Selected product gets added to Food state*/}
                {/* onPress calls onPress function, which calls the fetchNutritionalInfo function  */}

                {this.state.allUnhealthy.length > 0 ?
                    <View style={styles.sectionContainer}>
                    <Text style={styles.regularText}>have a look at all the foods in this category!</Text>
                        <View style={styles.dropdownsContainer}>
                        <Picker
                            itemStyle={styles.dropdowns}
                            onValueChange={(itemValue, index) => {
                                this.setState({ ...this.state, food: itemValue })
                            }}
                            selectedValue={this.state.food}
                        >
                            <Picker.Item label='Select a specific item' value='' />
                            {this.state.allUnhealthy.map((food, index) => {
                                return (<Picker.Item key={index} label={food.food_name} value={food.food_name} />)
                            })}
                        </Picker>
                        </View>

                        <View style={styles.spacingTwo}>    
                        <Button
                            title="what's the damage?"
                            onPress={this.onPress}
                            titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                      fontFamily: 'Avenir-Book',
                    }}
                    buttonStyle={{
                      backgroundColor: '#bac4b9',
                      borderRadius: 20,
                      height: 35,
                      width: 250,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
                      borderWidth: 0.5,
                      borderColor: '#bac4b9'
                    }}
                    disabled={this.state.food.length < 1}
                        />
                        </View>
                    </View>
                    : null}


                {this.renderFoodInfo(this.state.nutritionalInfo, true)}

                {this.renderFoodInfo(this.state.healthyAltInfo, false)}
      </ScrollView>
      </ImageBackground>
      </View>
      
    );
  }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-start',
    alignItems: 'center',
    opacity: 1.0,
  },
  headerTextContainer: {
    marginTop: 35,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  headerText: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'HelveticaNeue-Medium'
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: 25,
    paddingTop: 10
  },
  regularText: {
    fontSize: 14
  },
  dropdownsContainer: {
    alignItems: 'center'
  },
  dropdowns: {
    width: 150,
    height: 50,
    fontSize: 14
  },
  nutrientContainer: {
    alignItems: 'center',
  },
  headerNutrientText: {
    alignItems: 'center',
  },
  table: {
    borderWidth: 1,
    padding: 5,
    borderColor: 'grey',
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center'
},
food: {
    fontSize: 16,
    paddingBottom: 5,
},
});

