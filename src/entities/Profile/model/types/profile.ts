import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency';

export enum ValidateProfileError {
  INCORECT_USER_DATA = 'INCORECT_USER_DATA',
  INCORECT_AGE = 'INCORECT_AGE',
  INCORECT_COUNTRY = 'INCORECT_COUNTRY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}
export interface Profile {
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateError?: ValidateProfileError[];
}
