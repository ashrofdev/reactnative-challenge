import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import TodoCard from '../components/TodoCard';

function Home({navigation, route}) {
  const refRBSheet = useRef();
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);


  const getTodos = async completed => {
    refRBSheet.current.close()
    try {
      setLoading(true);
      const data = await fetch('https://jsonplaceholder.typicode.com/todos');
      const res = await data.json();
      if (completed) {
        setTodos(res?.filter(d => d.completed));
      } else {
        setTodos(res);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.push('Login');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    refRBSheet.current.open();
    return () => refRBSheet.current.close();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{color: '#000', paddingVertical: 5}}>
            Hello {route.params?.user.name}
          </Text>
        </View>
      <View style={styles.rbsheetBtn}>
        <TouchableOpacity
          style={styles.logoutbtn}
          onPress={() =>
            refRBSheet.current.open()
          }>
          <Text style={styles.logoutText}>
            Open Bottom Sheet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutbtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => getTodos(false)}
              style={styles.loginBtn}>
              <Text style={styles.authText}>GET ALL TODOS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => getTodos(true)}
              style={styles.loginBtn}>
              <Text style={styles.authText}>GET COMPLETED TODO</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
      <View>
        {todos.length > 0 && <Text style={styles.title}>Todos</Text>}
        {!loading && todos?.map((td, i) => <TodoCard data={td} key={i} />)}
        {loading && <ActivityIndicator size={'large'} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  rbsheetBtn: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-around',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    margin: 'auto',
  },
  logoutbtn: {
    width: '50%',
    backgroundColor: '#000',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  authText: {
    color: '#fff',
    fontSize: 11,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
  },
  btnContainer: {
    alignItems: 'center',
  },
});
export default Home;
