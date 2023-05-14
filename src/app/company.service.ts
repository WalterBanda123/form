import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Company } from './company';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'my-auth-token',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE,OPTIONS',
    // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  });
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

  //---GETTING THE COMPANIES LIST----

  getCompanies(): Observable<Company[]> {
    return this.http

      .get<Company[]>(`${environment.serverUrl}` + `/companies`, {
        withCredentials: true,
      })

      .pipe(catchError(this.errorHandler));
  }

  createCompany(newCompany: any): Observable<any> {
    return this.http

      .post<any>(`${environment.serverUrl}` + `/companies`, newCompany, {
        withCredentials: true,
      })

     

      .pipe(catchError(this.errorHandler));
  }

  deleteCompany(companyId: string): Observable<Company> {
    return this.http

      .delete<Company>(`${environment.serverUrl}` + `/companies/${companyId}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }
  getCompany(companyId: string): Observable<Company> {
    return this.http

      .get<Company>(`${environment.serverUrl}` + `/companies/${companyId}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }

  updateCompany(
    companyId: string,
    updates: { propertyName: string; value: string }[]
  ): Observable<any> {
    return this.http.patch<any>(

      `${environment.serverUrl}` + `/companies/${companyId}`,
      updates,
      { withCredentials: true }
      updates
    ).;
  }
}
