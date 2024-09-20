import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  user: User;
}

export interface User {
  id: Generated<number>;
  username: string;
  email: string;
  password: string;
}

export type UserSelect = Selectable<User>;
export type UserInsert = Insertable<User>;
export type UserUpdate = Updateable<User>;
