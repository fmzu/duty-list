CREATE TABLE `duty` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`owner_id` text(36),
	`overview` text(2048),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE `enrollments`;--> statement-breakpoint
DROP TABLE `programs`;--> statement-breakpoint
CREATE UNIQUE INDEX `duty_uuid_unique` ON `duty` (`uuid`);