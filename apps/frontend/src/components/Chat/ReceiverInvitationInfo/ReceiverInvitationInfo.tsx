import { useDeleteContact } from '../../../api/contacts';
import { useNavigate } from 'react-router-dom';
import styles from './receiver-invitation-info.module.css';
import Button from '../../_common/Button/Button';

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
    <div className={styles.container}>
      <p className={styles.info}>
        This user is trying to contact you. Send the message to accept them as
        your contact or reject the conversation using button on the right.
      </p>
      <Button
        title="Reject"
        onClick={onReject}
        size="small"
        type="outline"
        style="danger"
      />
    </div>
  );
}

export default ReceiverInvitationInfo;
