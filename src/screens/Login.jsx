import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

const Login = ({navigation}) => {
  useEffect(()=> {
    async function checkUser(){
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user)
      if(user){
        navigation.push("Home",{user})
      }
    }
    checkUser()
  }, [])
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const onPressLogin = async () => {
    try {
      let value = await AsyncStorage.getItem('users');

      if (value !== null) {
        value = JSON.parse(value);

        const user = value.find(d => d.email === state.email);
        if (user) {
          if (user.password === state.password) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.push('Home', {user});
          } else {
            ToastAndroid.show('Incorrect credentials', 3000);
          }
        } else {
          ToastAndroid.show('No user found', 3000);
        }
      } else {
        ToastAndroid.show('No user found', 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPressSignUp = () => {
    navigation.push('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login</Text>
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
      {/* <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.authText}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignUp}>
        <Text style={styles.forgotAndSignUpText}>
          Dont have an account? Signup
        </Text>
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
  authText: {
    color: '#fff',
    fontSize: 11,
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
export default Login;
