import React, { ReactElement, useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { Button, Layout, Text, Input, Icon, IconProps } from '@ui-kitten/components';
import { useAuthState } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { emailValidate } from '../../utils/validator';

export const SignInScreen = (): React.ReactElement => {
  const auth = useAuthState();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const onSignUpButtonPress = (): void => {
    navigation.navigate('SignUp');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const onSignInButtonPress = (): void => {
    if (email && !emailValidate(email)) {
      alert("sai định dạng email, vui lòng nhập đúng email");
    } else if (!password) {
      alert("Vui lòng nhập đúng password");
    } else if (email && password) {
      auth.signin(email, password);
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại');
    }
  }

  const renderPasswordIcon = (props: IconProps): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderPersonIcon = (props: IconProps): ReactElement => (
    <Icon {...props} name='person' />
  )

  return (
    <Layout style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          category='h1'
          status='control'>
          Đăng nhập
        </Text>
        <Text
          style={styles.signInLabel}
          category='s1'
          status='control'>
          Hệ thống điều khiển và giám sát một số thông số môi trường
        </Text>
      </View>
      <Layout
        style={styles.formContainer}>
        <Input
          placeholder='Email'
          accessoryRight={renderPersonIcon}
          value={email}
          autoCapitalize='none'
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          placeholder='Password'
          accessoryRight={renderPasswordIcon}
          value={password}
          autoCapitalize='none'
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
      </Layout>
      <Button
        style={styles.signInButton}
        onPress={onSignInButtonPress}
        size='giant'>
        ĐĂNG NHẬP
      </Button>
      <Button
        style={styles.signUpButton}
        appearance='ghost'
        status='basic'
        onPress={onSignUpButtonPress}>
        CHƯA CÓ TÀI KHOẢN? TẠO TÀI KHOẢN
      </Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: '#3366ff',
    paddingHorizontal: 16
  },
  formContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});

