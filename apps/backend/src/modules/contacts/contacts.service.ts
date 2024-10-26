import * as ContactRepository from './contacts.repository.js';
import * as UserService from '../users/users.service.js';
import AppError from '../../utils/AppError.js';

export async function createContact(
  ownerId: number,
  contactId: number,
  invitationId: number
) {
  const { username } = await UserService.getUserById(contactId);

  const createdContact = ContactRepository.createContact({
    username,
    owner_id: ownerId,
    contact_id: contactId,
    invitation_id: invitationId,
  });

  return createdContact;
}

export async function getContactByOwnerAndContact(
  ownerId: number,
  contactId: number
) {
  const contact = await ContactRepository.findContactByOwnerAndContact(
    ownerId,
    contactId
  );

  if (!contact) {
    throw new AppError('not_found', 404, 'Contact not found', true);
  }

  return contact;
}
