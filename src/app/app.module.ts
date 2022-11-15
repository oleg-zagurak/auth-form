import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './core/components/login-form/login-form.component';
import { RegisterFormComponent } from './core/components/register-form/register-form.component';
import { AuthorizationComponent } from './core/components/authorization/authorization.component';
import { MainPageComponent } from './core/components/main-page/main-page.component';
import { HeaderComponent } from './core/components/header/header.component';
import { CreateNewBlogComponent } from './core/components/create-new-blog/create-new-blog.component';
import { UniversalBtnComponent } from './shared/components/universal-btn/universal-btn.component';
import { BlogBlockComponent } from './core/components/blog-block/blog-block.component';
import { ToolBtnComponent } from './shared/components/tool-btn/tool-btn.component';
import { EditableModalComponent } from './core/components/modals/editable-modal/editable-modal.component';
import { ConfirmModalComponent } from './core/components/modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AuthorizationComponent,
    MainPageComponent,
    HeaderComponent,
    CreateNewBlogComponent,
    UniversalBtnComponent,
    BlogBlockComponent,
    ToolBtnComponent,
    EditableModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
