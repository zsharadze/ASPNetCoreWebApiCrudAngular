import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', '');
  submitBtnText: string = "Create";
  imgLoadingDisplay: string = 'none';

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const employeeId = params['id'];
      this.editEmployee(employeeId);
    });
  }

  addEmployee(employee: Employee) {
    if (employee.name == "")
      return;

    if (employee.id == 0) {
      employee.createdDate = new Date().toISOString();
      this.employeeService.createEmployee(employee).subscribe(result=>this.router.navigate(['/']));
    }
    else {
      employee.createdDate = new Date().toISOString();
      this.employeeService.updateEmployee(employee).subscribe(result=>this.router.navigate(['/']));
    }
    this.submitBtnText = "";
    this.imgLoadingDisplay = 'inline';
  }

  editEmployee(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(res => {
      this.newEmployee.id = res.id;
      this.newEmployee.name = res.name
      this.submitBtnText = "Edit";
    });
  }

}
