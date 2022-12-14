import { Text } from '@rneui/themed';
import { useState } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import LArrowButton from '../../components/Buttons/LArrowButton';
import NarrowButton from '../../components/Buttons/NarrowButton';
import NarrowButtonSelected from '../../components/Buttons/NarrowButtonSelected';
import Container from '../../components/Container';
import IsPregnant from '../../components/IsPregnant';

function Pregnant({ navigation }) {
  const [pregnant, setPregnant] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <Text h4>Are you currently pregnant?</Text>
          <View style={{ flexDirection: 'row' }}>
            {pregnant ? (
              <NarrowButtonSelected title="Yes" onPress={() => setPregnant(true)} />
            ) : (
              <NarrowButton title="Yes" onPress={() => setPregnant(true)} />
            )}
            <NarrowButton
              title="No"
              onPress={() => {
                setPregnant(false);
                navigation.navigate('Nursing');
              }}
            />
          </View>
          {pregnant ? <IsPregnant navigation={navigation} /> : null}
          <LArrowButton onPress={() => navigation.goBack()} />
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Pregnant;
