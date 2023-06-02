export default function setRegister(
  token: string,
  name: string,
  isAuth: boolean
) {
  localStorage.setItem(
    "authRegister",
    JSON.stringify({
      name,
      token,
      isAuth,
    })
  );
}
