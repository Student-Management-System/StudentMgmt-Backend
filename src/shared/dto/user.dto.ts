import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CourseDto } from "../../course/dto/course/course.dto";
import { UserRole } from "../enums";

export class UserDto {
	/** Unique identifier of this user. */
	@ApiPropertyOptional({ description: "Unique identifier of this user." })
	id?: string;
	
	email: string;
	username: string;
	rzName: string;

	/** Role within the application. */
	@ApiProperty({ description: "Role within the application." })
	role: UserRole;
	
	/** Courses that the user has signed up for. */
	//@ApiPropertyOptional({ description: "Courses that the user has signed up for.", type: () => CourseDto })
	courses?: CourseDto[];
}
