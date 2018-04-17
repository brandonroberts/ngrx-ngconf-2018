import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from './book-authors.component';
import { BookDetailComponent } from './book-detail.component';
import { BookPreviewComponent } from './book-preview.component';
import { BookPreviewListComponent } from './book-preview-list.component';

import { PipesModule } from '../../shared/pipes';
import { MaterialModule } from '../../material';
import { BooksPageComponent } from './books-page.component';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BooksPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
