# savetek.js
SaveTek.js

SaveTek.js is a lightweight, easy-to-use JavaScript library designed to simplify the process of saving and loading game progress in web-based games. Built with HTML5, JavaScript, and CSS projects in mind, SaveTek.js leverages the localStorage API to provide a robust solution for handling game state persistence across sessions. With features like data encryption, version control, and auto-save functionality, SaveTek.js ensures that game developers have a powerful toolset to enhance the player experience by seamlessly maintaining progress data.

Features

Local Storage Utilization: Leverages the web's localStorage to keep game data between sessions.
Data Encryption: Offers a basic encryption mechanism to help protect stored data. (Note: For production environments, consider implementing a more robust encryption method.)
Version Control: Manages different versions of saved game data, ensuring compatibility across game updates.
Auto-Save Functionality: Automatically saves game progress at specified intervals, customizable to fit the needs of any game.
Expiration Management: Optionally set expiration times for saved data to auto-expire and clean up old game states.
Getting Started

To integrate SaveTek.js into your project, simply include SaveTek.js in your HTML file:
<script src="path/to/SaveTek.js"></script>
Saving Data
To save data, such as game state or player progress, use the saveData function:
SaveTek.saveData('gameState', { level: 10, score: 5000 }, {
  version: '1.1',
  expirationMinutes: 1440, // Optional: Data expires in 1 day
  callback: (success) => console.log('Save operation was ' + (success ? 'successful' : 'unsuccessful'))
});
Loading Data
To retrieve your saved data, use the loadData function:
var gameState = SaveTek.loadData('gameState', { version: '1.1' });
console.log(gameState);
Removing Data
To remove saved data:
SaveTek.removeData('gameState');
Auto-Save
To initiate auto-saving of game data:
SaveTek.autoSaveGame('gameState', { level: 10, score: 5000 }, 5); // Autosave every 5 minutes
Notes

Ensure that localStorage is supported in your target browsers.
The encryption provided by SaveTek.js is basic. Consider using a more secure encryption method for sensitive data.
Always test localStorage functionality extensively across different browsers and devices to ensure compatibility.
License

This project is licensed under the MIT License - see the LICENSE.md file for details.
