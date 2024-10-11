CREATE TABLE `duty` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`time_slot` integer,
	`week_slot` integer,
	`owner_id` text(36),
	`overview` text(2048),
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
CREATE UNIQUE INDEX `duty_uuid_unique` ON `duty` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_unique` ON `users` (`login`);