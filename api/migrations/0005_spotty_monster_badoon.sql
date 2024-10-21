ALTER TABLE `rosters` ADD `am_owner_id` text(36);--> statement-breakpoint
ALTER TABLE `rosters` ADD `pm_owner_id` text(36);--> statement-breakpoint
ALTER TABLE `rosters` ADD `task_id` text(36);--> statement-breakpoint
ALTER TABLE `tasks` ADD `tag_id` text(256);--> statement-breakpoint
ALTER TABLE `rosters` DROP COLUMN `owner_id`;--> statement-breakpoint
ALTER TABLE `rosters` DROP COLUMN `overview`;