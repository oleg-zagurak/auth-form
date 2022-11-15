import { Component, OnInit, DoCheck } from '@angular/core';

import { UserDataService } from '../../services/user-data.service';
import { BlogDataService } from '../../services/blog-data.service';

import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-blog-block',
  templateUrl: './blog-block.component.html',
  styleUrls: ['./blog-block.component.css']
})
export class BlogBlockComponent implements OnInit, DoCheck {
  private _blogs!: Blog[];
  private _isAdmin: boolean = false;
  private _userName!: string;
  private _currentEditableBlog!: Blog;
  private _editModalState: boolean = false;
  private _confirmModalState: boolean = false;
  private _confirmModalText: string = 'Ви дійно хочете видалити даний допис?';
  private _deleteConfirmationText: string = 'Ви дійно хочете видалити даний допис?';
  private _deleteAllConfirmationText: string = 'Ви дійно хочете видалити всі дописи?';
  private _indexReadyDelete!: number;
  constructor(private userData: UserDataService, private blogData: BlogDataService) {
    this._blogs = blogData.getAllBlogs();
    if(userData.isAdmin !== undefined) this._isAdmin = userData.isAdmin;
    this._userName = userData.userName;
  }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this._blogs = this.blogData.getAllBlogs();
  }
  editBlog(index: number): void{
    let blog = this._blogs[index];
    this._currentEditableBlog = blog;
    this._editModalState = true;
  }
  private deleteBlog(): void{
    let blogTODelete = this._blogs[this._indexReadyDelete];
    this.blogData.removeBlog(blogTODelete);
  }
  private deleteAllBlog(): void{
    this.blogData.removeAllBlogs();
  }
  confirmDeleting(index: number): void{
    this._indexReadyDelete = index;
    this._confirmModalState = true;
    this._confirmModalText = this._deleteConfirmationText;
  }
  confirmDeletingAll(): void{
    this._confirmModalState = true;
    this._confirmModalText = this._deleteAllConfirmationText;
  }
  closeEditModal(state: boolean): void{
    this._editModalState = state;
  }
  closeConfirmModal(state: boolean): void{
  if(state){
    if(this._confirmModalText === this._deleteConfirmationText){
      this.deleteBlog();
    } else {
      this.deleteAllBlog();
    }
  }
    this._confirmModalState = false;
  }
  parseDate(timestamp: number): string{
    let date: Date = new Date(timestamp);
    let dateString: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    let hours: string = `${date.getHours()}`;
    let minutes: string = `${date.getMinutes()}`;
    if(+minutes < 10) minutes = '0' + minutes;
    let parsedDate: string = `${hours}:${minutes} ${dateString}`;
    return parsedDate;
  }

  get blogs(): Blog[]{
    if(this._blogs !== undefined) return this._blogs;
    return [];
  }
  get isAdmin(): boolean{
    return this._isAdmin;
  }
  get userName(): string{
    return this._userName;
  }
  get currentEditableBlog(): Blog{
    return this._currentEditableBlog
  }
  get editModalState(): boolean{
    return this._editModalState
  }
  get confirmModalState(): boolean{
    return this._confirmModalState
  }
  get confirmModalText(): string{
    return this._confirmModalText
  }
}