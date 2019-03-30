const d2GetMethodWrap = (url, obj, func) => {
  const sentURL = url + Object.values(obj).join('/');
  fetch(sentURL)
    .then(res => res.json())
    .then((jsonResult) => { func(jsonResult); })
    .catch((error) => {
      console.log('An error occured with fetch:', error);
    });
};

const d3PostMethodWrap = (url, obj, func) => {
  fetch(url, {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(jsonResult => { func(jsonResult); })
    .catch(error => {
      console.log('An error occured with fetch:', error);
    });
}

export const getSearchMakerCount = (obj, func) => d2GetMethodWrap('/count/maker/', obj, func);
export const getSearchMaker = (obj, func) => d2GetMethodWrap('/search/maker/', obj, func);
export const getSearchRequestCount = (obj, func) => d2GetMethodWrap('/count/request/', obj, func);
export const getSearchRequest = (obj, func) => d2GetMethodWrap('/search/request/', obj, func);

// @Katherine TODO: handle following post methods
export const postUserLogin = (obj, func) => d3PostMethodWrap("/user/signin", obj, func);
export const postUserRegister = (obj, func) => d3PostMethodWrap("/user/signup", obj, func);
