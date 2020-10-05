import React from 'react';

import useInterval from './components/use-interval';

import Styles from './styles/app.module.css';

function DebouncedInput({ time=300, onChange, ...rest }) {
	const timeout = React.useRef(null);
	const _onChange = React.useCallback((synth, ...other) => {
		synth.persist();

		if(timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			onChange(synth, ...other);
		}, time);

		return () => clearTimeout(timeout.current);
	}, [time, onChange]);
	
	return <input onChange={_onChange} {...rest}/>;
}

function Vibronome() {
	const [ bpm, setBPM ] = React.useState(null);

	const vibrate = React.useCallback(() => {
		console.log('beat');
		window.navigator.vibrate([100]);
	}, []);

	// 60 bpm = 1000ms
	// 120 bpm = 500ms

	useInterval(vibrate, bpm ? 60000 / bpm : null);

	return (
		<DebouncedInput className={Styles['bpm-input']} type="number" min='1' max='1000' onChange={(synth) => setBPM(+synth.target?.value)}/>
	);
}

export default function App() {
	if(!window.navigator.vibrate) {
		return (
			<div className={Styles['vibronome']}>
				Vibration not supported
			</div>
		);
	}

	return (
		<div className={Styles['vibronome']}>
			<Vibronome/>
		</div>
	);
};
