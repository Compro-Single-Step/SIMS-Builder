import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports from External Libraries
import { TabsModule } from 'ng2-bootstrap';

//Importing the components available for dynamic insertion.
import { TextBoxComponent } from './text-box/text-box.component';
import { PanelComponent } from './panel/panel.component';
import { LabelComponent } from './label/label.component';
import { TagComponent } from './tag/tag.component';
import { SelectComponent } from './select/select.component';
import { TabComponent } from './tab/tab.component';
import { ButtonComponent } from './button/button.component';

import { InputFactoryService } from './input-factory.service';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot()
  ],
  declarations: [TextBoxComponent, PanelComponent, LabelComponent, TagComponent, SelectComponent, TabComponent, ButtonComponent, DropzoneComponent, WrapperComponent],
  entryComponents: [TextBoxComponent, PanelComponent, SelectComponent, TabComponent, ButtonComponent, DropzoneComponent],
  providers: [InputFactoryService]
})
export class SharedModule { }
