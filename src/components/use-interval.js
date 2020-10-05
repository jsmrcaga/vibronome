import React from 'react';

export default function useInterval(callback, beat=null, immediate=false){
	let interval = React.useRef(null);
	React.useEffect(() => {
		if(interval.current) {
			clearInterval(interval.current);
		}

		if(immediate) {
			callback();
		}

		if(beat) {
			interval.current = setInterval(callback, beat);
		}

		return () => clearInterval(interval.current);
	}, [beat, callback, immediate]);
}
