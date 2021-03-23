import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CredentialInfo } from '../models/credential-info';
import firebase from 'firebase/app';
import { BaseHttpService } from './base-http';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseHttpService {

constructor(private afAuth: AngularFireAuth, toastr: ToastrService) {
  super(toastr);
 }

 register(request: CredentialInfo): Promise<firebase.auth.UserCredential>{
   return this.afAuth.createUserWithEmailAndPassword(request?.email, request?.password).catch(this.catchError.bind(this));
 }

 login(request: CredentialInfo): Promise<firebase.auth.UserCredential> {
   return this.afAuth.signInWithEmailAndPassword(request?.email, request?.password).catch(this.catchError.bind(this));
 }

 logout(): Promise<void> {
   return this.afAuth.signOut();
 }



}
