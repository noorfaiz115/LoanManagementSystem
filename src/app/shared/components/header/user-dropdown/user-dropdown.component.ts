import { Component } from "@angular/core";
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DropdownItemTwoComponent } from "../../ui/dropdown/dropdown-item/dropdown-item.component-two";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  imports: [
    CommonModule,
    RouterModule,
    DropdownComponent,
    DropdownItemTwoComponent,
  ],
})
export class UserDropdownComponent {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
