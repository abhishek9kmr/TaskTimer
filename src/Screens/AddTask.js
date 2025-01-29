import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from '../utils';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/slices/addTaskSlice';

const AddTask = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
  const [selectedTask, setSelectedTask] = useState('Study');
  const [nameVal, setNameVal] = useState('');
  const [seconds, setSeconds] = useState('');
  const task = useSelector((state) => state.task.value);

  console.log("count123", task)

  const setSecond = (text) => {
    // Allow only numeric values
    if (/^\d*$/.test(text)) {
      setSeconds(text);
    }
  };
  const submit=()=>{
    console.log(selectedTask, nameVal, seconds)
    if(!nameVal.trim()){
      Alert.alert("Please enter name")
      return
    }else if(!seconds.trim()){
      Alert.alert("Please enter duration seconds")
      return
    }
    dispatch(addTask({"name": nameVal, "seconds": seconds, "task": selectedTask, "status": "pause", timeRemaning: seconds}))
    setNameVal('')
    setSeconds('')
    navigation.navigate('TaskList')
  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.txtInput}
        placeholder="Task Name"
        value={nameVal}
        onChangeText={setNameVal}
      />
      <TextInput
        style={styles.txtInput}
        placeholder="Seconds"
        inputMode="numeric"
        value={seconds}
        onChangeText={setSecond}
      />
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedTask}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) => setSelectedTask(itemValue)}>
            <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Break" value="Break" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text style={styles.btnTxt}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    height: moderateScale(40),
    width: moderateScale(250),
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  dropdown: {
    height: moderateScale(60),
    width: moderateScale(250),
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
  },
  btn: {
    height: moderateScale(60),
    width: moderateScale(250),
    backgroundColor: 'blue',
    marginTop: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
  },
});
