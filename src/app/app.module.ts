import {BrowserModule} from '@angular/platform-browser';
import {NgModule, isDevMode} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';

import {EffectsModule} from '@ngrx/effects';
import {EntityDataModule} from '@ngrx/data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as fromApp from './reducers';
import { AuthGuard } from './auth/auth.guard';
import { metaReducers } from './reducers';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(fromApp.reducers, {
      metaReducers,
      runtimeChecks:{
      strictActionImmutability: true,
      strictStateImmutability:true,
      strictActionSerializability:true,
      strictStateSerializability :true 
    }}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(fromApp.appFeatureKey, fromApp.reducers),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey:'router',
      routerState:RouterState.Minimal
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
