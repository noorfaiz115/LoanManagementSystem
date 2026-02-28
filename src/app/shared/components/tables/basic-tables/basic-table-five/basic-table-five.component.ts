import { Component, input, Input } from "@angular/core";
@Component({
  selector: "app-basic-table-five",
  imports: [],
  templateUrl: "./basic-table-five.component.html",
  styles: ``,
})
export class BasicTableFiveComponent {
  @Input() tableData: any[] = [];

  handleFilter() {
    console.log("Filter clicked");
    // Add your filter logic here
  }

  handleSeeAll() {
    console.log("See all clicked");
    // Add your see all logic here
  }
}
