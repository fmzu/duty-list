CREATE TABLE `tags` (
	`uuid` text(36) NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `tags_uuid_unique` ON `tags` (`uuid`);