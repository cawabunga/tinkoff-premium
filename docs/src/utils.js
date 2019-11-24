export const throttle = (fn, ms) => {
    let mutex = false;
    const release = () => mutex = false;
    const acquire = () => mutex = true;

    return (...args) => {
        if (!mutex) {
            acquire();
            setTimeout(release, ms);
            return fn(...args);
        }
    };
};

export const formatDate = (date, locale) => {
    const formatter = new Intl.DateTimeFormat(locale);
    return formatter.format(date);
};

export const getBrowserLocale = () => (
    navigator.language || navigator.userLanguage || null
);