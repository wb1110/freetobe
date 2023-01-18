/* eslint-disable global-require */
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import MealTemperatures from './MealTemperatures';
import CreateSleepEntry from './CreateSleepEntry';

export default function Sleep({ metabolicData, setMetabolicData }) {
  console.log(metabolicData);
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: 'flex-start',
        flex: 1,
        margin: '2%',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text h3>Sleep</Text>
        <View style={{ flex: 1 }}>
          <View style={{ margin: '2%' }}>
            {/* {metabolicData.sleep
              ? metabolicData.sleep.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: theme.colors.primary,
                      padding: '2%',
                      marginBottom: '2%',
                    }}
                  >
                    <Text>Start Time: {item.startTime}</Text>
                    <Text>End Time: {item.endTime}</Text>
                    <Text>Hours Slept</Text>
                  </View>
                ))
              : null} */}
            <Text>Click below to add temperatures before and after a meal</Text>
            <CreateSleepEntry metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
          </View>
        </View>
      </View>
    </View>
  );
}
