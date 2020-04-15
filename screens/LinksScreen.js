import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>
            <Text style={styles.emphasize}>Make Healthy Choices</Text> understands what cravings are all about and that eating 'healthy' is easier said than done.
          </Text>

          <Text style={styles.headerText}>
          It's much easier to opt for that healthier option when you can compare the two options side-by-side, and have that healthier alternative suggested to you at the same time.
          </Text> 
          
          <Text style={styles.headerText}>
          Use this app whenever you have a craving, and it will nudge you toward making the healthier decision!
          </Text>
         </View>
         <View>
           <Text style={styles.developerText}>Developed by Nesara Kishor using React-Native and Nutritionix API</Text>
         </View>
      </View>
    </ScrollView>
  );
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    backgroundColor: '#DFE1E0'
  },
  textContainer: {
    marginTop: 100,
    padding: 25,
    justifyContent: 'center',
  },
  emphasize: {
    fontSize: 16,
    color: '#696969',
    fontFamily: 'HelveticaNeue-Medium',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#696969',
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10,
  },
  developerText: {
    fontSize: 12,
    color: '#696969',
    fontFamily: 'HelveticaNeue-Light',
    marginTop: 350,
    paddingBottom: 10,
  }
});

