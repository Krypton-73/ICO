import { Component, OnInit } from '@angular/core';
import { Txn } from '../_models/txn';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IEmployee } from '../../../node_modules/ng2-org-chart'

@Component({
	selector: 'app-referrals',
	templateUrl: './referrals.component.html',
	styleUrls: ['./referrals.component.scss']
})

export class ReferralsComponent implements OnInit {
	txns: Txn[] = [];
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

	topEmployee: IEmployee = {
		name: 'Janis Martin',
		designation: 'CEO',
		img: './assets/data/img/b.JPG',
		subordinates: [
			{
				name: 'Matthew Wikes',
				designation: 'VP',
				img: './assets/data/img/b.JPG',
				subordinates: [
					{
						name: 'Tina Landry',
						designation: 'Budget Analyst',
						img: './assets/data/img/b.JPG',
						subordinates: []
					}
				]
			},
			{
				name: 'Patricia Lyons',
				designation: 'VP',
				img: './assets/data/img/c.JPG',
				subordinates: [
					{
						name: 'Dylan Wilson',
						designation: 'Web Manager',
						img: './assets/data/img/b.JPG',
						subordinates: []
					},
					{
						name: 'Deb Curtis',
						designation: 'Art Director',
						img: './assets/data/img/c.JPG',
						subordinates: []
					}
				]
			},
			{
				name: 'Larry Phung',
				designation: 'VP',
				img: './assets/data/img/a.JPG',
				subordinates: []
			}
		]
	};

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
