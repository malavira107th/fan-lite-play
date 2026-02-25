CREATE TABLE `challenges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`creditLimit` decimal(5,1) NOT NULL DEFAULT '100.0',
	`maxEntriesPerUser` int NOT NULL DEFAULT 3,
	`status` enum('open','locked','completed') NOT NULL DEFAULT 'open',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challenges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`teamA` varchar(128) NOT NULL,
	`teamB` varchar(128) NOT NULL,
	`venue` varchar(256),
	`matchDate` timestamp NOT NULL,
	`format` enum('T20','ODI','Test') NOT NULL DEFAULT 'T20',
	`status` enum('upcoming','live','completed') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playerPerformance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`playerId` int NOT NULL,
	`matchId` int NOT NULL,
	`runsScored` int NOT NULL DEFAULT 0,
	`ballsFaced` int NOT NULL DEFAULT 0,
	`fours` int NOT NULL DEFAULT 0,
	`sixes` int NOT NULL DEFAULT 0,
	`fifties` int NOT NULL DEFAULT 0,
	`hundreds` int NOT NULL DEFAULT 0,
	`ducks` int NOT NULL DEFAULT 0,
	`wickets` int NOT NULL DEFAULT 0,
	`oversBowled` decimal(4,1) NOT NULL DEFAULT '0.0',
	`maidens` int NOT NULL DEFAULT 0,
	`dotBalls` int NOT NULL DEFAULT 0,
	`catches` int NOT NULL DEFAULT 0,
	`stumpings` int NOT NULL DEFAULT 0,
	`runOuts` int NOT NULL DEFAULT 0,
	`totalPoints` decimal(8,2) NOT NULL DEFAULT '0.00',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playerPerformance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`team` varchar(128) NOT NULL,
	`role` enum('batsman','bowler','all-rounder','wicket-keeper') NOT NULL,
	`credits` decimal(4,1) NOT NULL DEFAULT '8.0',
	`imageUrl` text,
	`isCaptainEligible` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teamEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`challengeId` int NOT NULL,
	`matchId` int NOT NULL,
	`teamName` varchar(128) NOT NULL,
	`captainId` int,
	`viceCaptainId` int,
	`totalPoints` decimal(8,2) NOT NULL DEFAULT '0.00',
	`rank` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teamEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teamEntryPlayers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamEntryId` int NOT NULL,
	`playerId` int NOT NULL,
	CONSTRAINT `teamEntryPlayers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `challenges` ADD CONSTRAINT `challenges_matchId_matches_id_fk` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `playerPerformance` ADD CONSTRAINT `playerPerformance_playerId_players_id_fk` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `playerPerformance` ADD CONSTRAINT `playerPerformance_matchId_matches_id_fk` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `players` ADD CONSTRAINT `players_matchId_matches_id_fk` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntries` ADD CONSTRAINT `teamEntries_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntries` ADD CONSTRAINT `teamEntries_challengeId_challenges_id_fk` FOREIGN KEY (`challengeId`) REFERENCES `challenges`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntries` ADD CONSTRAINT `teamEntries_matchId_matches_id_fk` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntries` ADD CONSTRAINT `teamEntries_captainId_players_id_fk` FOREIGN KEY (`captainId`) REFERENCES `players`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntries` ADD CONSTRAINT `teamEntries_viceCaptainId_players_id_fk` FOREIGN KEY (`viceCaptainId`) REFERENCES `players`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntryPlayers` ADD CONSTRAINT `teamEntryPlayers_teamEntryId_teamEntries_id_fk` FOREIGN KEY (`teamEntryId`) REFERENCES `teamEntries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teamEntryPlayers` ADD CONSTRAINT `teamEntryPlayers_playerId_players_id_fk` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `openId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `loginMethod`;