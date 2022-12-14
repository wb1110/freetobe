/* eslint-disable no-plusplus */
import { Input } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import useStore from '../../state/Store';
import LArrowButton from '../../components/Buttons/LArrowButton';
import RArrowButton from '../../components/Buttons/RArrowButton';
import { SelectedButton } from '../../components/Buttons/StandardButtonSelected';
import Container from '../../components/Container';
import TextContainer from '../../components/TextContainer';
import useThreeDayLogStore from '../../state/ThreeDayLogStore';
import { macroGoal, calculateGoalCalories, idealMacro } from '../../functions/GoalCalculator';
import useSettingsStore from '../../state/SettingsStore';

export function Results1({ navigation }) {
  return (
    <Container>
      <TextContainer>
        Congratulations on commiting to improving your health by sticking with the 3 days of eating
        log!
      </TextContainer>
      <View style={{ flexDirection: 'row' }}>
        <LArrowButton onPress={() => navigation.goBack()} />
        <RArrowButton title="Submit" onPress={() => navigation.navigate('Results2')} />
      </View>
    </Container>
  );
}

export function Results2({ navigation }) {
  const [selected, setSelected] = useState(0);

  return (
    <Container>
      <TextContainer>
        To determine your best plan of action, we need to know how your body is reacting currently
        to what you are eating. {'\n'}
        {'\n'}Currently, with the way I am eating I am...
      </TextContainer>
      <SelectedButton title="Losing weight" selected={selected} setSelected={setSelected} />
      <SelectedButton title="Maintaining weight" selected={selected} setSelected={setSelected} />
      <SelectedButton title="Gaining weight" selected={selected} setSelected={setSelected} />
      <View style={{ flexDirection: 'row' }}>
        <LArrowButton onPress={() => navigation.goBack()} />
        <RArrowButton title="Submit" onPress={() => navigation.navigate('Results3')} />
      </View>
    </Container>
  );
}

export function Results3({ navigation }) {
  const tdeeState = useStore();
  const { tdee } = tdeeState.assessment;
  const state = useThreeDayLogStore();
  const logArray = state.threeDayLog;
  const settingsState = useSettingsStore();
  const { idealProtein, idealCarbs, idealFat } = settingsState.macroSettings;
  let loggedCalories = 0;
  let loggedProtein = 0;
  let loggedCarbs = 0;
  let loggedFat = 0;
  let proteinPercentage = 0;
  let carbsPercentage = 0;
  let fatsPercentage = 0;
  let avgCalories = 0;
  let avgProtein = 0;
  let avgCarbs = 0;
  let avgFats = 0;
  const days = logArray.length;

  const iProtein = idealMacro(tdee, 'protein', parseFloat(idealProtein) / 100);
  const iFat = idealMacro(tdee, 'fat', parseFloat(idealFat) / 100);
  const iCarbs = idealMacro(tdee, 'carbs', parseFloat(idealCarbs) / 100);

  for (let i = 0; i < days; i++) {
    loggedCalories += logArray[i].calories;
    loggedProtein += logArray[i].protein;
    loggedCarbs += logArray[i].carbs;
    loggedFat += logArray[i].fats;
  }

  const averages = (calories, protein, carbs, fats, numberOfDays) => {
    avgCalories = (calories / numberOfDays).toFixed(2);
    avgProtein = (protein / numberOfDays).toFixed(2);
    avgCarbs = (carbs / numberOfDays).toFixed(2);
    avgFats = (fats / numberOfDays).toFixed(2);
  };

  averages(loggedCalories, loggedProtein, loggedCarbs, loggedFat, days);

  const macroPercentage = (protein, carbs, fats) => {
    const total = protein + carbs + fats;
    proteinPercentage = ((protein / total) * 100).toFixed(2);
    carbsPercentage = ((carbs / total) * 100).toFixed(2);
    fatsPercentage = ((fats / total) * 100).toFixed(2);
  };

  macroPercentage(loggedProtein, loggedCarbs, loggedFat);

  return (
    <Container>
      <View>
        <TextContainer>
          Awesome job completing your 3 day assessment! Based on your questionnare, your ideal Total
          Daily Energy Expended needs are{'\n'}
          {'\n'}
          {`${tdee}`} Calories {'\n'}
          {`${iProtein}g`} Protein 30%
          {'\n'}
          {`${iFat}g`} Fat 30%
          {'\n'}
          {`${iCarbs}g`} Carbs 40%
        </TextContainer>
      </View>
      <View>
        <TextContainer>
          Based on your 3 days eating journal you have been eating an average of{'\n'}
          {'\n'}
          {`${avgCalories}`} Calories {'\n'}
          {`${avgProtein}g`} Protein {`${proteinPercentage}%`}
          {'\n'}
          {`${avgFats}g`} Fat {`${fatsPercentage}%`}
          {'\n'}
          {`${avgCarbs}g`} Carbs {`${carbsPercentage}%`}
        </TextContainer>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <LArrowButton onPress={() => navigation.goBack()} />
        <RArrowButton
          title="Submit"
          onPress={() =>
            navigation.navigate('Results4', {
              avgProtein,
              avgCarbs,
              avgFats,
              iProtein,
              iFat,
              iCarbs,
            })
          }
        />
      </View>
    </Container>
  );
}

