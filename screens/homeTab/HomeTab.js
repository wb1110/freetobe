import { SafeAreaView, View } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import useStore from '../../state/Store';
import MacroPie from './MacroPie';
import MineralsPie from './MineralsPie';
import useGoalUpdateConditions from '../../functions/goalUpdateConditions';
import useThreeDayLogStore from '../../state/ThreeDayLogStore';

function HomeTab({ navigation }) {
  const state = useStore();
  const threeDayLogState = useThreeDayLogStore();
  const { complete } = threeDayLogState;
  const { theme } = useTheme();

  useGoalUpdateConditions(complete);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Macros and Minerals Visuals */}
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%', flex: 1 }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text h4>Macro Goals</Text>
          {state.assessment.tdee ? (
            <MacroPie TDEE={state.assessment.tdee} navigation={navigation} />
          ) : (
            <Button
              title="Take Assessment"
              onPress={() => navigation.navigate('HeightWeightAge')}
            />
          )}
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text h4>Mineral Goals</Text>
          <MineralsPie TDEE={state.assessment.tdee} navigation={navigation} />
        </View>
      </View>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text h4>What helps fuel our bodies?</Text>
        <View style={{ justifyContent: 'space-around', flex: 1, width: '100%' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
              margin: '2%',
              padding: '2%',
            }}
          >
            <Text h4>Proteins</Text>
          </View>
          <View
            style={{ flex: 1, backgroundColor: theme.colors.primary, margin: '2%', padding: '2%' }}
          >
            <Text h4>Fats</Text>
          </View>
          <View
            style={{ flex: 1, backgroundColor: theme.colors.primary, margin: '2%', padding: '2%' }}
          >
            <Text h4>Carbs</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeTab;
