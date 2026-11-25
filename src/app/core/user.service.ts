import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from './user.model';
const MOCK_USERS: User[] = [
  {id:1,firstName:'Olivia',lastName:'Chen',email:'olivia.chen@northstar.io',role:'Product Designer',status:'Active',department:'Design',location:'London',joined:'2022-03-14',bio:'Olivia leads product design across the platform. She enjoys turning complex workflows into simple experiences.',lastActive:'2 mins ago'},
  {id:2,firstName:'Noah',lastName:'Williams',email:'noah.williams@northstar.io',role:'Engineering Lead',status:'Active',department:'Engineering',location:'Bristol',joined:'2021-11-08',bio:'Noah looks after the frontend engineering team and platform quality.',lastActive:'18 mins ago'},
  {id:3,firstName:'Amara',lastName:'Patel',email:'amara.patel@northstar.io',role:'People Partner',status:'Active',department:'People',location:'Manchester',joined:'2023-01-23',bio:'Amara supports managers and helps make Northstar a great place to work.',lastActive:'1 hour ago'},
  {id:4,firstName:'Ethan',lastName:'Brooks',email:'ethan.brooks@northstar.io',role:'Finance Analyst',status:'Invited',department:'Finance',location:'London',joined:'2024-06-02',bio:'Ethan works with teams on planning and reporting.',lastActive:'Never'},
  {id:5,firstName:'Mia',lastName:'Thompson',email:'mia.thompson@northstar.io',role:'Marketing Manager',status:'Active',department:'Marketing',location:'Leeds',joined:'2020-09-17',bio:'Mia manages campaigns and brand communications.',lastActive:'Yesterday'},
  {id:6,firstName:'Leo',lastName:'Martin',email:'leo.martin@northstar.io',role:'Developer',status:'Inactive',department:'Engineering',location:'Bristol',joined:'2019-04-11',bio:'Leo builds internal tools and customer-facing features.',lastActive:'3 months ago'},
  {id:7,firstName:'Isla',lastName:'Robinson',email:'isla.robinson@northstar.io',role:'Researcher',status:'Active',department:'Design',location:'London',joined:'2022-12-05',bio:'Isla conducts research to help teams understand customer needs.',lastActive:'4 hours ago'},
  {id:8,firstName:'Oscar',lastName:'Evans',email:'oscar.evans@northstar.io',role:'Account Executive',status:'Active',department:'Sales',location:'Cardiff',joined:'2023-07-19',bio:'Oscar works with new and existing customers.',lastActive:'Yesterday'},
  {id:9,firstName:'Ava',lastName:'Khan',email:'ava.khan@northstar.io',role:'Data Analyst',status:'Active',department:'Engineering',location:'London',joined:'2021-02-28',bio:'Ava helps teams make better decisions with data.',lastActive:'35 mins ago'},
  {id:10,firstName:'Jack',lastName:'Murphy',email:'jack.murphy@northstar.io',role:'Operations Manager',status:'Inactive',department:'Operations',location:'Bristol',joined:'2018-08-13',bio:'Jack keeps business operations running smoothly.',lastActive:'2 weeks ago'},
  {id:11,firstName:'Freya',lastName:'Clarke',email:'freya.clarke@northstar.io',role:'Content Designer',status:'Active',department:'Marketing',location:'Manchester',joined:'2024-02-01',bio:'Freya makes product and marketing content clear and useful.',lastActive:'6 mins ago'},
  {id:12,firstName:'Theo',lastName:'James',email:'theo.james@northstar.io',role:'Support Specialist',status:'Invited',department:'Support',location:'Leeds',joined:'2024-07-12',bio:'Theo helps customers get the most from the product.',lastActive:'Never'}
];
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return of(MOCK_USERS).pipe(delay(350));
  }
  getUser(id: number): Observable<any> {
    return this.getUsers().pipe(
      map(users => users.filter(user => user.id === id)[0])
    );
  }
  updateUser(user: any): Observable<any> {
    const index = MOCK_USERS.findIndex(item => item.id === user.id);
    if (index >= 0) MOCK_USERS[index] = user;
    return of(user).pipe(delay(300));
  }
}
