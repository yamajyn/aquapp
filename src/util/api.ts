/**
 * トークンをローカルストレージから取得
 */
export const token = (() => {
  for (let strage in localStorage) {
    if (strage.includes("idToken")) {
      return localStorage.getItem(strage);
    }
  }
})();
