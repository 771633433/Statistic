import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'; 
import App from './App'


import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')




ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));

