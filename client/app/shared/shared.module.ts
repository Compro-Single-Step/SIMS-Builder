import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Imports from External Libraries
import { TabsModule, PopoverModule } from 'ng2-bootstrap';
import {LabelComponent } from './label/label.component';
import { InputFactoryService } from './input-factory.service';
import { ComponentRepositoryService, getDeclarationComps, getEntryComps } from './component-repository.service';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    FormsModule
  ],
  exports: [LabelComponent],
  declarations: [ ...getDeclarationComps() ],
  entryComponents: [ ...getEntryComps() ],
  providers: [ InputFactoryService, ComponentRepositoryService ]
})
export class SharedModule { }
