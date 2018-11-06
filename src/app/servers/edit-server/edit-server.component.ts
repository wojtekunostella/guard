import {Component, OnInit, OnDestroy} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy {
	server: { id: number, name: string, status: string };
	serverName = '';
	serverStatus = '';
	id: number;
	paramsSubscription: Subscription;
	constructor(private serversService: ServersService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.id = +this.route.snapshot.params['id'];
		// console.log(this.id);

		this.server = this.serversService.getServer(+this.id);



		this.serverName = this.server.name;
		this.serverStatus = this.server.status;



		this.paramsSubscription = this.route.params
			.subscribe(
				(params: Params) => {
					// console.log(params['id']);
					this.server = this.serversService.getServer(+params['id']);
					this.serverName = this.server.name;
					this.serverStatus = this.server.status;
				}
			);
	}

	onUpdateServer() {
		// this.serversService.updateServer(this.id, {name: this.serverName, status: this.serverStatus});
	}

	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	}
}
