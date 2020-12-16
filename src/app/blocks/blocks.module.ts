import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppComponent } from './root/app.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule,
  ],
  exports: [AppComponent],
})
export class BlocksModule {}
