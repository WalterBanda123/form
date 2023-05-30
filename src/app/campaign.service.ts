import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {}

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
    return this.http
      .get<any[]>(`${environment.serverUrl}` + `/campaign`)
      .pipe(catchError(this.errorHandler));
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
}
