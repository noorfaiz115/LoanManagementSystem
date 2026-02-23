import { Routes } from "@angular/router";
import { EcommerceComponent } from "./pages/dashboard/ecommerce/ecommerce.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { FormElementsComponent } from "./pages/forms/form-elements/form-elements.component";
import { BasicTablesComponent } from "./pages/tables/basic-tables/basic-tables.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { NotFoundComponent } from "./pages/other-page/not-found/not-found.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
import { InvoicesComponent } from "./pages/invoices/invoices.component";
import { LineChartComponent } from "./pages/charts/line-chart/line-chart.component";
import { BarChartComponent } from "./pages/charts/bar-chart/bar-chart.component";
import { AlertsComponent } from "./pages/ui-elements/alerts/alerts.component";
import { AvatarElementComponent } from "./pages/ui-elements/avatar-element/avatar-element.component";
import { BadgesComponent } from "./pages/ui-elements/badges/badges.component";
import { ButtonsComponent } from "./pages/ui-elements/buttons/buttons.component";
import { ImagesComponent } from "./pages/ui-elements/images/images.component";
import { VideosComponent } from "./pages/ui-elements/videos/videos.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth-pages/sign-up/sign-up.component";
import { CalenderComponent } from "./pages/calender/calender.component";
import { CustomerComponent } from "./pages/customer/customer.component";
import { GeographicComponent } from "./pages/geographic/geographic.component";
import { CibilReportComponent } from "./pages/cibil-report/cibil-report.component";
import { EligibilityComponent } from "./pages/eligibility/eligibility.component";
import { LoanOriginationComponent } from "./pages/loan-origination/loan-origination.component";
import { LoanTypeComponent } from "./pages/loan-type/loan-type.component";
import { LoanDealComponent } from "./pages/loan-deal/loan-deal.component";
import { SactionAndDisburstmentComponent } from "./pages/saction-and-disburstment/saction-and-disburstment.component";
import { SanctionComponent } from "./pages/sanction/sanction.component";
import { DisbursetmentComponent } from "./pages/disbursetment/disbursetment.component";
import { LoanAccountComponent } from "./pages/loan-account/loan-account.component";
import { EmiSchedularComponent } from "./pages/emi-schedular/emi-schedular.component";
import { IntrestAndChargesComponent } from "./pages/intrest-and-charges/intrest-and-charges.component";
import { PaymentComponent } from "./pages/payment/payment.component";
import { ForclosureComponent } from "./pages/forclosure/forclosure.component";
import { LoanclosureComponent } from "./pages/loanclosure/loanclosure.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "",
        component: EcommerceComponent,
        pathMatch: "full",
        title:
          "Angular Ecommerce Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      // {
      //   path: "calendar",
      //   component: CalenderComponent,
      //   title:
      //     "Angular Calender | TailAdmin - Angular Admin Dashboard Template",
      // },
      {
        path: "customers",
        component: CustomerComponent,
        title:
          "Angular Customers Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "branches",
        component: GeographicComponent,
        title:
          "Angular Branches Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "CibilScore",
        component: CibilReportComponent,
        title:
          "Angular Cibil Score Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "eligibility",
        component: EligibilityComponent,
        title:
          "Angular Eligibility Score Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "LoanOriginations",
        component: LoanOriginationComponent,
        children: [
          {
            path: "loan-type",
            component: LoanTypeComponent,
            title:
              "Angular Loan Type Dashboard | TailAdmin - Angular Admin Dashboard Template",
          },
          {
            path: "loan-deal",
            component: LoanDealComponent,
            title:
              "Angular Loan Deal Dashboard | TailAdmin - Angular Admin Dashboard Template",
          },
        ],
        title:
          "Angular Loan Originations Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "sanction-and-disburstment",
        component: SactionAndDisburstmentComponent,
        children: [
          {
            path: "sac",
            component: SanctionComponent,
            title:
              "Angular Sanction Dashboard | TailAdmin - Angular Admin Dashboard Template",
          },
          {
            path: "disbursement",
            component: DisbursetmentComponent,
            title:
              "Angular Disbursement Dashboard | TailAdmin - Angular Admin Dashboard Template",
          },
        ],
        title:
          "Angular Sanction And Disbursement Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "loan-account",
        component: LoanAccountComponent,
        title:
          "Angular Loan Account Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "emi-schedule",
        component: EmiSchedularComponent,
        title:
          "Angular Emi Schedule Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "interest-charges",
        component: IntrestAndChargesComponent,
        title:
          "Angular Interest Charges Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "payment",
        component: PaymentComponent,
        title:
          "Angular Payment Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },

      {
        path: "forclosure",
        component: ForclosureComponent,
        title:
          "Angular Forclosure Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },

      {
        path: "loanclosure",
        component: LoanclosureComponent,
        title:
          "Angular Loan Closure Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "profile",
        component: ProfileComponent,
        title:
          "Angular Profile Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "form-elements",
        component: FormElementsComponent,
        title:
          "Angular Form Elements Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "basic-tables",
        component: BasicTablesComponent,
        title:
          "Angular Basic Tables Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "blank",
        component: BlankComponent,
        title:
          "Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      // support tickets
      {
        path: "invoice",
        component: InvoicesComponent,
        title:
          "Angular Invoice Details Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "line-chart",
        component: LineChartComponent,
        title:
          "Angular Line Chart Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "bar-chart",
        component: BarChartComponent,
        title:
          "Angular Bar Chart Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "alerts",
        component: AlertsComponent,
        title:
          "Angular Alerts Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "avatars",
        component: AvatarElementComponent,
        title:
          "Angular Avatars Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "badge",
        component: BadgesComponent,
        title:
          "Angular Badges Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "buttons",
        component: ButtonsComponent,
        title:
          "Angular Buttons Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "images",
        component: ImagesComponent,
        title:
          "Angular Images Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
      {
        path: "videos",
        component: VideosComponent,
        title:
          "Angular Videos Dashboard | TailAdmin - Angular Admin Dashboard Template",
      },
    ],
  },
  // auth pages
  {
    path: "signin",
    component: SignInComponent,
    title:
      "Angular Sign In Dashboard | TailAdmin - Angular Admin Dashboard Template",
  },
  {
    path: "signup",
    component: SignUpComponent,
    title:
      "Angular Sign Up Dashboard | TailAdmin - Angular Admin Dashboard Template",
  },
  // error pages
  {
    path: "**",
    component: NotFoundComponent,
    title:
      "Angular NotFound Dashboard | TailAdmin - Angular Admin Dashboard Template",
  },
];
