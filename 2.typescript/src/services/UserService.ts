import { Injectable } from "../decorators/injectable";
import { PostService } from "./PostService";
@Injectable
export class UserService {
  constructor(private readonly postService: PostService) {}
  findAll() {
    console.log(`Findall from service`);
    this.postService.getPosts();
  }
}
