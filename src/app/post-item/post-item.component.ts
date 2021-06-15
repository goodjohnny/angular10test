import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../interfaces/rest-interfaces';
import {HelperService} from '../services/helper.service';
import {HttpService} from '../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

const input = Input;

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {

  constructor(private dialog: MatDialog, private helper: HelperService, private httpService: HttpService, private router: Router) {
  }

  @Input() post: Post;
  @Input() deletePost: (id: number) => void;

  getFormattedDate = this.helper.getFormattedDate;
}
