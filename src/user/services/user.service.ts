import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseDto } from "src/course/dto/course/course.dto";
import { AssessmentDto } from "../../course/dto/assessment/assessment.dto";
import { GroupEventDto } from "../../course/dto/group/group-event.dto";
import { GroupDto } from "../../course/dto/group/group.dto";
import { Assessment } from "../../course/entities/assessment.entity";
import { Assignment } from "../../course/entities/assignment.entity";
import { CourseId } from "../../course/entities/course.entity";
import { GroupEvent } from "../../course/entities/group-event.entity";
import { Group } from "../../course/entities/group.entity";
import { UserJoinedGroupEvent } from "../../course/events/group/user-joined-group.event";
import { AssessmentRepository } from "../../course/repositories/assessment.repository";
import { AssignmentRepository } from "../../course/repositories/assignment.repository";
import { GroupEventRepository } from "../../course/repositories/group-event.repository";
import { GroupRepository } from "../../course/repositories/group.repository";
import { DtoFactory } from "../../shared/dto-factory";
import { UserDto } from "../../shared/dto/user.dto";
import { User, UserId } from "../../shared/entities/user.entity";
import { CollaborationType } from "../../shared/enums";
import { AssignmentGroupTuple } from "../dto/assignment-group-tuple.dto";
import { UserRepository } from "../repositories/user.repository";
import { AssignmentRegistration } from "../../course/entities/assignment-group-registration.entity";
import { AssignmentRegistrationRepository } from "../../course/repositories/assignment-registration.repository";

@Injectable()
export class UserService {

	constructor(@InjectRepository(User) private userRepository: UserRepository,
				@InjectRepository(Group) private groupRepository: GroupRepository,
				@InjectRepository(Assignment) private assignmentRepository: AssignmentRepository,
				@InjectRepository(Assessment) private assessmentRepository: AssessmentRepository,
				@InjectRepository(GroupEvent) private groupEventRepository: GroupEventRepository,
				@InjectRepository(AssignmentRegistration) private registrations: AssignmentRegistrationRepository) { }

	async createUser(userDto: UserDto): Promise<UserDto> {
		const createdUser = await this.userRepository.createUser(userDto);
		const createdUserDto = DtoFactory.createUserDto(createdUser);
		return createdUserDto;
	}

	async getAllUsers(): Promise<UserDto[]> {
		const users = await this.userRepository.getAllUsers();
		return users.map(user => DtoFactory.createUserDto(user));
	}

	async getUserById(id: string): Promise<UserDto> {
		const user = await this.userRepository.getUserById(id);
		return DtoFactory.createUserDto(user);
	}

	async getUserByEmail(email: string): Promise<UserDto> {
		const user = await this.userRepository.getUserByEmail(email);
		return DtoFactory.createUserDto(user);
	}

	async getCoursesOfUser(userId: UserId): Promise<CourseDto[]> {
		const courses = await this.userRepository.getCoursesOfUser(userId);
		const courseDtos: CourseDto[] = [];
		courses.forEach(course => courseDtos.push(DtoFactory.createCourseDto(course)));
		return courseDtos;
	}

	/**
	 * Returns the current group of a user in a course.
	 */
	async getGroupOfUserForCourse(userId: UserId, courseId: CourseId): Promise<GroupDto> {
		const group = await this.groupRepository.getGroupOfUserForCourse(courseId, userId);
		return DtoFactory.createGroupDto(group);
	}

	/**
	 * Returns all group events of the user in the course.
	 * Events are sorted by their timestamp in descending order (new to old). 
	 */
	async getGroupHistoryOfUser(userId: UserId, courseId: CourseId): Promise<GroupEventDto[]> {
		const history = await this.groupEventRepository.getGroupHistoryOfUser(userId, courseId);
		return history.map(event => event.toDto());
	}

	/**
	 * Returns the group that the user was a registered member of.
	 */
	async getGroupOfAssignment(userId: UserId, courseId: CourseId, assignmentId: string): Promise<GroupDto> {
		return this.registrations.getRegisteredGroupOfUser(assignmentId, userId);
	}

	/**
	 * Returns tuples mapping assignments to the user's registered groups. 
	 */
	async getGroupOfAllAssignments(userId: UserId, courseId: CourseId): Promise<AssignmentGroupTuple[]> {
		return this.registrations.getAllRegisteredGroupsOfUserInCourse(courseId, userId);
	}

	async getAssessmentsOfUserForCourse(userId: UserId, courseId: CourseId): Promise<AssessmentDto[]> {
		const assessments = await this.assessmentRepository.getAssessmentsOfUserForCourse(courseId, userId);
		return assessments.map(a => DtoFactory.createAssessmentDto(a));
	}

	async updateUser(userId: UserId, userDto: UserDto): Promise<UserDto> {
		if (userId !== userDto.id) {
			throw new BadRequestException("UserId refers to a different user.");
		}
		const user = await this.userRepository.updateUser(userId, userDto);
		return DtoFactory.createUserDto(user);
	}
	
	async deleteUser(userId: UserId): Promise<boolean> {
		return this.userRepository.deleteUser(userId);
	}
    
}
