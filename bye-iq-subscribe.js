(function(w) {
  w.ematic_tw = w.ematic_tw || { 'v': '201909091100', };
  w.ematic_tw.subscribe = function(listId, email, mergeFields, callback) {
    if (typeof window.ematics === 'undefined') {
      console.error('ematic.js not loaded.');
      return false;
    }

    var emailExists = '';

    email = email || '';
    listId = listId || '';
    callback = callback || function() { /**pass**/ };
    mergeFields = mergeFields || {};

    if (listId.length === 0) {
      return false;
    }
    if (!!window.localStorage) {
      emailExists = localStorage.getItem('ematicId') || '';
      if (email === emailExists) {
        return false;
      }
      localStorage.setItem('ematicId', email);
    }
    if (/^([\w\.-]+(?:\.[\w-\+]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(email)) {
      window.ematics('subscribe', listId, email, mergeFields, callback);
    }
    return true;
  };
})(window);
