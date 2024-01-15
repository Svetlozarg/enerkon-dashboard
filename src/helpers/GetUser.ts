function getCookie(name: string) {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
}

export const userAccessToken = getCookie('accessToken');
export const userEmail = getCookie('email');
export const userID = getCookie('id');
