import styles from './Profile.module.css';
import UploadProfileImage from './UploadProfileImage';

export default function Profile() {
  return (
    <div className={styles.mainContainer}>
      <div>Profile</div>
      <form className={styles.form}>
        <label>
          Player
          <input />
        </label>
        <label>
          Age
          <input />
        </label>
        <label>
          Years of experience
          <input />
        </label>
        <label>
          Dominant hand
          <input />
        </label>
        <label>
          E-mail
          <input />
        </label>
        <label>
          Password
          <input />
        </label>
        <label>
          Repeat passowrd
          <input />
        </label>
        <UploadProfileImage />
        <button>Confirm</button>
      </form>
    </div>
  );
}
