import {createContext, useMemo, ReactNode, useState, useEffect, useCallback} from 'react';

// Emulate messages fetching

const messages: Record<string, string> = {
    'Loading.First': 'Виджет грузится',
    'Loading.Second': 'Виджет ещё грузится',
    'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
    'Error.Timeout': 'Ошибка при загрузке. Пожалуйста, обновите окно',
    'Success.LoadingFinished': 'Виджет загружен!',
};

const fetchMessages = () => messages;

// Context for translates

interface ITranslationProviderProps {
    children: ReactNode,
}

interface ITranslationState {
    loadingMessages: Record<string, string>
}

export interface ITranslationContext {
    // eslint-disable-next-line no-unused-vars
    getTranslateByKey: (targetObjectName: keyof ITranslationState, key: string) => string,
}

export const TranslationContext = createContext({} as ITranslationContext);

const initialState: ITranslationState = {
    loadingMessages: {},
};

export function TranslationProvider(props: ITranslationProviderProps) {
    const [translates, setTranslates] = useState<ITranslationState>(initialState);

    useEffect(() => {
        const loadingMessages = fetchMessages();
        setTranslates({
            ...translates,
            loadingMessages,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTranslateByKey = useCallback(
        (
            targetObjectName: keyof ITranslationState,
            key: string,
        ) => translates[targetObjectName][key] || '',
        [translates],
    );

    const value = useMemo(() => ({
        getTranslateByKey,
    }), [getTranslateByKey]);

    return (
        <TranslationContext.Provider value={value}>
            {props.children}
        </TranslationContext.Provider>
    );
}
