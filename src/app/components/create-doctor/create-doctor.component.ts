import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfilesService } from 'src/app/services/user-profiles.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Office } from 'src/app/models/offices/Office';
import { Specialization } from 'src/app/models/specializations/Specialization';
import { OfficesService } from 'src/app/services/offices.service';
import { SpecializationsService } from 'src/app/services/specializations.service';
import { forkJoin } from 'rxjs';
import { CreateDoctor } from 'src/app/models/doctors/CreateDoctor';


@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css'],
  providers: [UserProfilesService, SpecializationsService, OfficesService]
})
export class CreateDoctorComponent implements OnInit {
  @ViewChild('birthDatepicker') birthDatepicker!: MatDatepicker<Date>;  
  @ViewChild('careerDatepicker') careerDatepicker!: MatDatepicker<Date>;  

  public officesDataSource!: Office[];
  public specializationsDataSource!: Specialization[];

  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public middleName!: string;
  public email!: string;
  public birthDate!: string;
  public office!: string;
  public specialization!: string;
  public careerStartDate!: string;
  public password!: string;

  form!: FormGroup;

  constructor(private userProfilesService: UserProfilesService, private officesService: OfficesService, private specializationsService: SpecializationsService, private router: Router){

  }
  ngOnInit(): void {
    forkJoin([
      this.officesService.getOffices(),
      this.specializationsService.getSpecializations()
    ]).subscribe(next => {
      this.specializationsDataSource = next[1].body!;
      this.officesDataSource = next[0].body!;
    });
  }

  confirm(){
    let doctor = new CreateDoctor();
    doctor.username = this.username;
    doctor.password = this.password;
    doctor.firstName = this.firstName;
    doctor.lastName = this.lastName;
    doctor.middleName = this.middleName;
    doctor.email = this.email;
    doctor.birthDate = this.birthDate;
    doctor.careerStartDate = this.careerStartDate
    doctor.officeId = 1;
    doctor.specializationId = 1;
    this.userProfilesService.createDoctor(doctor).subscribe();
  }
}
