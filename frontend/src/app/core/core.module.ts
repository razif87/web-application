import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { ModuleImportGuard } from './guard/module-import.guard';
import { DataService } from './service/data.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    InMemoryWebApiModule.forRoot(DataService),
    LoggerModule.forRoot({
      level: !environment.production ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.OFF,
      serverLogLevel: NgxLoggerLevel.OFF
    })
  ]
})
export class CoreModule extends ModuleImportGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
