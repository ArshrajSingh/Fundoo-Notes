import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-components-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  hideNoteBar: Boolean = false;
  hide: Boolean = false;
  hideLogo: Boolean = false;
  advancedUser: Boolean = true;
  searchData: string = '';


  noteColor = new FormControl('#FFFFFF');

  title = new FormControl('', [Validators.required]);
  content = new FormControl('', [ ]);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private titleService: Title, private breakpointObserver: BreakpointObserver,
    private noteSvc: NoteService , private router: Router , private route: ActivatedRoute) {
    this.setTitle('Dashboard');
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }

  changeHide() {
    this.hide = !this.hide;
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  allNotes() {
    this.hideNoteBar = false;
    this.router.navigate(['allNotes'] , {relativeTo : this.route} );
  }

  saveNote() {
    let data = {title: this.title.value, description: this.content.value, color: this.noteColor.value };
    this.noteSvc.saveNote(data);
    this.title.setValue('');
    this.content.setValue('');
    this.noteColor.setValue('#FFFFFF');
  }

  fetchDeletedNotes() {
    this.hideNoteBar = true;
    this.router.navigate(['deleted'], {relativeTo: this.route});
  }

  fetchArchiveNotes() {
    this.router.navigate(['archive'], {relativeTo: this.route});
  }

  onStatusChanged() {
      this.noteSvc.searchData(this.searchData);
  }

  clearSearch() {
    this.searchData = '';
  }
}