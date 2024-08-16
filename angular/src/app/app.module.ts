import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TimeComponent } from './time/time.component';
import { KickoutComponent } from './kickout/kickout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TimeComponent,
    KickoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
