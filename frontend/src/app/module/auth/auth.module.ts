import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, AuthRoutingModule]
})
export class AuthModule {}
