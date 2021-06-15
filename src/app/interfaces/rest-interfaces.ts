export class Post {
  constructor(title, desc, crAt, upAt, id?) {
    this.title = title;
    this.description = desc;
    this.createdAt = crAt;
    this.updatedAt = upAt;
    this.id = id;
  }
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  id: 1;
}
