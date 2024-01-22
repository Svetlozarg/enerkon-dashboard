export const getCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    const cookies: string[] = document.cookie.split('; ');

    if (!cookies) return;

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
};

export const getUserAccessToken = () => {
  let accessCookie: string = '';
  let cookiesArray: string[] = document.cookie.split('; ');

  if (!cookiesArray) return;

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie: string = cookiesArray[i];
    const [name, value] = cookie.split('=');
    if (name === 'accessToken') {
      accessCookie = value;
      break;
    }
  }

  return accessCookie;
};

export const USER_ID = getCookie('id');
export const USERNAME = getCookie('username');
export const USER_EMAIL = getCookie('email');
export const USER_ACCESSTOKEN = getCookie('accessToken');
