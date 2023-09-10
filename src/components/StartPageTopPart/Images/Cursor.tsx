import CursorImage from "../../../assets/png/coursor.png";

export default function Cursor() {
  return (
    <div className="image-wrapper image-wrapper_cursor">
      <img src={CursorImage} alt="cursor" className="image" />
    </div>
  );
}
