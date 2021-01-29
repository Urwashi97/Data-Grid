import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { VisibleComponentComponent } from './layout/dialog/visible_component/visible-component.component';
import { MaterialLayoutModule } from './layout/material-layout/material-layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatTableModule,
    MaterialLayoutModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [AppComponent, VisibleComponentComponent],
  entryComponents: [VisibleComponentComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent],
})
export class AppModule {}
