import { FormBuilder, FormGroup } from "@angular/forms";

export class UserRequestFormBuilder {
   emptyForm: FormGroup = this.formBuilder.group({
      requestId: "",
      requestAmount: 0,
      user: this.formBuilder.group({
         name: "",
         lastName: "",
         address: this.formBuilder.group({
            street: this.formBuilder.control(""),
            number: this.formBuilder.control(""),
            zipCode: this.formBuilder.control("")
         })        
      })
   })

   constructor(private formBuilder: FormBuilder) { }
}