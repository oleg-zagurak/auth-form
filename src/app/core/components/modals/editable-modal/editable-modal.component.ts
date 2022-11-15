import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Blog } from 'src/app/core/interfaces/blog';

import { BlogDataService } from 'src/app/core/services/blog-data.service';

@Component({
  selector: 'app-editable-modal',
  templateUrl: './editable-modal.component.html',
  styleUrls: ['./editable-modal.component.css']
})
export class EditableModalComponent implements OnInit, OnChanges {
  @Input() editableBlogData!: Blog;
  @Output('cancelEditWindow') cancelEditModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _enable: boolean = true;
  private _theme: string = '';
  private _text: string = '';
  constructor( private blogData: BlogDataService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.editableBlogData !== undefined){
      this._theme = this.editableBlogData.theme;
      this._text = this.editableBlogData.text;
    }
  }
  enableBtn(theme: string, text: string): void {
    if((theme === this._theme && text === this._text) || (theme === '' || text === '')){
      this._enable = true;
    } else{
      this._enable = false;
    }
  }
  editBlog(theme: string, text: string): void{
    let newBlogValue: Blog = {
      data: new Date().getTime(),
      id: this.editableBlogData.id,
      theme: theme,
      text: text,
      userName: this.editableBlogData.userName
    }
    this.blogData.updateBlog(this.editableBlogData, newBlogValue);
    this.cancel();
  }
  cancel(): void{
    this.cancelEditModal.emit(false);
  }
  get enable(): boolean{
    return this._enable
  }
  get themeValue(): string{
    return this._theme
  }
  get textValue(): string{
    return this._text
  }
}
