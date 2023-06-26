import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {
    this.userLoggedIn = JSON.parse(localStorage.getItem('authenticatedUser')!);
  }

  userLoggedIn: any;
  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getCampaigns(): Observable<any[]> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .get<any[]>(`${environment.serverUrl}` + `/campaign`, { headers })
        .pipe(catchError(this.errorHandler));
    }

    return of([]);
  }

  updateCampaign(id: string, updates: any): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .patch<any>(
          `${environment.serverUrl}` + `/campaign/update-campaign/${id}`,
          updates,
          { headers }
        )
        .pipe(catchError(this.errorHandler));
    }
    return of([]);
  }

  createCampaign(newCampaign: any): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .post<any>(
          `${environment.serverUrl}` + `/campaign/create-campaign`,
          newCampaign,
          { headers }
        )
        .pipe(catchError(this.errorHandler));
    }
    return of([]);
  }

  getCampaign(campaignID: any): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .get<any[]>(`${environment.serverUrl}` + `/campaign/${campaignID}`, {
          headers,
        })
        .pipe(catchError(this.errorHandler));
    }
    return of([]);
  }

  deleteCampaign(id: any): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .delete<any[]>(`${environment.serverUrl}` + `/campaign/delete/${id}`, {
          headers,
        })
        .pipe(catchError(this.errorHandler));
    }
    return of([]);
  }
}
