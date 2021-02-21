import {Inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  url = environment.apiUrl;

  constructor(
    @Inject(HttpClient)
    private httpClient: HttpClient,
  ) { }
  public getUsersListing(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'users' )
  }
  public getUsers(params : any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'users' , { params: params })
  }
}
