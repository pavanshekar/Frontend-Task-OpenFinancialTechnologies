import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cards = [
    {
      img: 'Get Paid Instantly.png',
      title: 'Quick cash disbursement',
      label: 'Get terms loanas that your business needs in 72hrs',
    },
    {
      img: 'Low interest rate.png',
      title: 'Low-interest rate',
      label:
        'Achieve your financial goals with an amazing interest rate starting at 13% per annum',
    },
    {
      img: 'Secure Payments.png',
      title: 'Zero Paperwork',
      label:
        'Get started instantly by submitting only your basic details & bank statements',
    },
    {
      img: 'freelancer_feature_icon_6@1.5x.png',
      title: 'Ace your business finances',
      label:
        'Zero EMI for first 3 months on Back-to-Business loans of upto 1 lakh',
    },
    {
      img: 'Covid.png',
      title: 'Loans to fight COVID-19',
      label: 'Get terms loanas that your business needs in 72hrs',
    },
  ];

  loanForm: FormGroup;
  loanAmount: number = 100000;
  emiAmount: number = 100000;
  incMonthly: number = 100000;
  expMonthly: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      monthlyIncome: ['100000'],
      monthlyExpense: ['0'],
      repaymentTenure: ['1'],
      existingLoan: [],
      emi: [{ value: '', disabled: true }]
    })
    this.onChanges();
  }
  onChanges() {
    this.loanForm.get('existingLoan').valueChanges
      .subscribe(response => {
        if (response == false) {
          this.loanForm.get('emi').disable();
        }
        else {
          this.loanForm.get('emi').enable();
        }
      });
  }

  tenureChange(){
    const tenure = this.loanForm.get('repaymentTenure').value;
    if (tenure == "3 Months") {
      this.emiAmount = this.loanAmount / 3;
    }
    else if (tenure == "6 Months") {
      this.emiAmount = this.loanAmount / 6;
    } else if (tenure == "9 Months") {
      this.emiAmount = this.loanAmount / 9;
    }
    else if(tenure == "12 Months"){
      this.emiAmount = this.loanAmount / 12;
    }
    else{
      this.emiAmount = this.loanAmount;
    }
  }

  incChange(){
    this.incMonthly = this.loanForm.get('monthlyIncome').value;  
    this.calcLoanAmount();
  }

  expChange(){
    this.expMonthly = this.loanForm.get('monthlyExpense').value;
    this.calcLoanAmount();
  }

  calcLoanAmount(){
    console.log(this.incMonthly);
    console.log(this.expMonthly);
    
    if(this.incMonthly>this.expMonthly){
      this.loanAmount = (this.incMonthly - this.expMonthly);
      this.tenureChange();
    }
    else{
      this.loanAmount = 0;
      this.emiAmount = 0;
    }
  }

}
