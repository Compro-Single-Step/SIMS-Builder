import { Component, OnInit, ElementRef, Input } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

@Input() data: GroupCompData;
 $el: any;
 constructor(el: ElementRef) {
   this.$el = jQuery(el.nativeElement);
   jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
 }

 ngOnInit() {
   this.$el.find('.widget').widgster();
 }
}
class GroupCompData{
        id: string;
        label: string;
        itemRenderer: string;
        itemType: string;
        tags: [
          {
            compName: string,
            type: string
          }
        ];
        rendererProperties: {
          collapsable: boolean,
          optionalItems: boolean
        };
        items: Array<item>;
}
class item {
  id: string;
  label: string;
  desc: {
    basic: string,
    detailed? : string
  };
  itemRenderer: string;
  itemType: string;
  mandatory: boolean;
  rendererProperties: {
    dataType: string
  };
  modelReference: string;
}
