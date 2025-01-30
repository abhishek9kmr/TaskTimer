import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddTask from './src/Screens/AddTask';
import TaskList from './src/Screens/TaskList';
import History from './src/Screens/History';
import { Image } from 'react-native';
import { moderateScale } from './src/utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Add task"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Add task"
        component={AddTask}
        options={{
          tabBarLabel: 'Add task',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: moderateScale(20), height: moderateScale(20)}} 
            source={require('./src/icons/add.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskList"
        component={TaskList}
        options={{
          tabBarLabel: 'Task list',
          tabBarIcon: () => (
            <Image style={{ width: moderateScale(20), height: moderateScale(20)}} 
            source={require('./src/icons/taskList.png')} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: () => (
            <Image style={{ width: moderateScale(20), height: moderateScale(20)}} 
            source={require('./src/icons/history.png')} />
        
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </PersistGate>
  </Provider>
  );
}
