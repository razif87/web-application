import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const policies = [
      {
        id: 1,
        num: 'PO1',
        amount: 1000,
        userId: 1,
        clientId: 1,
        description: 'Insurance policy number PO1'
      },
      {
        id: 2,
        num: 'PO2',
        amount: 2000,
        userId: 1,
        clientId: 2,
        description: 'Insurance policy number PO2'
      },
      {
        id: 3,
        num: 'PO3',
        amount: 3000,
        userId: 1,
        clientId: 3,
        description: 'Insurance policy number PO3'
      },
      {
        id: 4,
        num: 'PO4',
        amount: 4000,
        userId: 1,
        clientId: 4,
        description: 'Insurance policy number PO4'
      }
    ];

    let returnType = 'observable';

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        policies.length = 0;
      }
      // 'returnType` can be 'object' | 'observable' | 'promise'
      returnType = body.returnType || 'object';
    }

    const db = { policies };

    switch (returnType) {
      case 'observable':
        return of(db).pipe(delay(10));
      case 'promise':
        return new Promise(resolve => {
          setTimeout(() => resolve(db), 10);
        });
      default:
        return db;
    }
  }
}
