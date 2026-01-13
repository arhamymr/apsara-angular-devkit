#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('apsara-ui')
  .description('shadcn-style UI component installer for Angular')
  .version('1.0.0');

program.addCommand(initCommand().name('init'));
program.addCommand(addCommand().name('add'));
program.addCommand(listCommand().name('list'));

program.parse();
