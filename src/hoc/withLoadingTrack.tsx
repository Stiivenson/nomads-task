import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useInterval, useManualDelay, useTranslates} from 'hooks';
import {Loader, Box} from 'components';
import {LoadingMessagesEnum} from 'enum';

interface IWithLoadingTrackConfig {
    loadingStepsChangeDelay: number,
}

const MAX_LOADING_STEP_VALUE = 3;
const INITIAL_LOADING_STEP_VALUE = 1;
const TIMEOUT_BEFORE_RENDERING_COMPONENT = 1000;

const withLoadingTrack = (config: IWithLoadingTrackConfig) => (Component: FC<any>) => (props: any) => {
    const [loadingStepValue, setLoadingStepValue] = useState(INITIAL_LOADING_STEP_VALUE);
    const [isComponentVisible, setIsComponentVisible] = useState(false);

    const {isLoading, delayValue} = useManualDelay();
    const {getTranslateByKey} = useTranslates();

    // Simplify access to get loading messages
    const getLoadingMessageTranslate = useCallback(
        (key: string) => getTranslateByKey('loadingMessages', key),
        [getTranslateByKey],
    );

    const isWaitingTimeExceeded = useMemo(
        () => loadingStepValue > MAX_LOADING_STEP_VALUE,
        [loadingStepValue],
    );
    const maximumLoadingTimeInSeconds = useMemo(
        () => MAX_LOADING_STEP_VALUE * (config.loadingStepsChangeDelay / 1000),
        [],
    );

    // Sum up loading seconds value, while waiting time is not exceeded
    useInterval(
        () => setLoadingStepValue((prev) => prev + 1),
        (isLoading && !isWaitingTimeExceeded) ? config.loadingStepsChangeDelay : null,
    );

    // Set interval to show success message before Component rendering
    useEffect(() => {
        if (!isLoading && !isComponentVisible) {
            const timerToDisplayComponent = setTimeout(
                () => setIsComponentVisible(true),
                TIMEOUT_BEFORE_RENDERING_COMPONENT,
            );
            return () => clearTimeout(timerToDisplayComponent);
        }
    }, [isComponentVisible, isLoading]);

    // Show error message if waiting time is exceeded
    if (isWaitingTimeExceeded) {
        return (
            <Box>
                <span className='Emoji Emoji_danger'>
                    &#9888;
                </span>
                {getLoadingMessageTranslate(LoadingMessagesEnum.ERROR_TIMEOUT)}
            </Box>
        );
    }

    // Show loading message
    if (isLoading) {
        const loadingMessageCode = LoadingMessagesEnum.getLoadingMessageCode(loadingStepValue);
        return (
            <Box>
                <p>
                    Время задержки загрузки -
                    {' '}
                    {delayValue / 1000}
                    {' '}
                    сек.
                </p>
                <p>
                    Максимальное время ожидания -
                    {' '}
                    {maximumLoadingTimeInSeconds}
                    {' '}
                    сек.
                </p>
                <Loader />
                <p>
                    {getLoadingMessageTranslate(loadingMessageCode)}
                </p>
            </Box>
        );
    }

    // Show success message before Component rendering
    if (!isComponentVisible) {
        return (
            <Box>
                <span className='Emoji Emoji_success'>
                    &#10004;
                </span>
                {getLoadingMessageTranslate(LoadingMessagesEnum.SUCCESS_LOADING_FINISHED)}
            </Box>
        );
    }

    return <Component {...props} />;
};

export default withLoadingTrack;
