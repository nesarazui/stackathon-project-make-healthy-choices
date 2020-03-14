import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Dropdown } from 'react-native-material-dropdown'

import { MonoText } from '../components/StyledText';
import { Post } from '../components/Post'
import { render } from 'react-dom';
import axios from 'axios'
// import { TestComponent } from './../components/AppComponents';

export default class HomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {food: 'French Fries', nutritionalInfo: []}
    this.onPress = this.onPress.bind(this)
    this.fetchNutritionalInfo = this.fetchNutritionalInfo.bind(this)
  }

  onPress (event) {
    event.preventDefault()
    alert(`Fetching Nutritional Info`)
    //console.log('*****', this.state)
    this.fetchNutritionalInfo(this.state.food)
  }

  onPressHealthy (event) {
    event.preventDefault()
    alert(`Suggesting Healthy Alternative`)
    //console.log('*****', this.state)
    //this.fetchNutritionalInfo(this.state.food)
  }

  async fetchNutritionalInfo (food) {
    const { data } = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {'query': food}, {headers: {'x-app-id': '05209a10', 'x-app-key':  'ed8f2147c7d313a1a88bc4ca30ec0848', 'x-remote-user-id': 0}})
    //console.log('RESPONSE: ', data)
    this.setState({...this.state, nutritionalInfo: data.foods[0]})
    console.log('NUTRITION INFO FROM API: ', this.state.nutritionalInfo)
    this.renderNutrionalInfo()
  }

  renderNutrionalInfo () {
    console.log("DID THIS GET CALLED", this.state.nutritionalInfo)
    console.log('TYPE OF: ', typeof(this.state.nutritionalInfo), this.state.nutritionalInfo.food_name, this.state.food)
    if(this.state.nutritionalInfo.nf_calories) {
      console.log('is this truthy')
        return (
          <View>
          <Text>
            You are craving: {this.state.nutritionalInfo.food_name}
            Total Calories: {this.state.nutritionalInfo.nf_calories}
            Sodium: {this.state.nutritionalInfo.nf_sodium}
            Sugars: {this.state.nutritionalInfo.nf_sugars}
            Potassium: {this.state.nutritionalInfo.nf_potassium}
          </Text>

          <Button
            title="Healthier Alternative" 
            onPress={this.onPressHealthy}
          />
          </View>
        )
      }
  }

  render() {

    //console.log('*****', this.state)
  let data = [{value: 'French Fries'}, {value: 'Chocolate Cake'}, {value: 'Pie'}, {value: 'Chicken Wings'}]

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/veggies.png')
                  : require('../assets/images/veggies.png')
              }
              style={styles.welcomeImage}
            />
          </View>
  
          <View style={styles.getStartedContainer}>
            <DevelopmentModeNotice />
  
            <Text style={styles.getStartedText}>Make Healthy Choices!</Text>
  
            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              {/* <MonoText>screens/HomeScreen.js</MonoText> */}
            </View>
  
            <Text style={styles.getStartedText}>
              Select your craving below
            </Text>

            {/* <View>
              <TextInput 
                style={{height: 40}}
                placeholder="Type here!"
                onChangeText={(food) => this.setState({food})}
                value={this.state.food}
              />
            </View> */}
{/* 
            <Dropdown 
              label='Cravings'
              data={data}
            /> */}

            <Picker
              onValueChange={(itemValue, index) => {
                //console.log('???', this.state.food)
                this.setState({...this.state, food: itemValue})
              }}
            >

              {data.map((food, index) => {
                return (<Picker.Item key={index} label={food.value} value={food.value} />)
              })}
            </Picker>
            
            <View styles={styles.container}>
              <Post />
            </View>

            <Button
              title="What's the Damage" 
              onPress={this.onPress}
            />

            <Text>{this.renderNutrionalInfo()}</Text>

          </View>
  
          {/* <View style={styles.helpContainer}>
            <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
  
        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
  
          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
          </View>
        </View> */}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more 
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: 'aquamarine',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
