/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableNativeFeedback,
} from 'react-native';
import {
  Button,
  Title,
  Checkbox,
  Chip,
  Text,
  Subheading,
  useTheme,
  Paragraph,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

function SelectTier({route}) {
  const {handleCreateItems} = route.params;
  const {myTiers} = useSelector((state) => state.tiers);
  const [selectedTiers, setSelectedTiers] = useState([]);

  function getTierValuesAndCreateItems() {
    let tierValues = selectedTiers.map((t) => t.id);
    handleCreateItems(tierValues);
    console.log(tierValues);
  }

  console.log(selectedTiers);
  return (
    <ScrollView
      contentContainerStyle={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      {myTiers.map((t) => {
        return (
          <Tier
            tier={t}
            label={t.label}
            subheading={t.subheading}
            setSelectedTiers={setSelectedTiers}
          />
        );
      })}
      <Button
        icon="plus-circle"
        mode="contained"
        contentStyle={{padding: 10}}
        style={{borderRadius: 50, width: 200, margin: 20}}
        dark={true}
        onPress={() => getTierValuesAndCreateItems(myTiers)}>
        Finish post
      </Button>
    </ScrollView>
  );
}

function Tier({tier, setSelectedTiers, style = {}}) {
  const theme = useTheme();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      setSelectedTiers((tiers) => {
        let newTiers = [...tiers];
        newTiers.push(tier);
        return newTiers;
      });
    } else {
      setSelectedTiers((tiers) => {
        let newTiers = [...tiers];
        let foundIndex = newTiers.findIndex((t) => t.label == tier.label);
        console.log(foundIndex);

        if (foundIndex != -1) {
          console.log(foundIndex);

          newTiers.splice(foundIndex, 1);
        }
        console.log(newTiers);
        return newTiers;
      });
    }
  }, [selected]);

  return (
    <View
      style={{
        margin: 10,
        borderRadius: 100,
        width: '80%',
        height: 100,
        borderColor: selected ? theme.colors.primary : '#eee',
        borderWidth: selected ? 3 : 1,
        overflow: 'hidden',
      }}>
      <TouchableNativeFeedback
        useForeground
        onPress={() => setSelected(!selected)}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 30,
                //color: selected ? theme.colors.primary : 'black',
              }}>
              {tier.label}
            </Text>
            {tier.subheading ? (
              <Subheading>{tier.subheading}</Subheading>
            ) : null}
          </View>
          <View style={{position: 'absolute', right: 30}}>
            {selected ? (
              <Icon name="checkbox-marked-circle" size={30} color="#00BBF9" />
            ) : (
              <Icon
                name="checkbox-blank-circle-outline"
                size={30}
                color="#eee"
              />
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default SelectTier;