import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddtocartComponent } from './addtocart/addtocart.component';

@NgModule({
  declarations: [AddtocartComponent],
  imports: [CommonModule, SharedRoutingModule, RouterModule, MaterialModule],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AddtocartComponent,
  ],
})
export class SharedModule {}
