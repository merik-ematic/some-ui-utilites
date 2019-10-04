/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
((window, document) => {
  const rootDomain = window.location.host.replace('www', '');
  const today = new Date().setHours(0, 0, 0, 0);
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match[2] || false;
  };
  const setCookie = (name, value, days, domain) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/; domain=${domain}`;
  };

  // Iteration Cookies.
  const cookiesIterations = JSON.parse(decodeURIComponent(getCookie('_v1EmaticSolutionsBye')));
  // Time On Site Cookies
  const cookiesTOSs = JSON.parse(decodeURIComponent(getCookie('_v1EmaticSolutionsEI')));

  console.info(cookiesIterations, cookiesTOSs);

  // Removes iteration cookies with past dates.
  cookiesIterations.forEach((cookiesIteration, index) => {
    cookiesIteration.forEach((item) => {
      const date = new Date(item.dont_show_till);
      if (date.setHours(0, 0, 0, 0) < today) {
        delete cookiesIterations[index];
      }
    });
  });

  // Removes TOS cookies with past dates.
  cookiesTOSs.forEach((cookiesTOS, index) => {
    const [, item] = cookiesTOS;
    if (item < new Date().setHours(0, 0, 0, 0)) {
      delete cookiesTOSs[index];
    }
  });

  // Update Cookie.
  setCookie('_v1EmaticSolutionsBye', encodeURIComponent(JSON.stringify(cookiesIterations)), 354 * 2, rootDomain);
  setCookie('_v1EmaticSolutionsEI', encodeURIComponent(JSON.stringify(cookiesTOSs)), 354 * 2, rootDomain);

  console.info(cookiesIterations, cookiesTOSs);
})(window, document);
