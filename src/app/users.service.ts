import {Injectable} from '@angular/core';
import Participant from "./models/participant";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<Participant[]> {
      return this.http.get<Participant[]>('api/participants');
    }
}
