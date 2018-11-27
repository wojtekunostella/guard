import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth-guard.service';
import { ServerComponent } from './servers/server/server.component';
import { UserComponent } from './users/user/user.component';

const appRoutes: Routes = [
	{
		path: '', component: HomeComponent
	},
	{
		path: 'users', canActivateChild: [AuthGuard], component: UsersComponent, children: [
			{
				path: ':id/:name', component: UserComponent
			}
		]
	},
	{
		path: 'servers', component: ServersComponent, children: [
			{
				path: ':id', component: ServerComponent
			},
			{
				path: 'edit/:id', component: EditServerComponent
			}
		]
	},
	{
		path: 'not-foud', component: PageNotFoundComponent
	},
	{
		path: '**', redirectTo: '/not-found'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule {
}
