import { Button, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import LArrowButton from '../../components/Buttons/LArrowButton';
import ScreenPicker from '../../components/ScreenPicker';
import { getSettings } from '../../functions/Gets';
import percentageSelect from '../../functions/percentageSelect';
import useSettingsStore from '../../state/SettingsStore';
import useStore from '../../state/Store';

export default function MacroDistribution({ navigation }) {
  const { theme } = useTheme();
  const state = useStore();
  const settingsState = useSettingsStore();
  const { updateMacroSettings, macroSettings } = settingsState;
  const { idealCarbs, idealFat, idealProtein } = macroSettings;
  const [proteinPercentage, setProteinPercentage] = useState(idealProtein);
  const [carbPercentage, setCarbPercentage] = useState(idealCarbs);
  const [fatPercentage, setFatPercentage] = useState(idealFat);

  let protein;
  let carb;
  let fat;

  const dataPercentages = percentageSelect(5, 95, 5);

  const macroOptions = () => {
    protein = Math.round((state.assessment.tdee * (parseFloat(idealProtein) / 100)) / 4);
    carb = Math.round((state.assessment.tdee * (parseFloat(idealCarbs) / 100)) / 4);
    fat = Math.round((state.assessment.tdee * (parseFloat(idealFat) / 100)) / 9);
  };

  macroOptions();

  getSettings();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <LArrowButton onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, marginTop: '-6%', alignItems: 'center' }}>
        <Text h3 style={{ textAlign: 'center' }}>
          End Goal{'\n'}Total Daily Energy Expenditure{'\n'}(TDEE)
        </Text>
        <Text h3>{state.assessment.tdee} kCal</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text h4>Protein</Text>
          <Text>{protein} g</Text>
          <ScreenPicker
            value={proteinPercentage}
            items={dataPercentages}
            setValue={setProteinPercentage}
          />
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text h4>Carbohydrate</Text>
          <Text>{carb} g</Text>
          <ScreenPicker
            value={carbPercentage}
            items={dataPercentages}
            setValue={setCarbPercentage}
          />
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text h4>Fat</Text>
          <Text>{fat} g</Text>
          <ScreenPicker value={fatPercentage} items={dataPercentages} setValue={setFatPercentage} />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Submit"
          onPress={() => {
            updateMacroSettings(proteinPercentage, carbPercentage, fatPercentage);
            // storeSettings(macroSettings);
          }}
          color="white"
          titleStyle={{ color: theme.colors.primary }}
          size="lg"
        />
      </View>
    </View>
  );
}
