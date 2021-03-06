import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../src/shared/entities/user.entity";
import { Language } from "../src/shared/language";
import { UserSettings } from "../src/user/entities/user-settings.entity";

export class UserSettings1622731806947 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = queryRunner.manager.getRepository(User);
		const userSettingsRepository = queryRunner.manager.getRepository(UserSettings);

		const users = await userRepository.find();

		const userSettings = users.map(user => this.createDefaultUserSettings(user));

		await userSettingsRepository.insert(userSettings);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.clearTable("user_settings");
	}

	private createDefaultUserSettings(user: User) {
		const settings = new UserSettings();
		settings.userId = user.id;
		settings.allowEmails = true;
		settings.language = Language.DE;
		settings.blacklistedEvents = null;
		return settings;
	}
}
