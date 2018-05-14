import React, { Component } from 'react';

class Tile extends Component {
	constructor(props) {
		super(props);
		this.RootApp = props.App;
		this.props = props;
		this.state = {
			closed : props.closed,
			isImage : false,
			filled : props.filled
		};
		if (!props.color.startsWith('#')) {
			this.state.isImage = true;
		};
		this.onTileClick = this.onTileClick.bind(this);
	};
	onTileClick(e) {
		e.preventDefault();
		/*
			Simple logic
			if tile is filled - do nothing
			if tile is closed (next state will be opened) - call App callback for open tile
			if tile is opened (next state will be closed) - call App callback for clean up prev saved tile 
		*/
		if (this.state.filled) return;
		if (this.state.closed) {
			this.RootApp.onTileOpenHandle(this.props.index,this);
		} else {
			this.RootApp.onTileCloseHandle();
		}
		/* 'flip' state closed/opened */
		this.setState( function (prevState,props) {
			return { closed : !prevState.closed };
		} );
		
	};
	render() {
		const classFilled = (this.state.filled) ? "-filled" : "";
		const classClosed = (this.state.closed && !this.state.filled) ? "-closed" : "";
		const classLineBreak = (this.state.endline) ? "-line-end" : "";
		const view = (this.state.isImage) ? <em style={{background: 'url('+this.props.color+')'}}></em> : <em style={{background: this.props.color}}></em>;
		const className = ["game-tile",classFilled,classClosed,classLineBreak].join(" ");
		
		return (
			<div onClick={this.onTileClick} className={className}>{view}</div>
		);
		
	};
}

export default Tile;