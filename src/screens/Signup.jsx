import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

const Signup = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const onPressSignUp = async () => {

    try {
      let value = await AsyncStorage.getItem('users');
      if (value !== null) {
        value = JSON.parse(value);
        const user = value.find(d => d.email === state.email);
        if (user) {
          ToastAndroid.show('User Already exist', 3000);
          return;
        }
        value.push(state);
        await AsyncStorage.setItem('users', JSON.stringify(value));
        await AsyncStorage.setItem('user', JSON.stringify(state));
        navigation.push('Home');
      } else {
        const val = [state];
        await AsyncStorage.setItem('users', JSON.stringify(val));
        await AsyncStorage.setItem('user', JSON.stringify(state));
        navigation.push('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPressSignIn = ({}) => {
    navigation.push('Login');
  };
  console.log(state);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Signup</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={text => setState({...state, name: text})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={text => setState({...state, email: text})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={text => setState({...state, password: text})}
        />
      </View>

      <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
        <Text style={styles.authText}>Register </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignIn}>
        <Text style={styles.forgotAndSignUpText}>Have an account? Signin</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#000',
    marginBottom: 40,
  },
  authText: {
    color: '#fff',
    fontSize: 11,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
  forgotAndSignUpText: {
    color: '#000',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
export default Signup;
