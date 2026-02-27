import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerService } from "../../../services/core/services/spinner.service";
@Component({
  selector: "app-spinner",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.css",
})
export class SpinnerComponent {
  loading$: any;
  constructor(private spinner: SpinnerService) {
    this.loading$ = this.spinner.loading$;
  }
}
