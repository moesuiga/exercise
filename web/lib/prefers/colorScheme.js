let isDarkMode = false;

export function isColorSchemeDark() {
  return isDarkMode;
}

const mqList = window.matchMedia('(prefers-color-scheme: dark)');
let themeColorMetaEle = document.querySelector('meta[name="theme-color"]');
// let colorSchemeMetaEle = document.querySelector('meta[name="color-scheme"]');

function setTheme(isDark) {
  console.debug('system color scheme: ', isDark ? 'dark' : 'light');
  if (themeColorMetaEle) {
    themeColorMetaEle.content = isDark ? '#000' : '#fff';
  }
  // if (colorSchemeMetaEle) {
  //   colorSchemeMetaEle.content = isDark ? 'dark' : 'light';
  // }
}
const onMediaQueryChange = (e) => {
  isDarkMode = !!e.matches;
  setTheme(isDarkMode);
};

if (mqList.matches) {
  isDarkMode = true;
}
setTheme(isDarkMode);

if (!mqList.addEventListener && mqList.addListener) {
  mqList.addEventListener = function addEventListener(type, listener) {
    mqList.addListener(listener);
  };
  mqList.removeEventListener = function removeEventListener(type, listener) {
    mqList.removeListener(listener);
  }
}

export { mqList };

window.addEventListener('pageshow', () => {
  console.log('window pageshow event');
  if (mqList.addEventListener) {
    mqList.addEventListener('change', onMediaQueryChange);
  }
});

window.addEventListener('beforeunload', () => {
  console.log('window beforeunload event');
  if (mqList.removeEventListener) {
    mqList.removeEventListener('change', onMediaQueryChange);
  }
});
