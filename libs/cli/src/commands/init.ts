import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import { getTemplatePath } from '../utils/paths.js';

export function initCommand(): Command {
  const command = new Command('init');

  command
    .description('Initialize a new Angular project with aether-ui')
    .action(async () => {
      try {
        logger.info('Welcome to aether-ui! 🚀');

        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'boilerplate',
            message: 'Choose a boilerplate:',
            choices: [
              { name: 'Minimal - Angular + Tailwind only', value: 'minimal' },
              { name: 'Minimal with Lucide Icons - Angular + Tailwind + Lucide Icons', value: 'minimal-with-lucide' },
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

        const templatePath = getTemplatePath(import.meta.url, answers.boilerplate);
        const targetPath = path.resolve(process.cwd(), answers.projectName);

        // Check if template exists
        if (!fs.existsSync(templatePath)) {
          logger.error(`Template "${answers.boilerplate}" not found.`);
          logger.debug(`Expected template at: ${templatePath}`);
          process.exit(1);
        }

        // Check if target directory already exists
        if (fs.existsSync(targetPath)) {
          logger.error(`Directory "${answers.projectName}" already exists.`);
          logger.info('Please choose a different name or remove the existing directory.');
          process.exit(1);
        }

        logger.info(`Creating project: ${answers.projectName}...`);

        try {
          fs.copySync(templatePath, targetPath);
        } catch (error) {
          logger.error('Failed to copy template files.');
          if (error instanceof Error) {
            logger.debug(error.message);
          }
          throw error;
        }

        replaceInFiles(targetPath, '{{PROJECT_NAME}}', answers.projectName);

        logger.success(`Project created successfully!`);
        logger.info(`\nNext steps:`);
        logger.info(`  cd ${answers.projectName}`);
        logger.info(`  npm install`);

        if (answers.boilerplate === 'minimal-with-lucide') {
          logger.info(`  Your project includes Lucide Angular icons! Check app.component.html for examples.`);
        } else {
          logger.info(`  npx aether-ui add button input card`);
        }

      } catch (error) {
        if (error instanceof Error) {
          logger.error(`Failed to initialize project: ${error.message}`);
          logger.debug(error.stack || '');
        } else {
          logger.error('Failed to initialize project due to an unknown error.');
        }
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
