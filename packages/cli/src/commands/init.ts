import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

export function initCommand(): Command {
  const command = new Command('init');

  command
    .description('Initialize a new Angular project with apsara-ui')
    .action(async () => {
      try {
        logger.info('Welcome to apsara-ui! 🚀');

        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'boilerplate',
            message: 'Choose a boilerplate:',
            choices: [
              { name: 'Minimal - Angular + Tailwind only', value: 'minimal' },
              { name: 'Complex - Full featured (coming soon)', value: 'complex', disabled: true }
            ]
          },
          {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            validate: (input: string) => {
              if (/^[a-z][a-z0-9-]*$/.test(input)) {
                return true;
              }
              return 'Project name must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens.';
            }
          }
        ]);

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const templatePath = path.resolve(__dirname, '../../../boilerplate', answers.boilerplate);
        const targetPath = path.resolve(process.cwd(), answers.projectName);

        if (fs.existsSync(targetPath)) {
          logger.error(`Directory "${answers.projectName}" already exists.`);
          process.exit(1);
        }

        logger.info(`Creating project: ${answers.projectName}...`);

        fs.copySync(templatePath, targetPath);

        replaceInFiles(targetPath, '{{PROJECT_NAME}}', answers.projectName);

        logger.success(`Project created successfully!`);
        logger.info(`\nNext steps:`);
        logger.info(`  cd ${answers.projectName}`);
        logger.info(`  npm install`);
        logger.info(`  npx apsara-ui add button input card`);

      } catch (error) {
        logger.error('Failed to initialize project.');
        console.error(error);
        process.exit(1);
      }
    });

  return command;
}

function replaceInFiles(dir: string, search: string, replace: string): void {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      replaceInFiles(fullPath, search, replace);
    } else if (file.isFile() && (file.name.endsWith('.json') || file.name.endsWith('.ts') || file.name.endsWith('.html') || file.name.endsWith('.md') || file.name.endsWith('.css'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.split(search).join(replace);
      fs.writeFileSync(fullPath, content);
    }
  }
}
