import { Button, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import MyCustomerPicker from '../../components/MyCustomerPicker';
import ServingSizePicker from '../../components/ServingSizePicker';
import useAuthStore from '../../state/AuthStore';
import useTrackerStore from '../../state/TrackerStore';
import EditNutritionFacts from './EditNutritionFacts';
import servingNumberFunction from './ServingArray';

export default function EditFood({ route, navigation }) {
  const { mealName, item, dayIndex } = route.params;
  const [showNutritionFacts, setShowNutritionFacts] = useState(true);
  const [changeButton, setChangeButton] = useState(true);
  const state = useTrackerStore();
  const { editFood } = useTrackerStore();
  const { id } = useAuthStore();
  const { theme } = useTheme();

  console.log(item, 'item in EditFood');

  const [servingSizeModal, setServingSizeModal] = useState(false);
  // Servings value from custompicker
  const [selectServingSize, setSelectServingSize] = useState(item.servingSize);
  // Numer of servings value from customer picker
  const [selectNumberofServings, setSelectNumberofServings] = useState(item.servingNumber);
  const [servingNumberModal, setServingNumberModal] = useState(false);

  const [servingValues, setServingValues] = useState({
    foodName: item.foodName,
    servingSize: item.servingSize,
    servingSizeOptions: item.servingSizeOptions,
    servingNumber: item.servingNumber,
    calories: { value: item.calories.value, unit: item.calories.unit },
    protein: { value: item.protein.value, unit: item.protein.unit },
    carbs: { value: item.carbs.value, unit: item.carbs.unit },
    fat: { value: item.fat.value, unit: item.fat.unit },
    calcium: { value: item.calcium.value, unit: item.calcium.unit },
    choline: { value: item.choline.value, unit: item.choline.unit },
    copper: { value: item.copper.value, unit: item.copper.unit },
    iodine: { value: item.iodine.value, unit: item.iodine.unit },
    iron: { value: item.iron.value, unit: item.iron.unit },
    magnesium: { value: item.magnesium.value, unit: item.magnesium.unit },
    phosphorous: { value: item.phosphorous.value, unit: item.phosphorous.unit },
    potassium: { value: item.potassium.value, unit: item.potassium.unit },
    selenium: { value: item.selenium.value, unit: item.selenium.unit },
    sodium: { value: item.sodium.value, unit: item.sodium.unit },
    zinc: { value: item.zinc.value, unit: item.zinc.unit },
  });

  const servingNumberArray = servingNumberFunction(1, 200, 1);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  margin: '2%',
                  padding: '2%',
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.white,
                }}
              >
                <Text h4>{servingValues.foodName}</Text>
              </View>
              <View style={{ width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '95%',
                    margin: '2%',
                  }}
                >
                  <Button
                    title="Update Food"
                    onPress={() => {
                      editFood(id, servingValues, dayIndex, mealName, servingValues.foodName);
                      navigation.navigate('TrackerHome');
                    }}
                    buttonStyle={{
                      color: theme.colors.white,
                    }}
                    containerStyle={{
                      width: '45%',
                      borderColor: theme.colors.white,
                    }}
                  />
                  <Button
                    title="Delete Food"
                    color={theme.colors.white}
                    onPress={() => {
                      state.deleteFood(id, dayIndex, mealName, servingValues.foodName);
                      navigation.navigate('TrackerHome');
                    }}
                    buttonStyle={{
                      color: theme.colors.white,
                    }}
                    containerStyle={{
                      width: '45%',
                      borderColor: theme.colors.white,
                    }}
                    titleStyle={{
                      color: theme.colors.primary,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '2%',
                  }}
                >
                  <Text>Serving Size</Text>
                  <Button
                    title={selectServingSize.name || 'Select'}
                    onPress={() => setServingSizeModal(!servingSizeModal)}
                  />
                  <ServingSizePicker
                    setModalOpen={setServingSizeModal}
                    modalOpen={servingSizeModal}
                    value={selectServingSize}
                    items={servingValues.servingSizeOptions}
                    setValue={setSelectServingSize}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '2%',
                  }}
                >
                  <Text>Number of Servings</Text>
                  <Button
                    title={`${selectNumberofServings}`}
                    onPress={() => setServingNumberModal(!servingNumberModal)}
                  />
                  <MyCustomerPicker
                    setModalOpen={setServingNumberModal}
                    modalOpen={servingNumberModal}
                    value={selectNumberofServings}
                    items={servingNumberArray}
                    setValue={setSelectNumberofServings}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '2%',
                  }}
                >
                  <Text>Nutrition Facts</Text>
                  <Button
                    title={changeButton ? 'Hide' : 'Show facts'}
                    onPress={() => {
                      setShowNutritionFacts(!showNutritionFacts);
                      setChangeButton(!changeButton);
                    }}
                  />
                </View>
              </View>
              {showNutritionFacts && servingValues ? (
                <EditNutritionFacts
                  foodDetails={item}
                  name={item.foodName}
                  multiplier={selectNumberofServings}
                  servingSizes={item.servingSizeOptions}
                  selectServingSize={selectServingSize}
                  servingValues={servingValues}
                  setServingValues={setServingValues}
                  display={showNutritionFacts ? 'flex' : 'none'}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
