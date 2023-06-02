import setRegister from "./storage";

export default function logOut(name: string) {
  setRegister("", name, false);
}
