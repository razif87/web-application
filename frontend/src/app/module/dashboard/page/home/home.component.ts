import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { DashboardService } from 'src/app/core/service/dashboard.service';
import { Dashboard } from 'src/app/shared/model/dashboard';
import { DashboardType } from 'src/app/shared/model/dashboard-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dashboardTypes: Dashboard[];
  constructor(private dashboardService: DashboardService, private log: NGXLogger) {}

  ngOnInit() {
    this.getDashboardType();
    this.getPageSize();
  }

  private getDashboardType() {
    const types = this.dashboardService.types();
    types.forEach(item => {
      this.log.info('dashboard', item);
      if (item.id === DashboardType.PRODUCT) {
        item.icon = 'pi-th-large';
      }
    });
    this.dashboardTypes = types;
  }

  private getPageSize() {
    this.dashboardService.getPageSize();
  }

  private pullDashboards() {}

  public setType(type?: any) {}
}
