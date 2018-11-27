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
		ACEX: 'ACEX'
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

		let ORG_DATA = this.refTree;
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
						// console.log(this.data.msg.analysis[0].refs);
						for (i = 0; i < this.data.msg.analysis.length; i++) {
							// this.adata.push(this.data.msg.analysis[i]);
							console.log(
								// this.data.msg.analysis,
								// this.data.msg.analysis[i].refs,
								
							);
							_locked += this.level >= i ? 0 : this.data.msg.analysis[i].refs;
							_unlocked += this.level >= i ? this.data.msg.analysis[i].refs : 0;
							_totalBonus += this.data.msg.analysis[i].refs;
							_totalAmount += this.data.msg.analysis[i].raised;
							// console.log(this.level <= i);
							// console.log("@@@@@@@@@@@@@",_locked, _unlocked);
							// console.log(this.data.msg.analysis.length);
						};
						this.locked = _locked;
						this.unlocked = _unlocked;
						this.totalBonus = _totalBonus;
						this.totalAmount = _totalAmount;
						// this.refTree.push(this.data.msg.graph_data[0]);

						// console.log('yo',this.totalBonus);
					}
				},
				error => {
					this.data = error.error;
					// console.log(this.data);
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
		this.userService
			.get_refTree()
			.pipe()
			.subscribe(
				data => {
					this.data = data;
					if (this.data.code === 200) {
						
						// console.log(this.data.msg.graph_data);
						let i: any;
						for (i = 0; i < this.data.msg.graph_data.length; i++) {
							this.refTree.push(this.data.msg.graph_data[i]);
						}
						// console.log(this.refTree);
					}
				},
				error => {
					this.data = error.error;
					// console.log(this.data);
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
							if (this.data.msg[i].type === 3) {
								this.txns.push(this.data.msg[i]);
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
