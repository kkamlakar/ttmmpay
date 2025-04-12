import { Component, OnInit } from '@angular/core';
import { AddPersonsComponent } from "./addpersons/addpersons.component";
import { AddDishesComponent } from "./adddishes/adddishes.component";
import { SplitterComponent } from "./splitter/splitter.component";

// Firebase imports
import { Firestore, doc, getDoc, setDoc, updateDoc, increment } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';

// Firebase Configuration (add your own configuration here)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-bucket.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase app
const firestore: Firestore = getFirestore(app); // Get Firestore instance

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

  private counterDocRef = doc(firestore, 'counter/hitCounter'); // Reference to Firestore document

  async ngOnInit() {
    console.log('AppComponent initialized'); // This should appear in the console
    try {
      await this.initializeCounter(); // Ensure the counter is initialized
      await this.incrementCounter(); // Increment the counter by 1
      this.count = await this.getCount(); // Get the updated counter value
      console.log('Current Count:', this.count); // Log the current count
    } catch (err) {
      console.error('Error updating hit counter:', err);
    }
  }

  // Counter initialization logic (set to 0 if doesn't exist)
  async initializeCounter() {
    const docSnap = await getDoc(this.counterDocRef);
    if (!docSnap.exists()) {
      await setDoc(this.counterDocRef, { count: 0 }); // Set initial count to 0 if document doesn't exist
    }
  }

  // Increment counter by 1
  async incrementCounter(): Promise<void> {
    await updateDoc(this.counterDocRef, {
      count: increment(1), // Increment the counter in Firestore
    });
  }

  // Get the current count from Firestore
  async getCount(): Promise<number> {
    const docSnap = await getDoc(this.counterDocRef);
    return docSnap.exists() ? docSnap.data()['count'] : 0; // Return current count from Firestore
  }
}
