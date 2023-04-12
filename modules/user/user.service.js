/* eslint-disable import/prefer-default-export */
import lodash from 'lodash';

const { omit } = lodash;

export const deletePasswordFromUser = (user) => omit(user, 'password');
