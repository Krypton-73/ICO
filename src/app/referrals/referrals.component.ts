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
	level: number;
	locked: any;
	unlocked: any;
	totalBonus: any;
	totalAmount: any;
	data: any;
	error: any;
	yolo: any;
	refId: any;
	refLink: any;
	currentRank: any = {
		0: 'Individual',
		1: 'Community Manager',
		2: 'Community Leader',
		3: 'National Advisor'
	};
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

		// tslint:disable-next-line:prefer-const
		let ORG_DATA = this.refTree;
		// tslint:disable-next-line:prefer-const
		let ORG_CONFIG = {
			allowHtml: true
		};

		this.dataMap['ORG_DATA'] = ORG_DATA; // loadData(ORG_DATA); // pass direct array
		this.dataMap['ORG_OPTIONS'] = ORG_CONFIG;

		// const wrapper = this.chart.wrapper;
		// wrapper.draw(chartData);
		this.getTxns();
		this.get_refTree();

		this.userService
			.get_refTree()
			.pipe()
			.subscribe(
				data => {
					this.data = data;
					if (this.data.code === 200) {
						let i: any;
						this.level = this.data.msg.level;
						let _locked = 0;
						let _unlocked = 0;
						let _totalBonus = 0;
						let _totalAmount = 0;
						for (i = 0; i < this.data.msg.analysis.length; i++) {
							_locked += this.level >= i ? 0 : this.data.msg.analysis[i].refs;
							_unlocked += this.level >= i ? this.data.msg.analysis[i].refs : 0;
							_totalBonus += this.data.msg.analysis[i].refs;
							_totalAmount += this.data.msg.analysis[i].raised;
						};
							this.locked = _locked;
							this.unlocked = _unlocked;
							this.totalBonus = _totalBonus;
							this.totalAmount = _totalAmount;
					}
				},
				error => {
					this.data = error.error;
				}
			);
	}

	prefixNosByFix(no: any) {
    try {
      if (no !== 0) {
        return Number.parseFloat(no).toFixed(8);
      } else {
        return 0;
      }
    } catch (e) {
      return 0;
    }
	}

	get_refTree() {
		 {
		this.userService
			.get_refTree()
			.pipe()
			.subscribe(
				data => {
					this.data = data;
					if (this.data.code === 200) {
						let i: any;
						for (i = 0; i < this.data.msg.graph_data.length; i++) {
							this.refTree.push(this.data.msg.graph_data[i]);
						}
					}
				},
				error => {
					this.data = error.error;
				}
			);
			
		}
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
							if (this.data.msg[i].type === 3) {
								this.txns.push(this.data.msg[i]);
							}
						}
					}
				},
				error => {
					this.error = error.error;
					// if (this.error.code === 401) {
					// 	return this.logout();
					// }
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
