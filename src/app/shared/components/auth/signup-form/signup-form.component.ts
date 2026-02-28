import { Component } from "@angular/core";
import { LabelComponent } from "../../form/label/label.component";
import { CheckboxComponent } from "../../form/input/checkbox.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-signup-form",
  imports: [
    LabelComponent,
    CheckboxComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: "./signup-form.component.html",
  styles: ``,
})
export class SignupFormComponent {
  showPassword = false;
  isChecked = false;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  fname = "";
  gender = "";
  email = "";
  password = "";

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    console.log(" Name:", this.fname);
    console.log("Gender:", this.gender);
    console.log("Email:", this.email);
    console.log("Password:", this.password);
    console.log("Remember Me:", this.isChecked);

    const registerData = {
      Name: this.fname,
      Gender: this.gender,
      Email: this.email,
      Password: this.password,
      RoleId: 3,
    };
    console.log("Register Data:", registerData);

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log("Registration successful:", response);

        this.router.navigate(["/signin"]);
      },
      error: (error) => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please check your details and try again.");
      },
    });
  }
}
