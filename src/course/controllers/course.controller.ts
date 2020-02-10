import { Controller, Get, Param, Post, Body, ParseUUIDPipe, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../services/course.service';
import { CourseDto } from '../../shared/dto/course.dto';
import { GroupDto } from '../../shared/dto/group.dto';
import { GroupService } from '../services/group.service';
import { AssignmentDto } from '../../shared/dto/assignment.dto';
import { AssignmentService } from "../services/assignment.service";
import { AssessmentDto } from "../../shared/dto/assessment.dto";
import { AssessmentService } from "../services/assessment.service";
import { UserDto } from "../../shared/dto/user.dto";

@ApiTags("courses") 
@Controller("courses")
export class CourseController {
	constructor(private courseService: CourseService,
				private groupService: GroupService,
				private assignmentService: AssignmentService,
				private assessmentService: AssessmentService) { }

	@Post()
	createCourse(@Body() courseDto: CourseDto): Promise<CourseDto> {
		return this.courseService.createCourse(courseDto);
	}

	@Post(":courseId/groups")
	createGroup(
		@Param("courseId") courseId: string,
		@Body() groupDto: GroupDto
	): Promise<GroupDto> {

		return this.groupService.createGroup(courseId, groupDto);
	}

	@Post(":courseId/users/:userId")
	addUser(@Param("courseId") courseId: string,
			@Param("userId", ParseUUIDPipe) userId: string): Promise<any> {
		return this.courseService.addUser(courseId, userId);
	}
	

	@Post(":courseId/assignments")
	createAssignment(
		@Param("courseId") courseId: string,
		@Body() assignmentDto: AssignmentDto
	): Promise<AssignmentDto> {

		return this.assignmentService.createAssignment(courseId, assignmentDto);
	}

	@Post(":courseId/assignments/:assignmentId/assessments")
	createAssessment(
		@Param("assignmentId", ParseUUIDPipe) assignmentId: string,
		@Body() assessmentDto: AssessmentDto
	): Promise<AssessmentDto> {

		// TODO: Check if user is allowed to submit assessments for this course
		return this.assessmentService.createAssessment(assignmentId, assessmentDto);
	}

	@Get()
	getAllCourses(): Promise<CourseDto[]> {
		return this.courseService.getAllCourses();
	}

	@Get(":courseId")
	getCourseById(@Param("courseId") courseId: string): Promise<CourseDto> {
		return this.courseService.getCourseById(courseId);
	}

	@Get(":courseId/users")
	getUsersOfCourse(@Param("courseId") courseId: string): Promise<UserDto[]> {
		return this.courseService.getUsersOfCourse(courseId);
	}

	@Get(":courseId/groups")
	getGroupsOfCourse(
		@Param("courseId") courseId: string,
	): Promise<GroupDto[]> {

		return this.groupService.getGroupsOfCourse(courseId);
	}

	@Get(":courseId/assignments")
	getAssignmentsOfCourse(
		@Param("courseId") courseId: string,
	): Promise<AssignmentDto[]> {

		return this.assignmentService.getAssignments(courseId);
	}

	@Get(":courseId/assignments/:assignmentId/assessments")
	getAllAssessmentsForAssignment(
		@Param("courseId") courseId: string,
		@Param("assignmentId", ParseUUIDPipe) assignmentId: string
	): Promise<AssessmentDto[]> {

		// TODO: Check if user is allowed to request all assessments
		return this.assessmentService.getAssessmentsForAssignment(assignmentId);
	}

	@Get(":name/:semester")
	getCourseByNameAndSemester(
		@Param("name") name: string,
		@Param("semester") semester: string
	): Promise<CourseDto> {

		return this.courseService.getCourseByNameAndSemester(name, semester);
	}

	@Patch(":courseId")
	updateCourse(
		@Param("courseId") courseId: string,
		@Body() courseDto: CourseDto
	): Promise<CourseDto> {

		return this.courseService.updateCourse(courseId, courseDto);
	}

	@Delete(":courseId")
	deleteCourse(
		@Param("courseId") courseId: string,
	): Promise<boolean> {

		return this.courseService.deleteCourse(courseId);
	}

}
