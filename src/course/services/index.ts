import { AssignmentRegistrationService } from "./assignment-registration.service";
import { AssignmentService } from "./assignment.service";
import { CourseConfigService } from "./course-config.service";
import { CourseParticipantsService } from "./course-participants.service";
import { CourseService } from "./course.service";
import { GroupMergeStrategy } from "./group-merge.strategy";
import { GroupService } from "./group.service";

export const Services = [
	AssignmentRegistrationService,
	AssignmentService,
	CourseConfigService,
	CourseParticipantsService,
	CourseService,
	GroupService,
	GroupMergeStrategy
];
