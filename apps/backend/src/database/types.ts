import type {
  Generated,
  Insertable,
  Selectable,
  Updateable,
  Transaction,
} from 'kysely';

export interface Database {
  user: User;
  contact: Contact;
  invitation: Invitation;
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

export interface Contact {
  id: Generated<number>;
  username: string;
  owner_id: number;
  contact_id: number;
  invitation_id: number;
}

export type ContactSelect = Selectable<Contact>;
export type ContactInsert = Insertable<Contact>;
export type ContactUpdate = Updateable<Contact>;

export interface Invitation {
  id: Generated<number>;
  sender_id: number;
  receiver_id: number;
  sender_message_count: number;
}

export type InvitationSelect = Selectable<Invitation>;
export type InvitationInsert = Insertable<Invitation>;
export type InvitationUpdate = Updateable<Invitation>;

export interface TransactionalRepository {
  transacting: (trx: Transaction<Database>) => TransactionalRepository;
}
