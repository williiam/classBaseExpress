/**
 * Defines Custom method types over Express's Request
 *
 * @author Faiz A. Farooqui <faiz@geeekyants.com>
 */

import { Request } from 'express';

export interface IRequest extends Request {
	// flash(message: string, callback: any): any;
	assert(arg0: string, arg1: string): unknown;
	checkBody(message: string, callback: any): any;
	checkParams(message: string, callback: any): any;
	checkQuery(message: string, callback: any): any;
	validationErrors(): any;

	user?: any;

	logIn(user: any, callback: any): any;
	logout(): void;

}
