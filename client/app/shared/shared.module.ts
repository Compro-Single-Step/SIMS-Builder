import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Imports from External Libraries
import { TabsModule, PopoverModule } from 'ng2-bootstrap';


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
import { TabPageComponent } from './tab-page/tab-page.component';
import { ExceptionHandlerService } from './exception-handler.service';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    FormsModule
  ],
  declarations: [TextBoxComponent, PanelComponent, LabelComponent, TagComponent, SelectComponent, TabComponent, ButtonComponent, DropzoneComponent, TabPageComponent],
  entryComponents: [TextBoxComponent, PanelComponent, SelectComponent, TabComponent, ButtonComponent, DropzoneComponent],
  providers: [InputFactoryService, ExceptionHandlerService]
})
export class SharedModule { }
