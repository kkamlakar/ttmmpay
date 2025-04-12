import { Component, OnInit } from '@angular/core';
import { AddPersonsComponent } from "./addpersons/addpersons.component";
import { AddDishesComponent } from "./adddishes/adddishes.component";
import { SplitterComponent } from "./splitter/splitter.component";

// Firebase imports
import { Firestore, doc, getDoc, setDoc, updateDoc, increment, connectFirestoreEmulator } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-bucket.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

interface CounterData {
  count: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddPersonsComponent, AddDishesComponent, SplitterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ttmmpay';
  count = 0;
  private counterDocRef: any;

  ngOnInit(): void {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);  // Initialize Firebase with environment config
    const firestore: Firestore = getFirestore(app);  // Get Firestore instance
    
    // Connect to Firestore emulator if running locally
    connectFirestoreEmulator(firestore, 'localhost', 8080); // Emulator settings for localhost

    // Reference to the Firestore document for counter
    this.counterDocRef = doc(firestore, 'counter/hitCounter');

    this.initializeCounter();
    this.incrementCounter();
  }

  // Counter initialization logic (keeps it within the AppComponent)
  async initializeCounter() {
    const docSnap = await getDoc(this.counterDocRef);
    if (!docSnap.exists()) {
      await setDoc(this.counterDocRef, { count: 0 });  // Set initial count if doc doesn't exist
    }
  }

  async incrementCounter() {
    await updateDoc(this.counterDocRef, {
      count: increment(1),  // Increment the counter in Firestore
    });
  }

  // Safely get count with proper typing
  async getCount() {
    const docSnap = await getDoc(this.counterDocRef);
    const data = docSnap.data() as CounterData; // Cast the data to CounterData type
    return data ? data.count : 0;  // Return the count or 0 if not found
  }
}
