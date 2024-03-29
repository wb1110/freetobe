/* eslint-disable no-use-before-define */
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

function Register({ navigation }) {
  const { signup, errorMessage, setErrorMessage, guestregister } = useAuthStore();

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
              submitValues={signup}
              submitButtonText="Sign Up"
              errorMessage={errorMessage}
            />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'center',
              }}
            >
              <Text>Already a member of Free To Be Nourished?</Text>
              <Button type="clear" onPress={() => navigation.navigate('Login')} title="Login" />
            </View>
            <StandardButton title="Guest Register" onPress={guestregister} />
          </Container>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Register;
