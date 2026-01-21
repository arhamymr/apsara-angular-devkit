import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import { getAvailableComponents } from '../utils/components.js';
import { getComponentsPath } from '../utils/paths.js';

export function addCommand(): Command {
  const command = new Command('add');

  command
    .argument('<components...>', 'components to add')
    .description('Add components to your project')
    .option('-f, --force', 'Overwrite existing components')
    .option('-d, --dry-run', 'Show what would be added without making changes')
    .action(async (components: string[], options: { force?: boolean; dryRun?: boolean }) => {
      try {
        const uiPath = path.resolve(process.cwd(), 'src', 'app', 'ui');
        const componentsPath = getComponentsPath(import.meta.url);

        if (!fs.existsSync(uiPath)) {
          logger.error('src/app/ui directory not found. Run "npx aether-ui init" first.');
          process.exit(1);
        }

        const availableComponents = getAvailableComponents(componentsPath);

        if (!Array.isArray(components) || components.length === 0) {
          logger.error('No components specified. Usage: npx aether-ui add button input card');
          process.exit(1);
        }

        const invalidComponents = components.filter(c => !availableComponents.includes(c));

        if (invalidComponents.length > 0) {
          logger.error(`Unknown components: ${invalidComponents.join(', ')}`);
          logger.info(`Available: ${availableComponents.join(', ')}`);
          process.exit(1);
        }

        if (options.dryRun) {
          logger.info('Dry run mode - no changes will be made\n');
        }

        let addedCount = 0;
        let skippedCount = 0;
        const componentsToAdd: string[] = [];

        for (const component of components) {
          const sourcePath = path.join(componentsPath, component);
          const targetPath = path.join(uiPath, component);

          if (fs.existsSync(targetPath) && !options.force) {
            logger.warn(`Component "${component}" already exists. Skipping. Use --force to overwrite.`);
            skippedCount++;
            continue;
          }

          if (options.dryRun) {
            if (fs.existsSync(targetPath)) {
              logger.info(`Would overwrite: ${component}`);
            } else {
              logger.info(`Would add: ${component}`);
            }
            addedCount++;
            componentsToAdd.push(component);
          } else {
            try {
              if (fs.existsSync(targetPath)) {
                fs.removeSync(targetPath);
                logger.info(`Removing existing: ${component}`);
              }
              fs.copySync(sourcePath, targetPath);
              addedCount++;
              componentsToAdd.push(component);
              logger.success(`Added: ${component}`);
            } catch (error) {
              logger.error(`Failed to add component "${component}"`);
              if (error instanceof Error) {
                logger.debug(error.message);
              }
            }
          }
        }

        if (!options.dryRun && componentsToAdd.length > 0) {
          updateIndexFile(uiPath, componentsToAdd);
        }

        if (options.dryRun) {
          logger.info(`\nDry run complete. Would add ${addedCount} component(s).`);
        } else {
          logger.success(`\nAdded ${addedCount} component(s).`);
          if (skippedCount > 0) {
            logger.info(`Skipped ${skippedCount} existing component(s).`);
          }
        }

      } catch (error) {
        if (error instanceof Error) {
          logger.error(`Failed to add components: ${error.message}`);
          logger.debug(error.stack || '');
        } else {
          logger.error('Failed to add components due to an unknown error.');
        }
        process.exit(1);
      }
    });

  return command;
}

function updateIndexFile(uiPath: string, components: string[]): void {
  const indexPath = path.join(uiPath, 'index.ts');
  let content = '';

  // Read existing content if file exists
  if (fs.existsSync(indexPath)) {
    content = fs.readFileSync(indexPath, 'utf8');
  }

  let hasChanges = false;

  for (const component of components) {
    const exportLine = `export * from './${component}/${component}.component';`;
    const indexLine = `export * from './${component}/index';`;

    // Only add if not already present
    if (!content.includes(exportLine)) {
      content += `${exportLine}\n`;
      hasChanges = true;
    }
    if (!content.includes(indexLine)) {
      content += `${indexLine}\n`;
      hasChanges = true;
    }
  }

  if (hasChanges) {
    fs.writeFileSync(indexPath, content);
    logger.info(`Updated: src/app/ui/index.ts`);
  }
}
