export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}