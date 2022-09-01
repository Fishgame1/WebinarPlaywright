import { Languages } from './translations/languages';
import { getTranslations, Translation } from './translations/translation';
import { FullConfig } from '@playwright/test';


const language: Languages = Languages.ENGLISH;

export class Config {
    private static instance: Config;

    shouldLogData: boolean = process.env.LOG_DATA ? getEnvironmentVariableAsBoolean(process.env.LOG_DATA) : true;
    appUrl: string = ``;
    language: Languages = language
    translations: Translation = getTranslations(language);

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
            this.logData();
        }
        return Config.instance;
    }

    public static logData() {
        if (Config.instance.shouldLogData) {
            console.log(`Initiated webinar tests:`);
            console.log(`   1. With url: ${Config.instance.appUrl}`);
            console.log(`   2. Using language: ${Config.instance.language}`);
        }
    }
}

async function globalSetup(config: FullConfig) {
    getConfig();
}

export default globalSetup;

export const getConfig = (): Config => {
    return Config.getInstance();
};

export const getEnvironmentVariableAsBoolean = (variable: string | undefined): boolean => {
    return variable === 'true';
};
