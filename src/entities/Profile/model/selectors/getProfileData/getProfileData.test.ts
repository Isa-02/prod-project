import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileData } from './getProfileFirstname';

describe('getProfileData.test', () => {
    test('should return error if login', () => {
        const data = {
            username: 'admin',
            age: 21,
            country: Country.Russia,
            lastname: 'dsa',
            first: 'asd',
            city: 'asd',
            currency: Currency.RUB,
        };
        const state : DeepPartial< StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state : DeepPartial< StateSchema> = {

        };
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
