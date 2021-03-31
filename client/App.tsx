import 'react-native-gesture-handler';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './src/store/reducers/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
