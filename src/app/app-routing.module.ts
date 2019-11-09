import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeletedNotesComponent } from './components/deleted-notes/deleted-notes.component';
import { NotesComponent } from './components/notes/notes.component';
import { ArchivedNotesComponent } from './components/archived-notes/archived-notes.component';
import { ServicePurchaseComponent } from './components/service-purchase/service-purchase.component';
import { ShowLabelsComponent } from './components/show-labels/show-labels.component';
import { ShowReminderComponent } from './components/show-reminder/show-reminder.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'deleted' , component: DeletedNotesComponent},
      {path: 'allNotes', component: NotesComponent},
      {path: '', component: NotesComponent},
      {path: 'archive', component: ArchivedNotesComponent},
      {path: 'show-labels/:label', component: ShowLabelsComponent},
      {path: 'showReminder', component: ShowReminderComponent},
      {path: 'question/:noteId', component: QuestionComponent},
    ]
  },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: 'purchase', component: ServicePurchaseComponent },
  { path: 'question', component: QuestionComponent},
  { path: '**', redirectTo: '/purchase' }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
