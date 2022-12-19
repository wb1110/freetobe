import { Button, Text, useTheme } from '@rneui/themed';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MyCustomerPicker from '../../components/MyCustomerPicker';
import servingSize from '../../functions/servingSize';
import servingNumberFunction from './ServingArray';
import NutritionFacts from './NutritionFacts';

export default function FoodDetails({ route }) {
  const { fdcId } = route.params;
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const [changeButton, setChangeButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  // Array containing the food details
  const [foodDetails, setFoodDetails] = useState();
  const [servingSizeModal, setServingSizeModal] = useState(false);
  // Array of serving sizes
  const [servingSizes, setServingSizes] = useState();
  // Servings value from custompicker
  const [selectServingSize, setSelectServingSize] = useState(false);
  // Numer of servings value from customer picker
  const [selectNumberofServings, setSelectNumberofServings] = useState(1);
  const [servingNumberModal, setServingNumberModal] = useState(false);

  const servingNumberArray = servingNumberFunction(1, 200, 1);

  useEffect(() => {
    setLoading(true);
    const getByFDCID = (id) => {
      axios
        .get(
          `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=QGFVnH9V6cq73KFQNwa5ckdhM1dIbifXkZx7rFzZ`
        )
        .then(async (res) => {
          const result = await res.data;
          setServingSizes(servingSize(result.foodPortions));
          setFoodDetails(result);
          setLoading(false);
          return result;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setLoading(false);
        });
    };
    getByFDCID(fdcId);
  }, [fdcId]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={theme.colors.white}
                visible={loading}
                textContent="Searching USDA Database..."
              />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    margin: '2%',
                    padding: '2%',
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.white,
                  }}
                >
                  <Text h4>{foodDetails?.description}</Text>
                </View>
                <View style={{ width: '100%' }}>
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
                      title={selectServingSize || 'Select'}
                      onPress={() => setServingSizeModal(!servingSizeModal)}
                    />
                    <MyCustomerPicker
                      setModalOpen={setServingSizeModal}
                      modalOpen={servingSizeModal}
                      value={selectServingSize}
                      items={servingSizes}
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
                {showNutritionFacts ? (
                  <NutritionFacts foodDetails={foodDetails} multiplier={selectNumberofServings} />
                ) : null}
              </View>
            )}
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
