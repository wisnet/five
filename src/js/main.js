// import $ from 'jquery';
// import 'bootstrap';
import axios from 'axios';

axios.defaults.headers.common['X-WP-Nonce'] = wajax.nonce; // for all requests

axios
	.get(wajax.api_url + '/team/1')
	.then(function (e, d) {
		console.log(e, d);
	}).catch(function (e) {
	console.log(e);
});

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
// 	const token = store.getState().session.token;
// 	config.headers.Authorization = token;
//
//
// 	options.beforeSend = function (xhr) {
// 		xhr.setRequestHeader('X-WP-Nonce', wpApiSettings.nonce);
//
// 		if (beforeSend) {
// 			return beforeSend.apply(this, arguments);
// 		}
// 	};
// 	return config;
// });

// ajaxr({
// 	url: wajax.url,
// 	data: {
// 		action: 'text'
// 	}
// }).send().then(function (e, d) {
// 	debug(e, d);
// }).catch(function (e) {
// 	debug(e);
// });
