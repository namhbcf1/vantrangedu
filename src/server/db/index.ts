import { drizzle } from 'drizzle-orm/d1';

import * as users from './schema/users';
import * as auth from './schema/auth';
import * as classes from './schema/classes';
import * as exams from './schema/exams';
import * as payments from './schema/payments';

const schema = {
  ...users,
  ...auth,
  ...classes,
  ...exams,
  ...payments
};

export function createDb(d1: D1Database) {
  return drizzle(d1, { schema });
}
