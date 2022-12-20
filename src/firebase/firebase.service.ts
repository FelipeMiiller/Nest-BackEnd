import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';

@Injectable()
export class FirebaseService {
  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: 'https://finance-72a14.firebaseio.com',
    projectId: process.env.PROJECT_ID,
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    messagingSenderId: 'SENDER_ID',
    appId: process.env.APP_ID,
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId: 'G-MEASUREMENT_ID',
  };

  public appFireBase = initializeApp(this.firebaseConfig);
}
