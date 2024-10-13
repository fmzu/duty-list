CREATE TABLE `task` (
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
DROP TABLE `duty`;--> statement-breakpoint
CREATE UNIQUE INDEX `task_uuid_unique` ON `task` (`uuid`);