export function Results4({ route, navigation }) {
  const { avgProtein, avgCarbs, avgFats, iProtein, iFat, iCarbs } = route.params;

  return (
    <Container>
      <View>
        <TextContainer>
          In order to properly nourish your body, we will be creating weekly goals to make the best
          lifelong lasting change! {'\n'}
          {'\n'}
          Starting this first week, we will increase your protein intake to try to get closer to
          your bodys needs. {'\n'}
          {'\n'}
          This weeks calorie/macro goals:{'\n'}
          {`Calories ${calculateGoalCalories(
            iProtein,
            iCarbs,
            iFat,
            avgProtein,
            avgCarbs,
            avgFats
          )} kCal`}
          {'\n'}
          {`Protein ${macroGoal(Number(iProtein), Number(avgProtein), 'protein')}g`}
          {'\n'}
          {`Carbohydrates ${macroGoal(Number(iCarbs), Number(avgCarbs), 'carbs')}g`}
          {'\n'}
          {`Fats ${macroGoal(Number(iFat), Number(avgFats), 'fat')}g`}
        </TextContainer>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <LArrowButton onPress={() => navigation.goBack()} />
        <RArrowButton title="Submit" onPress={() => navigation.navigate('Results5')} />
      </View>
    </Container>
  );
}

export function Results5({ navigation }) {
  const [selected, setSelected] = useState(0);
  const [written, setWritten] = useState('');

  return (
    <Container>
      <View>
        <TextContainer>
          Based on your 3 days of tracking, it looks like you usually eat 3 meals a day. We have
          generated 3 different lifestyle goals for you to choose form to be succesful this week.
          {'\n'}
          {'\n'}I want my goal to be...
        </TextContainer>
      </View>
      <View style={{ alignItems: 'center' }}>
        <SelectedButton title="Eat 4 meals a day" selected={selected} setSelected={setSelected} />
        <SelectedButton
          title="Eat between 15-20g of protein at each meal"
          selected={selected}
          setSelected={setSelected}
        />
        <SelectedButton
          title="Make sure I have a protein at every meal"
          selected={selected}
          setSelected={setSelected}
        />
        <Input
          label="Create my own goal"
          onChangeText={(value) => setWritten(value)}
          value={written}
          style={{ margin: 'auto', width: '100%' }}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <LArrowButton onPress={() => navigation.goBack()} />
        <RArrowButton title="Submit" onPress={() => navigation.navigate('Results6')} />
      </View>
    </Container>
  );
}

export function Results6({ navigation }) {
  return (
    <Container>
      <View>
        <TextContainer>
          Remeber that these are just guidelines
          {'\n'}
          {'\n'}
          Calories and macros are just numbers. Making lifestyle changes focuses on small goals that
          over time create healthy habits.
          {'\n'}
          {'\n'}
          Do your best to focus on the goal you chose. Leave the rest up to us!
        </TextContainer>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <LArrowButton onPress={() => navigation.goBack()} />
        <RArrowButton
          title="Submit"
          onPress={() => navigation.navigate('UserHome', { screen: 'Home' })}
        />
      </View>
    </Container>
  );
}
