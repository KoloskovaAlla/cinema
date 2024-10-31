export const showProgress = (progresRef) => {
  const progress = progresRef.current;
  const pageContentHeight = document.body.offsetHeight;
  const windowHeight = window.innerHeight;
  const clientPassed = window.scrollY;
  const pageHiddenContentHeight = pageContentHeight - windowHeight;
  const scrollPercentValue = clientPassed / pageHiddenContentHeight * 100;
  progress.value = scrollPercentValue;
};

export const scrollToTop = () => {
  let currentTopPosition = window.pageYOffset;
  let timerID;

  const scroll = () => {
    if (currentTopPosition > 0) {
      window.scrollTo(0, currentTopPosition);
      currentTopPosition -= 250;
      timerID = setTimeout(scroll, 20);
    } else {
      window.scrollTo(0, 0);
      clearTimeout(timerID);
    }
  };

  scroll(timerID);
};

export const getCurrentTime = () => {
  const date = new Date();

  const hors = date.getHours() < 10
    ? `0${date.getHours()}`
    : date.getHours();

  const minutes = date.getMinutes() < 10
    ? `0${date.getMinutes()}`
    : date.getMinutes();

  return `${hors}:${minutes}`;
};

export const debounce = (func, delay) => {
  let timerID;
  return (...arg) => {
    clearTimeout(timerID);
    const callback = () => func.apply(this, arg);
    timerID = setTimeout(callback, delay);
  };
};

export const throttle = (func, delay) => {
  let timerID = null;

  return (...args) => {
    if (timerID) return;

    const callback = () => func.apply(this, args);

    timerID = setTimeout(() => {
      callback();
      clearTimeout(timerID);
      timerID = null;
    }, delay);
  };
};

export const trimText = (string, number) => {
  string = string.slice(0, number)
  let arr = string.split(' ');
  arr.length--;
  string = arr.join(' ')
  return string;
}

export const classNames = (
  mainClassName,
  mods = {},
  otherClassNames = []
) => {
  return [
    mainClassName,
    ...Object.entries(mods)
    .filter((mod) => Boolean(mod[1]))
    .map((mod) => mod[0]),
    ...otherClassNames.filter(Boolean)
  ].join(' ')
};