

export const getRandomString = (length: number, lettersOnly?: boolean) => {
    let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    if (lettersOnly != null && !lettersOnly) {
        characters += '0123456789';
    }
    let randomstring = '';
    for (let i = 0; i < length; i++) {
        let randomValue = Math.floor(Math.random() * characters.length);
        randomstring += characters[randomValue];
    }
    return randomstring;
};