var SaveTek = (function () {
  // Private properties
  var autosaveIntervalId = null;
  var defaultExpirationMinutes = 60; // Default expiration time for saved data

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

  // Private function to handle data encryption (simple example, consider using a robust method for production)
  function encryptData(data) {
    return btoa(JSON.stringify(data)); // Base64 encode
  }

  // Private function to handle data decryption
  function decryptData(data) {
    return JSON.parse(atob(data)); // Base64 decode and parse JSON
  }

  // Enhanced saveData to include version and encryption
  function saveData(key, value, options = {}) {
    if (isLocalStorageSupported()) {
      var dataToStore = {
        value: encryptData(value), // Encrypt data for storage
        version: options.version || "1.0",
        expiration: options.expirationMinutes
          ? new Date().getTime() + options.expirationMinutes * 60 * 1000
          : new Date().getTime() + defaultExpirationMinutes * 60 * 1000,
      };
      localStorage.setItem(key, JSON.stringify(dataToStore));
      console.log('Data saved successfully.');
      if (options.callback) options.callback(true);
    } else {
      console.error('Local storage is not supported in this browser.');
      if (options.callback) options.callback(false);
    }
  }

  // Enhanced loadData to handle version control and decryption
  function loadData(key, options = {}) {
    if (isLocalStorageSupported()) {
      var storedData = localStorage.getItem(key);
      if (storedData) {
        var parsedData = JSON.parse(storedData);
        if ((parsedData.expiration === null || parsedData.expiration > new Date().getTime()) &&
            (!options.version || parsedData.version === options.version)) {
          return decryptData(parsedData.value); // Decrypt data
        } else {
          console.warn('Data for the specified key has expired or version mismatch.');
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

  // Function to initiate autosave with a customizable interval
  function autoSaveGame(key, gameData, intervalMinutes = 5, options = {}) {
    clearInterval(autosaveIntervalId); // Clear existing interval if any
    autosaveIntervalId = setInterval(function () {
      saveData(key, gameData, { expirationMinutes: intervalMinutes, ...options });
      console.log('Game progress autosaved.');
    }, intervalMinutes * 60 * 1000);
  }

  // Function to load the most recent autosaved game data
  function loadAutoSavedGame(key, options = {}) {
    return loadData(key, options);
  }

  // Public API
  return {
    saveData: saveData,
    loadData: loadData,
    removeData: removeData,
    clearAllData: clearAllData,
    autoSaveGame: autoSaveGame,
    loadAutoSavedGame: loadAutoSavedGame,
  };
})();

// Example usage:
// SaveTek.saveData('gameState', { level: 10, score: 5000 }, { version: '1.1', expirationMinutes: 1440, callback: (success) => console.log('Save operation was ' + (success ? 'successful' : 'unsuccessful')) });
// var gameState = SaveTek.loadData('gameState', { version: '1.1' });
// console.log(gameState);

