import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/reducers/auth.reducer';
import { authEffect } from './store/effects/auth.effect';
import { provideHttpClient } from '@angular/common/http';
import { LandingComponent } from './public/landing/landing.component';
import { HomeComponent } from './user/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { UserModule } from './user/user.module';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffect } from './store/effects/user.effect';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    NgIconsModule.withIcons({ heroUsers }),
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    UserModule,
    CommonModule,
    StoreModule.forRoot({
      authReducer: authReducer,
      // userReducer: userReducer
    }, {}),
    EffectsModule.forRoot([authEffect,
      // UserEffect
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
