import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './blocks/root/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { BlocksModule } from './blocks/blocks.module';
import { CoreModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';
import { AuthHeaderInterceptorService } from './core/interceptor/auth-header-interceptor.service';
import {
  StoreModule,
  USER_PROVIDED_META_REDUCERS,
  META_REDUCERS,
} from '@ngrx/store';
import { CartModule } from './cart/cart.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './core/cart/cart.reducers';
import {
  metaReducerFactory,
  metaReducers,
} from 'src/app/core/cart/cart.meta-reducer';
import { CartService } from './core/cart/cart.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    BlocksModule,
    CoreModule,
    AuthModule,
    CartModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true,
    },
    {
      provide: META_REDUCERS,
      deps: [CartService],
      useFactory: metaReducerFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
