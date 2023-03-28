import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
    test('should return error', () => {
        const state : DeepPartial< StateSchema> = {
            profile: {
                error: '234',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('234');
    });
    test('should work with empty state', () => {
        const state : DeepPartial< StateSchema> = {

        };
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
