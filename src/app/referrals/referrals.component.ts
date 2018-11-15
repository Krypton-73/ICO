import { ViewChild, Component, OnInit } from '@angular/core';
import { Txn } from '../_models/txn';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-referrals',
	templateUrl: './referrals.component.html',
	styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
	txns: Txn[] = [];
	refTree = [];
	data: any;
	error: any;
	yolo: any;
	refId: any;
	refLink: any;
	currencyType: any = {
		btc: 'BTC',
		eth: 'ETH',
		ltc: 'LTC',
		acex: 'ACEX'
	};

	// google chart data

  dataPromise: any;
  options: any;
  onSelect: any;
  dataMap: any;

	constructor(
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private toastr: ToastrService,
		private router: Router
	) {
		this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
		this.refId = this.yolo.msg.user_id;

	}

	ngOnInit() {
		// chart code
		this.dataMap = {};
    let loadData = (_data) => {
      return new Promise((resolve, reject) => {
        resolve(_data);
      });
    };

		let ORG_DATA = this.refTree ;
    let ORG_CONFIG = {
      allowHtml: true
    };

    this.dataMap['ORG_DATA'] = ORG_DATA; // loadData(ORG_DATA); // pass direct array
    this.dataMap['ORG_OPTIONS'] = ORG_CONFIG;

		// const wrapper = this.chart.wrapper;
		// wrapper.draw(chartData);
		this.getTxns();
		this.get_refTree();
	}

	get_refTree() {
		this.userService
      .get_refTree()
      .pipe()
      .subscribe(
        data => {
					this.data = data;
					if(this.data.code === 200){
						console.log(this.data.msg);
						let i: any;
						for (i=0; i<this.data.msg.length; i++) {
							this.refTree.push(this.data.msg[i]);
						}
					}
        },
        error => {
          this.data = error.error;
          console.log(this.data);
        }
      );
	}

	getTxns() {
    this.userService
      .getTxns()
      .pipe()
      .subscribe(
        data => {
          this.data = data;
          if (this.data.code === 200) {
            let i: any;
            for (i = 0; i < this.data.msg.length; i++) {
              this.txns.push(this.data.msg[i]);
              if (this.data.msg[i].type === 2) {
                this.txns[i].currency = 'acex';
              }
            }
          }
        },
        error => {
          this.error = error.error;
          if (this.error.code === 401) {
            return this.logout();
          }
          this.toastr.error('Error connecting to server');
        }
      );
  }

	ref() {
		this.refLink = `http://ico.acex.trade/#/auth/referral/${this.refId}`;
		this.toastr.success('Copied to Clipboard');
	}

	logout() {
		this.authenticationService
			.logout()
			.pipe()
			.subscribe(
				data => {
					window.sessionStorage.clear();
					this.router.navigate(['/auth']);
				},
				error => {
					window.sessionStorage.clear();
					this.router.navigate(['/auth']);
				}
			);
	}
}
