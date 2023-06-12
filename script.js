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
      // Read NFC tag data
reader.onreading = async (event) => {
  const { records } = event.message;

  // Process the tag data
  for (const record of records) {
    const { recordType, data } = record;

    // Decode the NFC tag data
    const decodedData = new TextDecoder().decode(data);

    // Store data to Firebase
    const dataRef = database.ref("tagData");
    const newRecordRef = dataRef.push();

    // Get the form field values
    const name = document.getElementById("name").value;
    const companyName = document.getElementById("companyName").value;

    // Construct the data object to be stored in Firebase
    const tagData =
    {
      name: name,
      companyName: companyName,
      nfcData: decodedData,
    };

    try 
    {
      await newRecordRef.set(tagData);
      console.log("Data stored to Firebase successfully!");
    } catch (error) 
    {
      console.error("Error storing data to Firebase:", error);
    }}};
  }