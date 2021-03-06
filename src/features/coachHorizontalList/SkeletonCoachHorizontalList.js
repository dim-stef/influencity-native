/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function SkeletonCoachHorizontalList({count = 5}) {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {[...Array(count)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonPlaceholder>
                <View style={{marginLeft: 20, marginTop: 10}}>
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={60}
                    borderRadius={50}
                  />
                </View>
              </SkeletonPlaceholder>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

export default SkeletonCoachHorizontalList;
