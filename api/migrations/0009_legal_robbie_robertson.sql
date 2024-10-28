ALTER TABLE `task_items` ADD `tag_id` text(256);--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `tag_id`;