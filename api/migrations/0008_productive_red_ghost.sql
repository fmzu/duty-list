CREATE TABLE `tags` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE `tasks` ADD `tag_id` text(256);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_uuid_unique` ON `tags` (`uuid`);