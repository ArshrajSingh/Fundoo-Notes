import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatInputModule, MatListModule,
  MatCardModule, MatFormFieldModule, MatMenuModule, MatSelectModule,
  MatOptionModule, MatIconModule, MatSnackBarModule, MatSidenavModule,
  MatToolbarModule, MatTooltipModule, MatCheckboxModule, MatExpansionModule, MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpServiceService } from '../app/services/http-service.service';
import { UserServiceService } from '../app/services/user-service.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotesComponent } from './components/notes/notes.component';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
import { DeletedNotesComponent } from './components/deleted-notes/deleted-notes.component';
import { ArchivedNotesComponent } from './components/archived-notes/archived-notes.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    DashboardComponent,
    NotesComponent,
    AllNotesComponent,
    DeletedNotesComponent,
    ArchivedNotesComponent,
    DialogComponent,
    CollaboratorComponent
  ],
  entryComponents: [
    DialogComponent,
    CollaboratorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatOptionModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule,
    MatDialogModule
  ],
  providers: [
    HttpServiceService,
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
