import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../interfaces/rest-interfaces';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  private url = 'http://localhost:3000/';

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.url + 'posts');
  }

  getPostsByPage(page: number, limit: number): Observable<any> {
    return this.http
      .get<any>(this.url + 'posts?_page=' + page + '&_limit=' + limit, {observe: 'response'});
  }

  addPost(post: Post): Observable<any> {
    return this.http
      .post(this.url + 'posts', {
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      });
  }

  editPost(post: Post): Observable<any> {
    return this.http
      .put(this.url + 'posts/' + post.id, {
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.url + 'posts/' + id);
  }
}
