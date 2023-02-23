// * React
import {memo, useRef, useState} from 'react';

// * React Native
import {Pressable, Vibration, View} from 'react-native';

// * React Native Libraries
import {ShadowedView, shadowStyle} from 'react-native-fast-shadow';
import {RFPercentage as s} from 'react-native-responsive-fontsize';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Text, useTheme} from 'react-native-paper';

// * Components
import Edit from './Edit';

const Entries = () => {
  const theme = useTheme();

  const editRef = useRef<Modalize>();

  const [selected, setSelected] = useState<any>();

  return (
    <View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
          () => ({
            image: '',
            name: 'Kuku ya kukaanga na ya ',
            opening: 23,
            closing: 2,
            purchased: {on: '12.01.2023', by: 'Liztalia Owendi'},
          }),
        )}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => (
              Vibration.vibrate(50), setSelected(item), editRef.current?.open()
            )}>
            <ShadowedView
              style={[
                shadowStyle({opacity: 0.4, radius: 3, offset: [0, 0]}),
                {
                  alignItems: 'center',
                  backgroundColor: '#ECF0F3',
                  borderRadius: 10,
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 7,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                },
              ]}>
              <View style={{flex: 0.6, justifyContent: 'center'}}>
                <Text numberOfLines={1} style={{fontSize: s(2.5)}}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={{fontSize: s(1.9)}}>
                  {item.purchased.on}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.4,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: s(1.5),
                    marginRight: 2,
                  }}>
                  opening
                </Text>
                <Text style={{color: theme.colors.secondary, fontSize: s(2.5)}}>
                  {item.opening}
                </Text>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: s(2.5),
                    marginHorizontal: 3,
                  }}>
                  |
                </Text>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: s(1.5),
                    marginRight: 3,
                  }}>
                  closing
                </Text>
                <Text style={{color: theme.colors.secondary, fontSize: s(2.5)}}>
                  {item.closing}
                </Text>
              </View>
            </ShadowedView>
          </Pressable>
        )}
        style={{marginVertical: 10}}
      />

      <Modalize ref={editRef} adjustToContentHeight>
        <Edit item={selected} />
      </Modalize>
    </View>
  );
};

export default memo(Entries);
