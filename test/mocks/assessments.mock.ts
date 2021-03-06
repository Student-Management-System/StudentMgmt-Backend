import { AssessmentDto } from "../../src/assessment/dto/assessment.dto";
import {
	ASSIGNMENT_JAVA_EVALUATED,
	ASSIGNMENT_JAVA_IN_REVIEW_GROUP,
	ASSIGNMENT_JAVA_IN_REVIEW_SINGLE,
	ASSIGNMENT_JAVA_TESTAT_EVALUATED_SINGLE
} from "./assignments.mock";
import { GROUP_1_JAVA, GROUP_2_JAVA } from "./groups/groups.mock";
import {
	USER_MGMT_ADMIN_JAVA_LECTURER,
	USER_STUDENT_3_JAVA_TUTOR,
	USER_STUDENT_JAVA
} from "./users.mock";

export const ASSESSMENT_JAVA_EVALUATED_GROUP_1: AssessmentDto = {
	id: "8f60f844-4129-48a4-a625-7a74c7defd0d",
	assignmentId: ASSIGNMENT_JAVA_EVALUATED.id,
	isDraft: false,
	achievedPoints: 75,
	comment: "ASSESSMENT_JAVA_EVALUATED_GROUP_1 for GROUP_1_JAVA (ASSIGNMENT_JAVA_EVALUATED)",
	groupId: GROUP_1_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
	lastUpdatedById: USER_STUDENT_3_JAVA_TUTOR.id
};

export const ASSESSMENT_JAVA_EVALUATED_GROUP_2: AssessmentDto = {
	id: "e44f43fe-d39e-4f19-b7df-9bc5ff58b3b0",
	assignmentId: ASSIGNMENT_JAVA_EVALUATED.id,
	isDraft: false,
	achievedPoints: 25,
	comment: "ASSESSMENT_JAVA_EVALUATED_GROUP_2 for GROUP_2_JAVA (ASSIGNMENT_JAVA_EVALUATED)",
	groupId: GROUP_2_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
	lastUpdatedById: USER_MGMT_ADMIN_JAVA_LECTURER.id
};

export const ASSESSMENT_JAVA_TESTAT_USER_1: AssessmentDto = {
	id: "932c7bd8-2338-4e60-955a-39da5f858212",
	assignmentId: ASSIGNMENT_JAVA_TESTAT_EVALUATED_SINGLE.id,
	isDraft: false,
	achievedPoints: 25,
	comment: "ASSESSMENT_JAVA_TESTAT_USER_1",
	userId: USER_STUDENT_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id
};

export const ASSESSMENT_JAVA_IN_REVIEW: AssessmentDto = {
	id: "680dd44a-93b0-4d1c-a947-9b50a4bbb68e",
	assignmentId: ASSIGNMENT_JAVA_IN_REVIEW_SINGLE.id,
	isDraft: false,
	achievedPoints: 50,
	comment: "ASSESSMENT_JAVA_IN_REVIEW",
	userId: USER_STUDENT_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id
};

export const ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS: AssessmentDto = {
	id: "08ea9724-fe3f-461c-9b3c-5d44ab9907e9",
	assignmentId: ASSIGNMENT_JAVA_IN_REVIEW_SINGLE.id,
	isDraft: true,
	achievedPoints: 42,
	comment: "ASSESSMENT_JAVA_IN_REVIEW_WITH_PARTIALS",
	userId: USER_STUDENT_3_JAVA_TUTOR.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id
};

export const ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS: AssessmentDto = {
	id: "0d365334-6cb3-4ac5-b0fe-0b1a5aa1fbf4",
	assignmentId: ASSIGNMENT_JAVA_IN_REVIEW_GROUP.id,
	isDraft: false,
	achievedPoints: 75,
	comment: "ASSIGNMENT_JAVA_IN_REVIEW_GROUP",
	groupId: GROUP_1_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id
};

export const AssessmentsMock: AssessmentDto[] = [
	ASSESSMENT_JAVA_EVALUATED_GROUP_1,
	ASSESSMENT_JAVA_EVALUATED_GROUP_2,
	ASSESSMENT_JAVA_TESTAT_USER_1,
	ASSESSMENT_JAVA_IN_REVIEW,
	ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS,
	ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS
];
