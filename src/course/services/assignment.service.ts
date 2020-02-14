import { Injectable, BadRequestException } from "@nestjs/common";
import { AssignmentDto } from "../../shared/dto/assignment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Assignment } from "../../shared/entities/assignment.entity";
import { AssignmentRepository } from "../repositories/assignment.repository";
import * as fromDtoFactory from "../../shared/dto-factory";

@Injectable()
export class AssignmentService {

	constructor(@InjectRepository(Assignment) private assignmentRepository: AssignmentRepository) { }

	async createAssignment(courseId: string, assignmentDto: AssignmentDto): Promise<AssignmentDto> {
		const createdAssignment = await this.assignmentRepository.createAssignment(courseId, assignmentDto);
		const createdAssignmentDto = fromDtoFactory.createAssignmentDto(createdAssignment);
		return createdAssignmentDto;
	}

	async getAssignments(courseId: string,): Promise<AssignmentDto[]> {
		const assignments = await this.assignmentRepository.getAssignments(courseId);
		const assignmentDtos: AssignmentDto[] = [];
		assignments.forEach(assignment => {
			assignmentDtos.push(fromDtoFactory.createAssignmentDto(assignment))
		});
		return assignmentDtos;
	}

	async getAssignmentById(assignmentId: string): Promise<AssignmentDto> {
		const assignment = await this.assignmentRepository.getAssignmentById(assignmentId);
		return fromDtoFactory.createAssignmentDto(assignment);
	}

	async updateAssignment(assignmentId: string, assignmentDto: AssignmentDto): Promise<AssignmentDto> {
		if (assignmentId !== assignmentDto.id) {
			throw new BadRequestException("AssignmentId refers to a different assignment.");
		}
		const assignment = await this.assignmentRepository.updateAssignment(assignmentId, assignmentDto);
		return fromDtoFactory.createAssignmentDto(assignment);
	}

	async deleteAssignment(assignmentId: string): Promise<boolean> {
		return await this.assignmentRepository.deleteAssignment(assignmentId);
	}

}