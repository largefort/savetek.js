// SaveTek.js

var SaveTek = (function () {
  // Private function to check if local storage is supported
  function isLocalStorageSupported() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  // Public function to save data to local storage
  function saveData(key, value, expirationMinutes) {
    if (isLocalStorageSupported()) {
      var dataToStore = {
        value: value,
        expiration: expirationMinutes
          ? new Date().getTime() + expirationMinutes * 60 * 1000
          : null,
      };
      localStorage.setItem(key, JSON.stringify(dataToStore));
      console.log('Data saved successfully.');
    } else {
      console.error('Local storage is not supported in this browser.');
    }
  }

  // Public function to retrieve data from local storage
  function loadData(key) {
    if (isLocalStorageSupported()) {
      var storedData = localStorage.getItem(key);
      if (storedData) {
        var parsedData = JSON.parse(storedData);
        if (parsedData.expiration === null || parsedData.expiration > new Date().getTime()) {
          return parsedData.value;
        } else {
          console.warn('Data for the specified key has expired.');
          removeData(key);
          return null;
        }
      } else {
        console.warn('No data found for the specified key.');
        return null;
      }
    } else {
      console.error('Local storage is not supported in this browser.');
      return null;
    }
  }

  // Public function to remove data from local storage
  function removeData(key) {
    if (isLocalStorageSupported()) {
      localStorage.removeItem(key);
      console.log('Data removed successfully.');
    } else {
      console.error('Local storage is not supported in this browser.');
    }
  }

  // Public function to clear all data from local storage
  function clearAllData() {
    if (isLocalStorageSupported()) {
      localStorage.clear();
      console.log('All data cleared successfully.');
    } else {
      console.error('Local storage is not supported in this browser.');
    }
  }

  // Public function for autosaving game progress
  function autoSaveGame(key, gameData) {
    // Autosave every 5 minutes
    setInterval(function () {
      saveData(key, gameData);
      console.log('Game progress autosaved.');
    }, 5 * 60 * 1000);
  }

  // Public function to load the most recent autosaved game data
  function loadAutoSavedGame(key) {
    return loadData(key);
  }

  // Expose public methods
  return {
    saveData: saveData,
    loadData: loadData,
    removeData: removeData,
    clearAllData: clearAllData,
    autoSaveGame: autoSaveGame,
    loadAutoSavedGame: loadAutoSavedGame,
  };
})();
