import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string[];
}

export interface CibilReportDto {
    cibilId: number;
    customerId: number;
    panNo: string;
    cibilScore: number;
    creditHistory: string;
    checkDate: string;
    status: string;
}

export interface CibilCheckRequest {
    customerId: number;
    panNo?: string;
}

export interface EligibilityDto {
    eligibileId: number;
    customerId: number;
    isEligible: boolean;
    rejectionReason: string;
    evaluatedDate: string;
}

export interface ScorecardDto {
    scoreId: number;
    customerId: number;
    cibilScore: number;
    monthlyIncome: number;
    employmentType: string;
    age: number;
    existingObligation: number;
    calculationScore: number;
    eligibleLoanAmount: number;
    riskCategory: string;
    generatedDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class MasterService {
    private creditApiUrl = 'https://localhost:7167/api/v1/cibil';
    private eligibilityApiUrl = 'https://localhost:7230/api/v1/eligibility';
    private scorecardApiUrl = 'https://localhost:7230/api/v1/scorecard';

    constructor(private http: HttpClient) { }

    // CIBIL Service Methods
    getAllCibilReports(): Observable<ApiResponse<CibilReportDto[]>> {
        return this.http.get<ApiResponse<CibilReportDto[]>>(this.creditApiUrl);
    }

    checkCibil(request: CibilCheckRequest): Observable<ApiResponse<CibilReportDto>> {
        return this.http.post<ApiResponse<CibilReportDto>>(`${this.creditApiUrl}/check`, request);
    }

    getCibilByCustomerId(customerId: number): Observable<ApiResponse<CibilReportDto>> {
        return this.http.get<ApiResponse<CibilReportDto>>(`${this.creditApiUrl}/customer/${customerId}`);
    }

    // Eligibility Service Methods
    getAllEligibilityRecords(): Observable<ApiResponse<EligibilityDto[]>> {
        return this.http.get<ApiResponse<EligibilityDto[]>>(this.eligibilityApiUrl);
    }

    evaluateEligibility(customerId: number): Observable<ApiResponse<EligibilityDto>> {
        return this.http.post<ApiResponse<EligibilityDto>>(`${this.eligibilityApiUrl}/evaluate/${customerId}`, {});
    }

    getEligibilityByCustomerId(customerId: number): Observable<ApiResponse<EligibilityDto>> {
        return this.http.get<ApiResponse<EligibilityDto>>(`${this.eligibilityApiUrl}/customer/${customerId}`);
    }

    // Scorecard Service Methods
    getAllScorecards(): Observable<ApiResponse<ScorecardDto[]>> {
        return this.http.get<ApiResponse<ScorecardDto[]>>(this.scorecardApiUrl);
    }

    generateScorecard(request: any): Observable<ApiResponse<ScorecardDto>> {
        return this.http.post<ApiResponse<ScorecardDto>>(`${this.scorecardApiUrl}/generate`, request);
    }

    getScorecardByCustomerId(customerId: number): Observable<ApiResponse<ScorecardDto>> {
        return this.http.get<ApiResponse<ScorecardDto>>(`${this.scorecardApiUrl}/${customerId}`);
    }
}
