import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';


let mm = [
	MatTableModule,
	MatButtonModule,
	MatInputModule,
	MatIconModule,
	MatSliderModule,
	MatTooltipModule,
	MatProgressBarModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	...mm
  ],
  exports:[
	...mm
  ]
})
export class AngularMaterialModule { }
