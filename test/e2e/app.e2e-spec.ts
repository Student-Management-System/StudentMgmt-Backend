import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { getConnection } from "typeorm";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await getConnection().close(); // Close Db-Connection after all tests have been executed
	});

	it("(GET) /uptime", () => {
		return request(app.getHttpServer())
			.get("/uptime")
			.expect(200)
			.expect(({ body }) => {
				expect(body.startTime).toBeTruthy();
				expect(body.uptime).toBeTruthy();
			});
	});
});
