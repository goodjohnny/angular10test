import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../services/http.service';
import {Post} from '../interfaces/rest-interfaces';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: HttpService,
              private helper: HelperService) {
    const state = this.router.getCurrentNavigation().extras.state;
    this.initForm();
    if (state) {
      this.id = state.id;
      this.edit = true;
      this.createdAt = state.createdAt;
      this.passToForm(state.title, state.description);
    }
  }

  form: FormGroup;
  private readonly edit: boolean;
  private readonly createdAt;
  private readonly id;
  private p: Post;

  ngOnInit(): void {
  }

  saveChanges(f: FormGroup): void {
    if (this.validate(f)) {
      const date = new Date().toISOString();
      this.p = new Post(this.form.value.title, this.form.value.description, this.edit ? this.createdAt : date,
        this.edit ? date : '', this.id);
      if (this.edit) {
        this.httpService.editPost(this.p)
          .subscribe(
            (resp) => {
              this.helper.openDialog('Success', 'Post edited!')
                .afterClosed().subscribe(result => {
                this.router.navigate([`posts`], {queryParams: {page: 1}});
              });
            },
            (error => {
              this.helper.openDialog('Error', 'Post not edited!');
            }));
      } else {
        this.httpService.addPost(this.p)
          .subscribe(
            (resp) => {
              this.helper.openDialog('Success', 'Post saved!')
                .afterClosed().subscribe(result => {
                this.router.navigate([`posts`], {queryParams: {page: 1}});
              });
            },
            (error => {
              this.helper.openDialog('Error', 'Post not saved!');
            }));
      }
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
  }

  passToForm(title, description): void {
    this.form.setValue({title, description});
  }

  validate(f: FormGroup): boolean {
    if (!f.value.title) {
      this.helper.openDialog('Error', 'Title is empty');
      return false;
    }
    if (!f.value.description) {
      this.helper.openDialog('Error', 'Description is empty');
      return false;
    }
    return true;
  }
}
