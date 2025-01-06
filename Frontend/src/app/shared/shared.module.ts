import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { FormExampleComponent } from './components/form-example/form-example.component';
import { TableComponent } from './components/table/table.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './header/header.component';
import { NavigationSideNavComponent } from './navigation-side-nav/navigation-side-nav.component';
import { MiniHeaderComponent } from './mini-header/mini-header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderService } from './header/header.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonMatSelectComponent } from './mat-select-search/mat-select-search.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@NgModule({
  declarations: [
    HeaderComponent,
    NavigationSideNavComponent,
    ConfirmationDialogComponent,
    TableComponent,
    AlertComponent,
    FormExampleComponent,
    MiniHeaderComponent,
    FooterComponent,
    CommonMatSelectComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatButtonToggleModule,
    MatDialogClose,
    NgxMatSelectSearchModule
  ],
  exports: [
    HeaderComponent,
    NavigationSideNavComponent,
    ConfirmationDialogComponent,
    TableComponent,
    MatSnackBarModule,
    AlertComponent,
    MiniHeaderComponent,
    FormExampleComponent,
    FooterComponent,
    CommonMatSelectComponent
  ],
  providers: [
    AlertService,
    MatDatepickerModule,
    HeaderService,
    provideHttpClient()
  ]
})
export class SharedModule { }
