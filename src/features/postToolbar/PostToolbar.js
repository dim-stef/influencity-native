/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Config from 'react-native-config';
import axios from 'axios';

function PostToolbar({post}) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [reactCount, setReactCount] = useState(post.reacts);

  function handleCommentClick() {
    //navigation.navigate('PostEditor', {isComment: true, currentPost: post});
    navigation.navigate('CommentsScreen', {post: post});
  }

  function handleLinkedProjectClick() {
    // TODO check if the user is already assigned to this project.
    // If he is navigate him in his projects screen else navigate in the preview project screen
    navigation.navigate('ProjectListScreen', {
      projects: [post.linked_project],
      viewAs: 'preview',
    });
  }

  return (
    <View
      style={{
        width: '100%',
        height: 40,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
      }}>
      <LikeButton
        post={post}
        setReactCount={setReactCount}
        text={reactCount != 0 ? reactCount : null}
      />
      <IconWrapper onPress={handleCommentClick}>
        <Icon name="comment-text-outline" size={25} color="#212121" />
        {post.comment_count ? (
          <Text
            style={{
              ...theme.fonts.medium,
              fontSize: 16,
              marginLeft: 5,
              color: '#212121',
            }}>
            {post.comment_count}
          </Text>
        ) : null}
      </IconWrapper>
      <View style={{flex: 1}} />
      {post.linked_project ? (
        <IconWrapper onPress={handleLinkedProjectClick}>
          <AntDesign name="rocket1" size={24} color="#212121" />
        </IconWrapper>
      ) : null}
    </View>
  );
}

function IconWrapper({children, onPress, style = {}}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginLeft: 8,
        alignItems: 'center',
        height: '100%',
        width: '16%',
        flexDirection: 'row',
        ...style,
      }}>
      {children}
    </TouchableOpacity>
  );
}

function LikeButton({post, setReactCount = () => {}, text}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [reacted, setReacted] = useState(post.reacted);

  function handleLikeClick() {
    let method;
    if (reacted) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    setReacted(!reacted);
    createOrDeleteReact(method);
  }
  async function createOrDeleteReact(method = 'PUT') {
    let url = `${Config.API_URL}/v1/posts/${post.id}/change_react/`;
    let config = {
      method: method,
      url: url,
    };
    try {
      setLoading(true);
      let response = await axios(config);
      setReactCount(response.data.react_count);
      setLoading(false);
    } catch (e) {
      setReacted(!reacted);
      setLoading(false);
    }
  }

  return (
    <IconWrapper onPress={handleLikeClick}>
      <Icon
        name={reacted ? 'heart' : 'heart-outline'}
        size={25}
        color={reacted ? 'red' : '#212121'}
      />
      <Text
        style={{
          ...theme.fonts.medium,
          fontSize: 16,
          marginLeft: 5,
          color: reacted ? 'red' : '#212121',
        }}>
        {text}
      </Text>
    </IconWrapper>
  );
}
export default PostToolbar;
