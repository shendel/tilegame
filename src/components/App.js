import React, { Component } from 'react';
import Tile from './Tile';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.width = (props.width) ? props.width : 4;
		this.height = (props.height) ? props.height : 4;
		this.colors = (props.colors) ? props.colors : ["#FF0000","#00FF00","#0000FF"];
		this.state = {
			tiles : [],
			lastTileKey : -1,
			lastTile : null
		}
		
		var tilesTemp = [];
		for (var i = 0; i < (this.width*this.height)/2 ; i++) {
			var randColor = this.getRandomColor();
			tilesTemp.push( {
				color : randColor,
				filled : false,
				closed : true
			} );
			tilesTemp.push( {
				color : randColor,
				filled : false,
				closed : true
			} );
		}
		tilesTemp.sort(function(a, b){return 0.5 - Math.random()});
		i = 0;
		/* Why temp? hmmm.... we need save key of element for link him...
			but we can do it simple
				this.state.tiles = ....... 
				.... random sort this.state.tiles ....
				for (var tileKey in this.state.tiles) {
					.... save actual key (index) in array ....
					this.state.tiles[tileKey].key = tileKey
				}
				....
		*/
		for (var tileKey in tilesTemp) {
			tilesTemp[tileKey].key = i;
			this.state.tiles[i] = tilesTemp[tileKey];
			i++;
		}
	}
	getRandomColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}
	checkGameIsEnded() {
		var _filledCount = 0;
		for (var tileKey in this.state.tiles) {
			if (this.state.tiles[tileKey].filled) {
				_filledCount++;
			}
		}
		return (_filledCount===this.state.tiles.length);
	}
	onTileCloseHandle() {
		this.setState( function (prevState) {
			prevState.lastTile = null;
			prevState.lastTileKey = -1;
			return prevState;
		} );
	}
	onTileOpenHandle(tileKey, clickedTile) {
		
		if (this.state.lastTileKey!==-1) {
			if (this.state.lastTileKey===tileKey) {
				return;
			}
			if (this.state.tiles[tileKey].color!==this.state.tiles[this.state.lastTileKey].color) {
				this.setState( function (prevState,props) {
					
					prevState.lastTile.setState( { closed : true } );
					prevState.lastTileKey = tileKey;
					return prevState;
				} );
				
			} else {
				this.setState( function (prevState) {
					
					clickedTile.setState( { filled : true, closed : true} );
					prevState.lastTile.setState( { filled : true , closed : true} );
					
					prevState.tiles[prevState.lastTileKey].filled = true;
					prevState.tiles[tileKey].filled = true;
					
					prevState.lastTileKey = -1;
					prevState.lastTile = null;
					return prevState;
				} , function () {
					if (this.checkGameIsEnded()) {
						alert("Game Ended");
					}
				} );
				return;
			}
		}
		this.setState( function (prevState) {
			return { 
				lastTileKey : tileKey , 
				lastTile : clickedTile
			};
		} );
		
	}

	render() {
		var app = this;
		
		const gameBoardLines = [];
		for (var h_i=0;h_i<this.height;h_i++) {
			var lineTiles = [];
			for (var w_i=0;w_i<this.width;w_i++) {
				var tile = this.state.tiles[w_i+this.width*h_i];
				/* 'index' params used for link this tile in callback to element in array App::state.tiles */
				lineTiles.push(
					<Tile 
						color={tile.color} 
						closed={tile.closed} 
						filled={tile.filled} 
						index={tile.key} 
						key={tile.key} 
						App={app} 
						/>
				);
			}
			gameBoardLines.push(<div className="board-line" key={h_i}>{lineTiles}</div>);
		}
		
		return (
			<div className="tile-holder">
			{gameBoardLines}
			</div>
		);
	}
}

export default App;
