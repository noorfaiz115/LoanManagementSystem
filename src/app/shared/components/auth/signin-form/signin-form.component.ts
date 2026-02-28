import { Component } from "@angular/core";
import { LabelComponent } from "../../form/label/label.component";
import { CheckboxComponent } from "../../form/input/checkbox.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: "app-signin-form",
  imports: [
    LabelComponent,
    CheckboxComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: "./signin-form.component.html",
  styles: ``,
})
export class SigninFormComponent {
  showPassword = false;
  isChecked = false;

  email = "";
  password = "";
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    console.log("Login Data:", loginData);

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log("Login successful:", response);

        localStorage.setItem("token", response.data.token);

        this.router.navigate(["/"]);
      },
      error: (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
      },
    });
  }
}
