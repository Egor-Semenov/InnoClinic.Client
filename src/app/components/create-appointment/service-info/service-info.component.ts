import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/models/services/Service';
import { ServiceParameters } from 'src/app/models/services/ServiceParameters';
import { Specialization } from 'src/app/models/specializations/Specialization';
import { ServicesService } from 'src/app/services/services.service';
import { SpecializationsService } from 'src/app/services/specializations.service';
import { CreateAppointmentComponent } from '../create-appointment.component';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css']
})
export class ServiceInfoComponent implements OnInit {
  @Input() appointmentForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<"Next" | "Back"> = new EventEmitter<"Next" | "Back">();

  public specializationsSource!: Specialization[];
  public servicesSource!: Service[];
  public serviceInfo!: FormGroup;

  public selectedSpecialization!: number;
  public selectedCategory!: number;

  constructor(private fb: FormBuilder, private specializationsService: SpecializationsService, private servicesService: ServicesService){
  }

  ngOnInit(): void {
    this.getSpecializations().subscribe(data => {this.specializationsSource = data.body!; console.log(this.specializationsSource)});
    let startingForm: FormGroup = (this.appointmentForm.controls['serviceInfo']) as FormGroup;
    
    if (startingForm.value){
      console.log("start")
      this.servicesService.getServices(new ServiceParameters(startingForm.get('specialization')?.value, startingForm.get('serviceCategory')?.value)).subscribe(data => {this.servicesSource = data.body!})
      this.serviceInfo = startingForm;
    }
    else{
      console.log("else")
      this.serviceInfo = this.fb.group({
        specialization: [null, Validators.required],
        serviceCategory: ["", Validators.required],
        service: [null, Validators.required]
      });
      this.serviceInfo.get('serviceCategory')?.disable();
      this.serviceInfo.get('service')?.disable();
      this.subformInitialized.emit(this.serviceInfo);
    }
  }

  doChangeStep(direction: "Next"){
    this.changeStep.emit(direction);
  }

  getSpecializations() {
    return this.specializationsService.getSpecializations();
  }

  getServicesBySpecializationAndCategory(specializationId: number, serviceCategoryId: number) {
    console.log("get")
      this.serviceInfo.get('service')?.enable();

      this.servicesService.getServices(new ServiceParameters(specializationId, serviceCategoryId)).subscribe(data => {
      this.servicesSource = data.body!;
    });
  }
}
