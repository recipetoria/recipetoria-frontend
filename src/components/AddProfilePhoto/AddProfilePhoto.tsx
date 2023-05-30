import "./AddProfilePhoto.scss";

export default function AddProfilePhoto() {
  return (
    <section className="add-profile-photo">
      <h3 className="add-profile-photo__header">Add profile photo</h3>
      <section className="add-photo">Add photo</section>
      <span>or</span>
      <section className="add-profile-photo__btns">
        <button type="button" className="add-profile-photo__cancel">
          Cancel
        </button>
        <button type="button" className="add-profile-photo__upload">
          Upload picture
        </button>
      </section>
    </section>
  );
}
