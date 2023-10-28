import styles from './Profile.module.css';
import UploadProfileImage from './UploadProfileImage';

export default function Profile() {
  return (
    <div className={styles.mainContainer}>
      <div>Profile</div>
      <form className={styles.form}>
        <label>
          First name
          <input required />
        </label>
        <label>
          Last name
          <input required />
        </label>
        <label>
          E-mail
          <input required />
        </label>
        <label>
          Age
          <input required />
        </label>
        <label>
          Years of experience
          <input required />
        </label>
        <label>
          Dominant hand
          <input required />
        </label>

        <textarea rows={25} cols={50} maxLength={250}>
          Description
        </textarea>

        <UploadProfileImage />
        <button>Confirm</button>
      </form>
    </div>
  );
}
