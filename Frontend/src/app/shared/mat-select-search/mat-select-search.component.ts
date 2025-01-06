import { Component, EventEmitter, Input, Output, SimpleChanges,  } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-common-mat-select',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.scss'],

})
export class CommonMatSelectComponent  {
  @Input() options: any[] = [];
  @Input() label:string ='';
  @Input() form!: FormGroup
  @Input() keys!: any
  @Input() control!: string;
  @Input() placeholder: string = '';
  @Input() searchPlaceholder: string = 'Search...';
  @Output() selectionChange = new EventEmitter<any>();

  searchControl = new FormControl();
  filteredOptions: any[] = [];

  ngOnChanges(changes: SimpleChanges) {

    if (changes['options'].currentValue ) {
      if (this.options) {
        this.filteredOptions = this.options;

        this.searchControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterOptions(value))
        ).subscribe(filtered => {
          this.filteredOptions = filtered;
        });
      }
    }
  }

  ngOnInit(){

  }


  private filterOptions(value: string): any[] {
    if (!value || typeof value !== 'string') {
      return this.options || []; 
    }
    const filterValue = value.toLowerCase();
    return this.options?.filter(option => option[this.keys[1]].toLowerCase().includes(filterValue));
  }

  onSelectionChange(event:any) {
    this.selectionChange.emit(event.value);
  }

  clearSelection() {
    this.form.controls[this.control].setValue(null);
    this.selectionChange.emit('');
  }
}
