// * React
import {useState} from 'react';

// * React Native
import {useWindowDimensions} from 'react-native';

// * React Native Libraries
import {useTheme} from 'react-native-paper';
import {RFPercentage as s} from 'react-native-responsive-fontsize';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

// * Components
import Add from './Add';
import Entries from './Entries';
import Header from './Header';

export default function Kitchen() {
  const theme = useTheme();

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Entries'},
    {key: 'second', title: 'Add Entry'},
  ]);

  return (
    <>
      <Header />

      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        initialLayout={{height: 0, width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor="yellow"
            indicatorStyle={{backgroundColor: 'yellow'}}
            labelStyle={{
              fontFamily: 'Abel',
              fontSize: s(3),
              textTransform: 'none',
              margin: 0,
            }}
            style={{backgroundColor: theme.colors.primary}}
          />
        )}
        renderScene={SceneMap({first: Entries, second: Add})}
        tabBarPosition="top"
      />
    </>
  );
}
