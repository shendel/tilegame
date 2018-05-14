import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './frontend/index.css';

import tile_1 from './frontend/tiles/raspberry.jpg';
import tile_2 from './frontend/tiles/orange.jpg';
import tile_3 from './frontend/tiles/apple.jpg';


/*
	width = count tiles in the line
	height = count of lines
	colors = array of tile color or 'images'
*/
ReactDOM.render(<App width={4} height={4} colors={["#FF0000","#00FF00","#0000FF",tile_1,tile_2,tile_3]}/>, document.getElementById('game-root'));