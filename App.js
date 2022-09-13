import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { Delete_task, Retrieve_tasks, Save_tasks } from './components/AsyncStorage';
import Task from './components/Task';
import { Ionicons } from '@expo/vector-icons';


export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    try{
      // useEffect is a react hook which calls funtion after initial render
      Retrieve_tasks().then(result =>{
        if(result == 'No_Tasks'){
          return;
        }else{
          setTaskItems(result)
          return;
        }
      });
      //console.log(get_tasks());
    }catch(error){
      console.log(`Error with useEffect func. in App.js:\n${error}`);
    }
  }, []); // empty array used so useEffect is only called once after initial render

  const Add_task = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    Save_tasks(task);
    setTask(null);
  };

  const Remove_task = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    Delete_task(taskItems, index);
    setTaskItems(itemsCopy);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To-Do List!</Text>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.items}>
          {taskItems.map((item, index) =>{
              return (
                <TouchableOpacity key={index} onPress={() => Remove_task(index)}> 
                  <Task text={item}/>
                </TouchableOpacity>
              );
            })
          }
            </View>
          </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTasksWrapper}>
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => Add_task()}>
            <View style={styles.addWrapper}>
            <Ionicons name="add" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },  
  items: {
    justifyContent: 'center',
    width: '100%',
  },
  writeTasksWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }, 
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    shadowOpacity: 0.08,
    shadowOffset:{
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 20,
  },  
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowOffset:{
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 20,
  }, 
  ScrollView:{
    width: '100%',
    height: '100%',
    marginTop: 5,
  }
});
