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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
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
    return this.http
      .patch<any>(
        `${environment.serverUrl}` + `/campaign/update-campaign/${id}`,
        updates
      )
      .pipe(catchError(this.errorHandler));
  }

  createCampaign(newCampaign: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.serverUrl}` + `/campaign/create-campaign`,
        newCampaign
      )
      .pipe(catchError(this.errorHandler));
  }
  getCampaign(campaignID: any): Observable<any> {
    return this.http
      .get<any[]>(`${environment.serverUrl}` + `/campaign/${campaignID}`)
      .pipe(catchError(this.errorHandler));
  }

  deleteCampaign(id: any): Observable<any> {
    return this.http
      .delete<any[]>(`${environment.serverUrl}` + `/campaign/delete/${id}`)
      .pipe(catchError(this.errorHandler));
  }
}
