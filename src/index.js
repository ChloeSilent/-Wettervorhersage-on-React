import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // это подключение главного компонента App.js, но расширение .js не нужно прописывать ТОЛЬКО если это js файл(см выше у стилей прописано расширение)
import * as serviceWorker from './serviceWorker';// это для работы с сервером
// все что будет подключено здесь отрендерится на странице index.html
ReactDOM.render(<App />, document.getElementById('root')); // рендерим с помощью reactDOM([что], [куда]) файл App.js, но мы указывваем его как тег(те в </>) и он будет отрисован в <div id="root">, который лежит а public/index.html


serviceWorker.unregister(); // это для работы с сервером
