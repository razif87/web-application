import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from 'src/app/shared/model/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  SERVER_URL = 'http://localhost:8080/api';
  dashboardPageSize = this.SERVER_URL + '/dashboard/pagesize';
  constructor(private http: HttpClient) {}

  public types(): Dashboard[] {
    return [
      {
        id: 'team',
        name: 'Team'
      },
      {
        id: 'product',
        name: 'Product'
      }
    ];
  }

  public getPageSize() {
    return this.get(this.dashboardPageSize);
  }

  public get(route: string): Observable<any> {
    return this.http.get(route);
  }
}
