import { Injectable } from '@angular/core';

import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private blogKey: string = 'blogs';
  constructor() {
  }
  getAllBlogs(): Blog[]{
    let data: string | null = localStorage.getItem(this.blogKey);
    let blogs: Blog[] = [];
    if(data !== null) blogs = JSON.parse(data);
    return blogs;
  }
  updateBlog(oldData: Blog, updateData: Blog): void{
    let blogs: Blog[] = this.getAllBlogs();
    if(blogs.length > 0){
      let index: number = blogs.findIndex(blog => blog.id === oldData.id && blog.theme === oldData.theme);
      if(index > -1){
        blogs.splice(index, 1);
        blogs.unshift(updateData);
        localStorage.setItem(this.blogKey, JSON.stringify(blogs));
      }
    }
  }
  addNewBlog(data: Blog): void{
    let blogs: Blog[] = this.getAllBlogs();
    try{
      blogs.unshift(data);
      localStorage.setItem(this.blogKey, JSON.stringify(blogs));
    } catch(e){
      console.log(e)
    }
  }
  removeBlog(data: Blog): void{
    let blogs = this.getAllBlogs();
    if(blogs.length > 0){
      let index: number = blogs.findIndex(blog => blog.id === data.id && blog.theme === data.theme);
      if(index > -1){
        blogs.splice(index, 1);
        localStorage.setItem(this.blogKey, JSON.stringify(blogs));
      } 
    }
  }
  removeAllBlogs(): void{
    localStorage.setItem(this.blogKey, JSON.stringify([]));
  }
}
