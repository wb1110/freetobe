/* eslint-disable no-use-before-define */
import { MaterialIcons } from '@expo/vector-icons';
import { Text, useTheme } from '@rneui/themed';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useGetAllData } from '../../functions/Gets';
import getTodaysTrackerData from '../../functions/getTodaysTrackerData';
import useGoalUpdateConditions from '../../functions/goalUpdateConditions';
import useThreeDayLogStore from '../../state/ThreeDayLogStore';
import useTrackerStore from '../../state/TrackerStore';
import Blog from './blog/Blog';
import CMS from './cms/CMS';
import Instagram from './instagram/Instagram';
import Slide1 from './slideSection/Slide1';
import Slide2 from './slideSection/Slide2';
import Slide3 from './slideSection/Slide3';

function HomeTab() {
  const threeDayLogState = useThreeDayLogStore();
  const trackerState = useTrackerStore();

  const { tracker, goalProtein, goalCarbs, goalFat, goalCalories } = trackerState;
  const { complete } = threeDayLogState;
  const { theme } = useTheme();

  const isDataLoaded = useGetAllData();
  useGoalUpdateConditions(complete);

  const {
    carbs,
    protein,
    fats,
    calories,
    calcium,
    copper,
    choline,
    iodine,
    iron,
    magnesium,
    phosphorous,
    potassium,
    selenium,
    sodium,
    zinc,
  } = getTodaysTrackerData(tracker);

  if (!isDataLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8f6757' }}>
      <ScrollView>
        {/* Swipe Section */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          {complete && calories ? (
            <Swiper
              style={{ height: 300, justifyContent: 'center' }}
              activeDotColor="white"
              loop={false}
            >
              {/* Pie Chart and Table */}
              <Slide1 carbs={carbs} protein={protein} fats={fats} calories={calories} />
              {/* Macro Progress Bars */}
              <Slide2
                calories={calories}
                goalCalories={goalCalories}
                protein={protein}
                goalProtein={goalProtein}
                carbs={carbs}
                fats={fats}
                goalCarbs={goalCarbs}
                goalFat={goalFat}
              />
              <Slide3
                calcium={calcium}
                copper={copper}
                choline={choline}
                iodine={iodine}
                iron={iron}
                magnesium={magnesium}
                phosphorous={phosphorous}
                potassium={potassium}
                selenium={selenium}
                sodium={sodium}
                zinc={zinc}
              />
            </Swiper>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  padding: 12,
                }}
              >
                <MaterialIcons name="data-usage" size={100} color="white" />
                <MaterialIcons name="view-column" size={150} color="white" />
              </View>
              <View>
                {complete ? (
                  <Text h4>
                    Before we can show you useful data here, we need you to record the food you have
                    consumed so far today!
                  </Text>
                ) : (
                  <Text h4>
                    Before we can show you useful data for today, we need you to complete the Three
                    Day Log in the Tracker tab!
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
        {/* Nutrition Info Section */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          <CMS />
        </View>
        {/* Instagram Feed Section */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          <View
            style={{
              margin: 12,
              flex: 1,
              height: 320,
              width: 320,
            }}
          >
            <Instagram />
          </View>
        </View>
        {/* Blog Feed Section */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          <View
            style={{
              margin: 12,
              padding: 12,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text h4>Free To Be Nourished Blog</Text>
            <Blog />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
});
