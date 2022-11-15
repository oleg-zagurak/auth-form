import { Component, OnInit } from '@angular/core';

import { Blog } from '../../interfaces/blog';

import { BlogDataService } from '../../services/blog-data.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-create-new-blog',
  templateUrl: './create-new-blog.component.html',
  styleUrls: ['./create-new-blog.component.css']
})
export class CreateNewBlogComponent implements OnInit {
  private _enable: boolean = true;
  private _id!: number;
  private _userName!: string;
  constructor(private blogData: BlogDataService, private userData: UserDataService) {
    if (userData.id !== undefined) this._id = userData.id;
    if (userData.userName !== undefined) this._userName = userData.userName;
  }

  ngOnInit(): void {
  }
  enableBtn(theme: string, text: string): void {
    theme && text ? this._enable = false : this._enable = true;
  }
  get enable(): boolean {
    return this._enable
  }
  addNewBlog(theme: HTMLInputElement, text: HTMLTextAreaElement): void {
    try {
      const blog: Blog = {
        data: new Date().getTime(),
        id: this._id,
        theme: theme.value,
        text: text.value,
        userName: this._userName
      }
      this.blogData.addNewBlog(blog);
      this.clearFields(theme, text)
    } catch (e){
      console.log(e)
    }
  }
  private clearFields(theme: HTMLInputElement, text: HTMLTextAreaElement): void{
    theme.value = text.value = '';
    this._enable = true;
  }
}
