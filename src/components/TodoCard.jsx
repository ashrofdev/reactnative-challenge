import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TodoCard = ({data}) => {
  return (
    <View
      style={[
        styles.container,
        {borderColor: data?.completed ? 'green' : 'red'},
      ]}>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={{color: data?.completed ? 'green' : 'red'}}>
        {data?.completed ? 'Completed' : 'Not Completed'}
      </Text>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 0.15,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 15,
    color: '#000',

    marginVertical: 5,
  },
});
