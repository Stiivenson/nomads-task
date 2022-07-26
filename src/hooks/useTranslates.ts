import {useContext} from 'react';
import {ITranslationContext, TranslationContext} from 'providers/TranslationProvider';

export default function useTranslates(): ITranslationContext {
    return useContext(TranslationContext);
}
