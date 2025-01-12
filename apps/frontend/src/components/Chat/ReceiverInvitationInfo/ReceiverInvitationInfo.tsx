import { useDeleteContact } from '../../../api/contacts';
import { useNavigate } from 'react-router-dom';

interface ReceiverInvitationInfoProps {
  contactId: number;
}

function ReceiverInvitationInfo({ contactId }: ReceiverInvitationInfoProps) {
  const deleteContact = useDeleteContact();
  const navigate = useNavigate();

  function onReject() {
    deleteContact.mutate(contactId, {
      onSuccess: () => navigate('/'),
    });
  }

  return (
    <div>
      <p>
        This user is trying to contact you. Send the message to accept them as
        your contact or reject the conversation using button on the right.
      </p>
      <button onClick={onReject}>Reject</button>
    </div>
  );
}

export default ReceiverInvitationInfo;
