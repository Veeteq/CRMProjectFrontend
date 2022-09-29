import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DocumentDetail } from "../model/document-detail";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;

  constructor(private httpClient: HttpClient) { }
 
  saveDocument(formData: FormData, isNew: boolean): Observable<HttpResponse<DocumentDetail>> {
    const saveUrl = `${this.apiUrl}/save`;

    if (isNew) {
      return this.httpClient.post<DocumentDetail>(saveUrl, formData, { observe: 'response' })
        .pipe(catchError(this.handleError));
    } else {
      return this.httpClient.put<DocumentDetail>(saveUrl, formData, { observe: 'response' })
        .pipe(catchError(this.handleError));
    }
  }

  getDocumentTypes(): Observable<any[]> {
    const typesUrl = `${this.apiUrl}/types`;
    return this.httpClient.get<any[]>(typesUrl);
  }

  getPaymentMethods(): Observable<any[]> {
    const paymentMethodsUrl = `${this.apiUrl}/paymentMethods`;
    return this.httpClient.get<any[]>(paymentMethodsUrl);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
    }
    return throwError("Unexpected error - please try again later");
  }
}