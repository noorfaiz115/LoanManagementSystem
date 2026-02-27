import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SpinnerComponent } from "./shared/shared/components/spinner/spinner.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, SpinnerComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Angular Ecommerce Dashboard | TailAdmin";
}
