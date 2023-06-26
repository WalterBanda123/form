import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Company } from './company';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
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

  //---GETTING THE COMPANIES LIST----

  getCompanies(): Observable<Company[]> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .get<Company[]>(`${environment.serverUrl}` + `/companies`, { headers })
        .pipe(catchError(this.errorHandler));
    }

    return of([]);
  }

  createCompany(newCompany: any): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );

      return this.http
        .post<any>(`${environment.serverUrl}` + `/companies`, newCompany, {
          headers,
        })
        .pipe(catchError(this.errorHandler));
    }

    return of({});
  }

  deleteCompany(companyId: string): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .delete<Company>(
          `${environment.serverUrl}` + `/companies/${companyId}`,
          { headers }
        )
        .pipe(catchError(this.errorHandler));
    }

    return of({});
  }

  getCompany(companyId: string): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .get<Company>(`${environment.serverUrl}` + `/companies/${companyId}`, {
          headers,
        })
        .pipe(catchError(this.errorHandler));
    }

    return of({});
  }

  searchImplementation(text: string): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http
        .post<Company[]>(
          `${environment.serverUrl}` + `/companies/search`,
          { searched: text },
          {
            headers,
          }
        )
        .pipe(catchError(this.errorHandler));
    }
    return of([]);
  }

  updateCompany(
    companyId: string,
    updates: { propertyName: string; value: string }[]
  ): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http.patch<any>(
        `${environment.serverUrl}` + `/companies/${companyId}`,
        updates,
        { headers }
      );
    }
    return of({});
  }

  filterByStatusAndSize(
    companySize: string,
    companyStatus: string
  ): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http.post<any>(
        `${environment.serverUrl}` + `/companies/search-size-status`,
        { companySize, companyStatus },
        { headers }
      );
    }
    return of({});
  }

  filterByStatus(companyStatus: string): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http.post<any>(
        `${environment.serverUrl}` + `/companies/search-status`,
        { companyStatus },
        { headers }
      );
    }
    return of({});
  }
  filterBySize(companySize: string): Observable<any> {
    if (this.userLoggedIn.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userLoggedIn.token}`
      );
      return this.http.post<any>(
        `${environment.serverUrl}` + `/companies/search-size`,
        { companySize },
        { headers }
      );
    }
    return of({});
  }
}
