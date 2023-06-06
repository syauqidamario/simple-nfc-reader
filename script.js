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

// Handle NFC scanning
const scanButton = document.getElementById('scanButton');
scanButton.addEventListener('click', async () => {
  try {
    const reader = new NDEFReader();
    await reader.scan();

    reader.addEventListener('reading', async (event) => {
      const records = event.message.records;
      const data = parseNFCData(records);
      await writeDataToFirebase(data);
      console.log('Data written to Firebase:', data);
    });
  } catch (error) {
    console.error('Error scanning NFC tag:', error);
  }
});

// Helper function to parse NFC data
function parseNFCData(records) {
  const record = records[0];
  const data = record.data.textDecoder.decode(record.data.payload);
  return data;
}


async function writeDataToFirebase(data) {
  const ref = database.ref('nfcData');
  await ref.set(data);
}