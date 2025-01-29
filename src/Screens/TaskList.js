import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SectionList, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { moderateScale } from '../utils';

const TaskList = () => {
  const task = useSelector((state) => state.task.value);

  const DATA = Object.values(
    task.reduce((acc, { name, seconds, task, status }) => {
      if (!acc[task]) {
        acc[task] = { title: task, data: [] };
      }
      acc[task].data.push({ name, seconds, status });
      return acc;
    }, {})
  );

  const Timer = ({ initialTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
      if (timeRemaining <= 0) return;

      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [timeRemaining]);

    return <Text style={styles.title}>{timeRemaining} sec</Text>;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Timer initialTime={item.seconds} />
              <TouchableOpacity>
                {item.status === 'pause' ? (
                  <Image
                    style={{ width: moderateScale(20), height: moderateScale(20) }}
                    source={require('../icons/play.png')}
                  />
                ) : (
                  <Image
                    style={{ width: moderateScale(30), height: moderateScale(30) }}
                    source={require('../icons/pause.png')}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: moderateScale(30), height: moderateScale(30) }}
                  source={require('../icons/reset.png')}
                />
              </TouchableOpacity>
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
