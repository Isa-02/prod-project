import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileValidateErrors = (state:StateSchema) => state.profile?.validateError;
