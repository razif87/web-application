import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Policy {
  id: number;
  num: string;
  amount: number;
  userId: number;
  clientId: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  SERVER_URL = 'http://localhost:8080/api/';
  private $policies = new BehaviorSubject<Policy[]>([]);
  private dataStore: { policies: Policy[] } = { policies: [] };
  readonly policies = this.$policies.asObservable();

  constructor(private httpClient: HttpClient) {}

  public getPolicies() {
    return this.httpClient.get<Policy[]>(this.SERVER_URL + 'policies').subscribe(
      data => {
        this.dataStore.policies = data;
        this.$policies.next(Object.assign({}, this.dataStore).policies);
      },
      error => catchError(this.handleError)
    );
  }

  public getPolicy(policyId) {
    return this.httpClient
      .get(`${this.SERVER_URL + 'policies'}/${policyId}`)
      .pipe(catchError(this.handleError));
  }

  public createPolicy(policy: {
    id: number;
    amount: number;
    clientId: number;
    userId: number;
    description: string;
  }) {
    return this.httpClient
      .post(`${this.SERVER_URL + 'policies'}`, policy)
      .pipe(catchError(this.handleError));
  }

  public deletePolicy(policyId) {
    return this.httpClient.delete(`${this.SERVER_URL + 'policies'}/${policyId}`).subscribe(
      data => {
        this.dataStore.policies.forEach((t, i) => {
          if (t.id === policyId) {
            this.dataStore.policies.splice(i, 1);
          }
        });

        this.$policies.next(Object.assign({}, this.dataStore).policies);
      },
      error => catchError(this.handleError)
    );
  }

  public updatePolicy(policy: {
    id: number;
    amount: number;
    clientId: number;
    userId: number;
    description: string;
  }) {
    return this.httpClient
      .put(`${this.SERVER_URL + 'policies'}/${policy.id}`, policy)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
