import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
    apiKey: "AIzaSyBnaAqpijAb8QgLejEs0GqMRcdo3gmuyHY",
    authDomain: "meetbd.firebaseapp.com",
    projectId: "meetbd",
    storageBucket: "meetbd.appspot.com",
    messagingSenderId: "101201286652",
    appId: "1:101201286652:web:4804e9113c1b1d95580e79",
    measurementId: "G-8PLFL3BS74",
    scopes: ['https://www.googleapis.com/auth/calendar']
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Android client ID: 101201286652-9fsvons223rn4lob5qou47d9jrcj2g7r.apps.googleusercontent.com
// Expo web: 101201286652-003g9m57t01v0idpss6d0cchadlun1i2.apps.googleusercontent.com
/*
Configuration: Build Credentials 3qnNyN8oX9 (Default)
Keystore
Type                JKS
Key Alias           7458a3706696c58c97127268042935bf
MD5 Fingerprint     A5:BD:67:7F:D7:6C:12:9B:C7:8C:55:5F:33:4D:CF:1F
SHA1 Fingerprint    21:FC:47:2C:48:C9:49:08:58:D0:9C:6B:89:47:51:D1:38:B1:45:36
SHA256 Fingerprint  87:82:F9:1A:9C:13:33:75:69:4A:D7:7D:61:5C:06:CE:C3:D3:1C:BF:44:BF:20:D5:71:2F:6C:5E:95:CF:7F:EB
Updated             3 seconds ago
*/