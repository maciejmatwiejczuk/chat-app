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
  message: Message;
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
  ownerId: number;
  contactId: number;
  invitationId: number;
  lastMessage: string;
  lastMessageSenderId: number;
}

export type ContactSelect = Selectable<Contact>;
export type ContactInsert = Insertable<Contact>;
export type ContactUpdate = Updateable<Contact>;

export interface Invitation {
  id: Generated<number>;
  senderId: number;
  receiverId: number;
  senderMessageCount: number;
}

export type InvitationSelect = Selectable<Invitation>;
export type InvitationInsert = Insertable<Invitation>;
export type InvitationUpdate = Updateable<Invitation>;

export interface Message {
  id: Generated<number>;
  senderId: number;
  receiverId: number;
  message: string;
  date: string;
}

export type MessageSelect = Selectable<Message>;
export type MessageInsert = Insertable<Message>;
export type MessageUpdate = Updateable<Message>;

export interface TransactionalRepository {
  transacting: (trx: Transaction<Database>) => TransactionalRepository;
}
