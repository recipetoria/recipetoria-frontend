import setRegister from "../utils/storage";

export default function logOut(name: string) {
  setRegister("", name, false);
}
