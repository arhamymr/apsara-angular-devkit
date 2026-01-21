import { Command } from 'commander';
import { getAvailableComponents } from '../utils/components.js';
import { logger } from '../utils/logger.js';
import { getComponentsPath } from '../utils/paths.js';

export function listCommand(): Command {
  const command = new Command('list');

  command
    .description('List available components')
    .action(() => {
      const componentsPath = getComponentsPath(import.meta.url);
      const components = getAvailableComponents(componentsPath);

      logger.info('Available components:\n');

      const componentDescriptions: Record<string, string> = {
        button: 'Button with multiple variants (filled, outlined, text, soft)',
        input: 'Form input with label, error handling, and icons',
        card: 'Container with multiple variants (elevated, outlined, tonal)'
      };

      if (components.length === 0) {
        console.log('  No components found.');
        console.log();
        logger.info('Make sure @aether/ui package is installed.');
      } else {
        for (const component of components) {
          const description = componentDescriptions[component] || 'UI component';
          console.log(`  ${component.padEnd(10)} - ${description}`);
        }

        console.log();
        logger.info(`Usage: npx aether-ui add ${components.slice(0, 3).join(' ')}`);
      }
    });

  return command;
}
