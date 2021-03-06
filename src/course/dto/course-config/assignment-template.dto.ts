import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { AssignmentDto } from "../assignment/assignment.dto";

export class AssignmentTemplateDto extends PartialType(OmitType(AssignmentDto, ["id"])) {
	@ApiPropertyOptional({ description: "Unique identifier of this template." })
	id?: number;

	/** The name of the template. */
	@ApiProperty({ description: "The name of this template." })
	templateName: string;

	/** Time between start and end of the assignment (in days). */
	@ApiPropertyOptional({ description: "Time between start and end of the assignment (in days)." })
	timespanDays?: number;
}
