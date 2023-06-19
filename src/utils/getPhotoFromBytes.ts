export default function getPhotoFromBytes(bytes: string) {
  return `data:image/png;base64,${bytes}`;
}
