/* eslint-disable global-require */
import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';

export default function MealTemperatures({ metabolicData, setMetabolicData }) {
  const [values, setValues] = useState({
    preMealTemp: '',
    postMealTemp: '',
  });

  const handleSubmit = (v) => {
    setMetabolicData({
      ...metabolicData,
      temperature: {
        ...(metabolicData.temperature || {}),
        meals: [...(metabolicData.temperature.meals || []), v],
      },
    });
    setValues({
      preMealTemp: '',
      postMealTemp: '',
    });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        margin: '2%',
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <Input
          label="Meal Name"
          value={values.mealName}
          onChangeText={(value) =>
            setValues({
              ...values,
              mealName: value,
            })
          }
          labelStyle={{ color: 'black' }}
          style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, color: 'black' }}
          containerStyle={{ width: '33%' }}
        />
        <Input
          label="Pre-Meal"
          value={values.preMealTemp}
          onChangeText={(value) =>
            setValues({
              ...values,
              preMealTemp: value,
            })
          }
          labelStyle={{ color: 'black' }}
          style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, color: 'black' }}
          containerStyle={{ width: '33%' }}
        />
        <Input
          label="Post-Meal"
          value={values.postMealTemp}
          onChangeText={(value) =>
            setValues({
              ...values,
              postMealTemp: value,
            })
          }
          labelStyle={{ color: 'black' }}
          style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, color: 'black' }}
          containerStyle={{ width: '33%' }}
        />
      </View>
      <Button
        title="Add meal"
        onPress={() => handleSubmit(values)}
        containerStyle={{ borderRadius: 20 }}
      />
    </View>
  );
}
