import { Injectable } from "../decorators/injectable";
import { AuthService } from "./AuthService";

@Injectable
export class PostService {
  constructor(private readonly authService: AuthService) {}
  getPosts() {
    console.log("getPosts");
    this.authService.login();
  }
}
