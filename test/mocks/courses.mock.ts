import { CourseDto } from "../../src/course/dto/course/course.dto";

export const COURSE_JAVA_1920: CourseDto = {
	id: "java-wise1920",
	shortname: "java",
	semester: "wise1920",
	title: "Programmierpraktikum I: Java",
	isClosed: false,
	links: [
		{
			name: "Example URL",
			url: "http://example-url.com"
		}
	]
};

export const COURSE_JAVA_2020: CourseDto = {
	id: "java-sose2020",
	shortname: "java",
	semester: "sose2020",
	title: "Programmierpraktikum I: Java",
	isClosed: false,
	links: [
		{
			name: "Example URL",
			url: "http://example-url.com"
		}
	]
};

export const COURSE_JAVA_1819: CourseDto = {
	id: "java-wise1819",
	shortname: "java",
	semester: "wise1819",
	title: "Programmierpraktikum I: Java",
	isClosed: true,
	links: [
		{
			name: "Example URL",
			url: "http://example-url.com"
		}
	]
};

export const COURSE_INFO_2_2020: CourseDto = {
	id: "info2-sose2020",
	shortname: "info2",
	semester: "sose2020",
	isClosed: false,
	title: "Informatik II: Algorithmen und Datenstrukturen",
	links: [
		{
			name: "Example URL",
			url: "http://example-url.com"
		}
	]
};

export const CoursesMock: CourseDto[] = [
	COURSE_JAVA_1920,
	COURSE_JAVA_1819,
	COURSE_JAVA_2020,
	COURSE_INFO_2_2020
];
