import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildService } from '../../../../shared/services/child.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-child',
  imports: [ReactiveFormsModule],
  templateUrl: './add-child.component.html',
  styleUrl: './add-child.component.css'
})
export class AddChildComponent {

  constructor(private childService: ChildService, private router: Router){}

  addChildForm = new FormGroup({
    child_name: new FormControl ('', [Validators.required]),
    date_of_birth: new FormControl (null, [Validators.required])
  })

  addChildHandler(){
    this.childService.createChild(this.addChildForm.value.child_name!, this.addChildForm.value.date_of_birth!).subscribe({
      next: (createdChild) => {
        this.addChildForm.reset(); // reset form (redundant on navigation, possibly dangerous without if user submits empty form?)
        this.router.navigate(['/dashboard/children/child-card']); 
      },
      error(err){
        alert("There was some sort of error")
        console.log(err)
      }
    })
  }
}
