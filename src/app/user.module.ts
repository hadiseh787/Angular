import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {UserComponent} from './user.component';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    BrowserModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],

    providers: [UserService],
  bootstrap: [UserComponent]
})
export class UserModule { }
