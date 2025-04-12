import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  getFirestore,
  DocumentData,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { environment } from './environments/environment';

interface CounterData {
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class HitCounterService {
  private firestore: Firestore;
  private counterDocRef: any;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.firestore = getFirestore(app);
    this.counterDocRef = doc(this.firestore, 'counter/hitCounter');
  }

  async getCount(): Promise<number> {
    const docSnap: DocumentSnapshot<CounterData> = await getDoc(this.counterDocRef);
    return docSnap.exists() ? docSnap.data()!.count : 0;
  }

  async incrementCounter(): Promise<void> {
    await updateDoc(this.counterDocRef, {
      count: increment(1),
    });
  }

  async initializeCounter(): Promise<void> {
    const docSnap: DocumentSnapshot<CounterData> = await getDoc(this.counterDocRef);
    if (!docSnap.exists()) {
      await setDoc(this.counterDocRef, { count: 0 });
    }
  }
}
