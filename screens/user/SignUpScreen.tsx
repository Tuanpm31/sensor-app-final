import React, { ReactElement } from 'react';
import { Layout, Text, CheckBox, Input, StyleService, useStyleSheet, Button, IconProps, Icon } from '@ui-kitten/components';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  renderEmailIcon,
  renderPersonIcon
} from '../../components/Icons';
import { useAuthState } from '../../contexts/AuthContext';
import { emailValidate } from '../../utils/validator';

export const SignUpScreen = (): React.ReactElement => {
  const auth = useAuthState();
  const [name, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [password2, setPassword2] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    if (email && !emailValidate(email)) {
      alert("Sai định dạng email, vui lòng nhập lại");
    } else if (!name) {
      alert("Vui lòng nhập tên của bạn");
    } else if (!password || !password2) {
      alert("Vui lòng nhập password và thử lại");
    } else if (password !== password2) {
      alert("2 password phai giống nhau");
    } else if (email && password && name) {
      auth.signup(email, password, name);
    } else {
      alert("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };


  const renderPasswordIcon = (props: IconProps): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        Đồng ý với điều khoản sử dụng
      </Text>
    ),
    []
  );

  return (

    <Layout style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          category='h1'
          status='control'>
          Đăng ký
        </Text>
        <Text
          style={{ marginTop: 16 }}
          category='s1'
          status='control'>
          Hệ thống điều khiển và giám sát một số thông số môi trường
        </Text>
      </View>
      <Layout style={styles.formContainer} level='1'>
        <Input
          autoCapitalize='none'
          placeholder='Tên'
          accessoryRight={renderPersonIcon}
          value={name}
          onChangeText={setUserName}
        />
        <Input
          style={styles.emailInput}
          autoCapitalize='none'
          placeholder='Email'
          accessoryRight={renderEmailIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          autoCapitalize='none'
          secureTextEntry={!passwordVisible}
          placeholder='Password'
          accessoryRight={renderPasswordIcon}
          value={password}
          onChangeText={setPassword}
        />
        <Input
          style={styles.passwordInput}
          autoCapitalize='none'
          secureTextEntry={!passwordVisible}
          placeholder='Nhập lại password'
          accessoryRight={renderPasswordIcon}
          value={password2}
          onChangeText={setPassword2}
        />
        <CheckBox
          style={styles.termsCheckBox}
          checked={termsAccepted}
          onChange={(checked: boolean) => setTermsAccepted(checked)}>
          {renderCheckboxLabel}
        </CheckBox>
      </Layout>
      <Button
        style={styles.signUpButton}
        size='giant'
        onPress={onSignUpButtonPress}>
        Đăng ký
      </Button>
      <Button
        style={styles.signInButton}
        appearance='ghost'
        status='basic'
        onPress={onSignInButtonPress}>
        Đã có tài khoản? Đăng nhập
      </Button>
    </Layout>
  )
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    flex: 1
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
    paddingHorizontal: 16
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'color-primary-default',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-hint-color',
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});