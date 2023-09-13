import { FormBuilder, FormGroup } from "@angular/forms";

export class UserRequestFormBuilder {
   emptyForm: FormGroup = this.formBuilder.group({
      requestId: "",
      requestAmount: 0,
      user: this.formBuilder.group({
         name: "",
         lastName: ""         
      })
   })

   constructor(private formBuilder: FormBuilder) { }
}