import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  providers: [MessageService],
  imports: [
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MessageModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MessageModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ]
})
export class PrimengModule {}
