import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import {
  fromEvent,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeService],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees$: Observable<Employee[]> = new Observable<Employee[]>();
  private unsubscribe$ = new Subject<string>();
  searchText: string = '';
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef =
    {} as ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployess();
  }

  ngAfterViewInit(): void {
    this.getSearchedEmployess();
  }

  getSearchedEmployess(): void {
    fromEvent<any>(
      this.searchInput.nativeElement,
      'input'
    )
      .pipe(
        debounceTime(400),
        map((event) => {
          this.searchText = event.target.value;
          return this.searchText;
        }),
        distinctUntilChanged(),
        switchMap((val) => this.employeeService.getAllEmployee(val)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res) => {
        this.employees$ = of(res) as Observable<Employee[]>;
      });
  }

  getEmployess() {
    this.employees$ = this.employeeService.getAllEmployee(
      this.searchText
    ) as Observable<Employee[]>;
  }

  addEmployee() {
    this.router.navigate(['/addemployee']);
  }

  deleteEmployee(id: number) {
    this.employeeService
      .deleteEmployeeById(id)
      .subscribe(() => this.getEmployess());
  }

  editEmployee(id: number) {
    this.router.navigate(['/addemployee', id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('unsubscribe emit');
    this.unsubscribe$.complete();
  }
}
