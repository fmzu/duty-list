CREATE TABLE `rosters` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`owner_id` text(36),
	`overview` text(2048),
	`is_done` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE `roasters`;--> statement-breakpoint
CREATE UNIQUE INDEX `rosters_uuid_unique` ON `rosters` (`uuid`);