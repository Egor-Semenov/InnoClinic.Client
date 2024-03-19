import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() appointmentForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<"Next" | "Back"> = new EventEmitter<"Next" | "Back">();
  @Output() submitForm: EventEmitter<void> = new EventEmitter();

  
  private appointmentDetails!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    if (this.appointmentForm){
      this.appointmentDetails = this.appointmentForm;
    }
    else{
      this.appointmentDetails = this.fb.group({
        description: ""
      });
    }

    this.subformInitialized.emit(this.appointmentDetails);
  }

  doChangeStep(direction: "Back"){
    this.changeStep.emit(direction);
  }

  doSubmit(){
    this.submitForm.emit();
  }
}
