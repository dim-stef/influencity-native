import React from 'react';
import {SafeAreaView} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Search from './Search';
import SearchFocus from './SearchFocus';

const Stack = createSharedElementStackNavigator();

function SearchStack() {
  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <Stack.Navigator
        initialRouteName="Search"
        mode="modal"
        headerMode="screen"
        screenOptions={{
          gestureEnabled: true,
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'white'},
          ...TransitionPresets.ScaleFromCenterAndroid,
          headerStyle: {
            backgroundColor: 'white',
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
        }}>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            cardStyle: {backgroundColor: 'white'},
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchFocus"
          component={SearchFocus}
          options={{
            cardStyle: {backgroundColor: 'white'},
            headerShown: false,
          }}
          sharedElements={(route, otherRoute, showing) => {
            const {selectedExpertise} = route.params;
            if (selectedExpertise) {
              return [
                {
                  id: 'searchbar',
                },
                {
                  id: `searchbox.${selectedExpertise.name}`,
                  animation: 'fade',
                  resize: 'clip',
                  align: 'center-top',
                },
              ];
            }
            return ['searchbar'];
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default SearchStack;