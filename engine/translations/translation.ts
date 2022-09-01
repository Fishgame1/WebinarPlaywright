import { enTranslation } from './en/translation-en';
import { Languages } from './languages';
import { plTranslation } from './pl/translation-pl';

export interface Translation {
    toDoDescription: string,
    toDoHeader: string,
}

export interface ToDoPageTranslation {
    toDoDescription: string,
    toDoHeader: string
}

export const getTranslations = (language: Languages): Translation => {
    let languageMap = new Map([
        [Languages.ENGLISH, enTranslation],
        [Languages.POLISH, plTranslation],
    ]);
    let translation = languageMap.get(language);
    if (translation) {
        return translation;
    } else {
        return enTranslation;
    }
};
