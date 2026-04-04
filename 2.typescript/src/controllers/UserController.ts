import { Injectable } from "../decorators/injectable";
import { ProductService } from "../services/ProductService";
import { UserService } from "../services/UserService";
@Injectable
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}
  findAll() {
    console.log(`Findall from controller`);
    this.userService.findAll();
    this.productService.getProducts();
  }
}

//new UserController(new UserService, new ProductService)

//UserService --> lấy PostService

//new UserService(new PostService)
