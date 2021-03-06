/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableNativeFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Text, useTheme} from 'react-native-paper';
import timeSince from '../../utils/timeSince';

function JustPosted({notification}) {
  const theme = useTheme();
  const navigation = useNavigation();

  let timeSinceText = timeSince(new Date(notification.timestamp));

  function handlePress() {
    navigation.navigate('PostScreen', {post: notification.action_object});
  }

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View
        style={{
          padding: 15,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {notification.actor.avatar ? (
          <Avatar.Image
            size={60}
            source={{uri: notification.actor.avatar}}
            style={{
              borderRadius: 200,
              overflow: 'hidden',
              margin: 10,
            }}
          />
        ) : (
          <Avatar.Icon
            size={60}
            icon="face"
            style={{
              borderRadius: 200,
              overflow: 'hidden',
              margin: 10,
            }}
          />
        )}

        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...theme.fonts.medium}}>
              {notification.actor.name}
            </Text>
            <Text> just posted</Text>
          </View>
          <View>
            <Text style={{color: 'gray'}}>{timeSinceText} ago</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default JustPosted;
