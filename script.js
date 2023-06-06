// Initialize Firebase with your project credentials
const firebaseConfig = {
  apiKey: "AIzaSyASNvYPMn_Aqce9YmUQbmf4L8Oou0wLbuo",
  authDomain: "simple-nfc-reader.firebaseapp.com",
  projectId: "simple-nfc-reader",
  storageBucket: "simple-nfc-reader.appspot.com",
  messagingSenderId: "286606036004",
  appId: "1:286606036004:web:a2b3e4a99af0a2d2df1cb1",
  measurementId: "G-6DQF788Y5L"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

    // Check browser support
    if ("NDEFReader" in window) {
      const reader = new NDEFReader();

      // Request permission to access NFC hardware
      reader.scan().then(() => {
        // User granted permission
      }).catch((error) => {
        // User denied permission or NFC not available
        console.error("Error while scanning:", error);
      });

      // Read NFC tag data
      reader.onreading = (event) => {
        const { records } = event.message;

        // Process the tag data
        records.forEach((record) => {
          const { recordType, data } = record;

          // Populate form field with tag data
          document.getElementById("tagData").value = new TextDecoder().decode(data);

          // Store data to Firebase
          const tagData = document.getElementById("tagData").value;
          const dataRef = database.ref("tagData");

          dataRef.push(tagData)
            .then(() => {
              console.log("Data stored to Firebase successfully!");
            })
            .catch((error) => {
              console.error("Error storing data to Firebase:", error);
            });
        });
      };

      reader.onerror = (error) => {
        // Handle any errors while reading
        console.error("Error while reading:", error);
      };
    } else {
      // Web NFC is not supported
      console.error("Web NFC is not supported in this browser.");
    }