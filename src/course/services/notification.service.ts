import { HttpService, Injectable, Logger } from "@nestjs/common";
import { NotificationDto } from "../../shared/dto/notification.dto";

@Injectable()
export class NotificationService { 

	private readonly logger = new Logger(NotificationService.name);
	private url = process.env.JAVA_URL; // TODO

	constructor(private http: HttpService) { }

	/**
	 * Sends the UpdateMessage via http-post to the URL specified by the course.
	 */
	send(notification: NotificationDto): void {
		if (this.url && notification) {
			this.logger.verbose("Sending notification to: " + this.url);
			this.http.post(this.url, notification).toPromise()
				.catch(err  => this.logger.error(err.message));
		}
	}

}
