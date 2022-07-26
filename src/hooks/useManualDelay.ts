import {useEffect, useMemo, useState} from 'react';
import {widgetLoadingDelayValues} from 'config';

export default function useManualDelay(): {isLoading: boolean, delayValue: number,} {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const currentDelayValue = useMemo(
        () => widgetLoadingDelayValues[Math.floor(Math.random() * widgetLoadingDelayValues.length)],
        [],
        );

    useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), currentDelayValue);
        return () => {
            clearTimeout(loadingTimeout);
        };
    }, [currentDelayValue]);

    return {
        isLoading,
        delayValue: currentDelayValue,
    };
}
