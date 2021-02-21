
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from './user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';


declare const $: any;
declare const moment: any;

class User {
  id: number;
  website: string;
  name:string;
  username:string;
  phone:string;
  email:string;
  address:object;
  company:object;
}

@Component({
  selector: 'app-root',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  rows: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'address',
    'mobile',
    'organization',
    'website',
  ];
  displayedCoulumnsDes: string[] = [
    'id_search',
    'name_search',
    'username_search',
    'email_search',
    'address_search',
    'mobile_search',
    'organization_search',
    'website_search',
  ];
  public usersList: any = [];
  nameForm:FormGroup;
  selectedName: any = '';
  public changedName: any = [];
  filteredName: Observable<any[]>;
  isLoadingResults = true;
  resultsLength = 0;

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  searchParams: any = {};
  constructor(
    private router: Router,
    private userService: UserService,
    private _fb: FormBuilder,

  ) {
    this.nameForm = this._fb.group({
      name: [""]
    });
  }

  ngOnInit() {
   this.ngAfterViewInit();
   this.getUsersListing();
    this.onValueChanges();

  }

  ngAfterViewInit() {
  }

private searchedUser(){
  this.userService.getUsers(this.searchParams).subscribe(data => {
    this.usersList = data;
  })
}

  public search(val, field) {
    if (!val) {
      delete this.searchParams[field];
      this.searchedUser()
    } else {
      this.searchParams[field] = val || '';
      this.searchedUser()
    }
  }

  resetTable(e, type) {
    if (!e) {
      if (type === 'name') {
        this.selectedName = ''

      }
    }
  }
  getUsersListing() {
    this.userService.getUsersListing()
      .subscribe(data => {
        this.usersList = data;
        this.changedName = data;

        this.filteredName = this.nameForm.controls['name'].valueChanges
          .pipe(
            startWith<string | User>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterNames(name) : this.changedName.slice())
          );
      });
  }
  public displayName(name?: User): string | undefined {
    return name ? name.name : undefined;
  }

  private _filterNames(name: any): User[] {
    if (typeof name === 'object') {
      name = name.name;
    }
    const filterValue = name.toLowerCase();
    return this.changedName.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onValueChanges(): void {
    this.nameForm.valueChanges.subscribe(val => {
      if (val.name && val.name.id) {
        this.search(val.name.id, 'id')
      }
    })
  }
}
