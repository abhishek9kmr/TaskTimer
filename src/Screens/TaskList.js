import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SectionList, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from '../utils';
import { changeRunning, decrementTime, reset } from '../../redux/slices/addTaskSlice';

const TaskList = () => {
  const task = useSelector((state) => state.task.value);
  console.log("uptask", task)
  const dispatch = useDispatch()

  const runningStatus=(itemName)=>{
    const newTask = task.map(selectedTask =>
      selectedTask.name === itemName
        ? { ...selectedTask, running: !selectedTask.running }
        : selectedTask
    );
  //console.log(newTask)
  dispatch(changeRunning(newTask))
  }

  const resetTimer=(itemName)=>{
    const newTask = task.map(selectedTask =>
      selectedTask.name === itemName
        ? { ...selectedTask, timeLeft: selectedTask.seconds }
        : selectedTask
    );
  //console.log(newTask)
  dispatch(reset(newTask))
  }

  const DATA = Object.values(
    task.reduce((acc, { name, timeLeft, task, running, seconds }) => {
      if (!acc[task]) {
        acc[task] = { title: task, data: [] };
      }
      acc[task].data.push({ name, timeLeft, running, seconds });
      return acc;
    }, {})
  );

  const percentage=(timeL, totalTime)=>{
    return Math.floor(((totalTime-timeL)/totalTime)*100)
    //console.log(timeL, totalTime, "per197")
    
  }

  useEffect(() => {
    const interval = setInterval(() => {
      task.forEach(a => dispatch(decrementTime(a.name)));
    }, 1000);
    return () => clearInterval(interval);
  }, [task, dispatch]);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.title}>{item.timeLeft}</Text>
              <TouchableOpacity onPress={()=>runningStatus(item.name)}>
                {item.running ? (
                  <Image
                    style={{ width: moderateScale(30), height: moderateScale(30) }}
                    source={require('../icons/pause.png')}
                  />
                ) : (
                  <Image
                    style={{ width: moderateScale(30), height: moderateScale(30) }}
                    source={require('../icons/play.png')}
                  />
                )}
              </TouchableOpacity>
              <Text style={{...styles.title, color: 'green'}}>{percentage(item.timeLeft, item.seconds)}%</Text>
              {item.timeLeft ? <TouchableOpacity onPress={()=>resetTimer(item.name)}>
                <Image
                  style={{ width: moderateScale(30), height: moderateScale(30) }}
                  source={require('../icons/reset.png')}
                />
              </TouchableOpacity>:
              <Text style={{color: 'green'}}>Complete</Text>}
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default TaskList;
