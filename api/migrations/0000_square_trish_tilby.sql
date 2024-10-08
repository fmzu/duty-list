CREATE TABLE `enrollments` (
	`uuid` text(36) NOT NULL,
	`user_id` text(36) NOT NULL,
	`program_id` text(36) NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`time_slot` integer NOT NULL,
	`week_slot` integer NOT NULL,
	`owner_id` text(36) NOT NULL,
	`units_count` integer NOT NULL,
	`overview` text(2048) NOT NULL,
	`year` integer NOT NULL,
	`period` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`email` text(256) NOT NULL,
	`hashed_password` text(256) NOT NULL,
	`login` text(256) NOT NULL,
	`role` integer NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enrollments_uuid_unique` ON `enrollments` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `programs_uuid_unique` ON `programs` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_unique` ON `users` (`login`);