export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";

export function signIn(user) {
  return {
    type: SIGNIN,
    user,
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}
