import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

type Step = "serviceInfo" | "serviceDetails" | "appointmentsDetails";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})

export class CreateAppointmentComponent implements OnInit {
  private currentStep: BehaviorSubject<Step> = new BehaviorSubject<Step>("serviceInfo");

  public currentStep$: Observable<Step> = this.currentStep.asObservable();

  public serviceInfo!: FormGroup;
  public serviceDetails!: FormGroup;
  public appointmentDetails!: FormGroup;

  public formBuilder: FormBuilder = new FormBuilder();
  public appointmentForm: FormGroup = this.formBuilder.group({
    serviceInfo: null,
    serviceDetails: null,
    appointmentDetails: null
  });

  ngOnInit(): void {
    console.log(this.formBuilder)
    this.appointmentForm = this.formBuilder.group({
      serviceInfo: null,
      serviceDetails: null,
      appointmentDetails: null
    });

    console.log("appointmentsFrom init");
    console.log(this.appointmentForm);
  } 

  subformInitialized(name: string, group: FormGroup) {
    console.log("name " + name);
    console.log(group);
    console.log(this.appointmentForm);
    this.appointmentForm.setControl(name, group);
  }

  changeStep(step: string, direction: "Next" | "Back") {
    switch (step){
      case "serviceInfo":
        if (direction === "Next"){
          console.log(direction);
          console.log(step);
          this.currentStep.next("serviceDetails");
          console.log(this.appointmentForm);
          this.serviceInfo = this.appointmentForm.controls['serviceInfo'] as FormGroup;
          console.log(this.serviceInfo);
          console.log(this.currentStep);
          console.log(this.currentStep$);
        }
        break;
      case "serviceDetails":
        if (direction === "Next") {
          this.currentStep.next("appointmentsDetails");
          this.serviceDetails = this.appointmentForm.controls['serviceDetails'] as FormGroup;
        }
        else{
          console.log("backk service")
          this.currentStep.next("serviceInfo");
          console.log(this.currentStep);
        }
        break;
      case "appointmentsDetails":
        if (direction === "Back"){
          this.currentStep.next("serviceDetails");
        }
        break;
    }
  }

  submitForm() {
    const formValues = this.appointmentForm.value;
    //submit by service
  }
}
