import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadModulesStrategy implements PreloadingStrategy {
  constructor(private log: NGXLogger) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      this.log.log('Preloaded', route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
