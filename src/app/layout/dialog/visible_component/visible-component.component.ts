import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-visible-component',
  templateUrl: './visible-component.component.html',
  styleUrls: ['./visible-component.component.scss'],
})
export class VisibleComponentComponent implements OnInit {
  dynamicForm: FormGroup;
  pageTitle: string;

  /** */
  /*cellsInfo = this.fb.group({});
 
  pageTitle: string;
  form: FormGroup;
  public cost_price: string;*/

  public dialogMenuJson = {};
  constructor(
    public dialogRef: MatDialogRef<VisibleComponentComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.cell as FormArray;
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      cell: new FormArray([]),
    });

    for (let i = 0; i < this.data.dataSource.length; i++) {
      this.addCells(this.data.dataSource[i]);
    }
  }

  addCells(cell) {
    let num = 0;
    for (const keys in cell) {
      if (num == this.data.index) {
        this.pageTitle = keys;
        this.t.push(
          this.formBuilder.group({
            name: [cell[keys], Validators.required],
            /*label: cell.Head,
            value: cell[keys],
            name: cell.Head*/
          })
        );
      }
      num++;
    }
  }

  /*ngOnInitOLD() {
      /*this.form = this.fb.group({
        cost_price: ['', Validators.required]
      });
      console.log(this.data.dataSource)
      //console.log(this.data.dataRow)
      for (let i = 0; i < this.data.dataSource.length; i++){
        this.addCells(this.data.dataSource[i]);
      }
    }*/

  closeComponentDialog(): void {
    this.dialogRef.close();
  }
  saveDialogData(): void {
    this.dialogRef.close({
      values: this.dynamicForm.value.cell,
      column: this.data.index,
    });
    //this.dialogRef.close();
  }

  /*setComponentStatus(event, index): void{
      environment.componentList[index].is_checked = event.checked;
      environment.componentList[index].hidden = !event.checked;
      console.log(event.checked);
      console.log(index);
    }*/

  public submit() {}
  getPlaceHolder(index) {
    if (index == 0) {
      return 'Transactions';
    }
    if (index == 1) {
      return 'AOV';
    }
    if (index == 2) {
      return 'TY Total Retail Sales';
    }
    if (index == 3) {
      return 'LY Total Retail Sales';
    }
    if (index == 4) {
      return '% Growth';
    }
    if (index == 5) {
      return 'Total Unit Sales';
    }
    if (index == 6) {
      return 'UPT';
    }
  }

  getReadOnly(index) {
    if (index == 2) {
      return true;
    }
    if (index == 3) {
      return true;
    }
    if (index == 4) {
      return true;
    }
    if (index == 5) {
      return true;
    }
    if (index == 6) {
      return true;
    }
    return false;
  }

  getValue(item) {
    let num = 0;
    for (const keys in item) {
      if (num == this.data.index) {
        this.pageTitle = keys;
        return item[keys];
      }
      num++;
    }
  }

  /*getColumnIndex(row, columnIndex){
    if (columnIndex == row){
      return 'Month 1';
    }
  }*/
}
