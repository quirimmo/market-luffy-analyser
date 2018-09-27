import axios, { AxiosStatic, AxiosResponse } from 'axios';
import { from, Observable, forkJoin } from 'rxjs';

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
