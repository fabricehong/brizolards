import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import Messaging = firebase.messaging.Messaging;

interface TokenItem {
    tokenID: string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    private messaging: Messaging;
    token: any;  // Stores the current token ID instance generated
    items: AngularFireList<TokenItem>;
    itemsDisplay: AngularFireList<any[]>; // List observable for template view (Optional. items itself can be used)
    itemsArr: any[]; // Stores the token IDs retrieved from the firebase database
    hideToken = false;

    pushData: any = {
        'notification': {
            'title': 'Background Message Title',
            'body': 'Background Message Body'
        },
        'to': ''
    };

  constructor(
    public db: AngularFireDatabase,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.initializeMessaging();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    private initializeMessaging() {
        // initialize firebase
        this.messaging = firebase.messaging();

        // Check for Token Refresh
        this.messaging.onTokenRefresh(function () {
            this.messaging.getToken()
                .then(function (refreshedToken) {
                    console.log('Token refreshed.');
                })
                .catch(function (err) {
                    console.log('Unable to retrieve refreshed token ', err);
                });
        });

        // Obtaining Firebase Data and extracting to an Array
        this.itemsArr = [];  // Reinitialize the array to prevent data duplication
        // this.items = this.db.list('/items', { preserveSnapshot: true });
        this.items = this.db.list('/items');
        this.items.valueChanges().subscribe(items => {
            items.forEach(item => {
                console.log(item);
                this.itemsArr.push(item);
            });
        });
    }

    /**
     * Check for Existing Tokens
     * @param token
     * @param arr
     */
    checkToken(token, arr) {
        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === token) {
                counter++;
            }
        }
        console.log('Counter value', counter);
        return counter;
    }

    ngOnInit() {
        // Request for Permission, Token Fetch, Check and Store
        const self = this;
        this.items = this.db.list('/items');
        this.messaging.requestPermission()
            .then(function () {
                console.log('Notification permission granted.');
                self.messaging.getToken()
                    .then(function (currentToken) {
                        if (currentToken) {
                            self.token = currentToken;
                            self.pushData.to = self.token;
                            console.log(self.pushData.to);
                            // Set a timeout so as to enable all the data to be loaded
                            setTimeout(() => {
                                if (self.checkToken(self.token, self.itemsArr) === 0) {
                                    console.log('Push occurrence');
                                    self.items.push({ tokenID: currentToken });
                                } else {
                                    console.log('User is already subscribed');
                                }
                            }, 6500);
                            // Displays the current token data
                            console.log('currentToken: ', currentToken);
                        } else {
                            // Show permission request.
                            console.log('No Instance ID token available. Request permission to generate one.');
                        }
                    })
                    .catch(function (err) {
                        console.log('An error occurred while retrieving token.', err);
                    });
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify. ', err);
            });

        // Handle Incoming Messages and Payload
        this.messaging.onMessage(function (payload) {
            console.log('Message received. ', payload);
            alert(payload);
        });
    }
}
