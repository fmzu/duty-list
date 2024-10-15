CREATE TABLE `roasters` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`owner_id` text(36),
	`overview` text(2048),
	`is_done` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
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
DROP TABLE `task`;--> statement-breakpoint
CREATE UNIQUE INDEX `roasters_uuid_unique` ON `roasters` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `tasks_uuid_unique` ON `tasks` (`uuid`);