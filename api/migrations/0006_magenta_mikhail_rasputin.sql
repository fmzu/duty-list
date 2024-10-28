CREATE TABLE `task_items` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE `rosters`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `tasks` ADD `task_items` text(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` ADD `task_date` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `task_items_uuid_unique` ON `task_items` (`uuid`);--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `time_slot`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `week_slot`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `overview`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `tag_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `role`;