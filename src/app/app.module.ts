import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ConsultaComponent } from './consulta/pages/consulta/consulta.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FiltroPipe } from './consulta/Pipes/filtro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ConsultaComponent,
    FiltroPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgxPaginationModule,
    MatTooltipModule,
    ReactiveFormsModule, 
    FormsModule,
    NgxDateRangeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
