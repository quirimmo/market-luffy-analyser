import axios, { AxiosStatic, AxiosResponse } from 'axios';
import { from, Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export default class HTTPRequester {
  public axios: AxiosStatic = axios;
  constructor() {}

  get(requestURL: string): Observable<AxiosResponse<any>> {
    return from(this.axios.get(requestURL));
  }

  getAll(requestURLS: string[]): Observable<any> {
    const allObservables: Observable<AxiosResponse<any>>[] = requestURLS.map(requestURL => from(this.axios.get(requestURL)));
    return forkJoin(allObservables);
  }
}
