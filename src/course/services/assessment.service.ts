import { Injectable, BadRequestException } from "@nestjs/common";
import { AssessmentDto } from "../../shared/dto/assessment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Assessment } from "../../shared/entities/assessment.entity";
import { AssessmentRepository } from "../repositories/assessment.repository";
import * as fromDtoFactoy from "../../shared/dto-factory";
import { Assignment } from "../../shared/entities/assignment.entity";
import { AssignmentRepository } from "../repositories/assignment.repository";
import { GroupRepository } from "../repositories/group.repository";
import { Group } from "../../shared/entities/group.entity";
import { AssessmentUserRelation } from "../../shared/entities/assessment-user-relation.entity";
import { AssessmentUserRelationRepository } from "../repositories/assessment-user-relation.repository";

@Injectable()
export class AssessmentService {

	constructor(@InjectRepository(Assessment) private assessmentRepository: AssessmentRepository,
				@InjectRepository(AssessmentUserRelation) private assessmentUserRepository: AssessmentUserRelationRepository,
				@InjectRepository(Group) private groupRepository: GroupRepository
				) { }

	async createAssessment(assignmentId: string, assessmentDto: AssessmentDto): Promise<AssessmentDto> {
		// assignmentId from the path must be equal to the dto's assignmentId
		if (assignmentId !== assessmentDto.assignmentId) {
			throw new BadRequestException("AssessmentDto refers to a different Assignment.");
		}

		const createdAssessment = await this.assessmentRepository.createAssessment(assessmentDto);
		const userIds: string[] = [];

		// If assessment should apply to a group
		if (assessmentDto.groupId) {
			const group = await this.groupRepository.getGroupWithUsers(assessmentDto.groupId);
			group.userGroupRelations.forEach(userGroupRelation => {
				userIds.push(userGroupRelation.userId);
			});
		// If assessment should only apply to a specified user
		} else if(assessmentDto.userId) {
			userIds.push(assessmentDto.userId);
		}

		// Create relation between assessment and users (in case they leave their group, they still get their points)
		await this.assessmentUserRepository.createAssessmentUserRelations(createdAssessment.id, userIds);

		const createdAssessmentDto = fromDtoFactoy.createAssessmentDto(createdAssessment);
		return createdAssessmentDto;
	}

	async getAssessmentsForAssignment(assignmentId: string): Promise<AssessmentDto[]> {
		const assessments = await this.assessmentRepository.getAllAssessmentsForAssignment(assignmentId);
		const assessmentDtos: AssessmentDto[] = [];
		assessments.forEach(assessment => {
			assessmentDtos.push(fromDtoFactoy.createAssessmentDto(assessment));
		});
		return assessmentDtos;
	}

}