import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctors/Doctor';
import { Office } from 'src/app/models/offices/Office';
import { OfficesService } from 'src/app/services/offices.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { DoctorParameters } from 'src/app/models/doctors/DoctorParameters';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';
import { Appointment } from 'src/app/models/appointments/Appointment';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
  providers: [UserProfilesService, OfficesService]
})
export class ServiceDetailsComponent implements OnInit {
  @ViewChild('appointmentDatePicker') appointmentDatePicker!: MatDatepicker<Date>;
  @Input() appointmentForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<"Next" | "Back"> = new EventEmitter<"Next" | "Back">();

  public serviceDetails!: FormGroup;

  public doctorsSource!: Doctor[];
  public officesSource!: Office[];

  public timeSlots: Time[] = [];


  constructor(private fb: FormBuilder, private profilesService: UserProfilesService, private officesService: OfficesService){  
  }

  ngOnInit(): void {
    let startingForm: FormGroup = (this.appointmentForm.controls['serviceDetails']) as FormGroup;
    this.getOffices().subscribe(data => {this.officesSource = data.body!; console.log(this.officesSource);});

    if (startingForm.value){
      console.log("Start");
      console.log(this.appointmentForm);
      this.serviceDetails = this.appointmentForm;
    }
    else {
      this.getOffices().subscribe(data => this.officesSource = data.body!);
      this.serviceDetails = this.fb.group({
        doctor: [null, Validators.required],
        appointmentDate: [null, Validators.required],
        appointmentTime: [null, Validators.required],
        office: [null, Validators.required]
      });     
    }
  }

  doChangeStep(direction: "Next" | "Back"){
    console.log(direction)
    if (direction == "Next") {
      this.subformInitialized.emit(this.serviceDetails);
    }
    this.changeStep.emit(direction);
  }

  getOffices() {
    return this.officesService.getOffices();
  }

  getDoctors(parameters: DoctorParameters) {
    return this.profilesService.getDoctors(parameters);
  }

  onOfficesSelectionChange() {
    let params: DoctorParameters = new DoctorParameters();
    console.log(params);
    console.log(this.appointmentForm);
    console.log(params.specializationType = this.appointmentForm.controls["serviceInfo"].get("specialization")?.value);
    params.searchTerm = "";
    params.pageSize = 100;
    params.pageNumber = 1;
    params.specializationType = this.appointmentForm.controls["serviceInfo"].get("specialization")?.value;
    params.status = 1;
    params.officeId = this.serviceDetails.get("office")?.value

    console.log(params);

    this.getDoctors(params).subscribe(data => {this.doctorsSource = data.body!; console.log(this.doctorsSource)});
  }

  onDateChange() {
    let selectedDoctor = this.serviceDetails.get("doctor")?.value;
    let selectedServiceCategory = this.appointmentForm.controls["serviceInfo"].get("serviceCategory")?.value;

    let doctorAppointments = this.doctorsSource.filter(x => x.userId == "d8c0157e-5294-49a5-b6c2-6406ff236f75")[0].appointments;
    console.log(doctorAppointments);
    
    let time: Time = {
      hours: 8,
      minutes: 0,
    };

    while (time.hours < 18) {
      this.timeSlots.push({hours: time.hours, minutes: time.minutes});

      time.minutes += 10;

      if (time.minutes >= 60) {
        time.hours += 1;
        time.minutes -= 60;
      }
    }

    for (let appointment of doctorAppointments) {
      console.log("appointment");
      console.log(appointment);

      let slotsToRemove: Time[] = [];
      let x = new Date(appointment.time);
      let appointmentTime: Time = {
        hours: x.getHours(),
        minutes: x.getMinutes()
      };

      console.log(appointmentTime);

      switch (appointment.serviceId){
        case 2:
          for (let i = 0; i <= 2; i++){
            this.timeSlots = this.timeSlots.filter(slot => !(slot.hours == appointmentTime.hours && slot.minutes == appointmentTime.minutes));

            appointmentTime.minutes += 10;

            if (appointmentTime.minutes >= 60) {
              appointmentTime.hours += 1;
              appointmentTime.minutes -= 60;
            }
          }
          break;
      }
    }

    console.log("category " + selectedServiceCategory)
    if (selectedServiceCategory == 1) { 
      console.log(this.serviceDetails);
      console.log("enter");

      
    }
  }
}
