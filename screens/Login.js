import { useFocusEffect } from '@react-navigation/core';
import { Button, Text } from '@rneui/themed';
import { useCallback } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AuthForm from '../components/AuthForm';
import StandardButton from '../components/Buttons/StandardButton';
import Container from '../components/Container';
import useAuthStore from '../state/AuthStore';

function Login({ navigation }) {
  const { signin, errorMessage, setErrorMessage, guestsignin } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      setErrorMessage('');
    }, [])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <AuthForm
              submitValues={signin}
              submitButtonText="Sign in"
              errorMessage={errorMessage}
            />
            <View
              style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}
            >
              <Text>New to Free To Be Nourished?</Text>
              <Button
                type="clear"
                onPress={() => {
                  navigation.navigate('Register');
                }}
                title="Register"
              />
            </View>
            <StandardButton title="Guest Login" onPress={guestsignin} />
          </Container>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Login;
