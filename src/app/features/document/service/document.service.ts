import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DocumentDetail } from "../model/document-detail";
import { PageResponse } from "../model/page-response";

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

  getSummary(page: number, size: number, column: string, dir: string): Observable<PageResponse> {
    let params = new HttpParams();
    params = params.append('page',   page.toString());
    params = params.append('size',   size.toString());
    params = params.append('column', column);
    params = params.append('dir',    dir);
    const getSummaryUrl = `${this.apiUrl}/summary/`;
    return this.httpClient.get<PageResponse>(getSummaryUrl, { params });
  }

  getDocumentTypes(): Observable<any[]> {
    const documentTypesUrl = `${this.apiUrl}/types`;
    return this.httpClient.get<any[]>(documentTypesUrl);
  }

  getPaymentMethods(): Observable<any[]> {
    const paymentMethodsUrl = `${this.apiUrl}/paymentMethods`;
    return this.httpClient.get<any[]>(paymentMethodsUrl);
  }

  getUniqueTitles(value: string[]) {
    console.log("getUniqueTitles: " + value);
    const documentTitlesUrl = `${this.apiUrl}/documentTitles/${value}`;
    return this.httpClient.get<string[]>(documentTitlesUrl);
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