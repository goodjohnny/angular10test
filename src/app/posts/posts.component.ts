import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../services/http.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router, private helper: HelperService) {
  }

  posts = [];
  pageSize = 5;
  page = 1;
  pageEvent: PageEvent;

  totalPosts: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params.page || 1;
      this.getPosts(this.page);
    });
  }

  public pageChange(event?: PageEvent): PageEvent {
    this.router.navigate([`posts`], {queryParams: {page: event.pageIndex + 1}});
    return event;
  }

  public getPosts(page): void {
    this.httpService.getPostsByPage(page, this.pageSize)
      .subscribe((resp: any) => {
        this.posts = resp.body;
        this.totalPosts = resp.headers.getAll('x-total-count')[0];
      });
  }

  public deletePost(id: number): void {
    this.helper.openDialog('Warning!', 'Are you sure?', true).afterClosed().subscribe(result => {
      if (result) {
        this.httpService.deletePost(id).subscribe((result) => {
          this.helper.openDialog('Success', 'Post deleted!').afterClosed().subscribe((result) => {
            this.router.navigate([`posts`], {queryParams: {page: 1}});
          });
        });
      }
    });
  }
}
