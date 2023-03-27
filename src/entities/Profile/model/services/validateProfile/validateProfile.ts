import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?:Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const {
        first, lastname, age, country,
    } = profile;

    const errors:ValidateProfileError[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORECT_USER_DATA);
    }
    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORECT_AGE);
    }
    if (!country) {
        errors.push(ValidateProfileError.INCORECT_COUNTRY);
    }
    return errors;
};
