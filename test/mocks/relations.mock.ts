import {
	ASSESSMENT_JAVA_EVALUATED_GROUP_1,
	ASSESSMENT_JAVA_IN_REVIEW,
	ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS,
	ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS,
	ASSESSMENT_JAVA_TESTAT_USER_1
} from "./assessments.mock";
import { USER_STUDENT_2_JAVA, USER_STUDENT_3_JAVA_TUTOR, USER_STUDENT_JAVA } from "./users.mock";

export const AssessmentUserRelationsMock = [
	{
		assessmentId: ASSESSMENT_JAVA_EVALUATED_GROUP_1.id,
		assignmentId: ASSESSMENT_JAVA_EVALUATED_GROUP_1.assignmentId,
		userId: USER_STUDENT_JAVA.id
	},
	{
		assessmentId: ASSESSMENT_JAVA_EVALUATED_GROUP_1.id,
		assignmentId: ASSESSMENT_JAVA_EVALUATED_GROUP_1.assignmentId,
		userId: USER_STUDENT_2_JAVA.id
	},
	{
		assessmentId: ASSESSMENT_JAVA_TESTAT_USER_1.id,
		assignmentId: ASSESSMENT_JAVA_TESTAT_USER_1.assignmentId,
		userId: USER_STUDENT_JAVA.id
	},
	{
		assessmentId: ASSESSMENT_JAVA_IN_REVIEW.id,
		assignmentId: ASSESSMENT_JAVA_IN_REVIEW.assignmentId,
		userId: USER_STUDENT_JAVA.id
	},
	{
		assessmentId: ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS.id,
		assignmentId: ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS.assignmentId,
		userId: USER_STUDENT_3_JAVA_TUTOR.id
	},
	{
		assessmentId: ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS.id,
		assignmentId: ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS.assignmentId,
		userId: USER_STUDENT_JAVA.id
	},
	{
		assessmentId: ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS.id,
		assignmentId: ASSESSMENT_JAVA_IN_REVIEW_GROUP_PARTIALS.assignmentId,
		userId: USER_STUDENT_2_JAVA.id
	}
];
