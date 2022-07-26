import {MutableRefObject, useEffect, useRef} from 'react';

export default function useInterval(
    callback: () => void,
    delay: number | boolean | null,
) {
    const savedCallback: MutableRefObject<any> = useRef(null);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (typeof delay === 'number') {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}
