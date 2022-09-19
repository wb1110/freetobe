import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function Calculations() {
  const [state, setState] = useState({
    bodyFat: .15,
    height: 72,
    weight: 185,
    age: 33,
    trimester: 1,
    babies: 1,
    nursing: 2,
    activity: 1.2,
  })

  const energyEquations = () => {
  if (!state.bodyFat) {
    const BMR = 10 * (state.weight * 0.45359237) + 6.25 * (state.height * 2.54) - 5 * state.age - 161;
    const TDEE = BMR * state.activity;
    return TDEE
  } else {
    const FBM = (state.weight * 0.45359237) * state.bodyFat;
    const LBM = (state.weight * 0.45359237) - FBM;
    const TDEE = 370 + (21.6 * LBM);
    return TDEE;
  }
}
  return (
    <View>
      <Text>{energyEquations()}</Text>
    </View>
  )
}