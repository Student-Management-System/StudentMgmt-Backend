import { EntityRepository, Repository } from "typeorm";
import { CourseConfig } from "../../entities/course-config.entity";
import { CourseConfigDto } from "../../dto/course-config.dto";

@EntityRepository(CourseConfig)
export class CourseConfigRepository extends Repository<CourseConfig> {

	/** Inserts the course config into the database. */
	createCourseConfig(courseId: string, configDto: CourseConfigDto): Promise<CourseConfig> {
		const config = new CourseConfig();
		
		if (config.admissionCriteria) {
			config.admissionCriteria.admissionCriteria = configDto.admissionCriteria;
		}

		return config.save();
	}

	/** Returns the course config without relations. Throws error, if not found. */
	getById(id: number): Promise<CourseConfig> {
		return this.findOneOrFail(id);
	}

	/** Returns the complete course config. Throws Error, if not found. */
	getByCourseId(courseId: string): Promise<CourseConfig> {
		return this.findOneOrFail({
			where: { courseId },
			relations: ["groupSettings", "admissionCriteria", "assignmentTemplates"]
		});
	}

	/** Partially updates the course config. Does not update related entites. */
	async updateCourseConfig(courseId: string, partial: Partial<CourseConfigEdit>): Promise<CourseConfig> {
		await this.update({ courseId }, partial);
		return this.getByCourseId(courseId);
	}

	/** Removes the course config from the database. Returns true, if removal was successful. */
	async removeCourseConfig(courseId: string): Promise<boolean> {
		return (await this.delete({ courseId })).affected == 1 ? true : false;
	}
	
}
